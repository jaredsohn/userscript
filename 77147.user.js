// ==UserScript==
// @name           Yahoo Fantasy Styles and Miscellaneous Fixes
// @namespace      http://glenncarr.com/greasemonkey
// @include        http://*.fantasysports.yahoo.com/*
// @include        http://sports.yahoo.com/mlb/players/*
// $LastChangedRevision: 576 $
// $LastChangedDate: 2010-08-25 14:31:01 -0500 (Wed, 25 Aug 2010) $
// ==/UserScript==
/*
Updates
	01-Jul-2010 - Fix due to Yahoo change
	25-Aug-2010 - Fix bug in Yahoo's HTML which causes career totals to not align correctly
*/

GM_addStyle( '.teamtable td { font-family: Verdana; } .teamtable td { padding:3px 2px; }' );

var brokenCell = document.evaluate( '//td[@class="yspscores"][@colspan="2"][contains(.,"Career")]/a[contains(.,"Full")]/..', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if ( brokenCell.snapshotLength == 1 )
	brokenCell.snapshotItem( 0 ).setAttribute( "colspan", "1" );
