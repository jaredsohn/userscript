// ==UserScript==
// @name Grooveshark Current Song Titleizer
// @namespace 
// @version  1.4 
// @description    Replaces the Grooveshark page title with the current song, artist and album.
// @include        http://grooveshark.com/*
// @include        http://*.grooveshark.com/*
// @author         Eric Lammertsma (http://userscripts.org/users/4742), modifications by Legendeveryone (http://userscripts.org/users/343108)
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==


//Change these values to True or False to add or remove them from the title
var showGrooveshark = false;
var showSong = true;
var showArtist = true;
var showAlbum = true;
var showOther = true;


//Change refresh to configure how often the script refreshes the page title (in seconds)
var refresh = 5;


//Change textGrooveshark to whatever you want the leading text to be (displays when showGrooveshark = True)
var textGrooveshark = "Grooveshark";
//Change textSeparator to change the markings between each part of the page title.
var textSeparator = " - ";


//The default title while the page loads or no song is loaded.
var newTitle = "Grooveshark";
document.title = newTitle;

//
function setTitle() {
	
	var nowPlayingDiv = document.getElementById("playerDetails_nowPlaying");
	
	if (nowPlayingDiv) 
		{
			var nowPlaying = nowPlayingDiv.innerHTML.replace(/(<[\s\S]+?>|(\n))+/g,"*nowplayingsplittertext*").split("*nowplayingsplittertext*",9);
		}
	
	if (typeof nowPlaying!="undefined" && nowPlaying.length>4 && nowPlaying[0]=="" && nowPlaying[1].length>0) 
		{
			newTitle="";
			showGrooveshark ? newTitle+=(textGrooveshark + textSeparator) : null;
			showSong ? newTitle+=(nowPlaying[4] + textSeparator) : null;
			showArtist ? newTitle+=(nowPlaying[6] + textSeparator) : null;
			showAlbum ? newTitle+=(nowPlaying[8]) : null;
			
			newTitle = newTitle.replace("&","&");
		}

	else 
		{
			newTitle = "Grooveshark";
		}
	
	document.title = newTitle;
}

setInterval(setTitle,refresh*1000);