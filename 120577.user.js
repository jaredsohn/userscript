// ==UserScript==
// @name           Kill Santa
// @namespace      http://www.uer.ca/
// @description    Load UER without santa and the reindeer
// @include        http://www.uer.ca/*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @grant       none
// ==/UserScript==
	window.eval = function(){};
	$('body>div, object>embed').remove();



