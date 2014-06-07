// ==UserScript==
// @name KD Emotes
// @namespace	KD Emotes
// @include	*.hitbox.tv/*
// @include	*.speedrun.tv/*
// @include	*.twitch.tv/*
// @icon http://frankerfacez.storage.googleapis.com/keydeegamerboy/KeyDerp.png
// @version 1.0
// ==/UserScript==

function getKDEmotes() {
	var d = document.getElementById("keydeegamerboy");
	var emotes = [];

	emotes.push(d.getElementById("emotes").getElementById("imgcontainer").getElementsByName("data-orgonal"));
	alert(emotes);
}

getKDEmotes();