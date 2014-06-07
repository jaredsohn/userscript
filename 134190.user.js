// ==UserScript==
// @name          Pennny Arcade Comment Hider
// @namespace     http://example.org
// @description   Hides Comments on PATV Videos
// @include       http://*penny-arcade.com/patv/episode/*
// ==/UserScript==

var discussion = document.getElementById('episodeComments');
if(discussion)
	discussion.style.display = 'none';