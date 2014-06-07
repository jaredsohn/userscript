// ==UserScript==
// @name           Box Score Cleanup
// @description	   Delete useless lines from the GLB box score.
// @namespace      pbr/cbs
// @include        http://goallineblitz.com/game/game.pl?game_id=*
// @copyright      2011, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        11.01.17
// ==/UserScript==

var rows = document.getElementsByTagName("tr");
for (var i=rows.length-1; i>0; i--) {
	if (rows[i].className.indexOf("pbp_play_row") != -1) continue;
	if (rows[i].className.indexOf("nonalternating_color") != -1) continue;
	if (rows[i].innerHTML.indexOf("box_score_team") != -1) continue;

	var del = true;
	for (var j=2; j<rows[i].cells.length; j++) {
		var data = parseFloat(rows[i].cells[j].innerHTML);
		if (data != 0) {
			del = false;
			break;
		}
	}
	if (del == true) {
		rows[i].parentNode.removeChild(rows[i]);		
	}
}

