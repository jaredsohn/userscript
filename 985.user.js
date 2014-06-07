// ==UserScript==
// @name          Wired News Printer Friendly Redirect
// @description	  Redirect any wired page to their printer friendly correspondent if it exists.
// @namespace     http://www.mamata.com.br/greasemonkey
// @include       http://wired.com/*
// @include       http://www.wired.com/*

//by Fabricio Zuardi (http://www.hideout.com.br)
// ==/UserScript==

(function() {
	
	var toolsDiv = document.getElementById("storyTools");
	var redirectPage = toolsDiv.getElementsByTagName("a")[0].href
	if( redirectPage ) document.location = redirectPage
	
})();