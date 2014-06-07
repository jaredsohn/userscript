// ==UserScript==
// @name          Facepunch Anti-Sellout
// @namespace     http://shankshock.com/
// @description   Removes that stupid "upgrades" link from Facepunch.
// @include       http://www.facepunch.com/*
// ==/UserScript==
	document.getElementById("navbarlinks").innerHTML = document.getElementById("navbarlinks").innerHTML.replace('<div class="navbarlink"><a href="fp_upgrade.php"><img src="http://cdn.fpcontent.net/fp/navbar/upgrades.png" alt="Account Upgrades" title="Account Upgrades"> Upgrades</a></div>',"");