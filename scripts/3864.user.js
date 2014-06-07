/*

Flickr remove spaceball
Version 0.2
(C) 2005 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

2007-02-18 - fix for new img src

*/

// ==UserScript==
// @name          Flickr remove spaceball
// @description   Removes the empty image (download deterrent) positioned over some photos on Flickr
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// ==/UserScript==


var spaceball = document.evaluate('//img[contains(@src, "/images/spaceball.gif")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(spaceball) {
  spaceball.style.visibility = 'hidden';
}