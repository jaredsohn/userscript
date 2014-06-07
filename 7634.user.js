// @name            HPLSearch
// @description     Search HPL from IMDB "name" page
// @include         http://www.imdb.com/name/*
	
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
        libSearchURL = "http://ohip.hpl.ca/ipac20/ipac.jsp?session=1P700S94600D2.16948&menu=search&aspect=subtab13&npp=25&ipp=20&spp=20&profile=an&ri=&index=.GW&term=" + escape ( thisLink . text ) + "&x=0&y=0&aspect=subtab13";
        newElement . innerHTML = '&nbsp;&nbsp;&nbsp;<a href="' + libSearchURL + '" target="_blank">HPL</a>';
        thisLink . parentNode . insertBefore ( newElement, thisLink . nextSibling );        
        //break;
    }
}

