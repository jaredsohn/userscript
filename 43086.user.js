// ==UserScript==
// @name           OSNews Articles Only
// @namespace      http://googatrix.googlepages.com
// @description    Removes clutter from OSNews.com
// @include        http://www.osnews.com/*
// @include        http://osnews.com/*
// ==/UserScript==

function removeElementById( sId )
{
	if( document.getElementById( sId ) != null )
	{
		var banner = document.getElementById( sId );
		banner.parentNode.removeChild( banner );
	}
}

// remove background
document.body.style.backgroundImage = "none";

// top banner
removeElementById( "header" );
// side panel
removeElementById( "side" );
// footer
removeElementById( "footer" );

