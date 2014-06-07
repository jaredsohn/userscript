// ==UserScript==
// @name		Nu.nl Cookie header
// @namespace		http://www.noobtutorials.nl
// @description		Speciaal voor alle 2e kamer leden: Dit script haalt de je-halve-scherm-in-beslag-nemende cookie pop-up weg.
// @include		http://*.nu.nl/*
// @include		http://*.goeievraag.nl/*
// @include		http://*.bestelkado.nl/*
// @grant		none
// ==/UserScript==
function removeCookiePopup() {
	jQuery("body").removeClass("consent-bar-push-large")
	jQuery("#sanoma-consent-bar").remove();
}
removeCookiePopup();

setInterval(removeCookiePopup, 500);
