// ==UserScript==
// @id             groovecontrol
// @name           GrooveControl
// @namespace      http://userscripts.org/users/475731
// @description    this is the html 5 based javascript for my groove control application
// @version        1.0
// @date           2013-03-17
// @include        http://grooveshark.com/*
// ==/UserScript==

var sock;
var isOpen;

var oldSong;
var oldVolume;
var oldPause;
var EventReturn;

function open() {
	sock = new WebSocket('ws://localhost:8080/ws-host');

	sock.onopen = function(){
		console.log('[GrooveControl] Connected');
		isOpen = true;
	};

	sock.onmessage = function(msg){
		parseMsg(msg.data);
	};

	sock.onerror = function(msg){
		console.log('[GrooveControl] ERROR: ' + msg);
	};

	sock.onclose = function(){
		console.log('[GrooveControl] Connection failed retrying in 5 seconds');
		isOpen = false;
		setTimeout('open()', 5000);
	};
}

function parseMsg(msg) {
	if (msg.substring(0,2) == "00") {
		unsafeWindow.Grooveshark.next();
	}
	if (msg.substring(0,2) == "01") {
		if (unsafeWindow.Grooveshark.getCurrentSongStatus().status == "playing") {
			unsafeWindow.Grooveshark.pause();
		} else {
			unsafeWindow.Grooveshark.play();
		}
	}
	if (msg.substring(0,2) == "02") {
		unsafeWindow.Grooveshark.setVolume(parseInt(msg.substring(2)));
	}
}

function updateData() {
	if (isOpen) {
		var song = unsafeWindow.Grooveshark.getCurrentSongStatus().song;
		var next = unsafeWindow.Grooveshark.getNextSong();
		sock.send("00" + song.songName + " - " + song.albumName + " - " + song.artistName);
		sock.send("01" + next.songName + " - " + next.albumName + " - " + next.artistName);
		sock.send("02" + window.Grooveshark.getVolume());
		if (unsafeWindow.Grooveshark.getCurrentSongStatus().status == "playing") {
			sock.send("03" + "0");
		} else {
			sock.send("03" + "1");
		}
	}
}

function registerSongEvent(func) {
	EventReturn = func;
	setInterval('songCheck()', 100);
	setInterval('volCheck()', 100);
	setInterval('pauseCheck()', 100);
}

function songCheck() {
	var song = unsafeWindow.Grooveshark.getCurrentSongStatus().song.songName;
	if (song != oldSong) {
		EventReturn();
	}
	oldSong = song;
}

function volCheck() {
	var volume = unsafeWindow.Grooveshark.getVolume();
	if (volume != oldVolume) {
		EventReturn();
	}
	oldVolume = volume;
}

function pauseCheck() {
	var pause = unsafeWindow.Grooveshark.getCurrentSongStatus().status;
	if (pause != oldPause) {
		EventReturn();
	}
	oldPause = volume;
}

registerSongEvent(updateData);
open();