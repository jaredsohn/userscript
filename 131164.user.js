// ==UserScript==
// @name           ignore_tragedy_admin
// @namespace      http://userscripts.org/users/tragedy
// @description    ignore the tragedy ubuntu-tw.org forum admin post
// @include        http://www.ubuntu-tw.org/*
// ==/UserScript==

function getElementsByClass(node, searchClass, tag) {
	var classElements = new Array();
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("\\b" + searchClass + "\\b");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function getHtmlText(node) {
	return node.innerHTML.replace(/<.+?>/gim,'');
}

var comUserNames = getElementsByClass(document, 'comUserName', '*');
var eachUserName;

for (i = 0; i < comUserNames.length; i++) {
	eachUserName = comUserNames[i];
	if (getHtmlText(eachUserName.childNodes[0]) == 'yanzilme') {
		eachUserName.parentNode.parentNode.parentNode.style.display = 'none';
	}
}
