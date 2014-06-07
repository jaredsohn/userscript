// ==UserScript==
// @name        Last.fm radio keyboard shortcuts
// @namespace   e404.eu
// @description When listening to last.fm, Pause/Play events are fired whenever space key is pressed outside an editable box (e.g. search) or the slideshow picture is clicked. Original Pause/Play buttons are unaffected.
// @include     http://www.last.fm/listen/*
// @version     1.1
// @grant none
// ==/UserScript==

// execute this after complete document load
var complete = function () {
	var slideshow = document.getElementById("lfmSlideshow");	
	var pause = document.getElementById("radioControlPause");
	var play = document.getElementById("radioControlPlay");
	var skip = document.getElementById("radioControlSkip");
	
	// prepare click event - see https://developer.mozilla.org/en-US/docs/DOM/document.createEvent
	var evt_click = document.createEvent("MouseEvents");
	evt_click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	
	// reusable functions to appropriately click on Pause or Play button / Skip button
	var togglePausePlay = function () {	
		var pause_display = window.getComputedStyle(pause).display;
		if (pause_display !== "none") {
			pause.dispatchEvent(evt_click);
		} else {
			play.dispatchEvent(evt_click);
		}
		document.activeElement.blur(); // next keypress should not occur inside the flash object
		return false;                  // suppress scrolling down on keypress
	}
	var pressSkip = function () {
		skip.dispatchEvent(evt_click);
		document.activeElement.blur();
		return false;
	}
	
	// assign event handler to the slideshow element
	slideshow.onclick = togglePausePlay;
	
	// if a space or right arrow key is pressed outside editable elements (like search bar)
	document.onkeypress = function (e) {
		if (!e.target.isContentEditable && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
			if (e.charCode === 32) { // space
				return togglePausePlay();
			}
			if (e.keyCode === 39) { // right arrow key
				return pressSkip();
			}
		}
	}
}

// wait for complete document load
document.onreadystatechange = function () {
	if (document.readyState === "complete") {
		var radio = document.getElementById("webRadio");
		var wait_ms = 500;
		
		// wait until radio controls are visible
		var check = function () {
			if (window.getComputedStyle(radio).left !== "0px") {
				complete();
			} else {
				wait_ms = (wait_ms >= 5000) ? (5000) : (wait_ms + 500);
				window.setTimeout(check, wait_ms); // wait ### ms and pass the same time as argument
			}
		}
		check();
	}
}