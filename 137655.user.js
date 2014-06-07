// ==UserScript==
// @name           Simple YouTube MP3 Downloader
// @namespace      http://www.youtubeinmp3.com
// @description    A download button will be added to YouTube videos that allow you to download the video in MP3-format. No java required!
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @version        1.9.0
// ==/UserScript==

// ==ChangeLog==
// @history        1.9.0  URL Fix
// @history        1.8.0  URL Fix
// @history        1.7.0  Compatible with all videos
// @history        1.6.0  Location upgrade
// @history        1.5.1  Name tweaks
// @history        1.5.0  New system
// @history        1.4.0  Server upgrade
// @history        1.3.1  Quick tweak
// @history        1.3.0  Compatible with the latest update
// @history        1.2.2  Server update
// @history        1.2.1  Server update
// @history        1.11 Server edit
// @history        1.00 Initial release.
// ==/ChangeLog==

var DIV = document.createElement('span');
	DIV.innerHTML = '';
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-secondary-actions");
	divp.appendChild(DIV);

var url = window.location.href;


var INAU = document.createElement('input');
	INAU.setAttribute('type','button');
	INAU.setAttribute('name','INAU');
	INAU.setAttribute('value','Download MP3');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://youtubeinmp3.com/download/?quality=2&video=" + url + ""); self.focus();}, false);
