// ==UserScript==
// @name          Rotter Fix
// @namespace     http://diveintogreasemonkey.org/download/
// @description   This script fixes some rotter.name's forum system issues with firefox.
// @include       *rotter.name*
// by enemy/DowNTown thanks to idoa for some help.
// ==/UserScript==
(function() {
objCSS = document.createElement('link');
objCSS.rel = 'stylesheet';
objCSS.href = 'http://rotter.name/User_files/nor/44f14c8a32dee250.txt';
objCSS.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(objCSS);
})();