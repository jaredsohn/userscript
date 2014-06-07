// ==UserScript==
// @name           Remove Reseed Bar
// @namespace      123qwe
// @description    Remove Reseed Bar from BTN
// @include        https://broadcasthe.net*
// ==/UserScript==

var reseed = document.getElementById('reseed_box');
if (reseed) {
    reseed.parentNode.removeChild(reseed);
}