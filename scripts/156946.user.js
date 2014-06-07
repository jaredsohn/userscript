// ==UserScript==
// @name        FiMFiction LRBKC Enabler
// @namespace   silvershadow
// @description Add the neccessary tags to a fimfiction chapter page to allow Link/Rel Based Key Controls to work
// @include     http://www.fimfiction.net/story/*
// @include     http://www.fimfiction.net/group/*/folder/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       GM_getValue
// ==/UserScript==

if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return $.trim(this);
	}
}

var nextText = "»";
var prevText = "«";

$(unsafeWindow.document).ready(function() {
	var node1 = [
		$('div.page_list > ul > li:last > a'),
		$('div.light_toolbar > ul > li:last > a')
	];
	for (i in node1) {
		if (node1[i].text().trim() == nextText.trim()) {
			$("head").append('<link rel="next" href="' +  node1[i].attr("href") + '"/>');
		}
	}
	var node2 = [
		$('div.page_list > ul > li:first > a'),
		$('div.light_toolbar > ul > li:first > a')
	];
	for (i in node2) {
		if (node2[i].text().trim() == prevText.trim()) {
			$("head").append('<link rel="prev" href="' +  node2[i].attr("href") + '"/>');
		}
	}
});

