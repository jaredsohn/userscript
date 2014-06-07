// ==UserScript==
// @name           Google Bookmarks - Remove Search the Web
// @namespace      http://googatrix.googlepages.com
// @description    Removes the Search the Web button from Google Bookmarks page
// @include        *google.*/bookmarks*
// ==/UserScript==

if( document.forms[0].name = "smhf" && document.forms[0].getElementsByTagName("input")[7].name == "btnWeb" )
{
	var button = document.forms[0].getElementsByTagName("input")[7];
	button.parentNode.removeChild( button );
}

