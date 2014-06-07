// ==UserScript==
// @name           NoodlesNZ
// @namespace      http://twitter.com/noodlesnz
// @description    Google Play Clean
// @include        https://*.google.com/*
// @include        http://*.google.com/*
// ==/UserScript==
(function() {
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("gb_78").style.display = "none";
}, false);
})();