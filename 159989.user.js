// ==UserScript==
// @id             fefe dates
// @name           fefe dates
// @description    Ersetzt auf blog.fefe.de das [l] in den pro-post-links dirch das postdatum
// @version        1.0
// @author         flying sheep
// @include        http://blog.fefe.de/*
// @include        https://blog.fefe.de/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @run-at         document-end
// ==/UserScript==
$(function() {
	var selector = 'body > h3 + ul > li > a[href^="?ts="]';
	GM_addStyle(selector + '{color: black; margin-right: 1ex}');
	
	$(selector).each(function() {
		var hexdate = $(this).attr('href').replace(/^\?ts=/, '');
		var fefets = new Date((parseInt(hexdate, 16) ^ 0xfefec0de) * 1000);
		$(this).text(fefets.toLocaleTimeString());
	});
});