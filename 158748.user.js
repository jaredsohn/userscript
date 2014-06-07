// ==UserScript==
// @namespace      org.wp.neolexx
// @name           WikimediaImageBlur
// @version        0.2 Alpha
// @description    Double-click to unblur or to blur again
// @match          *://*.wikipedia.org/*
// @run-at         document-end
// @copyright      2013, NeoLexx
// @license        Fair License; http://opensource.org/licenses/Fair
// ==/UserScript==



// Double clicks  under Windows  trig WSH calls
// and it may get irritating (myself at least).
// Feel free to remove though:
if (typeof WScript != 'undefined') {
 WScript.Quit();
}



// Default filter set:
var FILTERS = 'blur(10px) grayscale(1)';



// The rest of the program:



var img = $('mw-content-text').getElementsByTagName('IMG');
var len = img.length;
for (var i=0; i<len; i++) {
 if ( ('width' in img[i]) && (img[i].width > 60) ) {
  img[i].style.WebkitFilter = FILTERS;
  img[i].style.cursor       = 'default';
  img[i].addEventListener('dblclick',revealImage,false);
  img[i].parentNode.onclick = new Function('return false');
 }
}
img = null;



function revealImage(evt) {
 if (evt.currentTarget.style.WebkitFilter) {
  evt.currentTarget.style.WebkitFilter = '';
 }
 else {
  evt.currentTarget.style.WebkitFilter = FILTERS;
 }
 return false;
}



function $(id) {
 return document.getElementById(id);
}