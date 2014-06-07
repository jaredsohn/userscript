// ==UserScript==
// @name           Gaia Online - Playtex Scavenger
// @namespace      Gaia Online - Playtex Scavenger
// @description    Checks the page for Playtex stickers so that you will ever miss one if ever.
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=91799&show
// ==/UserScript==

var src = document.documentElement.innerHTML;
if (src.search("sponsorship/playtex/PlaytexSport_Logo.png") == -1) {
	if (src.search("Playtex_ScavengerHunt_Art") != -1) {
		alert("Hold on! There's a Playtex sticker in this page!");
	}
}