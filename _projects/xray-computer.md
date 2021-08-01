---
title: xray.computer
subtitle: Preview npm packages before installing or upgrading them.
image: /static/img/xray-computer.png
wide: true
link: https://xray.computer/
code: https://gitlab.com/tao_oat/xray
date: 2021-05-21
importance: 5
---
There's no guarantee that the code on a project's GitHub corresponds to what's published to package registries like npm. We've seen supply-chain attacks where a malicious payload was added to [minified source code](https://snyk.io/blog/a-post-mortem-of-the-malicious-event-stream-backdoor/). xray.computer lets you view this actual, published code before you install a package. Diffs make it easy to confirm that a package update does what it ways in the changelog.