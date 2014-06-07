// ==UserScript==
// @name        Pixive
// @namespace   pixive
// @description   bigfatdick
// @include     http://www.pixiv.net
// @include     www.pixiv.net
// @include     http://pixiv.net/*
// @include     http://*.pixiv.net/*
// @include     https://pixiv.net/*
// @include     https://*.pixiv.net/*
// @author      Nguyen Duy Tiep
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     0.1
// ==/UserScript==

$(document).ready(function() {
	$('#wrapper').append('<div id="popup" style="position:fixed;top:0;right:0;">hello world</div>');
	
	$('ul img').mouseover(function(){
		var src = $(this).attr("src");
		var toReplace = '_s';
		var src = src.replace(toReplace, '_m');
		$('#popup').html('<img src="' + src + '">');
	}).mouseout(function(){
		$('#popup').html('hello world');
	});
});