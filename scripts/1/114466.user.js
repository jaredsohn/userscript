// ==UserScript==
// @name	Clone Clips
// @description	A script to stop embedded player from handling audio clips on clone.nl
// @include	http://clone.nl/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
alert('getting links found '+allLinks.snapshotLength);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // remove onclick method from sound clip links
    if(thisLink.href.match(/[a-fA-F0-9]+\.m3u$/)){
    	//alert('got matching href: '+thisLink.href);
    	thisLink.setAttribute('onclick',null);
    }
}
