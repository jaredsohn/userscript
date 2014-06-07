// ==UserScript==
// @name        ThePirateBay links to IMDB
// @namespace   pornget.myphotos.cc,2007-01-01:greasemonkey
// @description Add links to IMDB on ThePirateBay
// @include http://www.thepiratebay.org/*
// @include http://thepiratebay.org/*
// ==/UserScript==

var allDetails = document.evaluate(
    "//a[@class='detLink']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDetails.snapshotLength; i++) {
    var thisDetail = allDetails.snapshotItem(i);
    var name = thisDetail.firstChild.nodeValue;

    name = name.replace(/[\.\-_]/g," ").replace(/\[.*/,'');
    name = name.replace(/ (DVD|TELESYNC|TELECINE|CAM|XVID|DIVX|PROPER|iNTERNAL|LIMITED|STV|SCREENER|S?VCD|UNRATED|COMPLETE).*/i,'');
    name = name.replace(/( TS| Festival| WS).*/, '');

    alem = document.createElement('a');
    alem.href = "http://www.google.com/search?btnI=I%27m+Feeling+Lucky&q=imdb+" + name.replace(/ +/g,"+");
    alem.innerHTML = "IMDB";

    span = document.createElement('span');
    span.appendChild(document.createTextNode('['));
    span.appendChild(alem);
    span.appendChild(document.createTextNode('] '));

    thisDetail.parentNode.insertBefore(span, thisDetail);
}
