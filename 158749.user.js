// ==UserScript==
// @namespace      org.wp.neolexx
// @name           WikimediaImageBlur
// @version        0.2 Alpha
// @description    Double-click to unblur or to blur again
// @include        http://ru.wikipedia.org/*
// @include        https://ru.wikipedia.org/*
// @include        http://commons.wikimedia.org/*
// @include        https://commons.wikimedia.org/*
// @icon           http://icons.iconarchive.com/icons/dooffy/characters/32/W1-icon.png
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
var FILTERS = 'url("data:image/svg+xml;utf8,'.concat(
'<svg xmlns=\'http://www.w3.org/2000/svg\'>',
 '<filter id=\'autocall\'>',
  '<feGaussianBlur stdDeviation=\'10\'/>',
  '<feColorMatrix type=\'matrix\' values=\'',
   '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 ',
   '0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/>',
 '</filter>',
'</svg>#autocall")');



// The rest of the program:



var img = $('mw-content-text').getElementsByTagName('IMG');
var len = img.length;
for (var i=0; i<len; i++) {
 if ( ('width' in img[i]) && (img[i].width > 60) ) {
  img[i].style.filter = FILTERS;
  img[i].style.cursor = 'default';
  img[i].addEventListener('dblclick',revealImage,false);
  img[i].parentNode.onclick = new Function('return false');
 }
}
img = null;



function revealImage(evt) {
 if (evt.currentTarget.style.filter) {
  evt.currentTarget.style.filter = '';
 }
 else {
  evt.currentTarget.style.filter = FILTERS;
 }
 return false;
}



function $(id) {
 return document.getElementById(id);
}