// ==UserScript==
// @name           StumbleUpon About Links
// @namespace      thlayli.detrave.net
// @description    Makes links on SU point to About pages instead of blogs
// @include        http://*.stumbleupon.com/*
// @version        1.3
// ==/UserScript==

var classicName = xpath(document, "//font[contains(@size, '3')]").snapshotItem(0);

if(classicName){
	var thisStumbler = classicName.textContent;
}else{
	var thisStumbler = xpath(document, "//span[contains(., 'Hello ') or contains(., 'Hi ')]").snapshotItem(0).innerHTML;
	thisStumbler = thisStumbler.match(/Hi (.+)|Hello (.+)/);
	thisStumbler = (thisStumbler[0] != '') ? thisStumbler[0] : thisStumbler[1];
}

var docLinks = document.links;
for(i=0;i<docLinks.length;i++){
	if(docLinks[i].href.match(/^http:\/\/www|^http:\/\/buzz.stumbleupon|^javascript|.group.stumbleupon.com|about\/$/i) == null && docLinks[i].href.indexOf('stumbleupon.com/') != -1 && docLinks[i].href.indexOf('http://'+thisStumbler.toLowerCase()) == -1 && docLinks[i].href.split('/').length < 5 && docLinks[i].textContent.indexOf(' Favorites') == -1)
		docLinks[i].href = docLinks[i].href + 'about/';
}

function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}