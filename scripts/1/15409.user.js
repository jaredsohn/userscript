// ==UserScript==
// @name           Remove my.yahoo Beta3 Masthead, sub-MastHead & Ads
// @namespace      http://chris.weetopia.com
// @description    Remove advertisements, headers from your My Yahoo Pages
// @include        http://cm.my.yahoo.com/*
// ==/UserScript==
// Based on previous script http://userscripts.org/scripts/review/8799 by Ted Kandell

// TODO: instead of remove, move sub-masthead to bottom of page
function removeElem(elem) {
  if (elem)
    elem.parentNode.removeChild(elem);
}

(function () {
  removeElem(document.getElementById('masthead'));
  removeElem(document.getElementById('submasthead'));
  removeElem(document.getElementById('ad-lrec'));
}());
