// ==UserScript==
// @name           Google bottom bar
// @namespace      mdryden
// @include        http://www.google.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

$(function()
{
	//var $table = $(".mw").first().clone();
	var $table = $("#tsf").clone();
	
	$("#foot").before($table);
	
});