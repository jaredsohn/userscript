// ==UserScript==
// @name           Nascar kill driver popups
// @namespace      nascar
// @include        http://www.nascar.com
// @include        http://nascar.com
// @include        http://www.nascar.com/*
// @include        http://nascar.com/*
// @exclude        http://nascar.com/drivers/dps/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$('#cnnArticleContent a').each(function() {
	$(this).replaceWith($(this).text());
});