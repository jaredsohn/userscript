// ==UserScript==
// @name           kruf for btloft
// @namespace      kruf_btloft
// @include        http://www.btloft.com/search/*
// @include        www.btloft.com/search/*
// @include        btloft.com/search/*
// @include        http://btloft.com/search/*
// ==/UserScript==
var furkUrlMatches = document.evaluate('//a[div[@class="ftorrv"]] | //a[div[@class="ftorra"]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=furkUrlMatches.snapshotLength-1; i>=0; i--) {
	furkUrlMatches.snapshotItem(i).href = furkUrlMatches.snapshotItem(i).href.replace(/^(.*)\/l\/dd\/(.+\.html).*$/, "$1/$2");
}