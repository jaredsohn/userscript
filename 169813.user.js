// ==UserScript==
// @name        XNXX Stories made readable
// @namespace   com.klondike42.userscripts
// @description XNXX Stories made readable
// @include     http://stories.xnxx.com/story/*
// @grant       none
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var body = $("body");
var storyCells = $("td.bandeau_td_2 span.top_texte_2");

var story = "";

for(var i = 0; i < storyCells.length; i++) {
	story += $(storyCells[i]).html();
}

var container = $("div:first");

body.css("background-color", "#f3edc8");

container.empty();
container.css("text-align", "left");
container.css("color", "#000000");
container.css("font-family", "serif");
container.css("font-size", "12px");
container.css("background-color", "#f3edc8");
container.css("width", "700px");
container.css("margin-left", "auto");
container.css("margin-right", "auto");
container.html(story);




