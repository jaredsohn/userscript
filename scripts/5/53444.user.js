// ==UserScript==
// @name           Photobucket fixer by Coreforge.com
// @namespace      Photobucket
// @description    Thumbnail images now point directly to their full size image, not a page containing it.
// @include        http://*.photobucket.com/*
// ==/UserScript==

var allElements, thisElement;
allElements = document.getElementsByTagName('a');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    thisElement.href = thisElement.href.replace('?action=view&current=','');
}