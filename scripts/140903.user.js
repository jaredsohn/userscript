// ==UserScript==
// @version       1.1
// @name          Tumblr Suggestions/Radar Remover
// @namespace     http://godzuki.tumblr.com/
// @description   Removes tumblr suggestions and the radar.
// @include       http://www.tumblr.com/dashboard*
// @include       http://www.tumblr.com/blog/*
// ==/UserScript==

var suggestion_bar = document.getElementById("recommended_tumblelogs");
var radar_post = document.getElementById("tumblr_radar");

if(suggestion_bar)
	suggestion_bar.style.display = "none";
if(radar_post)
	radar_post.style.display = "none";