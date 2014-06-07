// ==UserScript==
// @name           Replays On Box Score
// @namespace      robs
// @include        http://goallineblitz.com/game/game.pl?game_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.02.21
// ==/UserScript==

window.setTimeout(
    function() {
        main();
    }
, 10);

function main() {
    var address = window.location.toString()+"&mode=pbp";
    getInetPage(address, run);
}

function run(address, page) {
    var div = document.createElement("div");
    div.innerHTML = page.responseText;
    //console.log(div.innerHTML);

    var plays = div.getElementsByClassName("pbp_play_row_scoring");
    var box = document.getElementsByClassName("pbp_play_row");

    var pidx = 0;
    for (var i=0; i<box.length; i++) {
        pidx = 0;
        var btime = box[i].getElementsByClassName("summary_time")[0];
        var btext = box[i].getElementsByClassName("summary_play")[0];
        for ( ; pidx<plays.length; pidx++) {
            var time = plays[pidx].getElementsByClassName("pbp_time_remaining")[0].innerHTML;
            var text = plays[pidx].getElementsByClassName("pbp_play")[0].innerHTML;
            if ((time == btime.innerHTML) && (text == btext.innerHTML)) {
                var replay = plays[pidx].getElementsByClassName("pbp_replay")[0];
                if (replay.firstChild.href != null) {
                    var a = document.createElement("a");
                    a.href = replay.firstChild.href;
                    a.innerHTML = "Replay";

                    btext.innerHTML += "&nbsp;(";
                    btext.appendChild(a);
                    btext.innerHTML += ")";
                }
                break;
            }
        }
    }
}

function getInetPage(address, func) {
    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
            if (this.status != 200) {
                alert("pbr gm script: Error "+this.status+" loading "+address);
            }
            else {
                console.log("loaded: "+address)
                func(address,this);
            }
	};

	req.send(null);
	return req;
}
