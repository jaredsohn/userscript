// ==UserScript==
// @name           Remove Free Article Restriction
// @namespace      http://userscripts.org/users/haroldoop
// @description    Removes the "You now viewed your 3 free articles" message from NewScientist
// @include        http://*.newscientist.com/*
// ==/UserScript==

function removeArticleRestriction() {
	var ovr = document.getElementById("haasOverlay");
	var fadeBackground = document.getElementById("fadeBackground");
	if (!ovr || !fadeBackground) {
		window.setTimeout(removeArticleRestriction, 1000);
		return;
	}
	ovr.style.display = "none";
	fadeBackground.style.display = "none";
}
removeArticleRestriction();