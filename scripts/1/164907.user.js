// ==UserScript==
// @name        skip bypass
// @namespace   Nucl34rW0rld
// @description Generates download links for every song beeing played.
// @include     http://8tracks.com/*/*
// @version     1.0.2
// ==/UserScript==

function hook_play() {
	player.old_play = player.play;
	player.play = function() {player.old_play(); add_link(); };
}
//Skip traxx
executeBrowserContext(function(){	
var btnSkipCode = function(){
		if( !player_play_button.isPlaying() ) 
			player_play_button.play(); 
  		if(trackPlayer.timeForNextMix())
			trackPlayer.play();
		  
var removeYoutube = function(){
	player_controls_left.removeChild(next_mix_button); //remove next mix functionality	
	
var hook_play = {	
		html: html_container		
		},
//Add Links to container
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
	
	hook_play();