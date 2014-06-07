// ==UserScript==
// @name           VARGuy Articles Only
// @namespace      http://googatrix.googlepages.com
// @description    Removes clutter from thevarguy.com
// @include        http://www.thevarguy.com/*
// ==/UserScript==

function removeElementById( sId )
{
	if( document.getElementById( sId ) != null )
	{
		var banner = document.getElementById( sId );
		banner.parentNode.removeChild( banner );
	}
}

// reference to body
var nodeCont = document.getElementById( "content" );
// reference to content
var nodeBody = document.getElementsByTagName( "BODY" )[0];
// remove everything on the page
while( nodeBody.firstChild ){ nodeBody.removeChild( nodeBody.firstChild ); }
// add just the content node
nodeBody.appendChild( nodeCont );

// now remove unwanted stuff inside content
removeElementById( "footerlinks" );
removeElementById( "footer" );

// background color (make articles more readable)
document.getElementById( "maincontent" ).style.backgroundColor = "#dadada";
