// ==UserScript==
// @name          Google's logo replacer with Blooderz logo
// @namespace     http://userscripts.org/scripts/show/105758
// @include       http://google.*/*
// @include       http://*.google.*/*
// @version       1.1
// @description   Replacing Google's logo with Blooderz logo
// @author        Haranobu
// ==/UserScript==

var logoku = document.createElement('img');
logoku.title = 'Indonesian Power Community';
logoku.setAttribute('border', 0);
logoku.src = 'http://i56.tinypic.com/2mhao87.png';

var elmNewContent = document.createElement('a');
elmNewContent.href = 'http://www.blooderz.us/';
elmNewContent.appendChild(logoku);

var elmLogo = document.getElementById('logo');
elmLogo.parentNode.replaceChild(elmNewContent, elmLogo);

