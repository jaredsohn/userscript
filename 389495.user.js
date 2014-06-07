// ==UserScript==
// @name       Instructables Single Page View
// @namespace  http://userscripts.org/users/531503
// @version    0.1
// @description  Automatically redirect to the ALL Steps page on Instructables, if not already there.
// @match      http://*instructables.com/*
// @include    http://*instructables.com/*
// ==/UserScript==
//Based upon New York Times Single Page View by Fat Knowledge - http://userscripts.org/scripts/show/15601

// Get the current window location
var curLoc = window.location.href;
// Get the html text
//var bodyText = document.body.textContent;
//Not needed for this application

// ------------------------------------------------------------------------
// Redirect to single page view if option inot already selected
// ------------------------------------------------------------------------
if (curLoc.indexOf("id") != -1 && curLoc.indexOf("ALLSTEPS") == -1) {
//	GM_log('\nsingle page found\n ' + curLoc);
	if (curLoc.indexOf("?")!=-1){
		var newLoc = curLoc+'&ALLSTEPS';
	} else {
		var newLoc = curLoc+'?ALLSTEPS';
	}
	window.location.replace(newLoc);
} else {
//	GM_log('\nsingle page not found\n '+curLoc);

}