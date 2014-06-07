// ==UserScript==
// @name           Tweety
// @namespace      http://peterwunder.de
// @description    Puts the tweetys on the left and the toolys on the right side.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var DASHBOARD; //Toolys
var CONTENT; //Tweetys

window.onload = function() {
	//console.log("It begins.");
	swapSides();
}

function swapSides() {
	//console.log("attempting to set a timeout");
	setTimeout(swapSides, 1500);
	//console.log("declaring objects");
	DASHBOARD = document.getElementsByClassName("dashboard")[0];
	CONTENT = document.getElementsByClassName("content-main js-content-main breakable")[0];
	DASHBOARD.setAttribute("style", "float: right;");
	CONTENT.setAttribute("style", "float: left;");
	//console.log("It has ended.");
}