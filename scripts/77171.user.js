// ==UserScript==
// @name           Yahoo Fantasy Set Browser Title
// @namespace      http://glenncarr.com/greasemonkey
// @include        http://*.fantasysports.yahoo.com/*
// @description    Change browser title to describe page content
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 568 $
// $LastChangedDate: 2010-05-20 08:25:33 -0500 (Thu, 20 May 2010) $
// ==/UserScript==

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

try {

var el = document.evaluate("//div[@id='yspteammh']/span/strong", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( el.snapshotLength == 0 )
	return;
	
var leagueName = el.snapshotItem( 0 ).innerHTML.replace( /\s*\(ID#[^)]+\)/i, '' );

var yahooTitle = document.title.replace( /Yahoo! Sports\s*([^-]+).*/, 'Y! $1' );
var h1 = document.getElementsByTagName( 'h1' );
var pageTitle = ( h1.length > 0 ) ? h1[ 0 ].innerHTML.stripTags() : '';
if ( pageTitle == '' )
	{
	var h4 = document.getElementById( 'yspmain' ).getElementsByTagName( 'h4' );
	if ( h4.length > 0 )
		pageTitle = h4[ 0 ].innerHTML.stripTags();
	}
if ( /matchup/i.test( location.href ) )
	pageTitle = 'Matchup ' + pageTitle;
	
var titleParts = new Array();
GM_log( pageTitle + ',' + leagueName );
if ( pageTitle != '' && pageTitle != leagueName )
	titleParts.push( pageTitle );
titleParts.push( leagueName );
titleParts.push( yahooTitle );

document.title = titleParts.join( ' - ' );

} catch ( e ) { alert( e ); }