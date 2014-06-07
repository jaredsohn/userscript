// ==UserScript==
// @name           Pre-Load Image Links (PRO)
// @description    Pre-loads links to images for a faster image load when clicked.
// @include        http://*
// @include        https://*
// @include        file:*
// @exclude        http://images.google.com/*
// @copyright      Tony White
// @version        1.0.1 (PRO)
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

window.addEventListener('load', function(){
var array=window.document.evaluate("//a[contains(@href,'.jpg') or contains(@href,'.jpeg') or contains(@href,'.png') or contains(@href,'.bmp') or contains(@href,'.tiff') or contains(@href,'.gif') or contains(@href,'.JPG') or contains(@href,'.PNG') or contains(@href,'.BMP') or contains(@href,'.TIFF') or contains(@href,'.GIF')]",window.document,null,6,null),
	regex = /^(ftp|https?):\/\//;
for(var i=array.snapshotLength-1; (item=array.snapshotItem(i)); i--) {
if(regex.test(item.href)) new Image().src=item.href;
}
}, false);