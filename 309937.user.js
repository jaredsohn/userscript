// ==UserScript==
// @name           show replay
// @namespace      goallineblitz.com
// @description    Shows the plays in the replay
// @include        http://glb2.warriorgeneral.com/game/game/*
// @copyright      2014, Trey Patterson
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version        2014.01.02
// ==/UserScript==

window.setTimeout(main,10); //needed to start greasemonkey

$("#content").append('<div id="ReplayOut"></div>');

function main() {
	var offensivePlayName, defensivePlayName;
	offensivePlayName = $(".left offense_play").html();
	defensivePlayName = $(".left defense_play").html();
	$("#ReplayOut").append("<p> Offensive Play: " + offensivePlayName + "</p>");
	$("#ReplayOut").append("<p> Defensive Play: " + defensivePlayName + "</p>");
}

$("#ReplayOut").css({"position":"fixed","top":"0px","left":"0px"});