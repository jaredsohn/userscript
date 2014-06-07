// ==UserScript==
// @name           Extra Info In Play Text
// @namespace      pbr/ei
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==


/* 
 * 
 * pabst did this 09/09/01+
 *
 * 
 */

var scriptName = "Extra Info In Play Text";
var scriptVersion = "13.12.29";
var scriptWebpage = "http://userscripts.org/scripts/show/57984";

window.setTimeout(
    function() {
        init(false);
    }
    , 100);

function premodTest() {
    var play_data = unsafeWindow.play_data;
	var minx = play_data[0][0].x;
	var maxx = play_data[0][0].x;
    for (var i = 1; i < unsafeWindow.play_data[0].length; i++) {
		minx = Math.min(minx, play_data[0][i].x);
		maxx = Math.max(maxx, play_data[0][i].x);
	}
	console.log(minx+" --> "+maxx+" : "+((maxx - minx)>100));
	if ((maxx-minx) > 110) return true;
	return false;
}

function activate(e) {
    console.log("activate "+scriptName);
    lock();
	
    if (unsafeWindow.play_data[0]) {
		defender_main();
    }
    else {
		console.log("early exit");
    }
    unlock();
}

var longPass = 15 * 3;
var mediumPass = 7.5 * 3;
var shortPass = 0 * 3;

function defender_main() {
    var players = unsafeWindow.players;
    var play_data = unsafeWindow.play_data;

    var playerids = new Array();
    for (var i = 1; i < unsafeWindow.play_data[0].length; i++) {
        var data = play_data[0][i];
        if (data.id != 'ball') {
            playerids.push (data.id);
        }
    }

    var playText = document.getElementById("outcome_content").innerHTML;
    var receiver = getReceiverName(playText);

    if (receiver != null) {
        var wrid = -1;
        for (var i = 0; i < playerids.length; i++) {
            var plyr = players[playerids[i]];
            if (plyr.name == receiver) {
                wrid = playerids[i];
                break;
            }
        }
        if (wrid == -1) return;

        var min = 99999;
        var incY = 99999;
        var catchY = -1;
        var wridx = -1;
        for (var i=0; i<play_data[1].length; i++) {
            if (play_data[1][i].id == wrid) {
                wridx = i;
                break;
            }
        }

        for (var j = 0; j < play_data.length; j++) {
            var balldata = play_data[j][0];
            var snapdata = play_data[j][wridx];

            var ydepth = Math.abs(snapdata.y - balldata.y);
            var xdepth = Math.abs(snapdata.x - balldata.x);
//????            xdepth = xdepth-3;
            var distance = Math.sqrt(ydepth*ydepth + xdepth*xdepth);
            if (distance < min) {
                incY = snapdata.y;
                min = distance;
            }
            if (distance == 0) {
                catchY = balldata.y
                break;
            }
        //console.log(min+" : "+balldata+" : "+snapdata+" : "+xdepth+" : "+ydepth);
        }

        var depth = Math.abs((incY - play_data[0][0].y));
        //console.log(depth+" -- "+catchY);
        addDistance(depth);
        if (catchY != -1) {
            var endY = play_data[play_data.length-1][0].y;
            if (catchY == 0) {
                catchY = endY;
            }
            var yac = Math.round(((Math.abs(endY - catchY))/3)*2)/2;
            yac = yac;
            if (yac != 0) {
                addYAC(yac.toFixed(1));
            }
        }

        try {
            var defPlayers = findDefender(players, play_data);
            if (defPlayers != null) {
                var max = findMax(defPlayers);
                var def = play_data[0][max];
                console.log(max+"-"+def.id+"-"+unsafeWindow.players[def.id].position+"-"+unsafeWindow.players[def.id].name);
                addDefender(players[def.id].position+"-"+players[def.id].name);
            }
        }
        catch (err) {
            console.log("yac defenders: "+err);
        }
    }

    
    try {
        var blockers = findBlocker(players, play_data);
        if (blockers != null) {
            var max = findMax(blockers);
//console.log(blockers);
            var def = play_data[0][max];
            console.log(max+"-"+def.id);
			if (def.id == "ball") {
				console.log("here");
				max = findMax(blockers.slice(1));
			}
            var def = play_data[0][max];
            console.log(max+"-"+def.id);
		    console.log(unsafeWindow.players[def.id].position+"-"+unsafeWindow.players[def.id].name);
            addBlocker(players[def.id].position+"-"+players[def.id].name);
        }
    }
    catch (err) {
        console.log("yac blockers: "+err);
    }
    
}

function findDefender(players, play_data) {
    var playerids = new Array();
    for (var i = 1; i < play_data[0].length; i++) {
        var data = play_data[0][i];
        if (data.id != 'ball') {
            playerids.push (data.id);
        }
    }

    var playText = document.getElementById("outcome_content").innerHTML;
    var receiver = getReceiverName(playText);

    var wrid = -1;
    for (var i = 0; i < playerids.length; i++) {
        var plyr = players[playerids[i]];
        if (plyr.name == receiver) {
            wrid = playerids[i];
            break;
        }
    }
    if (wrid == -1) return null;

    var wridx = -1;
    for (var i=0; i<play_data[1].length; i++) {
        if (play_data[1][i].id == wrid) {
            wridx = i;
            break;
        }
    }

    var defmin = 99999;
    var defPlayers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var j;
    for (j = 0; j < play_data.length; j++) {
        var k=0;
        if (wridx <= 11) {
            k=1;
        }
        var fmin = 99999;
        var fidx = -1;
        for (var i=(k*11)+1; i<(k*11)+12; i++) {
            try {
                //console.log(wridx+" == "+i+" -- "+unsafeWindow.play_data[j][i]);
                var def = play_data[j][i];
                var defydepth = Math.abs(def.y - play_data[j][wridx].y);
                var defxdepth = Math.abs(def.x - play_data[j][wridx].x);
                var defdistance = Math.sqrt(defydepth*defydepth + defxdepth*defxdepth);
                if (defdistance < defmin) {
                    defmin = defdistance;
                }
                if (defdistance < fmin) {
                    fmin = defdistance;
                    fidx = i;
                }
                defPlayers[i] = Math.max(0,defPlayers[i]-0.7);
                //console.log(unsafeWindow.players[def.id].name);
                if ((i != -1) && (defdistance < 18) && (j>5)) {
                    defPlayers[i] += 1.35;
                }
            //console.log(unsafeWindow.play_data[j][i].id+" : "+defPlayers[i]);
            } 
			catch(e) {
			}
        }
        if (fmin < 12) {
            defPlayers[fidx] += 0.35;
        }
	//console.log(j+" -- "+fmin+" : "+fidx+" -- "+defPlayers);

		try {
	  	    var balldata = play_data[j+5][0];
			var wrdata = play_data[j+5][wridx];
			//console.log(balldata.x+" - "+wrdata.x+" : "+balldata.y+" - "+wrdata.y);
			if ((Math.abs(balldata.x - wrdata.x) < 15) && (Math.abs(balldata.y - wrdata.y) < 15)) {
			    break;
			}
		}
		catch (e) {
			break;
		}
		if ((j == 0) && ((j+10) < (play_data.length-5))) {
		    j += 9;
		}
    }

    //alert("defmin="+defmin);
    if (defmin > 11) {
        console.log("HiZ");
        defPlayers = null;
    }
    return defPlayers;
}

function addDefender(d) {
    var playText = document.getElementById("outcome_content").innerHTML;
    var sn = playText.indexOf('pass to ')+8;
    var en = 0;

    if (playText.indexOf(', hurried by')!=-1) {
        en = playText.indexOf(', hurried by');
    }
    else if (playText.indexOf(' up the')!=-1) {
        en = playText.indexOf(' up the');
    }
    else {
        en = playText.indexOf(' over the');
    }

    if (sn != -1) {
        var str = playText.slice(0,en)+" ("+d+")" + playText.slice(en);
        document.getElementById("outcome_content").innerHTML = str;
    }
}

function findBlocker(players,play_data) {
    var playerids = new Array();
    for (var i = 1; i < play_data[0].length; i++) {
        var data = play_data[0][i];
        if (data.id != 'ball') {
            playerids.push (data.id);
        }
    }

    var qbid = 0;
    for (var i = 0; i < playerids.length; i++) {
        var plyr = players[playerids[i]];
        //console.log(i+") "+plyr.position);
        if (plyr.position == "QB") {
            qbid = playerids[i];
            break;
        }
    }

    var qbidx = 0;
    for (var i=0; i<22; i++) {
        if (play_data[0][i].id == qbid) {
            qbidx = i;
            break;
        }
    }

    var lastFrame = play_data.length;
    var last = 32767;
    for (var f=0; f<play_data.length; f++) {
        var balldata = play_data[f][0];
        var qbdata = play_data[f][qbidx];
        var ydepth = Math.abs(qbdata.y - balldata.y);
        var xdepth = Math.abs(qbdata.x - balldata.x);
        var distance = Math.sqrt(ydepth*ydepth + xdepth*xdepth);
        //console.log(f+") "+distance+" --- "+last);
        if (distance > last) {
            lastFrame = f;
            break;
        }
        last = distance;
    }

    //console.log(qbid+" - "+qbidx+" : lf="+lastFrame);
    
    var playText = document.getElementById("outcome_content").innerHTML;
    var rusher;
    var idx = playText.indexOf(" sacked by ")+" sacked by ".length;
    if (idx != 10) {
        rusher = playText.slice(idx,idx+playText.slice(idx).indexOf(" ("));
    }
    else {
        var idx = playText.indexOf(" hurried by ")+" hurried by ".length;
        rusher = playText.slice(idx,idx+playText.slice(idx).indexOf(", "));
    }

    var rusheridx = -1;
    var rusherid = -1;
    for (var i=0; i<play_data[0].length; i++) {
        var id = play_data[0][i].id;
        if (players[id] != null) {
            if (players[id].name == rusher) {
                rusherid = id;
                rusheridx = i;
                break;
            }
        }
    }
    //console.log("rusher="+rusherid+" : "+rusheridx+" : "+players[rusherid].name);
    if (rusherid == -1) return null;

    var offmin = 99999;
    var offPlayers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var offidx = -1;
    var j;
    for (j = 0; j < lastFrame; j++) {
        var k=0;
        if (rusherid <= 11) {
            k=1;
        }
        var offmin = 99999;
        var offidx = -1;
        //console.log(rusher+" - "+unsafeWindow.play_data[j][rusheridx].x+","+unsafeWindow.play_data[j][rusheridx].y);
        for (var i=(k*11)+1; i<(k*11)+12; i++) {
            var off = play_data[j][i];
            var offydist = Math.abs(off.y - play_data[j][rusheridx].y);
            var offxdist = Math.abs(off.x - play_data[j][rusheridx].x);
            var offdistance = Math.sqrt(offydist*offydist + offxdist*offxdist);
            if (offdistance < offmin) {
                offmin = offdistance;
                offidx = i;
            }
            //console.log(rusherid+"/"+rusheridx+" == "+i+" -- "+unsafeWindow.play_data[j][i].id+" = "+offdistance);
            offPlayers[i] = Math.max(0,offPlayers[i]-0.1);
            if (offdistance < 9) {
                //console.log(unsafeWindow.players[off.id].name+" -- "+offdistance+" :: "+off.x+","+off.y);
                offPlayers[i] += 1;
            }
	//console.log(offPlayers);
        }
        if (offmin < 6) {
            offPlayers[offidx] += 0.35;
        }
	if (j == 2) j += 7;
    }
    //console.log(offidx+"-"+offidx+"-"+offmin+"="+offPlayers);
    if (offmin > 15) {
        offidx = -1;
        offPlayers = null;
    }
    return offPlayers;
}

function findMax(arr) {
    if (arr == null) return -1;
    if (arr.length < 1) return -1;

    var idx = 0;
    var max = arr[idx];
    for (var i=1; i<arr.length; i++) {
        if (arr[i] > max) {
            idx = i;
            max = arr[i];
        }
    }
    return idx;
}

function getReceiverName(playText) {
    var sn = playText.indexOf('pass to ')+8;
    var en = 0;

    if (playText.indexOf(', hurried by')!=-1) {
        en = playText.indexOf(', hurried by');
    }
    else if (playText.indexOf(' up the')!=-1) {
        en = playText.indexOf(' up the');
    }
    else if (playText.indexOf(' over the')!= -1) {
        en = playText.indexOf(' over the');
    }
    else {
        return null;
    }

    var name = playText.slice(sn,en);
    return name;
}

function addYAC(yacnum) {
    var playText = document.getElementById("outcome_content").innerHTML;
    if (playText.indexOf('pass to') != -1){
        var str = playText;
        var idx = str.indexOf(" yd gain)")+" yd gain".length;
        if (idx < 8) {
            idx = str.indexOf(" yd loss)")+" yd loss".length;
        }
        if (idx < 8) return;

		var mod = yacnum;
		if (premodTest() == true) mod = mod/3;
		mod = parseFloat(mod).toFixed(0);
        document.getElementById("outcome_content").innerHTML=str.slice(0,idx)+", "+mod+" YAC"+str.slice(idx);
    }
}

function addDistance(d) {
    var playText = document.getElementById("outcome_content").innerHTML;
    if (playText.indexOf(' pass to ') != -1){
        var s = " short";
        if (d >= mediumPass) s = " medium";
        if (d >= longPass) s = " long";

        var idx = playText.indexOf(" pass to ");
        playText = playText.slice(0,idx)+s+playText.slice(idx);
        document.getElementById("outcome_content").innerHTML = playText;
//console.log(d);
    }
}

function addBlocker(d) {
    var playText = document.getElementById("outcome_content").innerHTML;
    var idx = playText.indexOf(" sacked by ")+11;
    var idx2 = -1;
    if (idx != 10) {
        idx2 = playText.slice(idx).indexOf(" (");
    }
    else {
        idx = playText.indexOf(" hurried by ")+12;
        idx2 = playText.slice(idx).indexOf(", ");
    }
    if (idx > 11) {
        playText = playText.slice(0,idx+idx2)+" ("+d+")"+playText.slice(idx+idx2);
        document.getElementById("outcome_content").innerHTML = playText;
    }
}
