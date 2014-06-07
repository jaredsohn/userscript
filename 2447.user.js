// ==UserScript==
// @name          Something Fishy!
// @namespace     http://riyono.com/userscripts
// @description	  Hack SQUID's dumb blocking
// @include       http://*
// @include       https://*
// ==/UserScript==

var hrefElements, srcElements, thisElement;
hrefElements = document.evaluate(
    '//*[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < hrefElements.snapshotLength; i++) {
    thisElement = hrefElements.snapshotItem(i);
    if (thisElement.href.match(/\?/i)) {
       thisElement.href += '&google.com';
    } else {
       thisElement.href += '?google.com';
    }
}

srcElements = document.evaluate(
    '//*[@src]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < srcElements.snapshotLength; i++) {
    thisElement = srcElements.snapshotItem(i);
    if (thisElement.src.match(/\?/i)) {
        thisElement.src += '&google.com';
    } else {
        thisElement.src += '?google.com';
    }
}