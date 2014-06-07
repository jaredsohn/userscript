// ==UserScript==
// @name        BSS Fark Derper
// @namespace   http://userscripts.org/users/2460
// @description Marking stupid links as DERP so you don't have to.
// @include     http://www.fark.com/*
// @include     https://www.fark.com/*
// @grant       none
// @updateURL   http://userscripts.org/scripts/source/155632.user.js
// @downloadURL http://userscripts.org/scripts/source/155632.user.js
// @version     7
// ==/UserScript==

// Concept from this post by Britney Spear's Speculum
// http://www.fark.com/comments/7516369/81663812#c81663812
// Implementation by MrEricSir

var derp = new Array(
    'http://img1.fark.net/images/2011/links/thedailycaller.png',
    'http://img1.fark.net/images/2006/links/boston.herald.png',
    'http://img1.fark.net/images/2007/links/breitbart.com.gif',
    'http://img1.fark.net/images/2012/links/rightwingnews.jpg',
    'http://img1.fark.net/images/2004/links/nro.gif',
    'http://img1.fark.net/images/2008/links/townhall.gif',
    'http://img1.fark.net/images/2008/links/worldnetdaily.gif',
    'http://img1.fark.net/images/2012/links/theamericanspectator.jpg',
    'http://img1.fark.net/images/2008/links/newsbusters.gif',
    'http://img1.fark.net/images/2013/links/washingtontimes.png',
    'http://img1.fark.net/images/2012/links/infowars.jpg',
    'http://img1.fark.net/images/2013/links/americanthinker.png',
    'http://img1.fark.net/images/2013/links/breitbartcom.png',
    'http://img1.fark.net/images/2013/links/reasonmagazine0.png',
    'http://img1.fark.net/images/2013/links/worldnetdaily.png'
);

var replacement = 'http://i566.photobucket.com/albums/ss102/anonymoususer119/DERPtag_zpsa6a80bbf.jpg';

// From: http://diveintogreasemonkey.org/patterns/match-attribute.html
var allImageTags = document.evaluate(
	'//img[@src]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Iterate through results.
for ( var i = 0; i < allImageTags.snapshotLength; i++ ) {
	imageTag = allImageTags.snapshotItem( i );
	// Compare to our array.
	var src = new String( imageTag.getAttribute("src") );
	for ( j in derp ) {
		if ( src == derp[j] ) {
			imageTag.src = replacement;
		}
	}
}