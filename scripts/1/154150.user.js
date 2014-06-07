// ==UserScript==
// @name		Tyrant Fansite KG + FB
// @version		0.7
// @author		unrealmirakulix
// @description	optimiert die Tyrant Fansite
// @icon 		http://tyrant.40in.net/i/list_icos.png
// @include 	http://tyrant.40in.net/*
// @copyright   none
// @homepage	http://userscripts.org/scripts/show/154150
// @updateURL 	http://userscripts.org/scripts/source/154150.meta.js
// @downloadURL http://userscripts.org/scripts/source/154150.user.js
// ==/UserScript==

// Handler for .ready() called
if (document.readyState == 'complete' || document.readyState == 'interactive') {

	if ( location.href.indexOf('/kg/') > -1 ) {
		var home = 'http://tyrant.40in.net/kg/';
	}
	else if ( location.href.indexOf('/fb/') > -1 ) {
		var home = 'http://tyrant.40in.net/fb/';
		
	}

	// ad blocking helper
	var b = ['blocked', 'bwt', 'bwb', 'bt', 'bt2', 'bwm'];
	for (var i = 0; i < b.length; i++) {
		var k = document.getElementsByClassName(b[i]); // select ... of classes given in var b
		if ( k.length > 0 ) { // if exists
			for (var j = 0; j < k.length; j++) { // get all elements per class
				k[j].style.display = 'none'; // hide block / area behind
			}
		}
	}
	
	// remove round corners in "Raid progress" (profile page)
	if ( location.href.indexOf('profile.php') > -1 ) {
		// set corner raidius in class "n" to "0px"
		var r = document.getElementsByClassName('n');
		for (var i = 0; i < r.length; i++) {
			r[i].style.borderBottomRightRadius = '0px';
			r[i].style.borderBottomLeftRadius = '0px';
		}
	}

	// Hotkeys (on all pages) [done by listening to keyboard input]
	document.onkeydown = function(e) {
	
		e = e || window.event;
		
		// special pages, e.g. for 'n' key
		var p = ( location.href.indexOf('quest.php?id') > 0 || location.href.indexOf('mission.php?id') > 0 );	// pages where to be active

		
		// exclude SHIFT from detection
		if (e.shiftKey) {
			return;
		}
		// exclude CTRL from detection
		else if (e.ctrlKey) {
			return;
		}
		// exlcude ALT from detection
		else if (e.altKey) {
			return;
		}
		
		// if inside textarea or input
		var tag = e.target.tagName.toLowerCase(); // only convert to lowercase once
		if (tag === 'textarea' || tag === 'input') {
			// use === when you know the two objects you are comparing will always be the same type since it is faster than ==
			return;
		}

		// if key 'd' is pressed
		else if (e.keyCode === 68){
			// open fraction tracker
			window.location.href = home + 'deck.php';
		}
		// if key 'f' is pressed
		else if (e.keyCode === 70){
			// open fraction tracker
			window.location.href = home + 'factiontracker.php';
		}
		// if key 'p' is pressed
		else if (e.keyCode === 80){ // alt: else if
			// open profile page
			window.location.href = home + 'profile.php';
		}
		// if key 'q' is pressed
		else if (e.keyCode === 81){
			// open quests overview
			window.location.href = home + 'quest_list.php';
		}
		// if key 'r' is pressed
		else if (e.keyCode === 82){
			// open raids overview
			window.location.href = home + 'raids.php';
		}
		// if key 'v' is pressed
		else if (e.keyCode === 86){
			// open fraction tracker
			window.location.href = home + 'vaulttracker.php';
		}
		// if key 'h' is pressed
		else if (e.keyCode === 72){
			// open home tab
			window.location.href = home + 'index.php';
		}
		// if key 'n' is pressed and you're on a quest page
		else if (e.keyCode === 78 && p){
			// open next quest page
			var k = document.getElementsByClassName('next')[0];
			if (typeof k != 'undefined') {
				k.click();
			}
		}
	};
};