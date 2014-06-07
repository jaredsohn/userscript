// ==UserScript==
// @name          Changes FaceBook to HackedBook
// @namespace     http://www.citrusbytes.net/
// @include       http://facebook.*/*
// @include       http://*.facebook.*/*
// @version       1.1
// @description   Replacing Facebook logo with HackedBook logo
// @author        accfxion
// ==/UserScript==

var logoku = document.createElement('img');
logoku.title = 'Facebook';
logoku.setAttribute('border', 0);
logoku.src = 'http://i1181.photobucket.com/albums/x429/codybb1/newlogo.png';

var elmNewContent = document.createElement('a');
elmNewContent.href = 'http://www.facebook.com';
elmNewContent.appendChild(logoku);

var elmLogo = document.getElementById('pageLogo');
elmLogo.parentNode.replaceChild(elmNewContent, elmLogo);