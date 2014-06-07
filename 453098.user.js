// ==UserScript==
// @name        Phaser Docs Fix
// @namespace   com.yall.adam
// @description Fixes indentation on the Phaser Docs Page
// @include     http://docs.phaser.io/*
// @version     1
// @grant       none
// ==/UserScript==
var $ = unsafeWindow.jQuery;
$('a[href="classes.list.html"] ~ ul.dropdown-menu > li').each(function(index){
	var anchor = $(this).children("a").eq(0);
	var href = anchor.attr("href");
	var indentCount = href.split(".").length;
	indentCount -= 3;
	if(indentCount > 0){
		var padding = 0;
		for(var i = 0; i <indentCount; i++){
			padding+=25;
		}
		anchor.css("padding-left",padding+"px");
	}
});