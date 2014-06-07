// ==UserScript==
// @name        KG - direct forum/tracker links to separate windows/tabs
// @namespace   KG
// @include     http*://*karagarga.net/*
// @grant	none
// @version     0.4
// ==/UserScript==

if (!window.frameElement) {
	var h = window.location.href +"";
	var forum = "//forum.karagarga.net/";
	var tracker = "//karagarga.net/";
	var tracker2 = "//www.karagarga.net/";
	var offSite = "karagarga.net/";
	var code = "var win = window.open(this.href, this.target); win.focus(); return false;";

	
	if ( h.indexOf(forum) != -1 ) {
		setTargets(tracker, 'kgtracker');
		setTargets(tracker2, 'kgtracker');
	}
	
	if ( h.indexOf(tracker) != -1 || h.indexOf(tracker2) != -1 ) {
		setTargets(forum, 'kgforum');
	}
}


function setTargets(match, target) {
	var links = document.links;
	for ( i=0; i < links.length; i++ ) {
		var link = links[i];
		if ( link.href.indexOf(match) != -1 ) {
			link.target = target;
			link.setAttribute("onclick", code);
		} else if ( link.href.indexOf(offSite) == -1 ) {
			link.target = "_blank";
		}		
	}
}
