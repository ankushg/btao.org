---
layout: post
title: "Reasons not to use Telegram"
date: 2020-06-06
---

Telegram defaults to unencrypted chats, so your messages are stored in plaintext on their servers. If you don't want them to read your messages, you have to manually enable Secret Chats -- but these don't work for groups and require users to be online at the same time. A [2017 usability study](https://discovery.ucl.ac.uk/id/eprint/1560501/1/Abu-Salma%20et%20al.%20-%202017%20-%20The%20Security%20Blanket%20of%20the%20Chat%20World%20An%20Analyti.pdf) found that many users thought they were using secure, encrypted chats when they were in fact sending all their messages in plaintext.

Perhaps even more concerning is the fact that group chats in Telegram *cannot* be end-to-end encrypted. Secret chats are reserved for one-on-one communication. Given that large group chats is often cited as one of the key appeals of Telegram, it's surprising that this crucial gotcha is rarely mentioned.

In spite of these issues, Telegram continues to market itself as a secure messenger, causing people to think that their communications are private when they aren't.

When they first launched, Telegram performed the mortal sin of cryptography when they rolled their own encryption scheme, MTProto. They had Maths PhDs create the scheme -- but mathematicians are not cryptographers. A theoretical vulnerability in their scheme was discovered in 2016 (see [this PDF](https://dl.acm.org/doi/pdf/10.1145/2994459.2994468)), though it has since been fixed. When challenged on their encryption, they issued a [nonsensical challenge](https://web.archive.org/web/20171213214126/https://moxie.org/blog/telegram-crypto-challenge/) that showed they do not understand cryptography.

We have far better alternatives: Signal, Wire, and WhatsApp all use the well-tested Signal Protocol for encryption. They don't let users accidentally send plaintext messages. They do vary in terms of metadata protection; Signal does the most in order to prevent storing metadata.
