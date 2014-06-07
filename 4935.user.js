// Copyright (c) 2006, Vanson Samuel
// ==UserScript==
// @name           Lifehacker Redirect
// @namespace      http://binq.org/greasemonkey/
// @description    Lifehacker Redirect v2.0: Lifehacker articles that are opened in a new tab/window take you directly to the referred article.  It's very useful when looking through RSS feeds.
// @include        http://*.lifehacker.com/*/*
// @include        http://lifehacker.com/*/*
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

BINQ.lifehackerLinkJumper = {
	init: function() {
		this.jumpToFirstValidLink = BINQ.linkJumper.jumpToFirstValidLink;
		return this;
	},
	searchPath: "//div[@class='related']/a[1]",
}

if (history.length == 1) { BINQ.lifehackerLinkJumper.init().jumpToFirstValidLink(); }