// ==UserScript==
// @name          Swaps out google's logo for an image
// @namespace     http://www.citrusbytes.net/
// @include       http://google.*/*
// @include       http://*.google.*/*
// @version       0.1
// @description   Replacing Google's logo with an image
// @author        Aswan - Based upon Haranobu's script
// ==/UserScript==

var logoku = document.createElement('img');
logoku.title = 'Citrusbytes';
logoku.setAttribute('border', 0);
logoku.src = 'http://citrusbytes.net/rawr/logo-main.png';

var elmNewContent = document.createElement('a');
elmNewContent.href = 'http://www.citrusbytes.net';
elmNewContent.appendChild(logoku);

var elmLogo = document.getElementById('hplogo');
elmLogo.parentNode.replaceChild(elmNewContent, elmLogo);

