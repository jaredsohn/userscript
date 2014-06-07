// ==UserScript==
// @name        RightcolToggle FB
// @description hiding the annoying right column on Facebook
// @authorURL		        http://www.facebook.com/
// @include			htt*://www.facebook.com/*
// ==/UserScript==

$("#rightCol").hide();
$("#pageNav").bind("mouseenter mouseleave",function(){
	$("#rightCol").toggle();
});