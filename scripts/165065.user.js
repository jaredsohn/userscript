// ==UserScript==
// @name		Facepunch Ticker Link
// @namespace	http://facepunch.com
// @author		SataniX
// @license		http://creativecommons.org/licenses/by-sa/3.0/
// @description	Re-Adds a ticker link.
// @include		http://facepunch.com/*
// @include 	http://www.facepunch.com/*
// @version 	1.0
// ==/UserScript==

var parent = document.getElementById("navbarlinks");
var ticker = document.createElement("div");
ticker.className = "navbarlink";
ticker.innerHTML = '<a href="fp_ticker.php"><img src="fp/navbar/ticker.png" alt="Ticker" title="Ticker"> Ticker</a>';
parent.insertBefore(ticker, parent.firstChild);