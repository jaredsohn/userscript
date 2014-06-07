// ==UserScript==
// @name           MapMyRun
// @namespace      http://www.glenncarr.com/greasemonkey
// @include        http://*.mapmyfitness.com/*
// @include        http://*.mapmyrun.com/*
// @description    Removes some unnecessary elements from run maps
// $LastChangedRevision: 531 $
// $LastChangedDate: 2009-07-04 15:18:13 -0500 (Sat, 04 Jul 2009) $
// ==/UserScript==
(function(){

GM_addStyle( 'div#route_rating { position:absolute; right:0px; top:400px; border:outset 2px; }' );

var a = document.evaluate( "//a/img[contains(@alt, 'Add this Route to your Blog')]/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( a.snapshotLength > 0 )
{
	a = a.snapshotItem( 0 );
	a.parentNode.removeChild( a.previousSibling );
	a.parentNode.removeChild( a.previousSibling );
	a.parentNode.removeChild( a.previousSibling );
	a.parentNode.removeChild( a.previousSibling );
	a.parentNode.removeChild( a.previousSibling );
	a.parentNode.removeChild( a.previousSibling );
	a.parentNode.removeChild( a.nextSibling );
	a.parentNode.removeChild( a.nextSibling );
	a.parentNode.removeChild( a );
}
else
{
	var div = document.getElementById( 'map_engine_container' );
	if ( div != null )
	{
		div.parentNode.removeChild( div.previousSibling );
		div.parentNode.removeChild( div.previousSibling );
		div.parentNode.removeChild( div.previousSibling );
		div.parentNode.removeChild( div.previousSibling );
		div.parentNode.removeChild( div.previousSibling );
		div.parentNode.removeChild( div.previousSibling );
		div.parentNode.removeChild( div.previousSibling );
		div.parentNode.removeChild( div.previousSibling );
	}
}

var div = document.getElementById( 'header_banner' );
if ( div != null )
{
	div.parentNode.removeChild( div );
}

setInterval( function () {
		var ads = document.evaluate(
			"//div[contains(@class, 'map_media_banner_ad')]",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		//alert( ads.snapshotLength );
		if ( ads.snapshotLength > 0 )
		{
			for ( var i = 0; i < ads.snapshotLength; i++ )
			{
				var ad = ads.snapshotItem( i );
				ad.parentNode.removeChild( ad );
			}
		}
	}, 1000 );

})();