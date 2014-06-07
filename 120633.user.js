// ==UserScript==
// @name           Wrzuta.pl Simple Downloader
// @namespace      What? Oh, another modded script.
// @author         MikeHunt
// @description    Download audio and video files from http://wrzuta.pl!
// @include        http://*.wrzuta.pl/audio/*
// @include        http://*.wrzuta.pl/film/*
// ==/UserScript==

var url = window.location.href;
if(url.match("wrzuta.pl/audio")){
finalURL = url.replace('wrzuta.pl/audio', 'wrzuta.pl/sr/f');
}else{
finalURL = url.replace('wrzuta.pl/film', 'wrzuta.pl/sr/v');
}

var place = document.getElementById('file_info').getElementsByTagName('h2')[0];
place.innerHTML = place.innerHTML + ' <a href=' + finalURL + '><img src="http://i33.tinypic.com/2vm7wpd.jpg" border="0" width="16" height="16"></a>';