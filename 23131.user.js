// ==UserScript==
// @name          dirty_new_window
// @description   Open comments and external links in new window instead of current for autokadabra.ru
// @include       http://dirty.ru/*
// ==/UserScript==

if( location.hostname.indexOf('dirty.ru') != -1 ) {


var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    
if (!thisLink.href.match("javascript")) {

    if ( (thisLink.href.match("comments")) ||
         ( (!thisLink.href.match("dirty")))
//       ) thisLink.href = "javascript:window.open('"+thisLink.href+"'); void(0);";
) thisLink.target="_blank";
 
}

}
}