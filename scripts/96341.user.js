// ==UserScript==
// @name           Facebook SSL
// @namespace      fbssl
// @description    Replace HTTP by HTTPS on facebook.com
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require 			 https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

var protocol = window.location.protocol;
var url = window.location.href;

if (protocol != 'https:') {
	url = url.replace('http:', 'https:');
	window.location.href = url;
}

$(document).ready(function() {
	
	$('a').each(function() {
		
		var url = $(this).attr('href');
		url = url.replace('http:', 'https:');
		$(this).attr('href', url);
		
	});
	
});