// ==UserScript==

// @name            Persistent Max Google Calendar

// @description	    Hides Google Calendar sidebars when F12 is pressed.

// @include         http://calendar.google.com/*

// @include         https://calendar.google.com/*

// @include         http://www.google.com/calendar*

// @include         https://www.google.com/calendar*

// ==/UserScript==



window.addEventListener("load", function() {

nav = document.getElementById('nav');
top = document.getElementById('topBar');
gbar = document.getElementById('gbar');
guser = document.getElementById('guser');

var calMaxToggle = GM_getValue("calMaxToggle", 0);

function toggleMax() {

if (calMaxToggle) {					// IF THE TOGGLE IS TRUE MAKE ELEMENTS COLLAPSE
		nav.style.visibility = "collapse";
		nav.style.width = "0px";
		top.style.display = "none";
		gbar.style.display = "none";
		gbar.style.height = "0px";
		guser.style.display = "none";
		window.document.body.style.margin = "0";
		calMaxToggle = 0;
		GM_setValue("calMaxToggle", 1);
		unsafeWindow._SR_backToCalendar();
	}

	else {						// OTHERWISE THEY ARE NOT VISIBLE, SO SHOW THEM
		nav.style.visibility = "visible";
		nav.style.width = "13em";
		top.style.display = "block";
		gbar.style.display = "block";
		gbar.style.height = "22px";
		guser.style.display = "block";
		window.document.body.style.margin = "0pt 1ex";
		calMaxToggle = 1;
		GM_setValue("calMaxToggle", 0);
		unsafeWindow._SR_backToCalendar();
	}
}

// IF A KEY IS RELEASED CHECK TO SEE IF IT IS F12, IF SO EXECUTE THE TOGGLE FUNCTION
window.addEventListener("keyup",function(e) { if (e.keyCode==123) { toggleMax(); } }, false);

toggleMax();

}, false);