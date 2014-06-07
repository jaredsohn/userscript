// ==UserScript==
// @name           search.rogers.com google redirection
// @namespace      http://userscripts.org/users/60112
// @description    Redirects Rogers automatic search results page to a google search
// @include        *
// ==/UserScript==

if( window.location.href.indexOf( "search.rogers.com" ) != -1 )
{
	var curr = window.location.href;
	var needle = "search?qo";
	var qry = curr.substring( window.location.href.indexOf( needle ) + needle.length + 1, window.location.href.indexOf( "&" ) );
	var url = "http://www.google.ca/search?hl=en&q="+qry+"&btnG=Google+Search&meta=";
	window.location.href = url;
}