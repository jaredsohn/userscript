// ==UserScript==
// @name         test script
// @namespace    http://www.animeftw.tv/
// @description  Test script. Completely descouraged to install, exept if u want to help me make a specificate  script that "breaks" the 30 sec counter of a site before shows the video
// Documentation http://userscripts.org/scripts/show/73168
// Last updated: 2 Apr 2010
// 
// What this script does:
//    Nothing yet
//    
// 
// @include    http://www.animeftw.tv/*
// @include    http://www.animeftw.com/*
// ==/UserScript==


function getElementsByValue(value, tag, node) {
	var values = new Array();
	if (tag == null)
		tag = "*";
	if (node == null)
		node = document;
	var search = node.getElementsByTagName(tag);
	var pat = new RegExp(value, "i");
	for (var i=0; i<search.length; i++) {
		if (pat.test(search[i].value))
			values.push(search[i]);
	}
	return values;
}