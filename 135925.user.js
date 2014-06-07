// ==UserScript==
// @name          New York Times Single Page View
// @namespace     http://fatknowledge.blogspot.com
// @description   Automatically redirect to single page version if available
// @include       http://*nytimes.com/*
// ==/UserScript==



// Get the current window location
var curLoc = window.location.href;
// Get the html text
var htmlText = document.documentElement.innerHTML;


// ------------------------------------------------------------------------
// Redirect to single page view if option is available
// ------------------------------------------------------------------------
if ((htmlText.indexOf("singlepage") != -1) && (curLoc.indexOf('pagewanted=all') == -1)) {
//	GM_log('\nsingle page found\n ' + curLoc);
	if (curLoc.indexOf("?")!=-1){
		var newLoc = curLoc+'&pagewanted=all';
	} else {
		var newLoc = curLoc+'?pagewanted=all';
	}
	window.location.replace(newLoc);
} else {
//	GM_log('\nsingle page not found\n '+curLoc);

}
