// ==UserScript==
// @name			YouTube MP3 And Video Direct Downloader
// @match			http://www.youtube.com/*
// @copyright			2013 ItsTcole
// @author			ItsTcole
// @version       1.0
// @authorURL			http://tcolekid13.com/
// @homepage			http://youtube.com/tcolekid13
// @description			Adds 2 buttons under the video to download mp3 or video
// ==/UserScript==

var DIV = document.createElement('span');
	DIV.innerHTML = '';
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-secondary-actions");
	divp.appendChild(DIV);

var url = location.href.split("&")[0];

var videoURL = document.URL;
var videoURL2 = videoURL.replace('https://','http://');
var id = videoURL2.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i)[1];


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
	INAU.addEventListener('click', function(){window.open("http://snipmp3.com/?url=" + url + ""); self.focus();}, false);

var INAU = document.createElement('input');
	INAU.setAttribute('type','button');
	INAU.setAttribute('name','INAU');
	INAU.setAttribute('value','Download Video');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://keepvid.com/?url=" + url + ""); self.focus();}, false);