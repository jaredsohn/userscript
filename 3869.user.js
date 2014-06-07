/*

Scale images
Version 0.4
(C) 2005 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

*/

// ==UserScript==
// @name          Scale images
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Allows images to be scaled with text resizing
// @exclude       http://maps.google.com/*
// ==/UserScript==

function callWhenLoaded(img, callback) {
  (function callbackOrContinue() {
    if(img.complete) {
      callback(img);
    } else {
      window.setTimeout(callbackOrContinue, 100);
    }
  })();
}

function enableScaling(img) {
  var pixelsPerEm = window.parseInt(window.getComputedStyle(img, '').fontSize);
  img.style.width = img.width / pixelsPerEm + 'em';
  img.style.height = img.height / pixelsPerEm + 'em';
}

var c, img, imgs = document.getElementsByTagName('img');
for(c = 0; img = imgs[c]; c++) {
  callWhenLoaded(img, enableScaling);
}