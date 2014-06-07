// ==UserScript==
// @name        FiMFiction LRBKC Extender
// @namespace   silvershadow
// @description Allow LRKBC's "next page" key combo to send you to the first chapter of a story when looking at the story description page
// @include     http://www.fimfiction.net/story/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       GM_getValue
// ==/UserScript==

$(unsafeWindow.document).ready(function() {
	var node = $('ul.chapters > div.chapter_container:first > li > a.chapter_link');
	if (node.attr("href") && !$('link[rel="next"]').attr("href")) {
		$("head").append('<link rel="next" href="' +  node.attr("href") + '"/>');
	}
	var node = $('ul.chapters > div.chapter_container:last > li > a.chapter_link');
	if (node.attr("href") && !$('link[rel="prev"]').attr("href")) {
		$("head").append('<link rel="prev" href="' +  node.attr("href") + '"/>');
	}
});

