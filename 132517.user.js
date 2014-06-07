// ==UserScript==
// @name         Google Change Logo by sidayz
// @namespace    Sidayz
// @description  Change Logo Google 
// @include      http://*.google.*/*
// @include      http://google.co.id
// @include      http://www.google..co.id
// @include      http://google.com
// @include      http://www.google.com
// @include      http://www.google.*/webhp
// @include      https://*.google.*/*
// @include      https://google.co.id
// @include      https://www.google..co.id
// @include      https://google.com
// @include      https://www.google.com
// @include      https://www.google.*/webhp

// ==/UserScript==
var oldLogo = document.getElementById('hplogo');
var newLogo = document.createElement('img');
newLogo.id = "User-Logo";
newLogo.border = 'no'
newLogo.src = 'http://www.sidayz.tk/images/Ngaran.png';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);