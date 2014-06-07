// ==UserScript==
// @name           Wer kennt wen? AdFixer
// @namespace      http://felix-kloft.invalid/werkenntwenadfixer
// @description    Behebt einige Fehler mit der Werbung
// @include        http://www.wer-kennt-wen.de/*
// ==/UserScript==

safeWrite = unsafeWindow.document.write;
unsafeWindow.document.write = function(text)
{
	if(text.indexOf("ivwbox") == -1)
		safeWrite(text);
};

unsafeWindow.urchinTracker = function(){};

