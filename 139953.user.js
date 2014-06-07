// ==UserScript==
// @name          Reorder Gmail Nav Bar
// @namespace     nabraham
// @version       0.1
// @description   enter something useful
// @match         https://mail.google.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright     2012+, You
// ==/UserScript==

/* 
 * This replaces the search link on the nav bar (element 1) with a link to Reader.
 */

$(document).ready(function(){
	var $ol = $('#gbzc');
	var $reader = $ol.find(".gbmt:contains('Reader')");
	if ($reader.length > 0) {   
		var $search = $ol.children().eq(1).find("a");
		$search.attr("href",$reader.attr("href"));
		$search.find(".gbts").text($reader.text());
	}
});