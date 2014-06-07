// ==UserScript==
// @name           bidderspot
// @description    Hide all picture.
// @namespace      hidepic
// @include        *.bidderspot.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$(document).ready(function() {
	//$("img").attr("src",function() { return "" });
	$("img").attr("width",function() { return "1%" });
});