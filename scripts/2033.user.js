////////////////////////////////////////////////////////////////////////////
//
// Hypertext d20 Monster Images
// Jon Thompson
// 
// Shows monster images from the hypertext d20 inline on the monster page
//
// ==UserScript==
// @name            Hypertext d20 Monsters
// @description     Show monster images in the hypertext d20
// @include         http://www.d20srd.org/*
// ==/UserScript==

var l_aTables = null;
var l_aLinks = null;
var l_aLinks = null;
var l_oLink = null;
var l_sImage = null;
var l_oImageElement = null;
var i = 0;
var l_sImageAlign = "right";

l_aTables = document.getElementsByTagName("table");
for( i = 0; i < l_aTables.length; i += 1 ) 
{
	if( l_aTables[i].className == "statBlock right" )
	{
		l_sImageAlign = "left";
		break;
	} // if
} // for

l_aLinks = document.getElementsByTagName('a');
for( i = 0; i < l_aLinks.length; i += 1 ) 
{
    l_oLink = l_aLinks[i];
    if( !l_oLink.href.indexOf( "javascript:ShowImage(\'" ) )
    {
		l_sImage = l_oLink.href.substring( 22 );
		l_sImage = l_sImage.substring( 0, l_sImage.indexOf( "\'" ) );
		l_oImageElement = document.createElement( "img" );
		l_oImageElement.src = "http://www.wizards.com/dnd/images/" + l_sImage;
		l_oImageElement.align = l_sImageAlign;
		l_oLink.parentNode.parentNode.insertBefore( l_oImageElement, l_oLink.parentNode );
		l_oLink.parentNode.removeChild( l_oLink );
    } // if
    
} 