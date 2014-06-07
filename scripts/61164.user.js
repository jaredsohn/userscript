// ==UserScript==
// @name           sckcovinfo
// @namespace      pbr/inf
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.11.02
// ==/UserScript==

window.setTimeout(
    function() {

        var button = document.createElement("input");
        button.setAttribute("value","Run Coverage");
        button.setAttribute("type","button");
        button.setAttribute("id","coveragebutton");
        button.addEventListener("click",function() { main(); },false);

        var spn = document.createElement("span");
		spn.setAttribute("id","coveragespan");
        spn.appendChild(button);

		var tbl = document.getElementById("pbp");
		tbl.parentNode.insertBefore(spn, tbl);

//		addTeam();
//main();
    }
, 100);

var playText = new Array();
var coverages = new Array();
var teamid = 604;
var maxgames = 1;
var season=14;
var tdiv=1;

function addTeam() {
	getInetPage("http://goallineblitz.com/game/team.pl?season="+season+"&team_id="+teamid, tmf);
}

function addGame(addr, page) {
	var div = document.createElement("div");
	div.innerHTML = page.responseText;
	document.body.appendChild(div);
}

function tmf(addr, page) {
	var div = document.createElement("div");
	div.innerHTML = page.responseText;

	var addr = 0;
	var a = div.getElementsByTagName("a");
	var current = window.location.toString().split("?")[1].split("&")[0];
	for (var i=0; i<a.length; i++) {
		if (a[i].href.toString().indexOf("game.pl") != -1) {
			addr++;
			if (a[i].href.toString().indexOf(current) == -1) {
				getInetPage(a[i].href.toString()+"&mode=pbp", addGame);			
			}
			else {
				console.log("skipping "+addr);
			}
		}
		if (addr == maxgames) break;
	}
}

function Coverage() {
	this.id;
	this.player;
	this.position;
	this.attempts = 0;
	this.completions = 0;
	this.yards = 0;
	this.pd = 0;
	this.toString = function() {
		return this.id+" ("+this.position+") "+this.player+" "+this.completions+"/"+this.attempts+" - "+this.yards;
	}
}

function Rush() {
	this.id;
	this.player;
	this.hurry = 0;
	this.sack = 0;
}

function main() {
//	alert("I am main!");
	tdiv = document.getElementsByClassName("team_logo").length/2;
	console.log("tdiv is ="+tdiv);
	var p = document.getElementsByClassName("pbp_play");
	var plays = new Array();
	for (var i=0; i<p.length/tdiv; i++) {
		plays[i] = p[i];
	}
	console.log(p.length+" -- "+plays.length);
	var replays = document.getElementsByClassName("pbp_replay");


	var threads = document.createElement("div");
	threads.setAttribute("id","threads");
	threads.setAttribute("number",plays.length);
	document.getElementById("footer").appendChild(threads);

	var cnt = 0;
	for (var ri=0; ri<plays.length; ri++) {
		var p = plays[ri];
//		console.log(ri+") "+p.textContent.toString().slice(0,20));
		var t = document.createElement("div");
		t.id = replays[ri].childNodes[0].href;
		threads.appendChild(t);

		if ((p.textContent.indexOf(" pass to ") == -1) && 
		    (p.textContent.indexOf(" sacked by ") == -1)) { 
			var threads = document.getElementById("threads");
			t.innerHTML = "<div></div><div></div>";
			continue;
		}
		playText[replays[ri].childNodes[0].href] = p.textContent;
		getInetPage(replays[ri].childNodes[0].href, def);
		cnt++;
	}
	console.log("count="+cnt);
	setTimeout(function() { finish(); }, 500);
}

function finish(input) {
console.log("input was "+input);
	var threads = document.getElementById("threads");
	var number = threads.getAttribute("number");

	var i = input;
	if (i == null) i = 0;
	for (; i<threads.childNodes.length; i++) {
		if (threads.childNodes[i].childNodes.length != 2) {
//			console.log("no children : "+i);
			document.getElementById("coveragespan").innerHTML = i +
					"/" + threads.childNodes.length;
			setTimeout(function() { finish(i); }, 3000);
			return;
		}
	}

	if (0 == 1) {
	}
	else {
		var spn = document.getElementById("coveragespan");
		spn.parentNode.removeChild(spn);

		var output = combine();
		coverages = output[0];
//		coverages = combineCoverage();
		console.log("done : "+coverages.length);

		var rows = new Array();
		for (var i=0; i<coverages.length; i++) {
//			console.log(coverages[i]);
			rows.push(coverages[i].player);
		}
		var table = getCoverageTable(0,rows);
		var tbl = document.getElementById("pbp");
		tbl.parentNode.insertBefore(table, tbl);
		for (var i=0; i<coverages.length; i++) {
			document.getElementById("cv-0-"+i+"-0").innerHTML = coverages[i].completions;
			document.getElementById("cv-1-"+i+"-0").innerHTML = coverages[i].attempts;
			var num = (100*coverages[i].completions / coverages[i].attempts).toFixed(0);   
			if (isNaN(num) == true) {
				num = 0;
			}
	
			document.getElementById("cv-2-"+i+"-0").innerHTML = num + "%";
			document.getElementById("cv-3-"+i+"-0").innerHTML = coverages[i].yards;
			document.getElementById("cv-4-"+i+"-0").innerHTML = coverages[i].pd;
		}

		var blocking = output[1];
//		coverages = combineBlocking();
		var rows = new Array();
		for (var i=0; i<blocking.length; i++) {
//			console.log(blocking[i]);
			rows.push(blocking[i].player);
		}
		var table = getBlockingTable(0,rows);
		var tbl = document.getElementById("pbp");
		tbl.parentNode.insertBefore(table, tbl);
		for (var i=0; i<blocking.length; i++) {
			document.getElementById("bl-0-"+i+"-0").innerHTML = blocking[i].hurry;
			document.getElementById("bl-1-"+i+"-0").innerHTML = blocking[i].sack;
		}
		var t = document.getElementById("threads");
//		t.parentNode.removeChild(t);
	}
}

function combine() {
	var rush = new Array();
	var pass = new Array();
	var threads = document.getElementById("threads");
//	for (var cidx=0; cidx<threads.childNodes.length; cidx++) {
//		var child = threads.childNodes[cidx];
	var replays = document.getElementsByClassName("pbp_replay");
	for (var cidx=0; cidx<replays.length/tdiv; cidx++) {
		var child = document.getElementById(replays[cidx].childNodes[0].href);
		if (child == null) continue;
		if (child.childNodes.length == 0) continue;

		var p = child.childNodes[0].innerHTML;
		var t = p.split(" ",5);
		if (t.length >= 5) {
			var cov = new Coverage();
			cov.id = parseInt(t[0]);
			cov.completions = parseInt(t[1]);
			cov.attempts = 1;
			cov.yards = parseInt(t[2]);
			cov.pd = parseInt(t[3]);
			cov.player = p.slice(t[0].length+t[1].length+t[2].length+5);
			pass.push(cov);
		}

		if (child.childNodes.length > 1) {
			var bl = child.childNodes[1].innerHTML;

			var t = bl.split(" ",3);
			if (t.length >= 3) {
				var r = new Rush();
				r.id = parseInt(t[0]);
				if (t[1] == "0") r.hurry = 1;
				else r.sack = 1;
				r.player = bl.slice(t[0].length+3);
				rush.push(r);
			}
		}
	}
//	threads.parentNode.removeChild(threads);
console.log("coverages == "+pass.length);
console.log("rushes == "+rush.length);

	var out = new Array();

	c = pass;
	console.log("combine coverage "+c.length);
	var output = new Array();
	for (var j=0; j<c.length; j++) {
		var id = c[j].id;
		var idx = -1;
		for (var i=0; i<output.length; i++) {
			if (c[j].id == output[i].id) {
				idx = i;
				break;
			}
		}
		if (idx == -1) {
			output.push(c[j]);
		}
		else {
			output[idx].completions += c[j].completions;
			output[idx].attempts += c[j].attempts;
			output[idx].yards += c[j].yards;
			output[idx].pd += c[j].pd;
		}
	}
	out[0] = output;

	c = rush;
	console.log("combine blocking "+c.length);
	var output = new Array();
	for (var j=0; j<c.length; j++) {
		var id = c[j].id;
		var idx = -1;
		for (var i=0; i<output.length; i++) {
			if (c[j].id == output[i].id) {
				idx = i;
				break;
			}
		}
		if (idx == -1) {
			output.push(c[j]);
		}
		else {
			output[i].hurry += c[j].hurry;
			output[i].sack += c[j].sack;
		}
	}
	out[1] = output;

	return out;
}

function def(addr, page) {
//console.log("pt-- "+playText[addr]);
//console.log(page.responseText);
    var idx = page.responseText.indexOf("var players =");
    var p = page.responseText.slice(idx+"var players =".length);
    p = p.slice(0,p.indexOf("var play_data"));
    var pd = page.responseText.slice(page.responseText.indexOf("var play_data =")+"var play_data =".length);
    pd = pd.slice(0,pd.indexOf(";"));
    var pt = page.responseText.slice(page.responseText.indexOf("var ptid =")+"var ptid =".length);
    pt = pt.slice(0,pt.indexOf(";"));
    var newplayers = null;
    var newplay_data = null;
    eval("newplayers = "+p);
    newplay_data = eval(pd);
    eval("ptid = "+pt);

//	console.log(newplayers+" -- "+newplay_data.length);
	var res = defender_main(newplayers, newplay_data, playText[addr]);
//	console.log("def end");

	var t = document.getElementById(addr);
	if (t == null) console.log("t element missing : "+addr);
	for (var i=0; i<res.length; i++) {
		var div = document.createElement("div");
		div.innerHTML = res[i];
		t.appendChild(div);
	}
	for (var i=t.childNodes.length; i<2; i++) {
		t.innerHTML += "<div></div>";
	}
}

function defender_main(players, play_data, playText) {
    var output = new Array();
    output[0] = null;
    output[1] = null;
    var playerids = new Array();
    for (var i = 0; i < play_data[0].length; i++) {
        var data = play_data[0][i];
        if (data.id != 'ball') {
            playerids.push (data.id);
        }
    }

    var receiver = getReceiverName(playText);
    //console.log("receiver is : '"+receiver+"'");
    if (receiver != null) {
        var wrid = -1;
        for (var i = 0; i < playerids.length; i++) {
            var plyr = players[playerids[i]];
			//console.log("'"+plyr.name+"' -- '"+receiver+"'");
            if (plyr.name == receiver) {
                wrid = playerids[i];
                break;
            }
        }
        if (wrid == -1) {
//console.log("no receiver : "+playText);
			return ["",""];
		}

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
                distY = balldata.y //added this
            }
            if (distance == 0) {
                catchY = balldata.y
                distY = balldata.y //added this
                break;
            }
        //console.log(min+" : "+balldata+" : "+snapdata+" : "+xdepth+" : "+ydepth);
        }
				var c = -1;
				for (var v=0; v<playerids.length; v++) {
					if (players[playerids[v]].position == "C") {
						for (var w=0; w<play_data[0].length; w++) {
							if (play_data[0][w].id == playerids[v]) {
								c = w;
								break;
							}
						}
						break;
					}
				}
				console.log(playText);
				console.log("C is : "+c+" -- "+(distY*3+40-6)+" : "+(play_data[0][c].y*3+40-6));
				console.log("Pass Length = "+parseInt(distY-play_data[0][c].y)/3);

        try {
            var defPlayers = findDefender(players, play_data, playText);
            if (defPlayers != null) {
                var max = findMax(defPlayers);
                var def = play_data[0][max];
//                console.log(max+"-"+def.id+"-"+players[def.id].position+"-"+players[def.id].name);

		var pd = 0;
		if (playText.indexOf("[deflected by ") != -1) pd = 1;

		var result = null;
		playText = playText.split("(");
		for (var i=0; i<playText.length; i++) {
			if (playText[i].indexOf("yd gain)") != -1) {
				result = parseFloat(playText[i]);				
				break;
			}
			else if (playText[i].indexOf("yd loss)") != -1) {
				result = parseFloat(playText[i]);				
				break;
			}
			else if (playText[i].indexOf("no gain)") != -1) {
				result = 0;				
				break;
			}
		}
//console.log("result is : "+players[def.id].position+"-"+players[def.id].name+" : "+result);
		var c = new Coverage();
		c.id = def.id;
		c.position = players[def.id].position;
		c.player = players[def.id].name;
		c.attempts = 1;
		c.completions = 0;
		c.yards = 0;
		if (result != null) {
			c.completions++;
			c.yards += result;
		}
		else {
			c.pd = pd;
		}
//		coverages.push(c);
//		console.log(c);
		output[0] = c.id+" "+c.completions+" "+c.yards+" "+c.pd+" "+c.player;
            }
        }
        catch (err) {
            console.log("yac defenders: "+err);
			output = "";
        }
    }

    
    try {
        var blockers = findBlocker(players, play_data, playText);
        if (blockers != null) {
            var max = findMax(blockers);
//console.log(blockers);
            var def = play_data[0][max];
//            console.log(max+"-"+def.id);
if (def.id == "ball") {
	max = findMax(blockers.slice(1));
}
            var def = play_data[0][max];
//            console.log(max+"-"+def.id);
//	    console.log(players[def.id].position+"-"+players[def.id].name);
	    
	    var sh = "0";
	    if (playText.indexOf(" sacked by ") != -1) {
		sh = "1";
	    }
	
//   	    console.log(def.id+" "+sh+" "+players[def.id].name);
   	    output[1] = def.id+" "+sh+" "+players[def.id].name;
//            addBlocker(players[def.id].position+"-"+players[def.id].name);
        }
	else { 
//	    console.log("no blockers : "+playText); 
	}
    }
    catch (err) {
        console.log("yac blockers: "+err);
		output[1] = "";
    }

	return output;	    
}

function findDefender(players, play_data, outcome) {
    var playerids = new Array();
    for (var i = 1; i < play_data[0].length; i++) {
        var data = play_data[0][i];
        if (data.id != 'ball') {
            playerids.push (data.id);
        }
    }

    var playText = outcome;
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
            try{
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
            } catch(e) {}
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
        //console.log("HiZ");
        defPlayers = null;
    }
    return defPlayers;
}

function findBlocker(players,play_data, playText) {
    var outcome = playText.toString();
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
    
    var rusher;
    var idx = outcome.indexOf(" sacked by ")+" sacked by ".length;
    if (idx != 10) {
        rusher = outcome.slice(idx,idx+outcome.slice(idx).indexOf(" ("));
    }
    else {
        idx = outcome.indexOf(", hurried by ")+", hurried by ".length;
        rusher = outcome.slice(idx,idx+outcome.slice(idx).indexOf(", "));
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
//    console.log("rusher="+rusherid+" : "+rusheridx+" : "+players[rusherid].name);
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

function getInetPage(address, func, target) {
//    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onreadystatechange = function() {
		if (target != null) {
			var d = ["..","...","."];
			var str = target.innerHTML.split(" ");
			target.innerHTML = str[0]+" "+d[str[1].length-1];
    	}
	};
	req.onload = function() {
		if (this.status != 200) {
			console.log("pbr gm script: Error "+this.status+" loading "+address);
			getInetPage(address, func, target);
		}
		else {
//			console.log("loaded: "+address)
			func(address,this);
		}
	};

	req.send(null);
	return req;
}

function getCoverageTable(index, rows) {
	var title = "Coverage";
	var columns = ["Name","Cmp", "Att","Pct","Yards", "PD"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"cv",true);
}

function getBlockingTable(index, rows) {
	var title = "Blocking";
	var columns = ["Name","Hurries","Sacks"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"bl",true);
}

function getTable(title, rows, columns, index, prefix, sortable) {
	var t = document.createElement("table");
	t.setAttribute("border","1");
	t.setAttribute("cellspacing","0");
	t.setAttribute("style","width: 485px;visibility: visible;");
	t.setAttribute('id','scout-'+prefix+""+index+'-table');

	var tr = document.createElement("tr");
	tr.setAttribute('class','nonalternating_color pbp_pbr_title');

	var td = document.createElement("td");
	td.setAttribute('id','team'+index+""+prefix);
	td.setAttribute('colspan',columns.length+1);
	td.setAttribute('align','center');
	td.appendChild(document.createTextNode(title));
	tr.appendChild(td);
	t.appendChild(tr);

	var tr2 = document.createElement("tr");
	tr2.setAttribute('class','nonalternating_color2 pbp_pbr_title');
	var first = document.createElement("td");
	first.setAttribute("align","left");
	first.appendChild(document.createTextNode(columns[0]));
	tr2.appendChild(first);
	if (sortable == true) {
		tr2.addEventListener("click",sortEvent,true);
	}
	for (var x=1; x<columns.length; x++) {
		var colname = document.createElement("td");
		var colname = document.createElement("td");
		colname.setAttribute('align','center');
		var tn = document.createTextNode(columns[x]);
		colname.appendChild(tn);
		tr2.appendChild(colname);
	}
	t.appendChild(tr2);

	for (var y=0; y<rows.length; y++) {
		var tr3 = document.createElement("tr");
		tr3.setAttribute('class','alternating_color'+(y%2+1)+' pbp_pbr_title_row');
		var rowname = document.createElement("td");
		rowname.appendChild(document.createTextNode(rows[y]));
		tr3.appendChild(rowname);
		for (var x=1; x<columns.length; x++) {
			var stat = document.createElement("td");
			stat.setAttribute('id',prefix+'-'+(x-1)+'-'+y+'-'+index);
			stat.setAttribute('align','center');
			stat.appendChild(document.createTextNode('('+(x-1)+','+y+')'));
			tr3.appendChild(stat);
		}
		t.appendChild(tr3);
	}
	return t;
}

function sortEvent(evt) {
	sortTable(evt.target.parentNode.parentNode,evt.target.cellIndex);
	return true;
}

function sortTable(table, column) {
	var rows = table.rows;
	var viz = table.getAttribute("style");
	table.setAttribute("style","visibility: hidden;");
	for (var i=2; i<rows.length-1; i++) {
		var idx = i;
		for (var j=i; j<rows.length-1; j++) {
			var lrow = rows.item(idx);
			var lcell = lrow.cells.item(column);
			var rrow = rows.item(j+1);
			var rcell = rrow.cells.item(column);
			var left = parseFloat(lcell.innerHTML);
			var right = parseFloat(rcell.innerHTML);
			if (isNaN(left) || isNaN(right)) {
				left = lcell.innerHTML.toLowerCase();
				right = rcell.innerHTML.toLowerCase();
				if (left > right) {
					idx = j+1;
				}
			}
			else {
				if (left < right) {
					idx = j+1;
				}
			}
		}
		if (idx != -1) {
			var r = table.rows.item(idx);
			table.deleteRow(idx);
			var newRow = table.insertRow(i);
			newRow.setAttribute("class","alternating_color"+(i%2+1)+" pbp_pbr_title_row");
			for (var x=0; x<r.cells.length; x++) {
				var cell = newRow.insertCell(x);		
				cell.setAttribute("align",r.cells.item(x).getAttribute("align"));
				cell.setAttribute("id",r.cells.item(x).getAttribute("id"));
				cell.innerHTML = r.cells.item(x).innerHTML;
			}
		}
	}
	if (rows.length != 2) {
		var lastRow = table.rows.item(rows.length-1);
		lastRow.setAttribute("class","alternating_color"+((rows.length-1)%2+1)+" pbp_pbr_title_row");
	}
	table.setAttribute("style",viz);
}


