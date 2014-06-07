// ==UserScript==
// @name         Google Riri Apriani Request
// @namespace    http://www.facebook.com/ry.riry
// @description  Merubah Logo Google dengan Foto 
// @include      http://www.google.*/
// @include      http://www.google.*/webhp

// ==/UserScript==
var oldLogo = document.getElementById('logo');
var newLogo = document.createElement('img');
newLogo.id = "logogoogleriri";
newLogo.border = 'no'
newLogo.src = 'http://img140.imageshack.us/img140/9620/logogoogleriri.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);

