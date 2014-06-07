// ==UserScript==
// @name           Remove Penny Arcade Ad Box
// @namespace      http://rory.netsoc.ucd.ie
// @description    Removes the penny arcade ad box as it's too big.
// @include        http://www.penny-arcade.com/*
// ==/UserScript==

var adBox = document.getElementById("adhoriz");

if (adBox) {
    adBox.parentNode.removeChild(adBox);
}