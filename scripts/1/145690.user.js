// ==UserScript==
// @name           YouFM - Pause with space
// @description    Tapping space will play/pause the current playing song
// @author         cXhristian
// @include        http://www.youfm.org/*
// @include        http://youfm.aws.af.cm/*
// @version        1.01
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

$(function () {
	$(window).keydown(function(e) {
		// Space
  		if (e.keyCode == 0 || e.keyCode == 32) {
			if($("#play").length != 0) {
				$("#play").click();
			}
			else {
				$("#pause").click();			
			}
			e.preventDefault();
		}
		// Next
		else if (e.keyCode == 39) {
			$("#next").click();
		}
		// Prev
		else if (e.keyCode == 37) {
			$("#prev").click();
		}
	});
});