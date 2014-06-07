// ==UserScript==
// @name	Pornolizer Media Browser
// @description	An improved gallery browzer for Pornolizer after the style of Webgoggles.
// @include	http://pornolizer.org/gallery.php?key=*
// ==/UserScript==

// $Id: pornolizer.user.js,v 1.2 2005/05/30 09:59:32 curious Exp $ 

( function() {

function nsResolve( pref )
{
	if( pref == "html" ) return( "http://www.w3.org/1999/xhtml" );
}

window.addEventListener( "load", function( e )
{
	var dataURI = "data:text/html,<html><head><base href='http://pornolizer.org/'/></head><body><table>"; 
	var fluxURI = escape( "data:text/plain,clear%0A" );

	var thumbNails = document.evaluate( "//html:td[@class='galcell']/html:a", document.body, nsResolve, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	for( var i = 0; i < thumbNails.snapshotLength; i++ )
	{
		var theLink = thumbNails.snapshotItem( i );
		theLink.target = "contentFrame";
		dataURI = dataURI + "<tr><td>" + theLink.parentNode.innerHTML + "</td></tr>";
		fluxURI = fluxURI + escape( "add%20" + theLink.getAttribute( "href" ) + "%0A" );
	}
	dataURI = dataURI + "</table>";
	fluxURI = fluxURI + escape( "get%0A" );
	dataURI = dataURI + "<p><a target='_blank' href='" + fluxURI + "'>.flux</a></p></body></html>";

	var nFrameSet = document.createElement( "frameset" );
	nFrameSet.cols = "170,*";
	
	var leftFrame = document.createElement( "frame" );
	leftFrame.src = dataURI;
	var rightFrame = document.createElement( "frame" );
	rightFrame.name = "contentFrame";
	rightFrame.src = thumbNails.snapshotItem( 0 ).getAttribute( "href" );

	nFrameSet.appendChild( leftFrame );
	nFrameSet.appendChild( rightFrame );

	var oldTable = document.evaluate( "//html:table[ @cellpadding = '5' and @cellspacing = '5' ]", document.body, nsResolve, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem( 0 );
	oldTable.parentNode.replaceChild( nFrameSet, oldTable ); 
}, false );
} )();

