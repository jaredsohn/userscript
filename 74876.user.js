// ==UserScript==
// @name           Forget Google Clicktracker
// @namespace      download
// @description    Gets rid of the google click tracker. That's it. Direct links to search results.
// @include        http://*.google.com/search?*
// @include        http://www.google.com/*
// @include        http://www.google.*
// @include        http://google.com/*
// @include        http://google.*
// ==/UserScript==

urlMatch = new RegExp("url\\?q=(http://.*)");

function find_links() 
{
    var links=document.getElementsByTagName('a');
    for(var i in links) {
	var link=links[i];
	var match=link.getAttribute("href");
	if(match) {		
	    match = urlMatch.exec(match);
	    if(match) {
		link.setAttribute("href", decodeURI(match[1]));
	    }
	}
    }
}

find_links();