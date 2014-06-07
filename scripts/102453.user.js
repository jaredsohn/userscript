// ==UserScript==
// @name           FG DJ Radio Remove Ads
// @namespace      swergas
// @description    Removes the annoying ad which blocks navigation on the site.
// @include        http://*.radiofg.com/*
// ==/UserScript==

function removeAds (){
	document.getElementById('beead_page').style.display = "none";
	document.getElementById('beead_cadre').style.display = "none";
}

removeAds ();
