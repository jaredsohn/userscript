// ==UserScript==
// @name           Slate Single Page View (fixed)
// @namespace      
// @description    Automatically redirects Slate.com article URLs to a single page version if available. Small bug fix to script by me4657.
// @include        http://www.slate.com/id/*
// ==/UserScript==

// Get the current window location
var curLoc = window.location.href;

// Get the html text
var bodyText = document.body.textContent;

// Regular expression pattern match for 7 digit article id
var articleId = /\d{7}/;


if ( (curLoc.indexOf("pagenum/all/") == -1) && (curLoc.indexOf("/entry/") == -1) ) { //Make sure it's not already singlepage

	if ( articleId.test(curLoc) ) { //Does it look like an article, with a standard id?

		if (bodyText.indexOf("SINGLE PAGE") != -1) { //Does it think could be repaginated?
		
			var newLoc = curLoc.substring(0, 31) + '/pagenum/all/'; //Assumes standard "http://www.slate.com/id/#######" format, which Slate seems to have kept constant throughout their redesigns ...
			window.location.replace(newLoc);
			
		}
	}
}