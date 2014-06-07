// ==UserScript==
// @name        Facepunch PUI Button
// @description PUI Emergency Button
// @match       http://facepunch.com/*
// @match       http://www.facepunch.com/*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementById('navbarlinks').insertAdjacentHTML( 'afterBegin', '<div class="navbarlink"><a href="forumdisplay.php?f=385"><img alt="PUI" src="fp/ratings/weed.png" title="PUI Here" />PUI Here</a></div>' );