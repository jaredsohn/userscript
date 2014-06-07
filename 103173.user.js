// ==UserScript==
// @name			RedTube video download
// @description		Download videos from RedTube
// @namespace      http://userscripts.org/users/334809
// @version 1.0
// @include        http://redtube.com/*
// @include        http://www.redtube.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var decode = function(html) {
	return html.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
}

$(document).ready(function() {
	var noscript = $(decode($("noscript")[0].innerHTML));
	var vars = noscript.find("param[name=FlashVars]").attr("value");
	var regex = /flv_url=(.+?)mp4/;
	var url = unescape(regex.exec(vars)[1]);
	
	var link = $('<a>Download</a>');
	link.attr('href', url);
	
	$(".videoTitle").append(" ");
	$(".videoTitle").append(link);
});
