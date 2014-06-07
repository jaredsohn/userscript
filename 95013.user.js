// ==UserScript==
// @name           Run a FitNesse test with Remote Debug
// @description    Add a link to the left side menu to start a test with remote debugging turned on
// @author         Dan Dudley
// @include        http://*FitNesse*
// @version        1.1
// ==/UserScript==

function findTestLink() {
	var links = document.getElementsByTagName("a");
	for (var i=0;i<links.length;i++) {
		if (links[i].innerHTML == "Test") return links[i];
	}
	return null;
}

var testLink = findTestLink();

if (testLink != null) {
	var remoteDebugLink = document.createElement('a');
	remoteDebugLink.innerHTML = "Debug Test";
	remoteDebugLink.href = "?responder=test&remote_debug=true";

	// add the debug link after the "Test" link
	testLink.parentNode.insertBefore(remoteDebugLink, testLink);
	testLink.parentNode.insertBefore(testLink, remoteDebugLink);

	// add the spacer div
	var spacer = document.createElement("div");
	spacer.className = "nav_break";
	spacer.innerHTML = "&nbsp;";
	testLink.parentNode.insertBefore(spacer, remoteDebugLink);	
}