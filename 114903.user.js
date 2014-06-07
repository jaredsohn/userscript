// ==UserScript==
// @name Pandora Alert
// @description Alert the User of the current song info
// @namespace http://userscripts.org/users/409717
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include htt*://www.pandora.com/*
// ==/UserScript==


$(document).ready(function(){
	$("div.thumbUpButton").click(function(){
	
        var song = $('.playerBarSong').text();
        var artist = $('.playerBarArtist').text();
        var album = $('.playerBarAlbum').text();
        alert(song + ' by ' + artist + ' on ' + album);
        return flase;
  
  });
});
