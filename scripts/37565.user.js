// ==UserScript==
// @name          isFeating.com twitter filter
// @namespace     http://delagoya.com/scripts
// @description   hide all isfeasting.com posts on twitter
// @include       http://twitter.com/*
// @require	    http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
$(document).ready(function() {
	$("span:contains('is feasting on') a").html(".");
});
