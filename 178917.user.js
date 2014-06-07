// ==UserScript==
// @name          Hide Finished Games (Nova.gs)
// @version       1.0
// @description   Removes your finished games from the front page of nova.gs
// @namespace     http://duskeagle.com/
// @include       http://nova.gs/
// ==/UserScript==


$(document).ready( function () {
	$("#recent_game_list").remove();
});