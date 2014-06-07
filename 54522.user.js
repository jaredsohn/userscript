// ==UserScript==
// @name           First Down Lines On Replay
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @namespace      pbr/fdlor
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

/* 
 * 
 * pabst did this 09/08/01+
 *
 * 
 */

var scriptName = "First Down Lines";
var scriptVersion = "13.12.29";
var scriptWebpage = "http://userscripts.org/scripts/show/54522";

window.setTimeout(
    function() {
		try {
        	init();
		}
		catch (e) {
			console.log(e);
		}
    }
, 100);

function activate(e) {
    console.log("activate first down lines");
    lock();
    removeDownLines();
    createDownLines();

    unlock();
}

function removeDownLines() {
    var ds = document.getElementById("ds");
    if (ds != null) ds.parentNode.removeChild(ds);
    var los = document.getElementById("los");
    if (los != null) los.parentNode.removeChild(los);
    var fdm = document.getElementById("fdm");
    if (fdm != null) fdm.parentNode.removeChild(fdm);
}

function createDownLines() {
try {
//console.log("createDownLines");
    var play_data = unsafeWindow.play_data[0];

    var fdcolor = "yellow";
    var play_container = document.getElementById("replay_area");
    var header = document.getElementById("replay_header");
    var dir = header.getElementsByTagName("h1")[0];
    var dirText = dir.innerHTML;
    var ytg = "";
    if(dirText.indexOf(" inches ")!=-1) {
		ytg = '.3';
    }
    else {
		if(dirText.indexOf(" G on ")!=-1) {
	        // later
		}
		else {
	        var p2 = dirText.indexOf(" &amp; ")+7;
			var p1 = dirText.indexOf(" on ");
	  	    ytg = dirText.substring(p2,p1);
	 	    if (dirText.substring(p2-10,p2-9) == "4") {
				fdcolor = "red";
	        }
	    }
	}
    if (play_data != null) {
        //line of scrimmage
        var greater=0;
        for (var i=1; i<play_data.length; i++) {
            if (play_data[i].y > play_data[0].y) greater++;
            else greater--;
        }
        var diff = (greater / Math.abs(greater));
        if (diff < 0) diff = -4;
        else diff = 1;
        //console.log("diff="+diff);
        var pid = 999;
        for (var i=0; i<document.images.length; i++) {
            if (document.images[i].src.indexOf("/C.gif") != -1) {
                pid = parseInt(document.images[i].parentNode.id.split("_")[2]);
                break;
            }
        }
        if (pid == 999) return;
        
        for (var i=0; i<play_data.length; i++) {
            if (play_data[i].id == pid) {
                pid = i;
                break;
            }
        }
        if (play_data[pid] != null) {
            var los = parseFloat(play_data[pid].y);
            los = los * 3 + 40;
		    los = los + 1;

            var div = document.createElement('div');
            div.id = 'los';
            div.style.top  = (los + diff) + 'px';
    	    div.style.position = "absolute";
            div.style.width = '520px';
            div.style.height = '2px';
            div.style.backgroundColor = 'blue';
            div.style.zIndex = playerLayerZ-32;
            play_container.appendChild(div);
            //end los

            //first down marker
            diff = Math.abs(diff)/diff * ytg * 9;
            los = parseFloat(play_data[pid].y);
            los = los * 3 + 40;
            los = los + (Math.abs(diff)/diff)*2;

            div = document.createElement('div');
            div.id = 'fdm';
            div.style.top  = (los + diff) + 'px';
            div.style.position = "absolute";
            div.style.width = '520px';
            div.style.height = '2px';
            div.style.backgroundColor = fdcolor;
            div.style.zIndex = playerLayerZ-32;
            play_container.appendChild(div);
            //end fdm
        }
        else {
            console.log(play_data.length+" -- "+pid+" : play_data[0][pid] == null");
        }
    }
}
catch (e) {
	console.log(e);
}
}
