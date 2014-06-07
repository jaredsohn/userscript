// ==UserScript==
// @name           frogalexRemover
// @namespace      http://phill84.org
// @description    no comments
// @include        https://*.dream4ever.org/*
// @include        https://*.d4e.org/*
// @include        https://dream4ever.org/*
// @include        https://d4e.org/*
// ==/UserScript==

blacklist = /frogalex/i;

var page = document.getElementsByClassName('page')[0];
var threads = page.childNodes[1].childNodes[47].childNodes[1].childNodes;
var length = threads.length;
if (threads!=undefined && length!=0) {
	for (i=0;i<length;i++) {
		var td = threads[i].childNodes[7];
		if (td!=undefined && td.className=='alt2') {
			if (td.childNodes[1].childNodes[1].innerHTML.match(blacklist)) {
				td.parentNode.parentNode.removeChild(td.parentNode);
			}
		}
	}
}