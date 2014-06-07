// ==UserScript==
// @name           Reddit hover titles
// @description    Makes f7u12 less of a fucking pain to read
// @include        http://www.reddit.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(function(){
	$('div.md a[title]').each(function(){
		$(this).after('<span style="background-color: #CCC; color: black; border-radius: 3px; margin: 3px; padding: 2px; display: inline-block;">' + this.title + '</span>');
	});
});