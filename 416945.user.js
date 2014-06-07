// ==UserScript==
// @name		opensubtitles.org better downloads
// @author		doctord
// @description	download manager no more! Direct download of subtitles
// @include		http://www.opensubtitles.org/*/subtitles/*
// @version		0.2
// ==/UserScript==
 
var url;
var sub;
var go;

function dowSub()
{
    url="http://dl.opensubtitles.org/it/download/sub/";
    sub=document.URL;
    sub=sub.replace(/\D/g,'');
    go=url.concat(sub);
    window.open(go);
}

var newButton = document.createElement('input');
newButton.type="button";
newButton.value="Direct Download!";
newButton.onclick = dowSub;
var checkBox = document.getElementById('cbDownloader');
checkBox.parentNode.insertBefore(newButton, checkBox);