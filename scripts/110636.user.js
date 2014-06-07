// ==UserScript==
// @name          Remove hotmail garbage
// @namespace     http://www.citrusbytes.net/
// @include       https://live.*/*
// @include       https://*.live.*/*
// @version       0.1
// @description   Remove hotmail garbage
// @author        Aswan - Based upon Haranobu's script
// ==/UserScript==

var logoku = document.createElement('img');
logoku.title = 'Citrusbytes';
logoku.setAttribute('border', 0);
logoku.src = 'http://www.citrusbytes.net/header.png';

var elmNewContent = document.createElement('a');
elmNewContent.href = '#';
elmNewContent.appendChild(logoku);

var elmLogo = document.getElementById('brandModeTD');
elmLogo.parentNode.replaceChild(elmNewContent, elmLogo);
