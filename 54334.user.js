// ==UserScript==
// @name           GLB Snap Awareness
// @namespace      GLB
// @include        *goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// ==/UserScript==


function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

function calc(e) {
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.clearRect(0,0,500,50)
ctx.strokeStyle = "red";
ctx.beginPath();
ctx.moveTo(0, 50);
maxA = 0
selected.setAttribute('style', 'background-color:none')
selected = e.target
var old_color = e.target.getAttribute('style')
var playerid = e.target.parentNode.getAttribute('id')
playerid = playerid.split('pos_dot_', 2)[1]
//e.target.innerHTML.split('pos_dot_', 2)[1]
//playerid = playerid.split('"', 2)[0]
playerid = "{id: '" + playerid + "',"
temp2 = 0
avgV = 0
maxV = 0
maxTick = 0
test2.length = 0
e.target.setAttribute('style', 'background-color:black')

var test = document.getElementById('body_container').innerHTML.split(playerid, 100)
for(var i=0,j=test.length; i<j; i++) {
	test2[i] = test[i].split("},{id:", 2)[0]
}
for(var i=0,j=test2.length; i<j; i++) {
	temp = test2[i].split("x:", 2)[1]
	X_Coords[i] = temp.split(",y:", 2)[0]
}
for(var i=0,j=test2.length; i<j; i++) {
	temp = test2[i].split(",y:", 2)[1]
	Y_Coords[i] = temp.split(",p: ", 2)[0]
	if (temp.split(",p: ", 2).length == 2) {P_Coords[i] = 1}
}
X_Coords[0] = X_Coords[1]
Y_Coords[0] = Y_Coords[1]
var currenttick = 0
for(var i=0,j=test2.length-1; i<j; i++) {
	var test8 = test2.length -1
	ctx.lineTo(currenttick*(500/test8), Math.abs(Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i+1]) - parseFloat(Y_Coords[i])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i+1]) - parseFloat(X_Coords[i])), 2))*10-50));
	currenttick = currenttick + 1
}


//Find Max Velocity and Tick it happened
for(var i=1,j=Y_Coords.length-1; i<j; i++) {
	if (P_Coords[i] != 1) {
	temp = Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])), 2))
	SpeedPerTick[i] = temp;
    maxV = Math.max(temp,maxV)
	if (maxV == temp) {maxTick = i}}
	if (maxV == temp) {
		XSpeed.setAttribute('style', 'left:' + X_Coords[i]*3 + 'px; top: ' + parseFloat(Y_Coords[i])*3 + 'px')
		replayarea.appendChild(XSpeed)
	}
}



temp = 0
for(var i=1,j=Y_Coords.length-1; i<j; i++) {
	if (P_Coords[i] != 1) {
	temp = temp + Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])), 2))}
}
avgA = 0
avgAC = 0
for(var i=1,j=Y_Coords.length-1; i<j; i++)
 {
	if (P_Coords[i] != 1)
     {
    	temp4 = Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i+1]) - parseFloat(Y_Coords[i])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i+1]) - parseFloat(X_Coords[i])), 2))
    	temp3 = Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])), 2))
    	if (temp4 >= temp3) 
        {
        	maxA = Math.max(maxA, (temp4 - temp3))
        	if (maxA == (temp4 - temp3)) {maxAT = i;}
        	
        	if (maxA == (temp4 - temp3)) {
        		XAccel.setAttribute('style', 'left:' + X_Coords[i]*3 + 'px; top: ' + parseFloat(Y_Coords[i])*3 + 'px')
        		replayarea.appendChild(XAccel)
        	}
        	
        	avgA = avgA + (temp4 - temp3)
        	avgAC = avgAC + 1
        }
    }
}
var ticks_CD = new Array(); ticks_CD[0] = 0; ticks_CD[1] = 0
var ticks_CD10 = new Array(); ticks_CD10[0] = 0; ticks_CD10[1] = 0; ticks_CD10[4] = 0; ticks_CD10[5] = 0; ticks_CD10[6] = 0; ticks_CD10[7] = 0;
var ticks_CD20 = new Array(); ticks_CD20[0] = 0; ticks_CD20[1] = 0; ticks_CD20[4] = 0; ticks_CD20[5] = 0; ticks_CD20[6] = 0; ticks_CD20[7] = 0;
var ticks_CD30 = new Array(); ticks_CD30[0] = 0; ticks_CD30[1] = 0; ticks_CD30[4] = 0; ticks_CD30[5] = 0; ticks_CD30[6] = 0; ticks_CD30[7] = 0;
var ticks_CD40 = new Array(); ticks_CD40[0] = 0; ticks_CD40[1] = 0; ticks_CD40[4] = 0; ticks_CD40[5] = 0; ticks_CD40[6] = 0; ticks_CD40[7] = 0;
var ticks_CD50 = new Array(); ticks_CD50[0] = 0; ticks_CD50[1] = 0; ticks_CD50[4] = 0; ticks_CD50[5] = 0; ticks_CD50[6] = 0; ticks_CD50[7] = 0;
for(var i=1,j=Y_Coords.length-1; i<j; i++) {
	if (P_Coords[i] != 1) {
	vector1 = Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])) / Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1]))
	vector2 = Math.abs(parseFloat(X_Coords[i+1]) - parseFloat(X_Coords[i])) / Math.abs(parseFloat(Y_Coords[i+1]) - parseFloat(Y_Coords[i]))
	temp2 = Math.abs(Math.atan(vector1) - Math.atan(vector2)) * 180/Math.PI
	speed1 = Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i+1]) - parseFloat(Y_Coords[i])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i+1]) - parseFloat(X_Coords[i])), 2))
	speed2 = Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])), 2))
	if (temp2 >= 10 && temp2 < 20) {
		ticks_CD10[0] = ticks_CD10[0] + 1
		ticks_CD10[1] = ticks_CD10[1] + Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])), 2))
		if (speed1 < speed2) {
			ticks_CD10[4] = ticks_CD10[4] + speed1 - speed2
			ticks_CD10[5] = ticks_CD10[5] + 1}
		if (speed1 > speed2) {
			ticks_CD10[6] = ticks_CD10[6] + speed1 - speed2
			ticks_CD10[7] = ticks_CD10[7] + 1}}
	if (temp2 >= 20 && temp2 < 30) {
		ticks_CD20[0] = ticks_CD20[0] + 1
		ticks_CD20[1] = ticks_CD20[1] + Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])), 2))
		if (speed1 < speed2) {
			ticks_CD20[4] = ticks_CD20[4] + speed1 - speed2
			ticks_CD20[5] = ticks_CD20[5] + 1}
		if (speed1 > speed2) {
			ticks_CD20[6] = ticks_CD20[6] + speed1 - speed2
			ticks_CD20[7] = ticks_CD20[7] + 1}}
	if (temp2 >= 30 && temp2 < 40) {
		ticks_CD30[0] = ticks_CD30[0] + 1
		ticks_CD30[1] = ticks_CD30[1] + Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])), 2))
		if (speed1 < speed2) {
			ticks_CD30[4] = ticks_CD30[4] + speed1 - speed2
			ticks_CD30[5] = ticks_CD30[5] + 1}
		if (speed1 > speed2) {
			ticks_CD30[6] = ticks_CD30[6] + speed1 - speed2
			ticks_CD30[7] = ticks_CD30[7] + 1}}
	if (temp2 >= 40 && temp2 < 50) {
		ticks_CD40[0] = ticks_CD40[0] + 1
		ticks_CD40[1] = ticks_CD40[1] + Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])), 2))
		if (speed1 < speed2) {
			ticks_CD40[4] = ticks_CD40[4] + speed1 - speed2
			ticks_CD40[5] = ticks_CD40[5] + 1}
		if (speed1 > speed2) {
			ticks_CD40[6] = ticks_CD40[6] + speed1 - speed2
			ticks_CD40[7] = ticks_CD40[7] + 1}}
	if (temp2 >= 50) {
		ticks_CD50[0] = ticks_CD50[0] + 1
		ticks_CD50[1] = ticks_CD50[1] + Math.sqrt(Math.pow(Math.abs(parseFloat(Y_Coords[i]) - parseFloat(Y_Coords[i-1])), 2) + Math.pow(Math.abs(parseFloat(X_Coords[i]) - parseFloat(X_Coords[i-1])), 2))
		if (speed1 < speed2) {
			ticks_CD50[4] = ticks_CD50[4] + speed1 - speed2
			ticks_CD50[5] = ticks_CD50[5] + 1}
		if (speed1 > speed2) {
			ticks_CD50[6] = ticks_CD50[6] + speed1 - speed2
			ticks_CD50[7] = ticks_CD50[7] + 1}}
}
}
var total_ticks = Y_Coords.length-1
avgV = (temp) / (X_Coords.length-1)
document.getElementById('maxspeed').innerHTML = (maxV*10).toFixed(2)
document.getElementById('avgspeed').innerHTML = (avgV*10).toFixed(2)
document.getElementById('maxspeedtick').innerHTML = maxTick + ' ticks'
document.getElementById('maxaccel').innerHTML = (maxA*10).toFixed(2)
document.getElementById('avgaccel').innerHTML = ((avgA/avgAC)*10).toFixed(2)
document.getElementById('maxacceltick').innerHTML = maxAT + ' ticks'
document.getElementById('totalticks').innerHTML = total_ticks
document.getElementById('1tick').innerHTML = (SpeedPerTick[1]*10).toFixed(2)
document.getElementById('2tick').innerHTML = (SpeedPerTick[2]*10).toFixed(2)
document.getElementById('3tick').innerHTML = (SpeedPerTick[3]*10).toFixed(2)
document.getElementById('4tick').innerHTML = (SpeedPerTick[4]*10).toFixed(2)
document.getElementById('5tick').innerHTML = (SpeedPerTick[5]*10).toFixed(2)
document.getElementById('6tick').innerHTML = (SpeedPerTick[6]*10).toFixed(2)
document.getElementById('7tick').innerHTML = (SpeedPerTick[7]*10).toFixed(2)
document.getElementById('8tick').innerHTML = (SpeedPerTick[8]*10).toFixed(2)
document.getElementById('9tick').innerHTML = (SpeedPerTick[9]*10).toFixed(2)
document.getElementById('10tick').innerHTML = (SpeedPerTick[10]*10).toFixed(2)
document.getElementById('changeticks10d').innerHTML = ticks_CD10[0]
document.getElementById('changeticks20d').innerHTML = ticks_CD20[0]
document.getElementById('changeticks30d').innerHTML = ticks_CD30[0]
document.getElementById('changeticks40d').innerHTML = ticks_CD40[0]
document.getElementById('changeticks50d').innerHTML = ticks_CD50[0]
document.getElementById('changeticks10V').innerHTML = ((ticks_CD10[1] /(ticks_CD10[0]+0.00000001))*10).toFixed(2)
document.getElementById('changeticks20V').innerHTML = ((ticks_CD20[1] /(ticks_CD20[0]+0.00000001))*10).toFixed(2)
document.getElementById('changeticks30V').innerHTML = ((ticks_CD30[1] /(ticks_CD30[0]+0.00000001))*10).toFixed(2)
document.getElementById('changeticks40V').innerHTML = ((ticks_CD40[1] /(ticks_CD40[0]+0.00000001))*10).toFixed(2)
document.getElementById('changeticks50V').innerHTML = ((ticks_CD50[1] /(ticks_CD50[0]+0.00000001))*10).toFixed(2)
document.getElementById('changeticks10de').innerHTML = (ticks_CD10[4]*10).toFixed(2)
document.getElementById('changeticks20de').innerHTML = (ticks_CD20[4]*10).toFixed(2)
document.getElementById('changeticks30de').innerHTML = (ticks_CD30[4]*10).toFixed(2)
document.getElementById('changeticks40de').innerHTML = (ticks_CD40[4]*10).toFixed(2)
document.getElementById('changeticks50de').innerHTML = (ticks_CD50[4]*10).toFixed(2)

document.getElementById('changeticks10avde').innerHTML = ((ticks_CD10[4]/(ticks_CD10[5]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD10[5] + ' ticks)'
document.getElementById('changeticks20avde').innerHTML = ((ticks_CD20[4]/(ticks_CD20[5]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD20[5] + ' ticks)'
document.getElementById('changeticks30avde').innerHTML = ((ticks_CD30[4]/(ticks_CD30[5]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD30[5] + ' ticks)'
document.getElementById('changeticks40avde').innerHTML = ((ticks_CD40[4]/(ticks_CD40[5]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD40[5] + ' ticks)'
document.getElementById('changeticks50avde').innerHTML = ((ticks_CD50[4]/(ticks_CD50[5]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD50[5] + ' ticks)'

document.getElementById('changeticks10avac').innerHTML = ((ticks_CD10[6]/(ticks_CD10[7]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD10[7] + ' ticks)'
document.getElementById('changeticks20avac').innerHTML = ((ticks_CD20[6]/(ticks_CD20[7]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD20[7] + ' ticks)'
document.getElementById('changeticks30avac').innerHTML = ((ticks_CD30[6]/(ticks_CD30[7]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD30[7] + ' ticks)'
document.getElementById('changeticks40avac').innerHTML = ((ticks_CD40[6]/(ticks_CD40[7]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD40[7] + ' ticks)'
document.getElementById('changeticks50avac').innerHTML = ((ticks_CD50[6]/(ticks_CD50[7]+0.00000001))*10).toFixed(2) + ' (' + ticks_CD50[7] + ' ticks)'

document.getElementById('changeticks10ac').innerHTML = (ticks_CD10[6]*10).toFixed(2)
document.getElementById('changeticks20ac').innerHTML = (ticks_CD20[6]*10).toFixed(2)
document.getElementById('changeticks30ac').innerHTML = (ticks_CD30[6]*10).toFixed(2)
document.getElementById('changeticks40ac').innerHTML = (ticks_CD40[6]*10).toFixed(2)
document.getElementById('changeticks50ac').innerHTML = (ticks_CD50[6]*10).toFixed(2)
ctx.stroke()
Y_Coords.length = 0
X_Coords.length = 0
P_Coords.length = 0
}

var playernames2 = getElementsByClassName('player_icon o_icon', document)
var playernames = getElementsByClassName('player_icon d_icon', document)
for(var i=0,j=playernames2.length; i<j; i++) {
	playernames2[i].addEventListener('click', calc, false)
	playernames[i].addEventListener('click', calc, false)
}
var test1 = document.getElementsByTagName('div')[document.getElementsByTagName('div').length-3]

test1.innerHTML = '<br><b>Velocity:<br clear="left" /><canvas style="background: lightgray; border-width:1px; border-style: solid; border-collapse: collapse" width="500" height="50" id="canvas">'
test1.innerHTML = test1.innerHTML+ '<table style="border-collapse:collapse; border-width: 1px; border-style: solid"><tr class="nonalternating_color forum_head"><td colspan="2" width="200px">Speed</td></tr><tr class="alternating_color2"><td>Average Speed</td><td style="text-align:right" id="avgspeed"></td></tr><tr class="alternating_color1"><td>Maximum Speed</td><td style="text-align:right" id="maxspeed"></td></tr><tr class="alternating_color2"><td>Point of Max</td><td style="text-align:right" id="maxspeedtick"></td></tr><tr class="alternating_color1"><td>Average Acceleration</td><td style="text-align:right" id="avgaccel"></td></tr><tr class="alternating_color2"><td>Max Acceleration</td><td style="text-align:right" id="maxaccel"></td></tr><tr class="alternating_color1"><td>Point of Max Accel</td><td style="text-align:right" id="maxacceltick"></td></tr></table>'
test1.innerHTML = test1.innerHTML+ '<table width="100%" style="border-collapse:collapse; border-width: 1px; border-style: solid"><tr class="nonalternating_color forum_head"><td colspan="10" width="300px">Vision Check (1st 10 ticks)</td></tr><tr style="font-weight:bold;text-align:right"><td style="text-align:left">Tick 1</td><td>Tick 2</td><td>Tick3</td><td>Tick 4</td><td>Tick 5</td><td>Tick 6 </td><td>Tick 7</td><td>Tick 8</td><td>Tick 9 </td><td>Tick 10</td></tr><tr style="text-align:right" class="alternating_color1"><td style="text-align:left" id="1tick"></td><td id="2tick"></td><td id="3tick"><td id="4tick"></td><td id="5tick"></td><td id="6tick"></td><td id="7tick"></td><td id="8tick"></td><td id="9tick"></td><td id="10tick"></td></tr></table>'
test1.innerHTML = test1.innerHTML + '<table width="100%" style="border-collapse:collapse; border-width: 1px; border-style: solid"><tr class="nonalternating_color forum_head"><td colspan="7" width="300px">Agility</td></tr><tr style="font-weight:bold;text-align:right"><td style="text-align:left">Direction Change<td>Ticks<td>Speed<td>Speed Lost<td>Avg Loss<td>Speed Gained<td>Avg Gain<tr style="text-align:right" class="alternating_color1"><td style="text-align:left">10-19 degrees</td><td id="changeticks10d"></td><td id="changeticks10V"><td id="changeticks10de"></td><td id="changeticks10avde"></td><td id="changeticks10ac"></td><td id="changeticks10avac"></td></tr><tr style="text-align:right" class="alternating_color2"><td style="text-align:left">20-29 degrees</td><td id="changeticks20d"></td><td id="changeticks20V"></td><td id="changeticks20de"></td><td id="changeticks20avde"></td><td id="changeticks20ac"></td><td id="changeticks20avac"></td></tr><tr style="text-align:right" class="alternating_color1"><td style="text-align:left">30-39 degrees</td><td id="changeticks30d"></td><td id="changeticks30V"></td><td id="changeticks30de"></td><td id="changeticks30avde"></td><td id="changeticks30ac"></td><td id="changeticks30avac"></td></tr><tr style="text-align:right" class="alternating_color2"><td style="text-align:left">40-49 degrees</td><td id="changeticks40d"></td><td id="changeticks40V"></td><td id="changeticks40de"></td><td id="changeticks40avde"></td><td id="changeticks40ac"></td><td id="changeticks40avac"></td></tr><tr style="text-align:right" class="alternating_color1"><td style="text-align:left">50+ degrees</td><td id="changeticks50d"></td><td id="changeticks50V"></td><td id="changeticks50de"></td><td id="changeticks50avde"></td><td id="changeticks50ac"></td><td id="changeticks50avac"></td></tr></table>'
test1.innerHTML = test1.innerHTML + '<table style="border-collapse:collapse; border-width: 1px; border-style: solid"><tr class="nonalternating_color forum_head"><td colspan="2" width="100px">Other</td><tr class="alternating_color2"><td>Total Ticks</td><td id="totalticks"></td></tr></table>'
var vector1 = 0
var vector2 = 0
var temp2 = 0
var avgV = 0
var maxV = 0
var maxTick = 0
var test2 = new Array()
var X_Coords = new Array()
var Y_Coords = new Array()
var P_Coords = new Array()
var SpeedPerTick = new Array();
var temp = 'temp'
var temp3 = 0
var temp4 = 0
var maxA = 0
var maxAT = 0
var avgA = 0
var avgAC = 0
var selected = playernames[0]
var XSpeed = document.createElement('div')
XSpeed.innerHTML = "<font color='pink'><b>X1</b></font>"
XSpeed.setAttribute('class', 'player_icon')
var XAccel = document.createElement('div')
XAccel.innerHTML = "<font color='lightblue'><b>X2</b></font>"
XAccel.setAttribute('class', 'player_icon')
var replayarea = document.getElementById('replay_area')

var offPlayers = getElementsByClassName("player_icon o_icon",document);
for(var j=0; j<offPlayers.length; j++) {
offPlayers[j].firstChild.setAttribute("onclick","");
}
var defPlayers = getElementsByClassName("player_icon d_icon",document);
for(var j=0; j<offPlayers.length; j++) {
defPlayers[j].firstChild.setAttribute("onclick","");
}
