// Copyright (c) 2006, Vanson Samuel
// ==UserScript==
// @name           Ruby Inside Redirect
// @namespace      http://binq.org/greasemonkey/
// @description    Ruby Inside Redirect v2.0: Ruby Inside articles that are opened in a new tab/window take you directly to the referred article.  It's very useful when looking through RSS feeds.
// @include        http://*.rubyinside.com/*
// @include        http://rubyinside.com/*
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

BINQ.urlParser = {
	secondLevelDomain: function() {
		results = /[^\.]+\.[^\.]+$/.exec(this.host); 
		return (results) ? results[0] : null;
	}
}

BINQ.rubyinsideLinkJumper = {
	init: function() {
		this.jumpToFirstValidLink = BINQ.linkJumper.jumpToFirstValidLink;
		return this;
	},
	searchPath: "//div[@class='entrytext']//a",
	isValidLink: function(link) {
		sLD = BINQ.urlParser.secondLevelDomain;
		return (sLD.call(window.location) != sLD.call(link));
	}
}

if (history.length == 1) { BINQ.rubyinsideLinkJumper.init().jumpToFirstValidLink(); }