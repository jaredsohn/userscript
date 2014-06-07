// ==UserScript==
// @name         Google Texnolize Club
// @namespace    Texnolize club hack
// @description  Change Logo Google 
// @include      http://*.google.*/*
// @include      http://www.google.*/webhp

// ==/UserScript==
var oldLogo = document.getElementById('hplogo');
var newLogo = document.createElement('img');
newLogo.id = "User-Logo";
newLogo.border = 'no'
newLogo.src = 'http://img42.imageshack.us/img42/4163/logoolo.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);