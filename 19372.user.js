// ==UserScript==
// @name           Google Bookmarks - Add links on top
// @namespace      http://googatrix.googlepages.com
// @description    Adds the "Show all" and "Add bookmark" links on top of the page (next to the Bookmarks header)
// @include        *google.*/bookmarks*
// ==/UserScript==

// get all bold tags on the page
var boldTags = document.getElementsByTagName( "b" );

// loop through the bold tags
for( var i = 0; i < boldTags.length; i++ )
{
	// check if the tag is the Bookmarks one
	if( boldTags[i].firstChild.nodeValue == "Bookmarks" )
	{
		// create a font tag to reduce the size of font
		var font1	= document.createElement( "font" );
		font1.size	= "-1";
		// create a span tag to add some whitespace
		var span1	= document.createElement( "span" );
		span1.innerHTML	= "&nbsp;&nbsp;&nbsp;";
		// create a link to show all
		var link1	= document.createElement( "a" );
		link1.href	= "http://www.google.com/bookmarks/lookup?q=";
		link1.innerHTML	= "Show all";
		// create a span tag to add some whitespace
		var span2	= document.createElement( "span" );
		span2.innerHTML	= "&nbsp;&nbsp;&nbsp;";
		// create a link to add bookmark
		var link2 	= document.createElement( "a" );
		link2.href	= "/bookmarks/mark?op=add";
		link2.innerHTML	= "Add bookmark";
		// insert new elements into page		
		font1.appendChild( span1 );
		font1.appendChild( link1 );
		font1.appendChild( span2 );
		font1.appendChild( link2 );
		boldTags[i].parentNode.parentNode.appendChild( font1 );
		break;
	}
}

