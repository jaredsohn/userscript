// Copyright (c) 2006, Vanson Samuel
// ==UserScript==
// @name           Slashdot Redirect
// @namespace      http://binq.org/greasemonkey/
// @description    Slashdot Redirect v2.0: Slashdot articles that are opened in a new tab/window take you directly to the referred article.  It's very useful when looking through RSS feeds.
// @include        http://*.slashdot.org/article*
// @include        http://slashdot.org/article*
// @include        http://*.slashdot.org/*/*
// @include        http://slashdot.org/*/*
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

BINQ.slashdotLinkJumper = {
	init: function() {
		this.jumpToFirstValidLink = BINQ.linkJumper.jumpToFirstValidLink;
		return this;
	},
	isValidLink: function(link) {
		sLD = BINQ.urlParser.secondLevelDomain;

		is_valid = true;
		is_valid = is_valid && (sLD.call(window.location) != sLD.call(link));
		is_valid = is_valid && (link.getAttribute('rel') != 'nofollow')
		
		return is_valid;
	},
	searchPath: "//div[@class='intro']//a"
}

if (history.length == 1) { BINQ.slashdotLinkJumper.init().jumpToFirstValidLink(); }