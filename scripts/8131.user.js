// Copyright (c) 2006, Vanson Samuel
// ==UserScript==
// @name           VersionTracker Redirect
// @namespace      http://binq.org/greasemonkey/
// @description    VersionTracker Redirect v2.0: VersionTracker pages that are opened in a new tab/window take you directly to the project's homepage.  It's very useful when looking through RSS feeds.
// @include        http://*.versiontracker.com/*/*
// @include        http://versiontracker.com/*/*
// ==/UserScript==

BINQ = {};

BINQ.linkJumper = {
	jumpToFirstValidLink: function() {
		var that=this; //For the private fuctions below.
		function findValidLink(links) {
			if (typeof that.isValidLink == "undefined") { return links.iterateNext(); }
			while (link = links.iterateNext()) {
				if (that.isValidLink(link)) { return link; }
			}
			return null;
		}
		function getRedirectUrl(link) {
			if (typeof that.parseUrlFromLink == "undefined") { return link.href; }
			return that.parseUrlFromLink(link);
		}

		var links = document.evaluate(this.searchPath, document, null, 0, null);
		var link = findValidLink(links);
		if (link) { window.location = getRedirectUrl(link); }
	}
}

BINQ.versiontrackerLinkJumper = {
	init: function() {
		this.jumpToFirstValidLink = BINQ.linkJumper.jumpToFirstValidLink;
		return this;
	},
	searchPath: "//a[@onmouseout='foo()']",
	parseUrlFromLink: function(link) {
		return new RegExp("return ws..(.*)..", "i").exec(link.getAttribute('onmouseover'))[1];
	}
}

if (history.length == 1) { BINQ.versiontrackerLinkJumper.init().jumpToFirstValidLink(); }