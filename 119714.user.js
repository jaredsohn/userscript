// ==UserScript==
// @name         Google Texnolize Club 2
// @namespace    Texnolize club hack 2
// @description  Change Logo Google 
// @include      http://*.google.*/*
// @include      http://www.google.*/webhp

// ==/UserScript==
var oldLogo = document.getElementById('hplogo');
var newLogo = document.createElement('img');
newLogo.id = "User-Logo";
newLogo.border = 'no'
newLogo.src = 'http://img6.imageshack.us/img6/3869/logooa.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);