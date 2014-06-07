// ==UserScript==
// @name         Google Logo on black star
// @namespace     http://emaillenin.blogspot.com
// @description   Replaces the default Google Logo with the star Google Logo
// @include      http://www.google.*/
// @include      http://www.google.*/webhp

// ==/UserScript==
var oldLogo = document.getElementById('logo');
var newLogo = document.createElement('img');
newLogo.id = "Googlestar_Logo";
newLogo.border = 'no'
newLogo.src = 'http://img180.imageshack.us/img180/8941/googlehr.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);