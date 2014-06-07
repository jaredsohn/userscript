// ==UserScript==
// @name           Youtube: Flashplayerfarbe ändern
// @namespace      http://peterwunder.de
// @description    Ändert die Farbe des Flashplayers auf Youtube
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==

String.prototype.contains = function(sub) { return this.indexOf(sub) !== -1; };

var THEME_DARK = "dark";
var THEME_LIGHT = "light";
var COLOR_WHITE = "white";
var COLOR_RED = "red";

function init() {
	if(document.addEventListener) {
		document.addEventListener("DOMContentLoaded", changePlayerColor, false);
	} else {
		document.onreadystatechange = function(){
			if(document.readyState == "interactive") {
				changePlayerColor();
			}
		}
	}
}

function changePlayerColor() {
	var PLAYER_THEME = THEME_LIGHT; //change this variable...
	var PLAYER_COLOR = COLOR_RED; //...and this one to change the colors that are applied
	console.log("changePlayerColor: ready");
	var swf = document.getElementById("movie_player");
	if(swf != null) {
		var swfv = swf.getAttribute("flashvars");
		var swfa = swf.getAttribute("src");
		swf.setAttribute("flashvars", swfv.replace("theme=dark", "theme=" + PLAYER_THEME + "&color=" + PLAYER_COLOR))
		swf.setAttribute("src", swfa + "?theme=" + PLAYER_THEME + "&color=" + PLAYER_COLOR);
		console.log("changePlayerColor: done");
	} else {
		console.log("changePlayerColor: player not found");
		console.log("changePlayerColor: If you're in fact watching a video right now, please try viewing it on it's own page");
	}
}

init();