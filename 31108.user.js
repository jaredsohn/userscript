// ==UserScript==
// @name           Pancakes
// @namespace      GLB
// @description    Pancakes
// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*
// ==/UserScript==

window.setTimeout( function() 
{
var playerids = new Array();
var players = unsafeWindow.players;
var play_data = unsafeWindow.play_data;
var pancakes = new Array();

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

var preX = 0;
var preY = 0;
var panCount = 0;

for (var i = 1; i < play_data[0].length; i++) 
{
	var data = play_data[0][i];
	if (data.id != 'ball')
	 {
		playerids.push (data.id);
	}
}

for (var i = 0; i < playerids.length; i++) 
{
	var plyr = players[playerids[i]];
	panCount = 0;

	for (var j = 0; j < play_data.length; j++) {
		var snapdata = getSnap(j, playerids[i]);

		if (preX == snapdata.x && preY == snapdata.y) {
			panCount++;
			
			if (panCount==17) {
				addPancake(i, plyr.name, j-17, snapdata.x, snapdata.y, panCount);
				panCount = 0;
			}
		} else {
			preX = snapdata.x;
			preY = snapdata.y;
			panCount = 0;			
		}
	}
}

var pancaketext = "";

for (var i = 0; i < pancakes.length; i++) {
	pancaketext = pancaketext + pancakes[i] + "<br>";
}

var buttons = getElementsByClassName('prev_next', document);

if (pancaketext != "") {
	if (buttons[0]) {
    		newElement = document.createElement('div'); 
		newElement.className = "small_head";
		newElement.innerHTML = "<font color='black'>The Pancake Stack</font><br>" + pancaketext;
		buttons[0].parentNode.insertBefore(newElement, buttons[0]);
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

function addPancake(index, name, frame, x, y, freezecount) 
{
	var closestDistance = 10000;
	var newDist;
	var closestName;
	var distancetext="";
	var closesti = 0;

 	if (index < 11) {
		for (var i = 11; i < playerids.length; i++) {
			var snapdata = getSnap(frame, playerids[i]);
			newDist = Math.sqrt(Math.abs(snapdata.x - x) * Math.abs(snapdata.x - x) + Math.abs(snapdata.y - y) * Math.abs(snapdata.y - y));
			if (newDist < closestDistance && newDist > 0) {
				closestDistance = newDist;
				closestName =players[playerids[i]].name;
			}	
		}
	} else {
		for (var i = 0; i < 11; i++) {
			var snapdata = getSnap(frame, playerids[i]);
			newDist = Math.sqrt(Math.abs(snapdata.x - x) * Math.abs(snapdata.x - x) + Math.abs(snapdata.y - y) * Math.abs(snapdata.y - y));
			if (newDist < closestDistance && newDist > 0) {
				closestDistance = newDist;
				closestName =players[playerids[i]].name;
			}	
		}	
	}		
	
	if (closestDistance < 8) {
		pancakes.push (name + " got pancaked by " + closestName);
	}
}

}
)

