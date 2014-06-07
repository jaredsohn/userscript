// ==UserScript==
// @name          My First GM script
// @namespace     http://google.com
// @description   basic Greasemonkey script
// @include       http://www.google.com/
// ==/UserScript==
var oldLogo = document.getElementById('logo');
var newLogo = document.createElement('img');
newLogo.id = "GoogleTamil_Logo";
newLogo.border = 'no'
newLogo.src = 'http://i.imgur.com/1yccR.png';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);