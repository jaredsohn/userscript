// ==UserScript==
// @name	Google Voice UI Fixer
// @namespace	ui-fix
// @description	This script removes UI clutter from Google Voice and improves usability on small screens.
// @version	3
// @include	https://www.google.com/voice/*
// @include	https://www.google.com/voice
// ==/UserScript==

function setStyleByClassName(c, s, v) {
	a = document.getElementsByClassName(c);
	for(var i=0; i < a.length; i++)
		a[i].style[s] = v;
}

function setStyleById(id, s, v) {
	x = document.getElementById(id);
	x.style[s] = v;
}

function setStyleByTagName(t, s, v) {
	a = document.getElementsByTagName(t);
	for(var i=0; i < a.length; i++)
		a[i].style[s] = v;
}

// remove the bar from the top of the page
uglyBar = document.getElementById("gc-gaia-bar");
uglyBar.parentNode.removeChild(uglyBar);

// reclaim some wasted space by deleting the google logo
logos = document.getElementsByClassName("gc-header-logo");
for(var i=0; i < logos.length; i++)
	logos[i].parentNode.removeChild(logos[i]);

// reduce white space
setStyleByClassName("gc-searchbar", "padding", "0 0 0 0");
setStyleByClassName("gc-searchbar", "borderBottom", "0px");
setStyleByClassName("gc-searchbar", "background", "none");
setStyleById("gc-appbar", "padding", "4px 0 4px 0");

// turn frames into normal elements
setStyleByTagName("html", "overflow", "visible");
setStyleById("gc-splitpane", "overflow", "visible");
setStyleByClassName("goog-splitpane-first-container", "overflow", "visible");
setStyleById("gc-sidebar", "overflow", "visible");
setStyleById("gc-view-main", "overflow", "visible");
