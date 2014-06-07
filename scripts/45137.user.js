// ==UserScript==
// @name           FixFML
// @namespace      FML
// @description    Gets rid of those god awful links in the paragraphs
// @include        http://www.fmylife.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$("#pub_megaban").remove();

$("#wrapper div.post p").each(function() {
	var text = "";

	$(this).children("a").each(function() {
		text += this.text;
	});

	$(this).text(text);
});
