// ==UserScript==
// @name           Player Page Training Link Fix
// @namespace      pbr/pptlf
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @include		   http://goallineblitz.com/game/home.pl
// @copyright      2011, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        11.03.27
// ==/UserScript==

var tab = document.getElementById("tab_training");
if (tab != null) {
	tab.firstChild.href += "&auto=1";
}

var points = document.getElementsByClassName("player_points_head");
if (points.length > 0) {
	points[0].getElementsByTagName("a")[1].href += "&auto=1";
}

var listtp = document.getElementsByClassName("list_tp");
for (var i=0; i<listtp.length; i++) {
	listtp[i].firstChild.href += "&auto=1";
}

