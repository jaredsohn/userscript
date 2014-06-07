// ==UserScript==
// @name           GLB YAC (alt)
// @namespace      pbr
// @description    Adds a YAC (yards after catch) stat to replays
// @version        09.06.24
// ==/UserScript==

/*
 *
 * original yac code by randombeast from www.goallineblitz.com
 * pabst modified it 8/18/08+
 *
 */

var longPass = 15 * 3;
var mediumPass = 7.5 * 3;
var shortPass = 0 * 3;

function yac_main(players, play_data) {
	var playerids = new Array();
	for (var i = 1; i < play_data[0].length; i++) {
		var data = play_data[0][i];
		if (data.id != 'ball') {
			playerids.push (data.id);
		}
	}
	
	var playText = document.getElementsByClassName("small_head play");//[1].innerHTML;
    playText = playText[1].innerHTML;
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
	    for (var i=0; i<unsafeWindow.play_data[1].length; i++) {
		    if (unsafeWindow.play_data[1][i].id == wrid) {
			    wridx = i;
			    break;
		    }
	    }
	
	    for (var j = 0; j < play_data.length; j++) {
		    var balldata = unsafeWindow.play_data[j][0];
		    var snapdata = unsafeWindow.play_data[j][wridx];
		
		    var ydepth = Math.abs(snapdata.y - balldata.y);
		    var xdepth = Math.abs(snapdata.x - balldata.x);
            xdepth = xdepth-3;
		    var distance = Math.sqrt(ydepth*ydepth + xdepth*xdepth);
		    if (distance < min) {
			    incY = snapdata.y;
			    min = distance;
		    }
		    if (distance == 0) {
			    catchY = balldata.y
			    break;
		    }
            //console.log(balldata+" : "+snapdata+" : "+xdepth+" : "+ydepth);
	    }

	    var depth = Math.abs((incY - play_data[0][0].y)/3);
	    addDistance(depth);
	    if (catchY != -1) {
		    var endY = play_data[play_data.length-1][0].y;	
		    if (catchY == 0) {
			    catchY = endY;
		    }	
		    var yac = Math.round(((Math.abs(endY - catchY))/3)*2)/2;
            yac = yac / 3;
		    if (yac != 0) {
			    addYAC(yac.toFixed(1));
		    }
	    }
    }
	
	try {
		var blockers = findBlocker(unsafeWindow.players, unsafeWindow.play_data);
		if (blockers != null) {
			var max = findMax(blockers);
			var def = unsafeWindow.play_data[0][max];
			//console.log(max+"-"+def.id+"-"+unsafeWindow.players[def.id].position+"-"+unsafeWindow.players[def.id].name);
			addBlocker(unsafeWindow.players[def.id].position+"-"+unsafeWindow.players[def.id].name);
		}
	}
	catch (err) {
		console.log("yac blockers: "+err);
	}

	try {
		var defPlayers = findDefender(unsafeWindow.players, unsafeWindow.play_data);
		if (defPlayers != null) {
			var max = findMax(defPlayers);
			var def = unsafeWindow.play_data[0][max];
			//console.log(max+"-"+def.id+"-"+unsafeWindow.players[def.id].position+"-"+unsafeWindow.players[def.id].name);
			addDefender(unsafeWindow.players[def.id].position+"-"+unsafeWindow.players[def.id].name);
		}
	}
	catch (err) {
		console.log("yac defenders: "+err);
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
	
	var playText = document.getElementsByClassName("small_head play")[1].innerHTML;
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
	for (var i=0; i<unsafeWindow.play_data[1].length; i++) {
		if (unsafeWindow.play_data[1][i].id == wrid) {
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
            try{
                //console.log(wridx+" == "+i+" -- "+unsafeWindow.play_data[j][i]);
                var def = unsafeWindow.play_data[j][i];
                var defydepth = Math.abs(def.y - unsafeWindow.play_data[j][wridx].y);
                var defxdepth = Math.abs(def.x - unsafeWindow.play_data[j][wridx].x);
                var defdistance = Math.sqrt(defydepth*defydepth + defxdepth*defxdepth)/3;
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
            } catch(e) {}
		}
		if (fmin < 12) {
			defPlayers[fidx] += 0.35;
		}
		
		var balldata = unsafeWindow.play_data[j][0];
		var wrdata = unsafeWindow.play_data[j][wridx];
		if ((balldata.x-3 == wrdata.x) && (balldata.y == wrdata.y)) {
			break;
		}
	}
	//console.log(fidx+"-"+defidx+"-"+defmin+"="+defPlayers);
	if (defmin > 15) {
		//console.log("HiZ");
		defPlayers = null;
	}
	return defPlayers;
}

function findBlocker(players,play_data) {
	var playText = document.getElementsByClassName("small_head play")[1].innerHTML;
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
	if (rusherid == -1) return null;
	
	var offmin = 99999;
	var offPlayers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var offidx = -1;
	var j;
	for (j = 0; j < play_data.length; j++) {
		var k=0;
		if (rusherid <= 11) {
			k=1;
		}
		var offmin = 99999;
		var offidx = -1;
		//console.log(rusher+" - "+unsafeWindow.play_data[j][rusheridx].x+","+unsafeWindow.play_data[j][rusheridx].y);
		for (var i=(k*11)+1; i<(k*11)+12; i++) {
			//console.log(rusherid+"/"+rusheridx+" == "+i+" -- "+unsafeWindow.play_data[j][i].id);
			var off = unsafeWindow.play_data[j][i];
			var offydist = Math.abs(off.y - unsafeWindow.play_data[j][rusheridx].y)/3;
			var offxdist = Math.abs(off.x - unsafeWindow.play_data[j][rusheridx].x)/3;
			var offdistance = Math.sqrt(offydist*offydist + offxdist*offxdist);
			if (offdistance < offmin) {
				offmin = offdistance;
				offidx = i;
			}
			offPlayers[i] = Math.max(0,offPlayers[i]-0.1);
			if (offdistance < 6) {
				//console.log(unsafeWindow.players[off.id].name+" -- "+offdistance+" :: "+off.x+","+off.y);
				offPlayers[i] += 1;
			}
		}
		if (offmin < 3) {
			offPlayers[offidx] += 0.35;
		}
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

function addDefender(d) {
	var plays = document.getElementsByClassName('small_head play');
	var playText = plays[1].innerHTML;
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
		plays[1].innerHTML = playText.slice(0,en)+" ("+d+") "+playText.slice(en);
	}
}

function addYAC(yacnum) {
	var plays = document.getElementsByClassName('small_head play');
	for (var i=0; i < plays.length; i++) {
		if (plays[i].innerHTML.indexOf('pass to')!=-1){
			var str = plays[i].innerHTML;
			var idx = str.indexOf(" yd gain)")+" yd gain".length;
			if (idx < 8) {
				idx = str.indexOf(" yd loss)")+" yd loss".length;
			}
			if (idx < 8) return;
			plays[i].innerHTML = str.slice(0,idx)+", "+yacnum+" YAC"+str.slice(idx);	
		}
	}
}

function addDistance(d) {
	var playText = document.getElementsByClassName("small_head play")[1].innerHTML;
	if (playText.indexOf(' pass to ') != -1){			
		var s = " short";
		if (d >= mediumPass) s = " medium";
		if (d >= longPass) s = " long";
		
		var idx = playText.indexOf(" pass to ");
		playText = playText.slice(0,idx)+s+playText.slice(idx);
		document.getElementsByClassName("small_head play")[1].innerHTML = playText;
	}
}

function addBlocker(d) {
	var playText = document.getElementsByClassName("small_head play")[1].innerHTML;
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
		document.getElementsByClassName("small_head play")[1].innerHTML = playText;
	}
}
