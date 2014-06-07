// ==UserScript==
// @name           phpBB Strip Outer HTML
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @description    Strips outer HTML from phpBB board
// @include        http://www.fantasybaseballcafe.com/forums/*
// $LastChangedRevision: 108 $
// $LastChangedDate: 2007-06-03 22:54:33 -0500 (Sun, 03 Jun 2007) $
// ==/UserScript==
/*
   This should work for any phpBB board, you just need to add the forum URL to the included pages.
*/
(function() {

var bodylines = document.evaluate( '//td[@class="bodyline"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if ( bodylines.snapshotLength == 0 )
	return;

document.body.innerHTML = bodylines.snapshotItem( 0 ).innerHTML;
document.body.setAttribute( "background", "" );
document.body.setAttribute( "style", "margin-left: 15%; margin-right: 15%; background: #eee" );

})();
