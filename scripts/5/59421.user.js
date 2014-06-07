// ==UserScript==
// @name           Lamebook = Lamecomments
// @namespace      thlayli.detrave.net
// @description    Hides comments on Lamebook.com
// @include        http://www.lamebook.com/*
// ==/UserScript==

var comments = xpath(document, "//div[@class='comments-wrapper']");

for(i=0;i<comments.snapshotLength;i++){
	var link = xpath(comments.snapshotItem(i), ".//a[contains(.,'+add your own')]").snapshotItem(0).cloneNode(true);
	comments.snapshotItem(i).innerHTML = '';
	comments.snapshotItem(i).appendChild(link);
}

function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}