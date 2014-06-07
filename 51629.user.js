// ==UserScript==
// @name        Destroy MetaFilter Favorites
// @namespace   http://www.metafilter.com/user/25038
// @description Hide "favorite" counts on metafilter sites. Stolen outright from jepler.
// @include     http://metatalk.metafilter.com/*
// @include     http://ask.metafilter.com/*
// @include     http://www.metafilter.com/*
// @include     http://metafilter.com/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var favs = xpath("//span[starts-with(@id,'fav')]")
for(var i = 0; i < favs.snapshotLength; i++) {
    var fav = favs.snapshotItem(i);
	fav.parentNode.removeChild(fav);
}

var favlinks = xpath("//a[contains(@href,'favorite')]");
var mefiLink=new RegExp("^(http:\/\/[a-z.]*metafilter\.com|\/)");
for(var i = 0; i < favlinks.snapshotLength; i++) {
	var favlink = favlinks.snapshotItem(i);
	if (mefiLink.test(favlink.href)) {
		favlink.parentNode.removeChild(favlink);
	} else {
		favlink.style.color='blue';
	}
}

