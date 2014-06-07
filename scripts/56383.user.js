// ==UserScript==
// @name           Player Scout On Replay
// @namespace      psor
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @version        13.12.29
// @require        http://userscripts.org/scripts/source/53096.user.js
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

var scriptName = "DB Player Scout";
var scriptVersion = "13.12.29";
var scriptWebpage = "http://userscripts.org/scripts/show/56383";
/*
 *
 * pabst was here 09/08/24+
 *
 *
 */

var alwaysAnimate = false;
var period = 5; //proper SMA uses an ODD number
var mul = 1;
var canvasY = 100;
var canvasX = 800;

var imageData = null;

window.setTimeout( function() {
    init();
}, 100);

function activate(e) {
    lock();
    console.log("activate "+scriptName);

	pageSetup();
    player_scout_clear();

    unlock();
}

function pageSetup() {
	if (document.getElementById("changeticks00d") == null) {
		var row = document.getElementById("changeticks10d").parentNode.parentNode.parentNode.insertRow(2);
		row.setAttribute("class","alternating_color2");
		row.setAttribute("style","text-align: right");
		row.innerHTML = '<td style="text-align:left">0-9 degrees</td><td id="changeticks00d"></td><td id="changeticks00V"></td><td id="changeticks00de"></td><td id="changeticks00avde"></td><td id="changeticks00ac"></td><td id="changeticks00avac"></td>'
	}

	if (document.getElementById("animateScout") == null) {
		var inp = document.createElement("input");
		inp.setAttribute("id","animateScout");
		inp.setAttribute("type","checkbox");
		inp.checked = alwaysAnimate;

		var td = document.createElement("td");
		td.innerHTML = "Animate&nbsp;";
		td.setAttribute("text-align","right");
		td.appendChild(inp);

		var row = document.getElementById("avgspeed").parentNode.parentNode.rows[0];
		row.cells[0].setAttribute("colspan","1");
		row.cells[0].removeAttribute("width");
		row.appendChild(td);
	}

	if (document.getElementById("rrframe") == null) {
		var div = document.createElement("input");
		div.setAttribute("type","hidden");
		div.setAttribute("id","rrframe");
		div.value = 0;
		document.getElementById("footer").appendChild(div);
	}
	imageData = null;
    document.getElementById("rrframe").removeEventListener("change",function(e) { updateCanvas(e) }, false);
    document.getElementById("rrframe").addEventListener("change",function(e) { updateCanvas(e) }, false);
}

function updateCanvas(e) {
	if (imageData == null) return;
	if (document.getElementById("animateScout").checked == false) return;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

	ctx.putImageData(imageData, 0, 0);

	var frame = parseInt(document.getElementById("rrframe").value);
	var x = Math.floor((frame-1)*(canvasX/(unsafeWindow.play_data.length*2-1)));
	
	ctx.beginPath();
    ctx.strokeStyle = "blue";
	ctx.strokeRect(x,0,canvasX/(unsafeWindow.play_data.length*2-1),canvasY);
	ctx.closePath();
	ctx.stroke();
}

function player_scout_clear() {
    var canvas = document.getElementById("canvas");
	canvas.setAttribute("width", canvasX);
	canvas.setAttribute("height",canvasY);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvasX,canvasY)

    var head = document.getElementsByClassName("nonalternating_color forum_head");
    for (var i=0; i<head.length; i++) {
        for (var r=0; r<head[i].parentNode.rows.length; r++) {
            var row = head[i].parentNode.rows[r];
            if (row.getAttribute("class") != null) {
                if (row.getAttribute("class").indexOf("alternating") == 0) {
                    for (var c=1; c<row.cells.length; c++) {
                        row.cells[c].innerHTML = "";
                    }
                }
            }
        }
    }

    var playernames2 = getElementsByClassName('player_icon o_icon', document)
    var playernames = getElementsByClassName('player_icon d_icon', document)
    for(var i=0,j=playernames2.length; i<j; i++) {
        playernames2[i].removeEventListener('click', calc, false)
        playernames[i].removeEventListener('click', calc, false)
        playernames2[i].addEventListener('click', calc, false)
        playernames[i].addEventListener('click', calc, false)
    }
}

function mavg(arr, p) {
	var res = new Array();
	for (var i=0; i<arr.length; i++) {
		var total = 0;
		var x=0;
		for (var k=0-(p>>1); k<=(p>>1); k++) {
			if (arr[i+k] == null) continue;
			total += arr[i+k];
			x++;
		}
		res[i] = total/x;
	}
	return res;
}

function sum(arr){
	var out = 0;
    for(var i = 0; i<arr.length; i++) {
		if (arr[i] == null) continue;
		out += arr[i];
	}
    return out;
};

function rtod(x) {
	return (x*180)/Math.PI;
}

function calc(e) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvasX,canvasY)
    maxA = 0;
    selected.setAttribute('style', 'background-color:none');
    selected = e.target;
    var old_color = e.target.getAttribute('style');
    var playerid = e.target.parentNode.getAttribute('id');
    playerid = playerid.split('pos_dot_', 2)[1];

    temp2 = 0;
    test2.length = 0;
    e.target.setAttribute('style', 'background-color:black');

    playerid = parseInt(playerid);
    var X_Coords = new Array();
    var Y_Coords = new Array();
    var P_Coords = new Array();

	var coords = [];
	var f = 0;
	do {
        for (var i=0; i<unsafeWindow.play_data[f].length; i++) {
            if (unsafeWindow.play_data[f][i].id == playerid) {
                X_Coords[f] = unsafeWindow.play_data[f][i].x*mul;
                Y_Coords[f] = unsafeWindow.play_data[f][i].y*mul;
                if (unsafeWindow.play_data[f][i].p != null) {
                    P_Coords[f] = unsafeWindow.play_data[f][i].p;
                }

				var x1 = unsafeWindow.play_data[f][i].x;
				var y1 = unsafeWindow.play_data[f][i].y;
				coords[f] = new Object();
				coords[f].x = x1;
				coords[f].y = y1;
				coords[f].p = unsafeWindow.play_data[f][i].p;
				break;
			}
		}
		f++;
	} while (unsafeWindow.play_data[f] != null);
    if (X_Coords[0] == null) return;

	var acc = new Array();
	var accavg = 0;
	var accmax = 0;
	var acctick = -1;
	var accnum = 0;

	var spd = new Array();
	var spdavg = 0;
	var spdmax = -1;
	var spdtick = -1;
	var spdnum = 0;

	var turnspeed = new Array();
	var turngain = new Array();
	var turnloss = new Array();
	var lastangle = 0;

    for (var f=0; f<coords.length-1; f++) {
		var dx = coords[f+1].x-coords[f].x;
		var dy = coords[f].y-coords[f+1].y;

		var xsqr = Math.pow(dx,2);
		var ysqr = Math.pow(dy,2);

		var s = Math.sqrt(xsqr+ysqr);
		spd.push(s);
		if (s > spdmax) {
			spdmax = s;
			spdtick = f;
		}
		spdnum++;

		if (coords[f].p == null) {
			if (f > 0) {
				acc[f] = parseFloat(spd[f] - spd[f-1]);

				if (acc[f] > accmax) {
					accmax = acc[f];
					acctick = f;
				}
				if (acc[f] > 0) {
					accavg += acc[f];
					accnum++;
				}
			}
		}

		var angle = Math.atan2(dx, dy);
		var dangle = Math.max(angle, lastangle) - Math.min(angle, lastangle);
//		console.log(f+") "+dx+","+dy+" --> "+rtod(angle)+" : "+rtod(lastangle)+" : "+rtod(dangle));

		if (turnspeed[Math.floor(rtod(dangle)/10)] == null) turnspeed[Math.floor(rtod(dangle)/10)] = [0,0];
		turnspeed[Math.floor(rtod(dangle)/10)][0] += 1;
		turnspeed[Math.floor(rtod(dangle)/10)][1] += spd[f];

		if (acc[f] > 0) {
			if (turngain[Math.floor(rtod(dangle)/10)] == null) turngain[Math.floor(rtod(dangle)/10)] = [0,0];
			turngain[Math.floor(rtod(dangle)/10)][0] += 1;
			turngain[Math.floor(rtod(dangle)/10)][1] += acc[f];
		}
		else if (acc[f] < 0) {
			if (turnloss[Math.floor(rtod(dangle)/10)] == null) turnloss[Math.floor(rtod(dangle)/10)] = [0,0];
			turnloss[Math.floor(rtod(dangle)/10)][0] += 1;
			turnloss[Math.floor(rtod(dangle)/10)][1] += acc[f];
		}
		lastangle = angle;
	}
	spdavg = sum(spd) / spdnum;
	accavg = accavg / accnum;

	ctx.beginPath();
    ctx.strokeStyle = "black";
	ctx.moveTo(0,0);
	for (var i=0; i<spdmax; i++) {
		ctx.lineTo(0, canvasY - i*(canvasY-1)/spdmax);
		ctx.lineTo(canvasX, canvasY - i*(canvasY-1)/spdmax);		
		ctx.moveTo(0,0);
	}
	ctx.closePath();
	ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0, canvasY);
	for (var i=0; i<spd.length; i++) {
		ctx.lineTo((i+1)*(canvasX/spd.length), canvasY - spd[i]*(canvasY-1)/spdmax);
	}
	ctx.moveTo(canvasX,canvasY);
	ctx.closePath();
	ctx.stroke();

	for (var r=0; r<15; r++) {
		var arr = mavg(spd, r*2+1);
		console.log("period "+(r*2+1)+": "+Math.max.apply(Math, arr)*10);
	}
	var spd2 = mavg(spd, period);
	var spd2max = Math.max.apply(Math, spd2);
	var spd2avg = sum(spd2)/spd2.length;
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(0, canvasY);
	for (var i=0; i<spd2.length; i++) {
		ctx.lineTo((i+1)*(canvasX/spd2.length), canvasY - spd2[i]*(canvasY-1)/spdmax);
	}
	ctx.moveTo(canvasX,canvasY);
	ctx.closePath();
	ctx.stroke();

    imageData = ctx.getImageData(0, 0, canvasX, canvasY);

	var mul = 10;//27;
	document.getElementById("avgspeed").innerHTML = (spdavg*mul).toFixed(2)+"/"+(spd2avg*mul).toFixed(2)+"(sma"+period+")";
	document.getElementById("maxspeed").innerHTML = (spdmax*mul).toFixed(2)+"/"+(spd2max*mul).toFixed(2)+"(sma"+period+")";
	document.getElementById("maxspeedtick").innerHTML = spdtick+" ticks";
	document.getElementById("totalticks").innerHTML = spd.length;
    document.getElementById('maxaccel').innerHTML = (accmax*mul).toFixed(2)
    document.getElementById('avgaccel').innerHTML = (accavg*mul).toFixed(2)
    document.getElementById('maxacceltick').innerHTML = acctick + ' ticks'

	for (var i=0; i<6; i++) {
		if (turnspeed[i] == null) {
			document.getElementById("changeticks"+i+"0d").innerHTML = 0;
		}
		else {
			document.getElementById("changeticks"+i+"0d").innerHTML = turnspeed[i][0];
		}

		if (turnspeed[i] == null) turnspeed[i] = [1,0];
		if (turngain[i] == null) turngain[i] = [1,0];
		if (turnloss[i] == null) turnloss[i] = [1,0];

		document.getElementById("changeticks"+i+"0V").innerHTML = (10*turnspeed[i][1] / turnspeed[i][0]).toFixed(2);
		document.getElementById("changeticks"+i+"0ac").innerHTML = (10*turngain[i][1]).toFixed(2);
		document.getElementById("changeticks"+i+"0avac").innerHTML = (10*turngain[i][1] / turngain[i][0]).toFixed(2);
		document.getElementById("changeticks"+i+"0de").innerHTML = (10*turnloss[i][1]).toFixed(2);
		document.getElementById("changeticks"+i+"0avde").innerHTML = (10*turnloss[i][1] / turnloss[i][0]).toFixed(2);
	}

}

