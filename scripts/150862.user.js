// ==UserScript==
// @name        GLB Canvas Replay Conversion
// @namespace   pbr/canvas
// @include     http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright   2012, pabst
// @license     (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version	12.11.30
// ==/UserScript==

/*
 *
 * pabst did this 12/11/27+
 *
 *
 */

unsafeWindow.pause();
document.getElementById("offense_container").style.visibility = "hidden";
document.getElementById("defense_container").style.visibility = "hidden";
document.getElementById("offense_container").style.display = "none";
document.getElementById("defense_container").style.display = "none";

var play_data = null;
var imageData = [];

if (!window.requestAnimationFrame) {
	requestAnimFrame = (function () {
		return  window.requestAnimationFrame       || 
	        	window.webkitRequestAnimationFrame || 
	              	window.mozRequestAnimationFrame    || 
	              	window.oRequestAnimationFrame      || 
	              	window.msRequestAnimationFrame     || 
	              	function(callback, element) {
				console.log("no request animation frame!!");
	                	window.setTimeout(callback, 1000 / 20);
	              	};
	}) ();
};

window.setTimeout(
	function() {
		if (unsafeWindow.defaultFrameSpeed != 100) {
			console.log("replays must be set to 10fps for this script to work : "+unsafeWindow.defaultFrameSpeed);
			unsafeWindow.play();
		}
		else {
			main();
		}
	}
, 100);

function main() {
	var container = document.getElementById("replay_container")
	container.style.height = "500px";
	container.style.width = "520px";
	var area = document.getElementById("replay_area");
	container.removeChild(area);

	play_data = fixFrames();
	fixButtons();

	initBackground();
	initForeground();
	initOffense();
	initDefense();
	initReplayInfo();

	drawFrame(0,0);
	setTimeout(function() { 
		isPlaying = true;
		document.getElementById("pause_button").visibility = "visible";
		document.getElementById("play_button").visibility = "hidden";
		render(); 
	}, 2500);
}

function initBackground() {
	var canvas = document.createElement("canvas");
	canvas.style.position = 'absolute';
	canvas.setAttribute("id","background");
	canvas.setAttribute("width","520px");
	canvas.setAttribute("height","500px");

	var container = document.getElementById("replay_container")
	container.appendChild(canvas);

	var context = canvas.getContext("2d");
	context.save();
}

function initForeground() {
	var canvas = document.createElement("canvas");
	canvas.style.position = 'absolute';
	canvas.setAttribute("id","foreground");
	canvas.setAttribute("width","520px");
	canvas.setAttribute("height","500px");

	var container = document.getElementById("replay_container")
	container.appendChild(canvas);

	var context = canvas.getContext("2d");
	context.save();
}

function initOffense() {
	var canvas = document.createElement("canvas");
	canvas.style.position = 'absolute';
	canvas.style.top = "20px";

	canvas.setAttribute("id","offense");
	canvas.setAttribute("width","20px");
	canvas.setAttribute("height","460px");

	var container = document.getElementById("replay_container")
	container.appendChild(canvas);

	canvas.addEventListener("click", offenseClicked, false);
}

function offenseClicked() {
	renderOffenseLineup();
}

function initDefense() {
	var canvas = document.createElement("canvas");
	canvas.style.position = 'absolute';
	canvas.style.left = "500px";
	canvas.style.top = "20px";

	canvas.setAttribute("id","defense");
	canvas.setAttribute("width","20px");
	canvas.setAttribute("height","460px");

	var container = document.getElementById("replay_container")
	container.appendChild(canvas);

	canvas.addEventListener("click", defenseClicked, false);
}

function defenseClicked() {
	renderDefenseLineup();
}

function initReplayInfo() {
	var canvas = document.createElement("canvas");
	canvas.style.position = 'absolute';
	canvas.setAttribute("id","replayInfo");
	canvas.setAttribute("width","520px");
	canvas.setAttribute("height","20px");

	var container = document.getElementById("replay_container")
	container.appendChild(canvas);

	var canvas = document.createElement("canvas");
	canvas.style.position = 'absolute';
	canvas.style.top = "480px";
	canvas.setAttribute("id","playResults");
	canvas.setAttribute("width","520px");
	canvas.setAttribute("height","20px");

	var container = document.getElementById("replay_container")
	container.appendChild(canvas);
}

function getTeamBColor(id) {
	var team = unsafeWindow.ptid[id];
	var position = unsafeWindow.players[id].position;
	var fcolor = unsafeWindow.home_color2+"_border_home";
	var bcolor = unsafeWindow.home_color1;
	if (unsafeWindow.home != team) {
		fcolor = unsafeWindow.away_color2+"_border";
		bcolor = unsafeWindow.away_color1;
	}
	bcolor = bcolor.replace("mid_","medium");	
	bcolor = bcolor.replace("_","");
	return bcolor;
}

function getTeamFColor(bcolor) {
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	context.strokeStyle = bcolor;
	var color = context.strokeStyle.toString().slice(1);
	var r = parseInt(color.slice(0,2), 16);
	var g = parseInt(color.slice(2,4), 16);
	var b = parseInt(color.slice(4,6), 16);
	if ((r+g+b)/3 > 128) {
		return "black";
	}
	else {
		return "white";
	}
}

function renderReplayInfo() {
	if (imageData["replayInfo"] == null) {
		var canvas = document.createElement("canvas");
		canvas.setAttribute("width","520px");
		canvas.setAttribute("height","20px");
		var context = canvas.getContext("2d");

		var gradient = context.createLinearGradient(0,0,0,20);
		gradient.addColorStop(0,"rgb(100,100,100)");
		gradient.addColorStop(1,"rgb(40,40,40)");

		context.lineWidth = 2;
		context.fillStyle = gradient;
		context.fillRect(0,0,520,20);

		context.font = "bold 18px sans-serif";
		context.fillStyle = "#ffcc00";
		var info = document.getElementsByTagName("h1")[0].textContent;
		var length = context.measureText(info.toString());
		context.fillText(info.toString(), 260-length.width/2,16);

		var p = play_data[0][1];
		var id = p.id;
		var bcolor = getTeamBColor(id);
		var fcolor = getTeamFColor(bcolor);

		context.lineWidth = 2;
		context.fillStyle = bcolor;
		context.strokeStyle = fcolor;

		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(40, 0);
		context.lineTo(60,20);
		context.lineTo(0,20);
		context.lineTo(0,0);
		context.closePath();
		context.fill();
		context.stroke();
		
		context.font="bold 16px sans-serif";
		var score = document.getElementById("off_score").textContent;
		var length = context.measureText(score.toString());
		context.fillStyle = fcolor;
		context.fillText(score.toString(), 20-length.width/2,16);

		var p = play_data[0][12];
		var id = p.id;
		var bcolor = getTeamBColor(id);
		var fcolor = getTeamFColor(bcolor);

		context.lineWidth = 2;
		context.fillStyle = bcolor;
		context.strokeStyle = fcolor;

		context.beginPath();
		context.moveTo(520,0);
		context.lineTo(480, 0);
		context.lineTo(460,20);
		context.lineTo(520,20);
		context.lineTo(520,0);
		context.closePath();
		context.fill();
		context.stroke();

		context.font="bold 16px sans-serif";
		var score = document.getElementById("def_score").textContent;
		var length = context.measureText(score.toString());
		context.fillStyle = fcolor;
		context.fillText(score.toString(), 500-length.width/2,16);

		imageData["replayInfo"] = canvas;
	}
	var canvas = document.getElementById("replayInfo");
	var context = canvas.getContext("2d");
	context.drawImage(imageData["replayInfo"],0,0);

	if (imageData["playResults"] == null) {
		var canvas = document.createElement("canvas");
		canvas.setAttribute("width","520px");
		canvas.setAttribute("height","20px");
		var context = canvas.getContext("2d");

		var gradient = context.createLinearGradient(0,0,0,20);
		gradient.addColorStop(0,"rgb(100,100,100)");
		gradient.addColorStop(1,"rgb(40,40,40)");

		context.lineWidth = 2;
		context.fillStyle = gradient;
		context.fillRect(0,0,520,20);

		var size = 14;
		do {
			context.font = "bold "+size+"px sans-serif";
			context.fillStyle = "#ffcc00";
			var info = document.getElementById("outcome_content").textContent;
			var length = context.measureText(info.toString());
			size--;
		}
		while (length.width > 520);
		context.fillText(info.toString(), 260-length.width/2,14);
		imageData["playResults"] = canvas;
	}
	var canvas = document.getElementById("playResults");
	var context = canvas.getContext("2d");
	context.drawImage(imageData["playResults"],0,0);
}

function renderOffenseBar(frame, pct, loc) {
	if (imageData["offenseBar"] == null) {
		var canvas = document.createElement("canvas");
		canvas.setAttribute("width","20px");
		canvas.setAttribute("height","480px");
		var context = canvas.getContext("2d");
	
		var p = play_data[0][1];
		var id = p.id;
		var bcolor = getTeamBColor(id);
		var fcolor = getTeamFColor(bcolor);

		context.lineWidth = 3;
		context.fillStyle = bcolor;
		context.strokeStyle = fcolor;
		context.fillRect(0,0, 20,460);
		context.strokeRect(0,0, 20,460);
	
		var teamName = document.getElementsByClassName("secondary_container")[0].textContent;
		context.fillStyle = fcolor;
		context.lineWidth=1;
		context.font="bold 14px sans-serif";
		context.save();
	
		context.rotate(Math.PI/2);
		context.fillText(teamName, 50,-6);
		context.restore();
	
		imageData["offenseBar"] = canvas;
	}

	var canvas = document.getElementById("offense");
	var context = canvas.getContext("2d");
	context.drawImage(imageData["offenseBar"],0,0);

}

var offenseLineupVisible = false;
function renderOffenseLineup(frame, pct, loc) {
	offenseLineupVisible = !offenseLineupVisible;
	
	if (offenseLineupVisible == true) {
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id","offenseLineup");
		canvas.setAttribute("width","200px");
		canvas.setAttribute("height","480px");
		canvas.style.position = "absolute";
		canvas.style.left = "20px";
		var context = canvas.getContext("2d");

		var id = unsafeWindow.play_data[0][1].id;
		var team = unsafeWindow.ptid[id];
		var bcolor = getTeamBColor(id);
		var fcolor = getTeamFColor(bcolor);

		context.font="14px sans-serif";
		context.lineWidth = 2;
		context.fillStyle = bcolor;
		context.strokeStyle = fcolor;
		context.fillRect(0,130, 200,500);
		context.strokeRect(0,130, 200,500);

		for (var i=1; i<12; i++) {
			var id = unsafeWindow.play_data[0][i].id;
			var position = unsafeWindow.players[id].position;
			var name = unsafeWindow.players[id].name;

			var x = i;
			var y = 216;
			context.fillStyle = bcolor
			context.fillRect(0,(x-1)*24+y, 200,x*24+y);
			context.strokeRect(0,(x-1)*24+y, 200,x*24+y);
			context.fillStyle = fcolor;
			context.fillText(name, 25, x*24-10+y+3);
			context.drawImage(imageData[id], 5, (x-1)*24+y+4);
		}

		var image = new Image();
		image.src = "http://goallineblitz.com/game/team_pic.pl?team_id="+team;
		var imgcanvas = document.createElement("canvas");
		var imgcontext = imgcanvas.getContext("2d");
		imgcontext.scale(75/image.width, 75/image.height);
		imgcontext.drawImage(image, 0, 0);

		context.drawImage(imgcanvas, 5,135);

		context.font = "64px sans-serif";
		context.fillColor = fcolor;
		var score = document.getElementById("off_score").textContent;
		var length = context.measureText(score.toString());
		context.fillText(score.toString(), 138-length.width/2,200);

		var container = document.getElementById("replay_container");
		container.appendChild(canvas);		
	}
	else {
		var lineup = document.getElementById("offenseLineup");
		lineup.parentNode.removeChild(lineup);
	}
}

function renderDefenseBar(frame, pct, loc) {
	if (imageData["defenseBar"] == null) {
		var canvas = document.createElement("canvas");
		canvas.setAttribute("width","20px");
		canvas.setAttribute("height","460px");
		var context = canvas.getContext("2d");
		
		var p = play_data[0][12];
		var id = p.id;
		var bcolor = getTeamBColor(id);
		var fcolor = getTeamFColor(bcolor);

		context.lineWidth = 3;
		context.fillStyle = bcolor;
		context.strokeStyle = fcolor;
		context.fillRect(0,0, 20,460);
		context.strokeRect(0,0, 20,460);
	
		var teamName = document.getElementsByClassName("secondary_container")[1].textContent;
		context.fillStyle = fcolor;
		context.lineWidth=1;
		context.font="bold 14px sans-serif";
		context.save();
	
		context.rotate(Math.PI/2);
		context.fillText(teamName, 50,-6);
		context.restore();
	
		imageData["defenseBar"] = canvas;
	}

	var canvas = document.getElementById("defense");
	var context = canvas.getContext("2d");
	context.drawImage(imageData["defenseBar"],0,0);
}

var defenseLineupVisible = false;
function renderDefenseLineup(frame, pct, loc) {
	defenseLineupVisible = !defenseLineupVisible;
	
	if (defenseLineupVisible == true) {
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id","defenseLineup");
		canvas.setAttribute("width","200px");
		canvas.setAttribute("height","480px");
		canvas.style.position = "absolute";
		canvas.style.left = "300px";
		var context = canvas.getContext("2d");

		var id = unsafeWindow.play_data[0][13].id;
		var team = unsafeWindow.ptid[id];
		var bcolor = getTeamBColor(id);
		var fcolor = getTeamFColor(bcolor);

		context.font="14px sans-serif";
		context.lineWidth = 2;
		context.fillStyle = bcolor;
		context.strokeStyle = fcolor;
		context.fillRect(0,130, 200,460);
		context.strokeRect(0,130, 200,460);

		for (var i=12; i<23; i++) {
			var id = unsafeWindow.play_data[0][i].id;
			var position = unsafeWindow.players[id].position;
			var name = unsafeWindow.players[id].name;

			var x = i-11;
			var y = 216;
			context.fillStyle = bcolor;
			context.fillRect(0,(x-1)*24+y, 200,x*24+y);
			context.strokeRect(0,(x-1)*24+y, 200,x*24+y);
			context.fillStyle = fcolor;
			context.fillText(name, 25, x*24-10+y+3);
			context.drawImage(imageData[id], 5, (x-1)*24+y+4);
		}

		var image = new Image();
		image.src = "http://goallineblitz.com/game/team_pic.pl?team_id="+team;
		var imgcanvas = document.createElement("canvas");
		var imgcontext = imgcanvas.getContext("2d");
		imgcontext.scale(75/image.width, 75/image.height);
		imgcontext.drawImage(image, 0, 0);

		context.drawImage(imgcanvas, 5,135);

		context.font = "64px sans-serif";
		context.fillColor = fcolor;
		var score = document.getElementById("def_score").textContent;
		var length = context.measureText(score.toString());
		context.fillText(score.toString(), 138-(length.width/2),200);

		var container = document.getElementById("replay_container");
		container.appendChild(canvas);		
	}
	else {
		var lineup = document.getElementById("defenseLineup");
		lineup.parentNode.removeChild(lineup);
	}
}

function drawFrame(frame, pct) {
	var loc = renderField(frame, pct);

	var canvas = document.getElementById("foreground");
	var context = canvas.getContext("2d");
	context.restore();
	context.save();
        context.clearRect(20, 0, 500, 1160);

	renderFirstDown(frame, pct, loc);
	renderVisionCone(frame, pct, loc);
	renderPlayers(frame, pct, loc);
	renderBall(frame, pct, loc);
	renderIcons(frame, pct, loc);

	renderOffenseBar(frame, pct, loc);
	renderDefenseBar(frame, pct, loc);
	renderReplayInfo();
}

var initialTime = null;
var currentTime = null;
var isPlaying = false;

var frameMultiplier = 1;

function render() {
	if (isPlaying == false) return;

 	currentTime = new Date();
	if (initialTime == null) {
		initialTime = currentTime;
	}

	var diff = currentTime - initialTime;
	var frame = diff/100 * frameMultiplier;
	pct = frame - Math.floor(frame);
	frame = Math.floor(frame) % play_data.length;

        try {
		drawFrame(frame, pct);
		lastTime = currentTime;
		var scrubber = 480/play_data.length*(frame+pct);
		document.getElementById("scrubber_handle").style.left = scrubber+"px";
        }
	catch (e) {
                window.console.log(e);
        }

	measureFps();

	if (frame >= play_data.length-1) {
		initialTime = null;
		setTimeout(function() { 
			drawFrame(0,0); 
			setTimeout(function() { render(); }, 2500);			
		}, 2500);
	}
	else {
	        requestAnimFrame(render);
	}
}

function renderIcons(frame, pct, loc) {
	var canvas = document.getElementById("foreground");
	var context = canvas.getContext("2d");

	for (var p=1; p<play_data[frame].length; p++) {
		var left = play_data[frame];
		if (left[p].icon != null) {
			var right = play_data[Math.min(frame+1, play_data.length-1)];
	
			var xdiff = right[p].x - left[p].x;
			var ydiff = right[p].y - left[p].y;
			var x = left[p].x + xdiff * pct;
			var y = left[p].y + ydiff * pct + loc - 20;
	
			var image = new Image();
			image.src = "/images/replay_icons/"+left[p].icon+".gif"; 
			context.drawImage(image, x-14, y-16);
		}
	}
}

function renderVisionCone(frame, pct, loc) {
	var p = play_data[frame][0];
	if ((p.tx != null) && (p.ty != null)) {
		var left = play_data[frame][0];
		var right = play_data[Math.min(frame+1, play_data.length-1)][0];

		var xdiff = right.x - left.x;
		var ydiff = right.y - left.y;
		var ballx = left.x + xdiff * pct - 16;
		var bally = left.y + ydiff * pct + loc;

		var xdiff = right.tx - left.tx;
		var ydiff = right.ty - left.ty;
		var targetx = left.tx + xdiff * pct - 16;
		var targety = left.ty + ydiff * pct + loc - 20;

		var canvas = document.getElementById("foreground");
		var context = canvas.getContext("2d");
		context.drawImage(imageData["target"], targetx+11, targety-5);

/*
		var gradient = context.createRadialGradient(250,900,0,300,950,1);
		gradient.addColorStop(0,"rgba(200,200,200,1)");
		gradient.addColorStop(1,"rgba(200,200,200,0.0)");
		context.beginPath();
		context.moveTo(250,900);
		context.lineTo(250,950);
		context.lineTo(300,900);
		context.lineTo(250,900);
		context.closePath();
		context.fillStyle = gradient;
		context.strokeStyle = gradient;
		context.fill();
		context.stroke();
*/
	}
}

function renderFirstDown(frame, pct, loc) {
	for (var i=1; i<play_data[0].length; i++) {
		var p = play_data[0][i];
		if ((unsafeWindow.players[p.id].position == "C") || (unsafeWindow.players[p.id].position == "LS")) {
			var y = p.y+loc;

			var canvas = document.getElementById("foreground");
			var context = canvas.getContext("2d");

			var dir = document.getElementById("time_ytg");
			var dirText = dir.innerHTML;
			var togo = "";
			if (dirText.indexOf(" inches ") != -1) {
				togo = 0.3;
			}
			else {
				if (dirText.indexOf(" G on ") == -1) {
					var p2 = dirText.indexOf(" &amp; ")+7;
					var p1 = dirText.indexOf(" on ");
					togo = parseFloat(dirText.substring(p2,p1));
					if (dirText.substring(p2-10,p2-9) == "4") {
						context.strokeStyle = "rgb(255,0,0)";
					}
					else {
						context.strokeStyle = "rgb(255,255,0)";
					}
				}
			}
	
			var dy = togo * 9;
			if (parseFloat(play_data[0][1].y) > parseFloat(play_data[0][0].y)) {
				dy = dy * -1;
			}

			context.beginPath();
			context.moveTo(20,y-dy);
			context.lineTo(500,y-dy);
			context.stroke();

			context.lineWidth = 2;
			context.beginPath();
			context.strokeStyle = "rgb(0,0,255)";
			context.moveTo(20,y);
			context.lineTo(500,y);
			context.stroke();
			break;
		}
	}
}

function renderField(frame, pct) {
	var left = play_data[frame];
	var right = play_data[Math.min(frame+1, play_data.length-1)];

	var ydiff = right[0].y - left[0].y;
	var y = left[0].y + ydiff * pct;

	var location = -1 * y + 250;
	location = Math.max(location, -660);
	location = Math.min(location, 0);

	var canvasbg = document.getElementById("background");
	var contextbg = canvasbg.getContext("2d");

	contextbg.drawImage(imageData["field"], 20, 0-location, 480, 500, 20, 0, 480, 500);
	return location;
}

function renderPlayers(frame, pct, loc) {
/*
	for (var f=0; f<play_data.length; f++) {
		for (var p=0; p<play_data[f].length; p++) {
if (play_data[f][p].icon != null) {
			console.log(f+") "+p+" -- "+play_data[f][p].icon);
}			
		}
	}
*/
	
	var canvas = document.getElementById("foreground");
	var context = canvas.getContext("2d");

	for (var p=1; p<play_data[frame].length; p++) {
		var left = play_data[frame];
		var right = play_data[Math.min(frame+1, play_data.length-1)];

		var xdiff = right[p].x - left[p].x;
		var ydiff = right[p].y - left[p].y;
		var x = left[p].x + xdiff * pct;
		var y = left[p].y + ydiff * pct + loc - 20;

		if (imageData[left[p].id] != null) {
			context.drawImage(imageData[left[p].id], x, y);
		}
	}

 }

function renderBall(frame, pct, loc) {
	var left = play_data[frame];
	var right = play_data[Math.min(frame+1, play_data.length-1)];

	var xdiff = right[0].x - left[0].x;
	var ydiff = right[0].y - left[0].y;
	var x = left[0].x + xdiff * pct + 3;
	var y = left[0].y + ydiff * pct + loc - 20;

	var canvasfg = document.getElementById("foreground");
	var contextfg = canvasfg.getContext("2d");

	if ((left[0].z < 5) || (right[0].z < 5)) {
		contextfg.drawImage(imageData["ball"], x, y);
	}
	else {
		if (imageData["rotated-ball"] == null) {
			var mul = 1;
			if (left[0].x < right[0].x) {
				mul = 1;
			}
			else {
				mul = -1;
			}
			if (left[0].y < right[0].y) {
				mul = mul * -1;
			}
			else {
				mul = mul * 1;
			}
			var rotation = mul * Math.atan(Math.abs(left[0].x-right[0].x)/Math.abs(left[0].y-right[0].y));
			rotation += 2*Math.PI;
		
			var canvas = document.createElement("canvas");
			canvas.setAttribute("width",16);
			canvas.setAttribute("height",16);
			var context = canvas.getContext("2d");
			context.save();
			context.translate(8, 8);
			context.rotate(rotation);
			context.drawImage(imageData["passing-ball"], -8, -8);
			context.restore();

			imageData["rotated-ball"] = canvas;
		}
		contextfg.drawImage(imageData["rotated-ball"], x, y); //fix me!!
	}
}

function getFromCanvas(src, w, h) {
	var image = new Image();
	image.src = src;

	var canvas = document.createElement("canvas");
	canvas.setAttribute("width",w);
	canvas.setAttribute("height",h);

	var context = canvas.getContext("2d");
	context.drawImage(image,0,0);

	return canvas;
}

function prepareImages() {
	imageData["ball"] = getFromCanvas("http://goallineblitz.com/images/ball.gif", 16, 16);
	imageData["passing-ball"] = getFromCanvas("http://goallineblitz.com/images/passing-ball.gif", 16, 16); //fix me!!
	imageData["kicking-ball"] = getFromCanvas("http://goallineblitz.com/images/kicking-ball.gif", 16, 16); //fix me!!
	imageData["field"] = getFromCanvas("http://goallineblitz.com/images/game/fields/"+unsafeWindow.field+".jpg", 520, 1160);

	var canvas = document.createElement("canvas");
	canvas.setAttribute("width","26");
	canvas.setAttribute("height","26");
	var context = canvas.getContext("2d");
	context.beginPath();
	context.strokeStyle = "rgb(255,255,255)";
	context.lineWidth = 3;
	context.moveTo(13,0);
	context.lineTo(13,26);
	context.moveTo(0,13);
	context.lineTo(26,13);
	context.stroke();
	context.beginPath();
	context.strokeStyle = "rgb(255,0,0)";
	context.lineWidth = 2;
	context.arc(13, 13, 10, 0, 2*Math.PI, false); 
	context.closePath();
	context.stroke();
	imageData["target"] = canvas;
	canvas = null;

	var done = [];
	for (var i=1; i<unsafeWindow.play_data[0].length; i++) {
		var p = unsafeWindow.play_data[0][i];
		var id = p.id;
		if (imageData[id] != null) continue;

		var team = unsafeWindow.ptid[id];
		var position = unsafeWindow.players[id].position;
		var fcolor = unsafeWindow.home_color2+"_border_home";
		var bcolor = unsafeWindow.home_color1;
		if (unsafeWindow.home != team) {
			fcolor = unsafeWindow.away_color2+"_border";
			bcolor = unsafeWindow.away_color1;
		}

		var fimage = new Image();
		fimage.src = "http://goallineblitz.com/images/dots/"+fcolor+"/"+position+".gif";

		var bimage = new Image();
		bimage.src = "http://goallineblitz.com/images/dots/"+bcolor+".gif";

		var canvas = document.createElement("canvas");
		canvas.setAttribute("width","16");
		canvas.setAttribute("height","16");
		var context = canvas.getContext("2d");

		if ((bimage.complete == false) || (fimage.complete == false)) {
			if (bimage.complete == false) {
				done.push(fimage.src);
			}
			if (fimage.complete == false) {
				done.push(fimage.src);
			}
		}
		else {
			context.drawImage(bimage,0,0);
			context.drawImage(fimage,0,0);
			imageData[id] = canvas;
		}
	}
	if (done.length > 0) {
		console.log("noooooo greasemonkey, no one would ever want to use worker threads...");
		console.log(done);
		setTimeout(prepareImages, 250);
	}
}

function beginPressed() {
	pausePressed();
	initialTime = null;
	currentTime = null;
	drawFrame(0,0);	
}

function rwPressed() {
	if (isPlaying == true) {
		frameMultiplier = Math.max(frameMultiplier - 0.25, 0);
		console.log(frameMultiplier);
	}
	else {
		currentTime = currentTime.setMilliseconds(currentTime.getMilliseconds() - 100);
		currentTime = new Date(currentTime);
		var diff = currentTime - initialTime;
		var frame = diff/100 * frameMultiplier;
		pct = frame - Math.floor(frame);
		frame = Math.floor(frame) % play_data.length;
		if (frame < 0) frame += play_data.length;
		drawFrame(frame, pct);
	}
}

function pausePressed() {
	console.log("pause");

	document.getElementById("pause_button").visibility = "hidden";
	document.getElementById("play_button").visibility = "visible";

	isPlaying = false;
}

function playPressed() {
	console.log("play");
	
	document.getElementById("pause_button").visibility = "visible";
	document.getElementById("play_button").visibility = "hidden";
 
	isPlaying = true;
	var t = currentTime;
	currentTime = new Date();
	initialTime = currentTime - (t-initialTime);

	render();
}

function ffPressed() {
	if (isPlaying == true) {
		frameMultiplier = frameMultiplier + 0.25;
		console.log(frameMultiplier);
	}
	else {
		currentTime = currentTime.setMilliseconds(currentTime.getMilliseconds() + 100);
		currentTime = new Date(currentTime);
		var diff = currentTime - initialTime;
		var frame = diff/100 * frameMultiplier;
		pct = frame - Math.floor(frame);
		frame = Math.floor(frame) % play_data.length;
		drawFrame(frame, pct);
	}
}

function endPressed() {
	pausePressed();
	initialTime = null;
	currentTime = null;
	drawFrame(play_data.length-1,0);	
}

function fixButtons() {
	var buttons = document.getElementsByClassName("button left");
	
	var begin = buttons[2];
	begin.addEventListener("click",beginPressed);

	var rewind = buttons[3];
	rewind.addEventListener("click",rwPressed);

	var pause = buttons[4];
	pause.addEventListener("click",playPressed);

	var play = buttons[5];
	play.addEventListener("click",pausePressed);

	var ff = buttons[6];
	ff.addEventListener("click",ffPressed);

	var end = buttons[7];
	end.addEventListener("click",endPressed);
}

function fixFrames() {
	var stime = new Date();
	var uwpd = new Array();
	for (var i=0; i<unsafeWindow.play_data.length; i++) {
		uwpd.push(new Array());
	}

	var missing = 0;
	for (var p=0; p<unsafeWindow.play_data[0].length; p++) {
		var id = unsafeWindow.play_data[0][p].id;

		for (var cf=0; cf<unsafeWindow.play_data.length; cf++) {
			var found = false;
			for (var i=0; i<unsafeWindow.play_data[cf].length; i++) {
				if (id == unsafeWindow.play_data[cf][i].id) {
					found = true;
					uwpd[cf].push(eval(uneval(unsafeWindow.play_data[cf][i])));
					break;
				}
			}
			if (!found) {
				uwpd[cf].push(eval(uneval(uwpd[cf-1][p])));
				missing++;
			}
		}
	}
	var time = new Date() - stime;
    	console.log("uwpd copy ("+missing+" missing): "+time.toFixed(0)+"ms");

	for (var p=1; p<uwpd[0].length; p++) {
		for (var f=uwpd.length-1; f>0; f--) {
			if (uwpd[f][p].icon != null) {
				for (var z=f+1; z<Math.min(uwpd.length, f+8); z++) {
					uwpd[z][p].icon = uwpd[f][p].icon;
				}
			}
		}
	}
	var time = new Date() - stime;
    	console.log("uwpd icons: "+time.toFixed(0)+"ms");

	prepareImages();

	return uwpd;
}

var frameCounter = 0;
var lastTime = 0;
var fps = [];
function measureFps() {
	frameCounter++;
        if (frameCounter > 300) {
	    var now = new Date();
	    var delta = now - lastTime;
            fps.push(frameCounter / delta);

            frameCounter = 0;
	    lastTime = now;
        }

	if (fps.length == 10) {
		console.log(fps);
		fps = [];
	}

}
