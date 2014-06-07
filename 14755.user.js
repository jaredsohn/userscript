// ==UserScript==
// @name            CVRLSSearch
// @description     Search CVRLS from IMDB "name" page
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
        libSearchURL = "http://chattahoochee.polarislibrary.com/polaris/search/searchresults.aspx?ctx=1.1033.0.0.4&type=Keyword&term=" + escape ( thisLink . text ) + "&by=KW&sort=RELEVANCE&limit=TOM=*&query=&page=0";
        newElement . innerHTML = '&nbsp;&nbsp;&nbsp;<a href="' + libSearchURL + '" target="_blank">CVRLS</a>';
        thisLink . parentNode . insertBefore ( newElement, thisLink . nextSibling );        
        //break;
    }
}

