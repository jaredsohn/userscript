// ==UserScript==
// @name           Block GLB Lock Image
// @namespace      GLB_No_Lock
// @description    Blocks images you blacklist in the source
// @include        http://goallineblitz.com/*
// ==/UserScript==

var image, blacklist = new Array(
"http://goallineblitz.com/images/game/forum/smileys/lock.gif"
);

for(var i=document.images.length-1; i>=0; i--) {
image = document.images[i];
for(var x=blacklist.length-1; x>=0; x--) {
if(image.src.indexOf(blacklist[x])!=-1) image.parentNode.removeChild(image);
}
}