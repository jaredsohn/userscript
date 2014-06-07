// ==UserScript==
// @name          SVEJO redirect
// @namespace     Toma Velev
// @description	  Toma Velev -> SVEJO redirect script
// @include       http://svejo.net/*
// @match 		  http://svejo.net/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)


var story = document.getElementById("svejo-story");

if(story != null) {

	//TODO add null checks
	window.location=story.childNodes[1].childNodes[1].childNodes[1].href;
}