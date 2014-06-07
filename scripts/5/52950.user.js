// ==UserScript==
// @name           Youtube 2.0 Channel Playlist fix
// @namespace      http://userscripts.org
// @description    Adds a direct link to view a playlist. After selecting a playlist in the grid, click the "Click here" to set the link.
// @include        http://www.youtube.com/*
// ==/UserScript==
function $(A) {
	return document.getElementById(A);
}

var	playlistlink=document.createElement("div"),
	script=document.createElement("script");

document.addEventListener('click', function(event) {
playlistlink.innerHTML="<div style='display:block'><B>Click here to set current playlist.&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://www.youtube.com/view_play_list?p="+window.location.href.substr(window.location.href.lastIndexOf('/')+1)+"&playnext=1&playnext_from=PL'>View playlist</a></B></div>";
}, true);

playlistlink.innerHTML="<div style='display:block'><B>Click here to set current playlist.&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://www.youtube.com/view_play_list?p="+window.location.href.substr(window.location.href.lastIndexOf('/')+1)+"&playnext=1&playnext_from=PL'>View playlist</a></B></div>";
document.body.insertBefore(playlistlink, $("channel-body"));
