// ==UserScript==
// @name          Bookmarklet Private on Delicious
// @namespace     http://delicious
// @description   Make every bookmark clicked by bookmarklet as private
// @include       http://www.delicious.com/save*
// ==/UserScript==

document.getElementById("savePrivate").checked=true;
document.getElementByName("share").checked=true;


