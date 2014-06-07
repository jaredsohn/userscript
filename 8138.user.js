// Copyright (c) 2006, Vanson Samuel
// ==UserScript==
// @name           MacUpdate Redirect
// @namespace      http://binq.org/greasemonkey/
// @description    MacUpdate Redirect v2.0: MacUpdate pages that are opened in a new tab/window take you directly to the project's homepage.  It's very useful when looking through RSS feeds.
// @include        http://*.macupdate.com/*/*
// @include        http://macupdate.com/*/*
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

BINQ.macupdateLinkJumper = {
	init: function() {
		this.jumpToFirstValidLink = BINQ.linkJumper.jumpToFirstValidLink;
		return this;
	},
	searchPath: "//td[@id='descr_content_right']//table//a",
}

if (history.length == 1) { BINQ.macupdateLinkJumper.init().jumpToFirstValidLink(); }