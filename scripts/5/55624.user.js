// ==UserScript==
// @name           GLB WatchGameLog
// @namespace      PackMan97
// @description    Modifies the Player Game Log page to hide the last game.
// @include       http://goallineblitz.com/game/player_game_log.pl?player_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function showstats() {
	$("#it").show();
	$("#linkit").hide();
	$("#it").parent().nextAll().show();
};

$(document).ready( function() {
        var linky = $("a[href*='game.pl?game_id']:last");
	var linky_href = $(linky).attr("href");
	$(linky).attr("id", "it");
	$(linky).hide();
	$(linky).parent().nextAll().hide();
	$(linky).after("<span id=\"linkit\"><a href=\"" + linky_href + "&mode=pbp&hide=1\" id=\"watchit\">Watch</a> | <a href=\"javascript:\" id=\"showit\">Show</a></span>");
	$("#showit").bind("click",showstats);
});