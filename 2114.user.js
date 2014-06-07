////////////////////////////////////////////////////////////////////////////
//
// Hypertext d20 Monster Images
// Jon Thompson
// 
// Shows monster images from the hypertext d20 inline on the monster page
//
// ==UserScript==
// @name            Remove Order of the Stick Banners
// @description     Removes banners from order of the stick website
// @include         http://www.giantitp.com/*
// ==/UserScript==


var l_oElement = null;
var l_aElements = document.getElementsByTagName('img');
for( i = 0; i < l_aElements.length; i += 1 )
{
	l_oElement = l_aElements[i];
	if( l_oElement.src.indexOf( "Images/Banners" ) != -1 )
	{
		l_oElement.parentNode.removeChild( l_oElement );
	} // if
} // for