// ==UserScript==
// @name         Google Logo in Tamil
// @namespace     http://emaillenin.blogspot.com
// @description   Replaces the default Google Logo with the Tamil Google Logo
// @include      http://www.google.*/
// @include      http://www.google.*/webhp

// ==/UserScript==
var oldLogo = document.getElementById('logo');
var newLogo = document.createElement('img');
newLogo.id = "GoogleTamil_Logo";
newLogo.border = 'no'
newLogo.src = 'http://i47.tinypic.com/fo3rr7.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);