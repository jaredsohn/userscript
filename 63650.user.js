// ==UserScript==
// @name           Horizontal GLB Field
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @namespace      pbr/hf
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.12.06
// ==/UserScript==

/* 
 * 
 * pabst did this 09/12/06+
 *
 * 
 */

var width = 1180;

window.setTimeout(
	function() {
		main();
	}
, 100);

function main() {
	console.log("activate horizontal field");
	unsafeWindow.pause();
	flip();
	unsafeWindow.play();
}

function flip() {
	var replay = document.getElementById("replay");
	replay.style.width = width+10000+"px";

	var replay_header = document.getElementById("replay_header");
	replay_header.style.width = width+10000+"px";

	var cnt = document.getElementById("replay_container");
	cnt.style.width = width+"px";
	cnt.style.height = "520px";

	var area = document.getElementById("replay_area");
	area.style.width = "1180px";
	area.style.height = "520px";
	area.style.top = "0px";
	area.style.left = "0px";
	area.style.backgroundImage = "url(http://img109.imageshack.us/img109/5127/grassplain.jpg)";

	var pd = unsafeWindow.play_data;
	for (var f=0; f<pd.length; f++) {
		for (var p=0; p<pd[f].length; p++) {
			var temp = pd[f][p].x;
			pd[f][p].x = pd[f][p].y;
			pd[f][p].y = 520-temp;
		}
	}

	unsafeWindow.positionFrame = moveCam;
	unsafeWindow.play_data = pd;
}

function moveCam() {
	return;
}





























