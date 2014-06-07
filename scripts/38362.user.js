// ==UserScript==
// @name           SoF2Files Large Thumbnails
// @namespace      http://userscripts.org/users/23652
// @description    Forces large thumbnails on sof2files.com
// @include        http://soldieroffortune2.filefront.com/files/*
// @copyright      JoeSimmons
// ==/UserScript==



var ratio = 2; // Number to be multiplied by original width
               // Default = 2 (double size)



// NO EDITING BELOW THIS LINE

var thumbs, th, i;

thumbs = document.evaluate("//img[contains(@src, '_1t.')]", document, null, 6, null);

for(i=thumbs.snapshotLength-1; i>=0; i--) {
th = thumbs.snapshotItem(i);
th.width *= ratio;
th.height *= ratio;
th.src  = th.src.replace(/_1t\.jpg$/, "_1.jpg");
}