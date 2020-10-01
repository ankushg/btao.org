---
layout: post
title: "Running ElasticSearch in podman on Fedora 32"
date: 2020-04-20
---
<a href="#tldr">Jump the to the tl;dr.</a>
So you just updated to Fedora 32, sat down to work, and realized that Docker wasn't working. Maybe at this point you vaguely remembered hearing about something called CgroupsV2 being a thing in Fedora 32, and maybe also something about Docker [not playing nice with CgroupsV2](https://github.com/docker/cli/issues/2104). You kick yourself for a moment but decide that this is a good opportunity to get to grips with [Podman](https://podman.io/). You could just turn off CgroupsV2 but it seems like working with Podman might make your future Fedora life a bit simpler.

Podman is only a quick `dnf install` away, so you try the relatively straightforward command to run a container: `podman run -p "9200:9200" elasticsearch:6.8.8`. It looks like it might even work, until...
{% highlight console %}
using discovery type [zen] and host providers [settings]
initialized
starting ...
publish_address {10.0.2.100:9300}, bound_addresses {[::]:9300}
bound or publishing to a non-loopback address, enforcing bootstrap checks
ERROR: [1] bootstrap checks failed
[1]: max file descriptors [1024] for elasticsearch process is too low, increase to at least [65535]
stopping ...
stopped
closing ...
closed
{% endhighlight %}

This isn't your first ElasticSearch rodeo so that error about max file descriptors looks familiar. Looks like you just have to bump your ulimit and everything should be fine! You check the soft limit and it is indeed low:

{% highlight console %}
$ ulimit -Sn
1024
{% endhighlight %}

So let's increase it. First, increase the system-wide limit for open file descriptors. Open `/etc/sysctl.conf` and add the line

{% highlight console %}
fs.file-max=131070
{% endhighlight %}

Easy enough. We also need to increase the per-user limit, so we open `/etc/security/limits.conf` and add

{% highlight console %}
tao soft nofile 65535
tao hard nofile 131070
{% endhighlight %}

Cool! The internet gurus tell you that this is all you need to do, so you log out and back in but...

{% highlight console %}
$ ulimit -Sn
1024
{% endhighlight %}

It didn't work. Some more DuckDuckGo-ing suggests appending to `/etc/pam.d/login`:

{% highlight console %}
session required pam_limits.so
{% endhighlight %}

PAMs are slightly out of your wheelhouse but you read some [docs](http://linux-pam.org/Linux-PAM-html/sag-pam_limits.html) and things seem to make sense. Alas, neither logging out and in nor rebooting seems to make all the necessary changes take effect. You ask around in some IRC rooms and Fedora forums but with no luck. It looks like you aren't [the only one who's had this problem](https://unix.stackexchange.com/questions/428107/how-to-increase-the-maximum-number-of-open-files-on-fedora). It's a good thing that you're working from home today because you are looking increasingly frazzled.

Eventually you find out that the limits *are* in fact being applied, just not to the graphical login. Opening a shell and `su`ing to your own account reveals the ulimit you'd expect. Someone on [Stack Exchange](https://superuser.com/a/1200818/619546) tells you that this is because gnome-terminal is started by systemd, which does not read from `limits.conf`. The final step is to write to both `/etc/systemd/user.conf` and `/etc/systemd/system.conf` and append

{% highlight console %}
DefaultLimitNOFILE=131070
{% endhighlight %}

or whatever your soft and hard limit should be, respectively.

You reboot a final time and, ta-da:

{% highlight console %}
$ ulimit -Sn
65535
{% endhighlight %}

You excitedly start the ElasticSearch container again, but `max file descriptors [1024] for elasticsearch process is too low, increase to at least [65535]` rears its ugly head once again. A final search tells you that you have to run
{% highlight console %}
podman run --ulimit=host -p "9200:9200" elasticsearch:6.8.8
{% endhighlight %}
You have never been this relieved to see an ElasticSearch container start up.

## TL;DR
Append `/etc/systemd/user.conf` and `/etc/systemd/system.conf` with your soft and hard limit, respectively:
{% highlight console %}
DefaultLimitNOFILE=131070
{% endhighlight %}

Then append the following to `/etc/security/limits.conf`:
{% highlight console %}
tao soft nofile 65535
tao hard nofile 131070
{% endhighlight %}

Reboot. Then you can run `podman run --ulimit=host -p "9200:9200" elasticsearch:6.8.8`.