// ==UserScript==
// @name           bilddagboken pwner
// @description    Pissar bdb i munnen och låter dig spara bilderna med högerklick, 
// @description    godislurk.bilddagboken.se istheshit! 
// @include        http://*bilddagboken.se/*
// ==/UserScript==

document.addEventListener('DOMAttrModified', documentChanged, false);

function documentChanged(event) {
var imageLoadingGif = document.getElementById('showContentImageBlocker');
if (imageLoadingGif) {
 imageLoadingGif.parentNode.removeChild(imageLoadingGif);
 
}
}