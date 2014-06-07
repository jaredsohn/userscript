// ==UserScript==
// @name         gfbia
// @namespace     http://localhost/
// @description   gfbia
// @include      http://*.google.*/*

// ==/UserScript==
var oldLogo = document.getElementById('hplogo');
var newLogo = document.createElement('img');
newLogo.id = "SemperVideo-Logo";
newLogo.border = 'no'
newLogo.src = 'http://img37.imageshack.us/img37/7638/micigoogle.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);