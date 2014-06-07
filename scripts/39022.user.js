// ==UserScript==
// @name           PubProxy: UMich
// @namespace      edu.umich
// @description    Generates links to publications through the UMich Library proxy service
// @include        http://scholar.google.com/*
// ==/UserScript==
//
// Version 0.1.1
//

function gm_xpath( expression, contextNode )
{
	return document.evaluate( expression, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}

function createProxyAnchor( url )
{
	var anchor = document.createElement( "a" )
	
	anchor.setAttribute( "href", url )
	anchor.setAttribute( "target", "_blank" )
	anchor.setAttribute( "title", "Retrieve via UMich Proxy" )
	
	var icon = document.createElement( "img" )
	
	icon.setAttribute( "border", 0 )
	icon.setAttribute( "align", "absmiddle" )
	icon.setAttribute( "src", "http://www.lib.umich.edu/favicon.ico" )
	
	anchor.appendChild( icon )
	
	return anchor
}


function insertAnchors()
{
	var links = gm_xpath( "//h3[@class=\"r\"]/a", document )
	
	for ( var i = 0; i < links.snapshotLength; i++ )
	{
		var link = links.snapshotItem( i )
		
		var url = link.getAttribute( 'href' )
		var prefix = url.match( 'https?://[\\w.]*' )[ 0 ]
		var suffix = url.substr( prefix.length, url.length )
		
		link.parentNode.appendChild( document.createTextNode( " - " ) )
		link.parentNode.appendChild( createProxyAnchor( prefix + ".proxy.lib.umich.edu" + suffix ) )
	}
}

window.addEventListener( "load", insertAnchors, false );
