// ==UserScript==
// @name         Google Genocide 
// @namespace     http://ruifujiwara.blogspot.com
// @description   Replaces the default Google Logo with Genocide
// @include      http://www.google.*/
// @include      http://www.google.*/webhp

// ==/UserScript==
var oldLogo = document.getElementById('logo');
var newLogo = document.createElement('img');
newLogo.id = "genocide";
newLogo.border = 'no'
newLogo.src = 'http://img814.imageshack.us/img814/1196/genocide.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);

