// ==UserScript==
// @name            ThePirateBay - Remove Telesync (TS) and Camera (CAM) from results
// @namespace       http://www.w3.org/1999/xhtml
// @description     Removes Telesync and Cam results from results 
// @include         http://thepiratebay.se/search/*
// @include         http://thepiratebay.se/recent
// @include         http://thepiratebay.se/recent/*
// @include         http://thepiratebay.se/top/*
// @include         http://thepiratebay.se/browse/*
// @include         https://thepiratebay.se/search/*
// @include         https://thepiratebay.se/recent
// @include         https://thepiratebay.se/recent/*
// @include         https://thepiratebay.se/top/*
// @include         https://thepiratebay.se/browse/*
// ==/UserScript==

var removeCount;
var results = document.getElementById('searchResult');

function getElementsByClassName(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = document.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
}; 


if (results) {
	var colLength = results.rows[0].cells.length;
	
	for (i = results.rows.length - 1; i >= 1; i--) {
		// check second to last column
		if ( (results.rows[i].cells[colLength - 6]) && (/^.*TS2DVD|ts2dvd|\.CAM\.|\.cam\.|\sTS\s|\(TS\)|\.TS\.|\sts\s|\(ts\)|TELESYNC2DVD|telesync2dvd|720p-ts|720p-TS|TELESYNC|telesync|Telesync|\sCAM\s|\scam\s|CAMrip|CAMRip|camrip|CAMRIP|slutprutfinale$.*/.test(results.rows[i].cells[colLength - 6].innerHTML) == true) ) { 
			results.deleteRow(i);
			removeCount = removeCount + 1; 
		}
	}
	
	var foundElements;
	
	if (foundElements = getElementsByClassName('sortby')) {
		foundElements[0].innerHTML.replace(/Name/,'Whaat'); 
	}
}