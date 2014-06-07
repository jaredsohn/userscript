// ==UserScript==
// @name            LION IMDB
// @description     Search LION from IMDB "name" page
// @include         http://www.imdb.com/name/*
// ==/UserScript==
// Modified version of http://userscripts.org/scripts/show/7634 for Columbus GA library.
	
var allLinks, thisLink, newElement, libSearchURL;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if ( thisLink . href . substr ( 0, 26 ) == "http://www.imdb.com/title/" ) {
        newElement = document . createElement ( 'span' );
        libSearchURL = "http://catalog.lioninc.org/search/t" + escape ( thisLink . text );
        newElement . innerHTML = '&nbsp;&nbsp;&nbsp;<a href="' + libSearchURL + '" target="_blank">LION</a>';
        thisLink . parentNode . insertBefore ( newElement, thisLink . nextSibling );        
        //break;
    }
}

