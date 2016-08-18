---
layout: note
title: "Academic papers on the Kindle"
---

The newest Kindle Paperwhite (as of August 2016) can be great for reading academic papers as well as books, but you have to do a bit of work to make two-column PDFs look nice. The first option is to convert your .pdfs on your computer using [k2pdfopt](http://www.willus.com/k2pdfopt/), but I know I'll forget to do this.

The second option is to jailbreak the Kindle and use a custom PDF reader like [KOReader](https://github.com/koreader/koreader) that can reflow your PDFs on-the-fly. The best resource for this is the Kindle dev forum on [MobileRead.com](http://www.mobileread.com/forums/forumdisplay.php?f=150). Check the forums for up-to-date details!

I used [this post](http://www.mobileread.com/forums/showthread.php?t=275877). The steps were:

* downgrade to an earlier, exploitable version of the firmware
* jailbreak: copy a .bin file to the Kindle, then update it through the settings
* hotfix: do the same with another .bin file!
* update to a newer firmware version, in the same way
* install the [MobileRead Package Installer](http://www.mobileread.com/forums/showthread.php?t=251143)
* install the [Kindle Unified Application Launcher](http://www.mobileread.com/forums/showthread.php?t=203326)
* finally, install KOReader (drop it in the /mrpackages directory, then install through the MRPI settings)

Phew! That took a little while but it works very well. To reflow a PDF, open it in KOReader, tap the top of the screen, then tap the gear icon in the lower-right and select "reflow".

Note that:

* Amazon can automatically convert PDFs you email to them, but they tend to turn out badly formatted so I prefer this method
* After jailbreaking, never use the reset button in the Kindle settings!
