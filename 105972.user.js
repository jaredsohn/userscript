// ==UserScript==
// @name           Google Music Downloader
// @version			0.9.1
// @namespace      http://www.radicalpi.net/
// @author		   Chris Hendry
// @description    Allows you to download your music from Google Music Beta
// @include        http://music.google.com/music/listen*
// @include        https://music.google.com/music/listen*
// ==/UserScript==

window.addEventListener("load", addButton, false);

function download() {

	var id = document.getElementById('song_indicator').parentNode.parentNode.parentNode.id;
	if(id == "") id = document.getElementById('song_indicator').parentNode.parentNode.id;
	id = id.split("_")[1];
	
	GM_xmlhttpRequest({
    method: 'GET',
   	url: 'http://music.google.com/music/play?u=0&songid='+id+'&pt=e',
	onload: function(responseDetails) {
	response = responseDetails.responseText;
	url = response.split('"')[3];

	window.open(url,'Download');
	}
	});
}

function addButton() {
		document.getElementById('headerBar').innerHTML += "\
		<div id='downloadSongHolder' style='position:absolute; bottom:12px; right:254px; display:none;'>\
		<img id='downloadSong' src='http://radicalpi.net/upload/gMusic/download.png'>\
		</div>\
		";
		document.getElementById('downloadSong').addEventListener("click", download, false);
		setTimeout(toggleDisplay,1000);	
}

function toggleDisplay() {

document.getElementById('downloadSongHolder').style.display = document.getElementById('thumbsUpPlayer').style.display;

setTimeout(toggleDisplay,1000);
}



