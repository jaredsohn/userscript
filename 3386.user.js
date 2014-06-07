// ==UserScript==
// @name          Show "Concerned About Half-Life" Comics' Notes
// @namespace     tag:oliver.dyas@gmail.com,2005-3-1:userscript
// @description   Makes notes for the webcomic "Concerned About Half-Life" (<a href="http://www.hlcomic.com/">www.hlcomic.com</a>) visible by default.
// @version       0.0.1
// @include       http://www.hlcomic.com/*
// @include       http://hlcomic.com/*
// ==/UserScript==

window.addEventListener('load',function(){document.getElementById('sc1').style.display="block";},true);

