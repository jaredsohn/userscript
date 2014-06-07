// ==UserScript==
// @name			YouTube MP3 And Video Direct Downloader (Fullrip) (No Java)
// @match			http://www.youtube.com/*
// @copyright			2013 GavoTrav
//@author			GavoTrav
// @version       2.0
// @authorURL			http://youtube.com/zinctunes
// @homepage			http://youtube.com/zinctunes
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
	INAU.addEventListener('click', function(){window.open("http://www.fullrip.net/mp3/" + id + ""); self.focus();}, false);

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
	INAU.addEventListener('click', function(){window.open("http://www.fullrip.net/video-m/" + id + ""); self.focus();}, false);