// ==UserScript==
// @name         420 Google Logo
// @namespace     http://localhost/
// @description   A 420 Google Logo Replacement
// @include      http://*.google.*/*
// @include      https://*.google.*/*


// ==/UserScript==
var oldLogo = document.getElementById('hplogo');
var newLogo = document.createElement('img');
newLogo.id = "User-Logo";
newLogo.border = 'no'
newLogo.src = 'http://experiencecurve.com/wp-content/uploads/2007/04/google420.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);