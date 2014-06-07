// ==UserScript==
// @name           Gaia Online - Toy Story 3 The Video Game Alerter
// @namespace      Gaia Online - Toy Story 3 The Video Game Alerter
// @description    This is will alert you if there is a Toy Story 3 The Video Game collectible on the current page you are viewing.
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=79841&show
// ==/UserScript==

var src = document.documentElement.innerHTML;
if (src.search("scavengerhunt") != -1) {
	if (src.search("Toys have been hidden around Gaia's landing pages") == -1) {
		// Buzz Toy
		if (src.search("Buzz_75x75.png") != -1) {
			alert('Heads up! There is a Toy Story 3 toy "Buzz" to collect on this page!');
		}
		// Woody Toy
		if (src.search("Woody_75x75.png") != -1) {
			alert('Heads up! There is a Toy Story 3 toy "Woody" to collect on this page!');
		}
		// Hamm Toy
		if (src.search("Hamm_75x75.png") != -1) {
			alert('Heads up! There is a Toy Story 3 toy "Hamm" to collect on this page!');
		}
	}
}