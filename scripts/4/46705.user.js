// ==UserScript==
// @name           NewzLeech Ignore Fakers
// @namespace      http://jobson.us/
// @description    Ignores obviously fake files.
// @include        http://www.newzleech.com/*
// ==/UserScript==

//var console;
setTimeout(init,500);

function init() {
//	console = unsafeWindow.console;
	if (document.getElementsByClassName('subject').length==0) return;
	var cols = document.getElementsByClassName('subject');
	for (var i=1;i<cols.length;i++) {
		if (/(\.exe|\.rar\.rar)/.test(cols[i].innerHTML) || cols[i].getElementsByTagName('a')[0].className=='incomplete') {
			destroy(cols[i].parentNode.parentNode.parentNode.parentNode);
			i--;
		}
	}
}

function destroy(node) {
	node.parentNode.removeChild(node);
}