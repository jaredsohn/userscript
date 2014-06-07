// ==UserScript==
// @name           add weekday
// @namespace      http://d.hatena.ne.jp/tanku/
// @description    日付に曜日を付ける
// @include        http://www.amazon.co.jp/*
// @include        https://www.amazon.co.jp/*
// ==/UserScript==


var wday = ['日','月','火','水','木','金','土'];

function funcElem(elem) {
	if (!elem) {
		return;
	}
	var e = elem.firstChild;
	while (e) {
		switch (e.nodeType) {
		case 1:
			funcElem(e);
			break;
		case 3:
			e.nodeValue = e.nodeValue.replace(/\d{4}\/\d{1,2}\/\d{1,2}/g, function(x){return x+"("+wday[(new Date(x)).getDay()]+")";});
			break;
		}
		e = e.nextSibling;
	}
}

funcElem(document.body);
