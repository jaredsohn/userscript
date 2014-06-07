// ==UserScript==
// @name           Refworks link to Google Scholar
// @namespace      http://www.davidpratten.com/
// @description    One click Scholar search from Refworks (author Name and article Title) 
// @include        http://www.refworks.com/*
// @include        http://scholar.google.com/*
// ==/UserScript==
String.prototype.striptags = function() { return this.replace(/(<([^>]+)>)/ig,""); }
String.prototype.getQuoted = function() { return this.match(/'(.+)'/i)[1]; }


var allLinks, thisLink, newLink;
allLinks = document.evaluate(
    '//td[@class="DF"]//a',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
		newLink = document.createElement('span');
		newLink.innerHTML = '&nbsp;<a target="scholar" style="font-size: 75%; font-family: sans-serif; color:green;" href="http://scholar.google.com/scholar?q='+thisLink.innerHTML.striptags()+'">articles</a>';
    thisLink.parentNode.insertBefore(newLink, thisLink.nextSibling);
}

allLinks = document.evaluate(
    '//td[@class="DF"][@width="70%"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//alert(allLinks.snapshotLength);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
		thisLink.innerHTML = '<a target="scholar" style="font-family: sans-serif; color:green;" href="http://scholar.google.com/scholar?q='+thisLink.innerHTML+'">'+thisLink.innerHTML+'</a>';
}

// Ensure that opened Scholar window will be reused.
if (window.location.host=='scholar.google.com') { window.name='scholar'}