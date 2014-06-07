// eBay listing unhighlight user script
// version 0.0.2
// 2007-03-17
// Copyright (c) 2007, Daniel Muenter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name			eBay unhighlighter
// @include			http://*search*ebay.*/*
// @include			http://*listings.ebay.*/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------

// this is for european ebay pages
var rows = document.evaluate("//tr[ @class ]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < rows.snapshotLength; i++) {
    var row = rows.snapshotItem(i);
	if(i % 2 == 0) {
		row.className = "single";
	} else {
		row.className = "ebHlOdd single";
	}
}

// this is for ebay.com pages
var tables = document.evaluate("//table[ @class = 'list hl bd' ]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < tables.snapshotLength; i++) {
	var table = tables.snapshotItem(i);
	table.className = "list";
}