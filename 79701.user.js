// ==UserScript==
// @name           Gaia Online - Sims 3 Ambitions Alerter
// @namespace      Gaia Online - Sims 3 Ambitions Alerter
// @description    This is will alert you if there is a Sims 3 Ambitions collectible on the current page you are viewing.
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=79701&show
// ==/UserScript==

var src = document.documentElement.innerHTML;
if (src.search("scavengerhunt") != -1) {
	if (src.search("You found a Sims 3 Ambitions item!") == -1) {
		// Inventor Tool
		if (src.search("sims3_inventortool.png") != -1) {
			alert('Heads up! There is a Sims 3 Ambitions "Inventor Tool" to collect on this page!');
		}
		// Detective Hat
		if (src.search("sims3_detectivehat.png") != -1) {
			alert('Heads up! There is a Sims 3 Ambitions "Detective Hat" to collect on this page!');
		}
		// Axe
		if (src.search("sims3_axe.png") != -1) {
			alert('Heads up! There is a Sims 3 Ambitions "Axe" to collect on this page!');
		}
		// Ghost Machine
		if (src.search("sims3_ghostmachine.png") != -1) {
			alert('Heads up! There is a Sims 3 Ambitions "Ghost Machine" to collect on this page!');
		}
		// Lab Coat
		if (src.search("sims3_labcoat.png") != -1) {
			alert('Heads up! There is a Sims 3 Ambitions "Lab Coat" to collect on this page!');
		}
		// Tattoo Gun
		if (src.search("sims3_tattoogun.png") != -1) {
			alert('Heads up! There is a Sims 3 Ambitions "Tattoo Gun" to collect on this page!');
		}
	}
}