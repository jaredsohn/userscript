// ==UserScript==
// @name           Last.fm - Paint it Blue!
// @namespace      http://userstyles.org/users/10437
// @description    Swap the red globe for a black one and (try) to change the color of the music player.
// @include        http://*.last.fm/*
// @include        http://last.fm/*
// ==/UserScript==

var globe, lfmPlayer;

globe = document.getElementById('langToggleFlag');
lfmPlayer = document.getElementById('lfmPlayer');


// Swap globe.gif with globe_black.gif
globe.src="http://cdn.last.fm/depth/flags/mini/globe_black.gif";

// Check if last.fm is using <object><param>.
// If true, change 'bgcolor' param.
// Else, change <embed bgcolor>.

if (lfmPlayer.param != null) {lfmPlayer.getElementByName('bgcolor')="#366188"; }
else {lfmPlayer.bgcolor="#366188"; }

// If someone could tell me why the above does not work and how
// to get it to work, I would be extremely happy. ^.^
