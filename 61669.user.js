// ==UserScript==
// @name           Average Roster Level
// @namespace      goallineblitz.com
// @description    A quick calculator that will tell you the average level of your roster.
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// ==/UserScript==

window.setTimeout( 
	function() {
		buildButton();
	}, 
	60
);

function buildButton(){
	// build a re-sign button
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("id", "reSign")
	button.setAttribute("value", "Get Average Level");
	button.addEventListener("click", getLevel,false);
	
	//locate a spot to place the button	
	var location = document.getElementById('content').childNodes[5];

	//create a div to place the button in
	var newDiv = document.createElement('div');
	newDiv.align = 'left';
	newDiv.id = 'newDiv';
	location.parentNode.insertBefore(newDiv, location);

	// insert the button into the div
	newDiv.appendChild(button);
}

function getLevel(){

	var levels = document.getElementsByClassName('player_level');
	var total = 0;	
		
	for (var i=0; i < levels.length; i++){
		total = total + parseInt(levels[i].innerHTML);
	}

	var average = parseInt(levels.length);
	alert('Your rosters total level is ' + total);	
}