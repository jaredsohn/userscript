// ==UserScript==
// @name           Novamov
// @namespace      randomname
// @include        http://www.novamov.com/video/*
// @include        http://www.novamov.com/mobile/*
// ==/UserScript==
video = String(window.location).split('/')[3].split('/')[0];

if(video=="video"){
video = String(window.location).split('/')[4].split('/')[0];
window.location = "http://www.novamov.com/mobile/player.php?v="+video;
}

 

else{

var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML =  'setInterval(displayTime, 1000);function seek(i){document.vlc.input.time = document.vlc.input.time + i;}\
function displayTime(){\
secs=parseInt(document.vlc.input.time/1000);\
sec=secs%60;\
min=parseInt(secs/60)%60;\
hour=parseInt(secs/3600);\
document.getElementById("time").innerHTML=(String(hour)+":"+String(min)+":"+String(sec));\
}';
document.getElementsByTagName("body")[0].appendChild(scriptElement);
var link = String(document.getElementsByTagName('body')[0].innerHTML).split('http')[1].split('">')[0];
document.getElementsByTagName('body')[0].innerHTML='\
<embed type="application/x-vlc-plugin" pluginspage="http://www.videolan.org" version="VideoLAN.VLCPlugin.2"\
    width="640"\
    height="480"\
    id="vlc"\
	target="http'+link+'" >\
</embed>\
<p>\
<input type="button" value="Play" onclick="vlc.playlist.play();" />\
<input type="button" value="Pause" onclick="vlc.playlist.togglePause();" />\
<input type="button" value="FullScreen" onclick="vlc.video.toggleFullscreen();" />\
<input type="button" value="<<" onclick="seek(-10000);" />\
<input type="button" value=">>" onclick="seek(10000);" />\
<div id="time"/>\
</p>';
}