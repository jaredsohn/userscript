// ==UserScript==
// @name		Bong.tv
// @version		0.2
// @author		unrealmirakulix
// @description	passt bong.tv an
// @icon 		http://bong.tv/favicon.ico
// @include 	http://bong.tv/*
// @include 	http://www.bong.tv/*
// @include 	http://help.bong.tv/*
// @copyright   none
// @homepage	http://userscripts.org/scripts/show/265882
// @updateURL 	http://userscripts.org/scripts/source/265882.meta.js
// @downloadURL http://userscripts.org/scripts/source/265882.user.js
// ==/UserScript==

// Handler for .ready() called
if (document.readyState == 'complete' || document.readyState == 'interactive') {
	
	document.getElementsByClassName("nav")[0].getElementsByTagName("li")[0].getElementsByTagName("a")[0].href="http://www.bong.tv/tv-programm/tabelle/sender/alle/sendungen";

	// Hotkeys (on all pages) [done by listening to keyboard input]
	document.onkeydown = function(e) {
	
		e = e || window.event;
		
		var now = document.getElementsByClassName("hour-buttons")[0].getElementsByClassName("active")[0].getAttribute("data-hour");
		
		var first_hour = document.getElementsByClassName("hour-buttons")[0].getElementsByTagName("li")[0].getElementsByTagName("a")[0];
		
		var last_hour = document.getElementsByClassName("hour-buttons")[0].getElementsByTagName("li")[23].getElementsByTagName("a")[0];
		
		// if inside textarea or input
		var tag = e.target.tagName.toLowerCase(); // only convert to lowercase once
		if (tag === 'textarea' || tag === 'input') {
			// use === when you know the two objects you are comparing will always be the same type since it is faster than ==
			return;
		}
		
		// if key 'left arrow' is pressed
		else if (e.keyCode === 37){
			e.preventDefault();
			// 0h
			if (now === "0") {
			// previous day & 23h
			last_hour.click();
			document.getElementById("prev-day").click();
			}
			else {
			// previous hour
			document.getElementById("prev-hour").click();
			}
		}

		// if key 'right arrow' is pressed
		else if (e.keyCode === 39){
			e.preventDefault();
			// 23h
			if (now === "23") {
			// next day & 0h
			first_hour.click();
			document.getElementById("next-day").click();
			}
			else {
			// next hour
			document.getElementById("next-hour").click();
			}
		}
		
	}
};