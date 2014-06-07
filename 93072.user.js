// ==UserScript==
// @name           GLB Roster Age Plot
// @namespace      pbr/rap
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.12.20
// ==/UserScript==

var canvasX = 300;
var canvasY = 100;

var ymul = canvasY/52;
var xmul = canvasX/560;

window.setTimeout( function() {
	var ages = getAges().sort();

	setupCanvas();
	
	plot(ages);
}, 1000);

function getAges() {
	var ages = new Array();
	var content = document.getElementById("content_rosters");
//td class name bug here
	var ageDivs = content.getElementsByClassName("player_level");
	for (var i=1; i<ageDivs.length; i = i+2) {
		ages.push(ageDivs[i].innerHTML);
	}
	return ages;
}

function setupCanvas() {
    var canvas = document.createElement("canvas");
	canvas.setAttribute("width", canvasX);
	canvas.setAttribute("height",canvasY);
    var ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,canvasX, canvasY);

	ctx.fillStyle = "yellow";
	for (var i=80*xmul; i<canvasX; i=i+80*xmul) {
		ctx.fillRect(i, 0, 1, canvasX*xmul);
	}

	var div = document.getElementsByClassName("content_container")[0];
	div.childNodes[5].appendChild(canvas);
}

function plot(ages) {
	var mi = 0;
	var ma = [400,560,1000]
	var mc = ["green","blue","red"];

	var last = [0,0];
	var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
	ctx.beginPath();
    ctx.strokeStyle = mc[mi];
	ctx.moveTo(ages[0],0);

	for (var i=0; i<ages.length; i++) {
		var x = ages[i]*xmul;
		var y = i*ymul;
		if (ages[i] > ma[mi]) {
			mi++;
			ctx.stroke();

			ctx.beginPath();
			ctx.strokeStyle = mc[mi];
			ctx.moveTo(last[0],last[1]);
		}
		ctx.lineTo(x, y);
		last = [x,y];
	}
	ctx.moveTo(0,0);
	ctx.closePath();
	ctx.stroke();
}

