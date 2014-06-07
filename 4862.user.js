
// NEXT pic
// version 0.1 BETA!
// Copyright (c) 2006, Cezar Harabula
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Searches for a 'next' link. If found, this link is displayed (duplicated) 
// at the top of the page. This is helpful in photo galleries, when 
// these 'next' links do not always appear at the same position. With
// this script, you'll browse
// pics more easily. 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            NEXT pic
// @namespace       http://nopage.no
// @description     Adds a 'next' link at top (next page / next pic etc). Simplifies photo navigation, but not only.
// @include         *
// ==/UserScript==

var firstNextLink;
var nexts = document.getElementsByTagName('a');
for(var i=0; i<nexts.length; i++)
{
	if(nexts[i].innerHTML.toLowerCase().indexOf('next') >= 0)
	{
		firstNextLink = nexts[i];
		break;
	}
}

	
var next = document.createElement("div");
next.innerHTML = '<div align="right" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    '<a href=' +firstNextLink.href+ '>n e x t</a> ' +	
    '</p></div>';
    
//firstNextLink.text + '</a>'

document.body.insertBefore(next, document.body.firstChild);