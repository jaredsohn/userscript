// Copyright (c) 2006, Vanson Samuel
// ==UserScript==
// @name           Fark Redirect
// @namespace      http://binq.org/greasemonkey/
// @description    Fark Redirect v2.0: Fark pages that are opened in a new tab/window take you directly to the article.  It's very useful when looking through RSS feeds.
// @include        http://forums.fark.com/*
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

BINQ.farkLinkJumper = {
	init: function() {
		this.jumpToFirstValidLink = BINQ.linkJumper.jumpToFirstValidLink;
		return this;
	},
	searchPath: "//tr[@class='headlineRow']//a[@rel='nofollow']",
}

if (history.length == 1) { BINQ.farkLinkJumper.init().jumpToFirstValidLink(); }