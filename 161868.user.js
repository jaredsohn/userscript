// ==UserScript==
// @name        BigSize
// @namespace   http://ru.twitch.tv
// @description BigSize
// @include     http://*.twitch.tv/*
// @include     http://www.dota2.com/items/?l=russian
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1
// ==/UserScript==

(function(){	
	function init() {
		var width = 1200;
		var height = width / 1.7; // 16:9 ratio
		$(".main, .wrapper").css("width", width + 40 + "px");
		$(".archive_site_player_container").css("width", width + "px");
		$(".archive_site_player_container").css("height", height + "px");
		setTimeout(function(){
			$("#archive_site_player_flash").attr("width", width + "px");
			$("#archive_site_player_flash").attr("height", height + "px");
		}, 500);
		
		$("#related_channels, .beta_notice").remove();
	}
	
	init();
}) (jQuery)