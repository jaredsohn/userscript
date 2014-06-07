// ==UserScript==
// @name           timer
// @namespace      redditime
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// ==/UserScript==

//delare variables
var pastTime;
var days, seconds, minutes, hours;

//get the previous amount of seconds from firefox
if(GM_getValue("redditime") == undefined){
	GM_setValue("redditime",0);
	pastTime = GM_getValue("redditime");
}
else {
	pastTime = GM_getValue("redditime");
}

//tick function increments "redditime" value every second
function tick(){
	//increment time value
	pastTime++;
	
	//set firefox variable to incremented value
	GM_setValue("redditime",pastTime);
	//set function timeout to one second.
	window.setTimeout(tick, 1000);
}


//DISPLAYS TIME WHEN CALLED
function format(){
	//FORMAT TIME VALUES
	days = (Math.floor(pastTime/86400)%100000);
	hours = (Math.floor(pastTime/3600)%24);
	minutes = (Math.floor(pastTime/60)%60);
	seconds = (Math.floor(pastTime/1)%60);

	//OUTPUT TIME STRING
	alert("You've spent a total of " +days+ " days, " +hours+ " hours, " +minutes+ " minutes, and " +seconds+ " seconds on reddit.");	
}

//Reset timer and call format to display new time.
function reset(){
	
	pastTime=0;
	format();
}

//start the timer on window load. 
window.onload = tick();

//Create button
var button = document.createElement("button");
//Add Text to button
button.appendChild(document.createTextNode("Get Time Spent"));
//Attach button to beginning of page
document.body.insertBefore(button, document.body.firstChild);
//Call the format function to format and display time.
button.addEventListener('click', format, false);

