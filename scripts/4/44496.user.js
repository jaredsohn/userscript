// ==UserScript==
// @name        Unfavorite for metafilter.com
// @namespace   http://unpy.net/userscripts/
// @description Hide "favorite" counts on metafilter sites
// @include     http://metatalk.metafilter.com/*
// @include     http://ask.metafilter.com/*
// @include     http://www.metafilter.com/*
// @include     http://metafilter.com/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var favs = xpath("//span[starts-with(@id,'favcnt')]")
for(var i = 0; i < favs.snapshotLength; i++) {
    var fav = favs.snapshotItem(i);
    fav.style.display = 'none';
}
    
