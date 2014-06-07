// ==UserScript==
// @name           Twitter search in HSX portfolio
// @namespace      maeki.org
// @description    Add a Twitter search link for the securities in your portfolio
// @include        http://www.hsx.com/portfolio/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    "//td/a[starts-with(@href, '/security/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var searchstring="";
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	var nextItem = thisLink.getAttribute('title').match(/[^(]+/)[0];
	nextItem = nextItem.substr(0,nextItem.length)
	if(searchstring.length+nextItem.length+4 < 140) {
		searchstring = searchstring+'"'+nextItem+'"';
		if (i < allLinks.snapshotLength-1)
			searchstring=searchstring+"+OR+";
		}
}
if(searchstring.substr(searchstring.length-4,4)=="+OR+")
	searchstring=searchstring.substr(0,searchstring.length-4);
var linksPara = document.getElementById('links');
linksPara.firstChild.textContent="Trade Hist.";
linksPara.childNodes[4].textContent="Bank Hist.";
var newElement = document.createElement('a');
var newElement2 = document.createElement('span');
newElement2.textContent="    ";
newElement.innerHTML = "<b>Twitter</b>";
newElement.setAttribute('href', "http://search.twitter.com/search?q="+searchstring);
newElement.setAttribute('target', '_new');
linksPara.appendChild(newElement2);
linksPara.appendChild(newElement);