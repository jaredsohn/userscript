// ==UserScript==
// @name        Clear War Statement from Workflowy
// @namespace   http://userscripts.org/users/mcassano
// @description At the bottom of Workflowy is an anti-war statement.  This script removes it.
// @include     http://workflowy.com/*
// @version     1
// ==/UserScript==

window.addEventListener ("load", myMain, false);

function myMain () {
	var siteSlogans = document.getElementsByTagName("h3");
	for (idx=0; idx<siteSlogans.length;idx++) {
		siteSlogan = siteSlogans[idx];
		if (siteSlogan.innerHTML.indexOf("War") != -1) {
			siteSlogan.style.display = "none";
		}
	}
}

