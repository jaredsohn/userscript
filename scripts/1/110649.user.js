//
// ==UserScript==
// @name          Spiceworks cleanup
// @namespace     namespace
// @description   Gets rid of ads in spiceworks.
// @include       http://localhost/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function(){
	$(".adbox").hide();
	$("content_wrapper").css("padding-right","none");

});