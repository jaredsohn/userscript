// ==UserScript==
// @name        Jango Song Downloader by ERROROCCURED
// @namespace   jangodownloader
// @description Downloads a song straight from Jango in a new tab, allowing copying of filename, once a song played
// @include     http://www.jango.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

setTimeout(function(){

var mp3Title = "";
var url = "";
var soundmanagerdebug = _jp.soundManager._writeDebug;
_jp.soundManager._writeDebug = function(a){
    if(a.indexOf('url:') == 0) {
	url = a.substring(5,a.length);
	mp3Title = _jm.song_info.artist + " - " + _jm.song_info.song + ".mp3";
    }
}

var downloadSong = function(){
	console.log(url);
	console.log(mp3Title);
	window.open(url);
};


var btn=document.createElement("button");
var t=document.createTextNode("> > > > > > > > Save Song");
btn.appendChild(t); 
btn.onclick = downloadSong;
btn.style = "margin-left:20px; margin-top:5px;";
document.children[0].children[1].children[1].contentDocument.children[0].children[1].children[8].children[0].insert(btn);
}, 5000);