---
layout: post
title: "Uses of opportunistic encryption"
date: 2020-05-16
draft: true
---


Recently I've been seeing people recommend [Delta Chat](https://delta.chat/en/)
as an alternative to centralized, encrypted messaging apps like Signal. I think
this is a mistake. I like Delta Chat, but I am not sure it's the right tool for
users with high security needs.

Delta Chat is an email client for phones and desktops that presents threads in
a simple, chat-like UI. It takes existing email infrastructure and turns it
into a federated chat system that remains interoperable with classic email
clients. In addition, it uses [Autocrypt](https://autocrypt.org/) for
opportunistic encryption. Messages sent with Delta Chat contain a header with
the sender's PGP public key enabling subsequent replies to be end-to-end
encrypted. This happens automatically, so users don't have to think about key
exchange.

For anyone who's spent time dealing with key management woes, this sounds like
a very neat technology -- and it is! But opportunistic encryption is not a
substitute for schemes that are *reliably* secure as in Signal, WhatsApp, or
Wire.

The core problem is that communicating security features to end users is
*hard*. There are often nuances and conditions that are opaque unless you're a
technical user with significant security knowledge. For example: in Delta Chat,
messages are only encrypted if the recipient also uses a client with Autocrypt,
and messages are never encrypted before you've received a response (with the
other party's public key as a header). Other messaging systems have
similar issues. 

