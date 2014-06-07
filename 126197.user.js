// ==UserScript==
// @name           StartPage.com - Number Results
// @namespace      tag:r-a-y@gmx.com,2012:monkey
// @description    Number search results on StartPage.com and other Ixquick sites - StartingPage.com and Ixquick.com
// @include        http://*startpage.com/*
// @include        https://*startpage.com/*
// @include        http://*startingpage.com/*
// @include        https://*startingpage.com/*
// @include        http://*ixquick.com/*
// @include        https://*ixquick.com/*
// @author         r-a-y
// @version        1.0
// @license        GPL v3
// ==/UserScript==

var results  = document.evaluate( "// a[contains(@id,'title_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for ( i = 0; i < results.snapshotLength; i++ ) {
	sp_add_num( results.snapshotItem(i).id.substr( 6, results.snapshotItem(i).id.length ), results.snapshotItem(i) );
}

function sp_add_num( id, item ) {
	newSpan    = document.createElement( "span" );
	newSpan.setAttribute( "style", "font-weight:bold; font-size:13px; display:inline-block; margin-right:5px;" );

	newContent = document.createTextNode( id + ". ");
	newSpan.appendChild( newContent )

	item.parentNode.insertBefore( newSpan, item );
}