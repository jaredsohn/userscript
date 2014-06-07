// ==UserScript==
// @name          YoutubeRepeatBoxy
// @description   Add youtube repeat button
// @auther        http://toolboxy.blogspot.com/
// @include       http://www.youtube.com/*
// @version       0.6.3
// ==/UserScript==
var qqm = document.getElementById('watch7-user-header');
var qqd = document.createElement('div');
qqd.style.display = 'inline';
qqd.id = 'qqw';
qqm.appendChild(qqd);
function qqRegExp(qqy){
	qqy.indexOf("v=")!=-1&&(qqy=qqy.substring(qqy.indexOf("v=")+2,qqy.length));
	qqy.indexOf("&")!=-1&&(qqy=qqy.substring(0,qqy.indexOf("&")));
	qqy.indexOf("#")!=-1&&(qqy=qqy.substring(0,qqy.indexOf("#")));
	qqy.indexOf("youtu.be/")!=-1&&(qqy=qqy.substring(qqy.indexOf("youtu.be/")+9,qqy.length));
	return qqy;
}
document.getElementById('qqw').innerHTML = "<a href=\"http://youtuberepeat.blogspot.com/?" + qqRegExp(window.location.href) + "\"><button title=\"Repeat this video\" class=\"yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip\"><span class=\"yt-uix-button-content\">Repeat</span></button></a>";