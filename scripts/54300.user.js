// ==UserScript==
// @name           Natchez Shooters Supplies - Hide OOS
// @namespace      http://jobson.us
// @description    Hides out of stock items from results.
// @include        http://www.natchezss.com/*
// ==/UserScript==

var console;

var global = {
	init: function() {
		console = (unsafeWindow.console) ? unsafeWindow.console : null;
		
		var item = $x("//table[@class='splashContentsBorder']/tbody/tr[1]/td[1]/table[2]/tbody/tr/td[@valign='top'][1]/p[@class='listItem']",document);
		for (var i=0;i<item.length;i++) {
			var row1 = item[i].parentNode.parentNode;
			var so = $x("td[3]/p[text() = 'Out']",row1);
			if (so.length==0) continue;
			var row2 = $x('./following-sibling::*[1]',row1)[0];
			row1.parentNode.removeChild(row1);
			if (! /^\s*$/.test(row2.getElementsByTagName('td')[0].textContent)) continue;
			row2.parentNode.removeChild(row2);
		}
	}
};

setTimeout(global.init,500);

function $x(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
