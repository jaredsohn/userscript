// ==UserScript==
// @name         Google Logo 
// @namespace     http://ruifujiwara.blogspot.com
// @description   Replaces the default Google Logo with Photo
// @include      http://www.google.*/
// @include      http://www.google.*/webhp

// ==/UserScript==
var oldLogo = document.getElementById('logo');
var newLogo = document.createElement('img');
newLogo.id = "ryandyah";
newLogo.border = 'no'
newLogo.src = 'http://img406.imageshack.us/img406/7057/ryandyah.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);

