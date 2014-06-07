// ==UserScript==
// @name          More real estate on JabbR chat client
// @namespace     http://chat/
// @description   Some quick and dirty CSS changes to maximize window real-estate
// @include       http://chat/*
// ==/UserScript==

window.onload = function() {
	heading = $("#heading")[0];
	banner = $(".banner")[0];
	heading.removeChild(banner);
	
	$("#chat-area").css("top","20px");
	$("#preferences").css("left","82%").css("width","18%");
	$(".users").css("left","82%").css("width","18%");
	$(".messages").css("width","81%");
};