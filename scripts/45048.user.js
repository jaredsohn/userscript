// ==UserScript==
// @name           Stack Overflow: Hide unusable controls
// @namespace      http://gecko.535design.com/grease/
// @description    Hides voting controls for your own posts or if your reputation is too low.
// @include        http://stackoverflow.com/*
// ==/UserScript==

var cssHideDown  = "img.vote-down { display: none; }";
var cssHideUp    = "img.vote-up   { display: none; }";

var xpPosts      = "//td[contains(concat(' ',@class,' '),' post-signature ') and position()=last()]//div[contains(concat(' ',@class,' '),' user-details ')]/a[1]/@href";
var xpReputation = "//div[@id='hlinks']/span[contains(concat(' ',@class,' '),' reputation-score ')]";
var xpUser       = "//div[@id='hlinks']/a[2]/@href";
var xpVotes      = "ancestor::div[@id='question' or contains(concat(' ',@class,' '),' answer ')]//img[contains(concat(' ',@class,' '),' vote-up ') or contains(concat(' ',@class,' '),' vote-down ')]";

var xptString    = XPathResult.STRING_TYPE;
var xptUnordered = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function xpath(expr, context, type) {
	return document.evaluate(expr, context, null, type, null);
}

var rep = parseInt(xpath(xpReputation, document, xptString).stringValue.replace(/\D/, ""), 10);

if (rep < 100) {
	if (rep < 15) {
		GM_addStyle(cssHideUp);
	}

	GM_addStyle(cssHideDown);
}

var user  = xpath(xpUser,  document, xptString).stringValue;
var posts = xpath(xpPosts, document, xptUnordered);

for (var i = 0; i < posts.snapshotLength; i++) {
	var post = posts.snapshotItem(i);

	if (post.nodeValue == user) {
		var votes = xpath(xpVotes, post, xptUnordered);

		for (var j = 0; j < votes.snapshotLength; j++) {
			votes.snapshotItem(j).style.display = "none";
		}
	}
}