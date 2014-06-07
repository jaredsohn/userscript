// ==UserScript==
// @name           GLB YAC
// @namespace      GLB
// @description    Adds a YAC (yards after catch) stat to replays
// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*
// ==/UserScript==

window.setTimeout( function() 
{

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var playerids = new Array();
var players = unsafeWindow.players;
var play_data = unsafeWindow.play_data;

for (var i = 1; i < play_data[0].length; i++) 
{
	var data = play_data[0][i];
	if (data.id != 'ball')
	 {
		playerids.push (data.id);
	}
}

var playText = getPlayText();
var receiver = getReceiverName(playText);
var wrid = 0;

for (var i = 0; i < playerids.length; i++) 
{
	var plyr = players[playerids[i]];
	if (plyr.name == receiver) {
		wrid = playerids[i];
	}
}

var catchY = 0;

for (var j = 0; j < play_data.length; j++) {
	var balldata = getSnap(j, 'ball');
	var snapdata = getSnap(j, wrid);
	if (balldata.x == snapdata.x && balldata.y == snapdata.y && catchY == 0) {
		catchY = balldata.y
	}	
}

var endY = play_data[play_data.length-1][0].y;

if (catchY == 0) {catchY = endY;}

var yac = Math.round(((Math.abs(endY - catchY))/3)*2)/2

addYAC(roundNumber(yac,1));

function getReceiverName(playText) {
	var sn = playText.indexOf('pass to ')+8;
	var en = 0;	

	if (playText.indexOf(', hurried by')!=-1) {
		en = playText.indexOf(', hurried by');
	} else if (playText.indexOf(' up the')!=-1) {
		en = playText.indexOf(' up the');
	} else {
		en = playText.indexOf(' over the');
	}

	var name = playText.slice(sn,en);
	return name;
}

function getPlayText() {
	var plays = getElementsByClassName('small_head play', document);
	for (var i=0; i < plays.length; i++) {
		if (plays[i].innerHTML.indexOf('pass to')!=-1){
			return plays[i].innerHTML;
		}
	}
}

function addYAC(yacnum) {
	var plays = getElementsByClassName('small_head play', document);
	for (var i=0; i < plays.length; i++) {
		if (plays[i].innerHTML.indexOf('pass to')!=-1){
			plays[i].innerHTML = plays[i].innerHTML + " [YAC: " + yacnum + "]"
		}
	}
}

function getSnap(frame, id) {
	for (var i = 0; i < play_data[frame].length; i++) {
		var data = play_data[frame][i];
		if (data.id == id) {
			return data;
		}
	}
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

}
)