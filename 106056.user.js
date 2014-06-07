// ==UserScript==
// @name          Swaps out facebook's logo for an image
// @namespace     http://www.citrusbytes.net/
// @include       http://facebook.*/*
// @include       http://*.facebook.*/*
// @version       0.1
// @description   Replacing Facebook's logo with an image
// @author        Aswan - Based upon Haranobu's script
// ==/UserScript==

var logoku = document.createElement('img');
logoku.title = 'Facebook';
logoku.setAttribute('border', 0);
logoku.src = 'http://citrusbytes.net/rawr/fb/logo.png';

var elmNewContent = document.createElement('a');
elmNewContent.href = 'http://www.facebook.com';
elmNewContent.appendChild(logoku);

var elmLogo = document.getElementById('pageLogo');
elmLogo.parentNode.replaceChild(elmNewContent, elmLogo);
