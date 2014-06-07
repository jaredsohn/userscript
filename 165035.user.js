// ==UserScript==
// @name        Facepunch Ticker
// @description Adds the FP Ticker back
// @match       http://facepunch.com/*
// @match       http://www.facepunch.com/*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementById('navbarlinks').insertAdjacentHTML( 'afterBegin', '<div class="navbarlink"><a href="fp_ticker.php"><img alt="Ticker" src="fp/navbar/ticker.png" title="Ticker" />Ticker</a></div>' );