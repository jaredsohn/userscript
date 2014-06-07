// ==UserScript==
// @name           eHarmony Profile Actions
// @namespace      http://userscripts.org/scripts/show/9005
// @description    Adds Hold and Close action links to the top of the About Me section
// @include        http://www.eharmony.com/singles/servlet/user/comm*
// ==/UserScript==
//
// Copyright (c) 2007, Matthew Botos (http://matthew.botos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//0
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

var navBars = document.evaluate(
    "//table[@class='contentNavBar']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var contentHeaders = document.evaluate(
	    "//table[@class='contentHeaderBlue']",
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	
if (navBars.snapshotLength > 0 && contentHeaders.snapshotLength > 0) {
	var contentHeader = contentHeaders.snapshotItem(0);
	var navBar = navBars.snapshotItem(navBars.snapshotLength-1);
  var actions = document.createElement("table");
	actions.className = navBar.className;
	actions.width = navBar.width;
	actions.innerHTML = navBar.innerHTML;
	actions.style.margin = "3px";
	contentHeader.parentNode.insertBefore(actions, contentHeader.nextSibling);
}

// if there's a top one already, hide it
if (navBars.snapshotLength > 1) {
	navBars.snapshotItem(0).style.display = 'none';
}