// ==UserScript==
// @namespace      org.wp.neolexx
// @name           WikimediaImageBlur
// @version        0.2 Alpha
// @description    Double-click to unblur or to blur again
// @include        http://ru.wikipedia.org/*
// @include        https://ru.wikipedia.org/*
// @include        http://commons.wikimedia.org/*
// @include        https://commons.wikimedia.org/*
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
var FILTERS = ''.concat(
 'progid:DXImageTransform.Microsoft.Blur(PixelRadius=10)',
 'progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)');



// The rest of the program:



var img = $('mw-content-text').getElementsByTagName('IMG');
var len = img.length;
var fix = null;
for (var i=0; i<len; i++) {
 if ( ('width' in img[i]) && (img[i].width > 60) ) {
  img[i].style.filter = FILTERS;
  img[i].style.cursor = 'default';
  img[i].attachEvent('ondblclick',revealImage);
  img[i].parentNode.onclick = new Function('return false');
 // fixing blur overflow:
  fix = document.createElement('DIV');
  fix.style.width    = img[i].currentStyle.width;
  fix.style.height   = img[i].currentStyle.height;
  fix.style.overflow = 'hidden';
  fix.appendChild(img[i].cloneNode());
  img[i].parentNode.replaceChild(fix,img[i]);
 }
}
img = null;



function revealImage() {
 var obj = window.event.srcElement;
 if (obj.style.filter) {
  obj.style.filter = '';
 }
 else {
  obj.style.filter = FILTERS;
 }
 return false;
}



function $(id) {
 return document.getElementById(id);
}