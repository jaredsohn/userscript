// ==UserScript==
// @name          BEEPUNCH
// @namespace     http://facepunch.com
// @description   BEES
// @version       1.1
// @include       http://facepunch.com/*
// ==/UserScript==

if (document.getElementById('header')) {

	document.getElementById('logo').innerHTML = '<a href="index.php"><img src="http://vintagecowa.com/fp/bee.png" alt="BEES" width="244" height="110" /></a>';
}