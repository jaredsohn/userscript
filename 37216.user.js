// ==UserScript==
// @name           4chan.js Cleaner
// @namespace      none
// @description    Remove those fucking 4chan.js posts from 4chan until MrVacBob does something about it.
// @include        http://*.4chan.org/*
// ==/UserScript==


// Stolen from http://userscripts.org/scripts/review/13602. Thanks, AoRF!
var regexp=/(9|10) KB, 2365x2338/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}