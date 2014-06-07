// ==UserScript==
// @name           Grooveshark Activity Simulator
// @namespace      http://ericflin.com
// @description    Simulates activity by dynamically clicking on buttons to stop Grooveshark from becoming inactive.
// @include        http://grooveshark.com/*
// ==/UserScript==

var timer;

function doClicks() {
	// List of buttons' ids that can be clicked to (hopefully) simulate activity
	var clickObjectIDs = new Array("showQueue", "player_loop");
	
	// Pick a random button
	var num = Math.floor(Math.random() * 2); // Possibilities: 0, 1, 2.
	var clickme = document.getElementById(clickObjectIDs[num]);
	
	// Check to see that the button actually exists (it might not be loaded yet).
	if (clickme) {
		// Make a dynamic click.
		var dynamicClick = document.createEvent("Event");
		dynamicClick.initEvent("click", true, false);

		// Click twice so the user doesn't notice anything (player_loop requires three clicks)
		clickme.dispatchEvent(dynamicClick);
		clickme.dispatchEvent(dynamicClick);
		GM_log("Clicked " + clickObjectIDs[num] + " twice.");

		// Click again if it's player_loop to restore it to its original state (there are three repeat options)
		if (clickObjectIDs[num] == "player_loop") {
			clickme.dispatchEvent(dynamicClick);
			GM_log("Clicked " + clickObjectIDs[num] + " once more."); }
	
		// Wait half an hour and click again
		clearTimeout(timer);
		timer = setTimeout(doClicks, 30 * 60 * 1000); }

	// Wait a few seconds and check again.
	else {
		clearTimeout(timer);
		timer = setTimeout(doClicks, 3000); } }

window.addEventListener("load", doClicks, false);