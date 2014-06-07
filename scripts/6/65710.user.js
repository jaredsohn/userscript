// ==UserScript==
// @name           Pass Speed
// @namespace      pbr
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.01.04
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

const scriptName = "Pass Speed";
const scriptVersion = "10.01.04";
const scriptWebpage = "http://userscripts.org/scripts/show/65710";

window.setTimeout( function() {
    init();
}, 100);

function activate(e) {
    lock();

    passmain();

    unlock();
}

function passmain() {
	var arr = new Array();
    var play_data = unsafeWindow.play_data;
	for (var f=0; f<play_data.length; f++) {
		for (var p=0; p<play_data[f].length; p++) {
			if (play_data[f][p].id == "ball") {
				if (play_data[f][p].z > 4) {
					arr.push([play_data[f][p].x, play_data[f][p].y]);
				}
			}
		}
	}
	
	if (arr.length > 1) {
//		console.log(arr.length+" -- "+arr);
		var x = arr[0][0] - arr[arr.length-1][0];
		var y = arr[0][1] - arr[arr.length-1][1];
		var speed = (Math.sqrt(x*x + y*y)/(arr.length-1)).toFixed(2);

//		console.log(x+" -- "+y+" -- "+z+" -- "+ speed);
		var desc = document.getElementById("outcome_content").innerHTML;
		var d = desc.split(" pass to ");
		if (d.length == 2) {
			document.getElementById("outcome_content").innerHTML = d[0]+" pass ("+speed+") to "+d[1];
		}
	}
}





