// ==UserScript==
// @name		Tweakers 7.5
// @namespace	tweakers.net
// @description	Make tweakers.net usable again
// @include		http://tweakers.net/*
// @include		https://tweakers.net/*
// @include		http://gathering.tweakers.net/*
// @include		https://gathering.tweakers.net/*
// @include		https://secure.tweakers.net/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version		1.2.0
// ==/UserScript==

$.noConflict();
jQuery(document).ready(function($) {

	/** Load the CSS from Github Pages and add it to the document head **/
	$("head").append("<link>");
	var css = $("head").children(":last");
	css.attr({
		rel:  "stylesheet",
		type: "text/css",
		href: "http://tweakers-7punt5.github.io/userscript/style.css"
	});

	/** Place the tracker on a usable spot **/
	$.ajax({
		type: "GET",
		url: "/xmlhttp/xmlHttp.php?application=frontpage&type=tracker&action=get_tracker&output=json&nocache=" + (new Date).getTime(),
		dataType: "json",
	}).done(function(data) {
		html = '<div id="inlineTracker" class="fpItem tracker"><h2>Inline tracker</h2>' + data.data.html + "</div>";
		$("#pricewatch").before(html);
	});
});
