// Copyright (c) 2006, Vanson Samuel
// ==UserScript==
// @name           DesignByGrid Redirect
// @namespace      http://binq.org/greasemonkey/
// @description    DesignByGrid Redirect v2.0: CSS Beauty pages that are opened in a new tab/window take you directly to the dugg article.  It's very useful when looking through RSS feeds.
// @include        http://*.designbygrid.com/*/*
// @include        http://designbygrid.com/*/*
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

BINQ.designbygridLinkJumper = {
	init: function() {
		this.jumpToFirstValidLink = BINQ.linkJumper.jumpToFirstValidLink;
		return this;
	},
	searchPath: "//div[@class='gallery-latest']//a[1]",
}

if (history.length == 1) { BINQ.designbygridLinkJumper.init().jumpToFirstValidLink(); }