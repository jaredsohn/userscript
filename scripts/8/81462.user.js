// ==UserScript==
// @name           Facebook show name
// @description    Show name on the title.
// @namespace      showname
// @include        *.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$(document).ready(function() {
	$(this).attr("title", $(this).attr("title")+ " - < " + $("#navAccountPic img").attr("alt")+ " >");
});