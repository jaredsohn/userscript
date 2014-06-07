// ==UserScript==
// @name           Updated YouTube MP3 Downloader
// @description    Download buttons will be added to YouTube videos that allow you to download the video in MP3-format from www.audiothief.com and www.youtubeinaudio.com. Done from Simple YouTube MP3 Downloader (No Java) (http://userscripts.org/scripts/show/137655)
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @version        1.0.1
// ==/UserScript==

var DIV = document.createElement('span');
	DIV.innerHTML = '';
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-secondary-actions");
	divp.appendChild(DIV);

var url = location.href.split("&")[0];

var INAU = document.createElement('input');
	INAU.setAttribute('type','button');
	INAU.setAttribute('name','INAU');
	INAU.setAttribute('value','YTinAudio');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://www.youtubeinaudio.com/download/?n=1&submit=Download+MP3&youtubeURL=" + url + ""); self.focus();}, false);