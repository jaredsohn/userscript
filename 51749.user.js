// ==UserScript==
// @name           drlblocker
// @namespace      http://phill84.org
// @description    no comments
// @include        https://*.dream4ever.org/*
// @include        https://*.d4e.org/*
// @include        https://dream4ever.org/*
// @include        https://d4e.org/*
// ==/UserScript==

/* Add the names you wanna block here */
var blacklist = new Array(
	'name1',
	'name2',
	'name3'
);

/* Do not change the code below unless you have a clue of what you are doing */
var regstr = '';
var length = blacklist.length;
for(i=0;i<length-1;i++) {
	regstr += blacklist[i] + '|';
}
regstr += blacklist[length-1];
var regex = new RegExp(regstr, 'g');
var page = document.getElementsByClassName('page')[0];
var threads = page.childNodes[1].childNodes[47].childNodes[1].childNodes;
if (threads!=undefined && threads.length!=0) {
	for (i=0;i<threads.length;i++) {
		var td = threads[i].childNodes[7];
		if (td!=undefined && td.className=='alt2') {
			if (td.childNodes[1].childNodes[1].innerHTML.match(regex)) {
				td.parentNode.parentNode.removeChild(td.parentNode);
				i--;
			}
		}
	}
}