// ==UserScript==
// @name			Remove Wikipedia Anti-SOPA message
// @version			1.0
// @author			Hemant Pawar
// @namespace		http://www.hemantpawar.com
// @description		This script removes the Anti-SOPA message from Wikipedia to display original articles.
// @include			*wikipedia.org*
// ==/UserScript==

function removeWikiSopa()
{
	document.getElementById("mw-page-base").style.display = "block";
	document.getElementById("mw-head-base").style.display = "block";
	document.getElementById("content").style.display = "block";
	document.getElementById("mw-head").style.display = "block";
	document.getElementById("mw-panel").style.display = "block";
	document.getElementById("footer").style.display = "block";

	document.getElementById("mw-sopaOverlay").style.display = "none";
}

//window.addEventListener("load", removeWikiSopa(), true); 

window.onload=removeWikiSopa ;