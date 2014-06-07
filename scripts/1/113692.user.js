// ==UserScript==
// @name           vk-audioblock-fix
// @namespace      http://userscripts.org/users/398905
// @description    moves audio block above wall on vk user pages
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

// 2011-10-08 v0.03 works with new user audio block
// 2011-09-24 v0.02 now works on group walls
// 2011-09-22 v0.01 initial release

// find the profile_wall element
var wall = document.getElementById("profile_wall");
// if didn't find, try group_wall
if ( ! wall ) var wall = document.getElementById("group_wall");

if ( wall ){
	//var audioId = wall.id.match("[a-z]+_") + "audios";
	var audio = document.getElementById(wall.id.match("[a-z]+_") + "audios");

	if ( audio ){
		var page = wall.parentNode;
		page.insertBefore(audio, wall);
	}
}

// may have to refresh the page to get the audio block to move
