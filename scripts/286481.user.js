// ==UserScript==
// @name        PRO7-Connect-Layout
// @namespace   *
// @include     http://connect.prosieben.de/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.1
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function() {	
	var intset = function() {
		$("#app_container").css("top","0px");
		$("#page-right").css("z-index","2");
		$("#page-left").css("overflow","visible");
		$("#page-left").css("z-index","5");
		$("#player-container").css("overflow","visible");
		$("#player-container").css("height","584px");
		$("#player-container").css("width","985px");
		$("#player-overview-header").css("width","985px");
		if($("#player").html()) {
			if($("#player-container").css("display") == "none") $("#page-right").css("paddingTop","57px");
			else $("#page-right").css("paddingTop","663px");
		} else $("#page-right").css("paddingTop","0px");
	};
	
	setInterval(intset,1000);
});