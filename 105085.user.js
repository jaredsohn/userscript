// ==UserScript==
// @name		youtube playlist for chrome cleaner
// @author              theLOLflashlight
// @namespace           http://userscripts.org/scripts/show/105085
// @require             http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @description		fixes uglyness in chrome when hovering on playlist thumbnails
// @version		1.0.0
// @copyright		2011+, theLOLflashlight
// @include             http://*youtube.com/*
// ==/UserScript==

$(document).ready(function(){
alert("lol1");
	$("#playlist-bar li a").live("hover", function(){
alert("lol2");
		if ($(this).hasClass("modified") == false) {
			urlnav = $(this).attr("href");
			$(this).addClass("modified");
			$(this).removeAttr("href");
			$(this).removeAttr("title");
			$(this).attr("onclick", "window.location.href = 'http://www.youtube.com" + urlnav + "';");	
		}
	});
});












