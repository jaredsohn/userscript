// ==UserScript==
// @name           Twitter Pic Preview
// @namespace      html
// @include        http://twitter.com/*
// @require       http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    //alert('Hello world!');
	//$("a[href^='http://twitgoo.com']").text("success");
	//$("a").click(function () {alert("ok");});
	//$("a[href^='http://twitgoo.com']").live("click");
	setInterval(function () {
		$("a").not(".thumbed").addClass("thumbed").css("color","red");
	}, 1000);
});