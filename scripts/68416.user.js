// ==UserScript==
// @name           Meez ad removal
// @namespace      http://userscripts.org/users/131608
// @include        http://www.meez.com/main.dm
// ==/UserScript==
var adBox = document.getElementById('adBlock');
if (adBox) {
    adBox.parentNode.removeChild(adBox);
}


