// ==UserScript==
// @name        8tracks link grabber
// @namespace   Nucl34rW0rld
// @description Generates download links for every song beeing played.
// @include     http://8tracks.com/*/*
// @version     1.0
// ==/UserScript==

function hook_play() {
	player.old_play = player.play;
	player.play = function() {player.old_play(); add_link(); };
}


function add_link() {
	title = document.getElementsByClassName("title_artist")[0].getElementsByClassName("t")[0].innerHTML
	artist = document.getElementsByClassName("title_artist")[0].getElementsByClassName("a")[0].innerHTML

	sid = soundManager.soundIDs[soundManager.soundIDs.length-1]; // current playing soundid
	download_url = soundManager.getSoundById(sid).url;
	
	downloadNode = document.createElement("a");
	downloadNode.href = download_url;
	downloadNode.innerHTML = "DOWNLOAD "+artist+" - "+title+"<br/>";

	wrapper.insertBefore(downloadNode,play_area);
}

player = TRAX.mixPlayer.trackPlayer.currentPlayer;

wrapper = document.getElementById("mix_wrapper");
play_area = document.getElementById("play_area");

addLinkNode = document.createElement("a");
addLinkNode.innerHTML = "Download links: <br/>";
wrapper.insertBefore(addLinkNode,play_area);

hook_play();