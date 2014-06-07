// ==UserScript==
// @name           Youtube MP3 Buttons
// @author	   Jamie Hyde
// @version        1.65
// @updateURL      https://userscripts.org/scripts/source/111178.meta.js
// @description    Adds two Button to download in LQ or HQ
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// @include        https://*.youtube.com/watch?v=*&*
// @include        https://youtube.com/watch?v=*&*
// @include        https://youtube.com/watch?v=*
// @include        https://*.youtube.com/watch?v=*
// ==/UserScript==

//Create DIV
var DIV = document.createElement('span');
	DIV.innerHTML = '';
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-secondary-actions");
	divp.appendChild(DIV);

//Split URL
var url = location.href.split("&")[0];

//Create LQ Button
	

//Create HQ Button
var MP3HQ = document.createElement('input');
	MP3HQ.setAttribute('type','button');
	MP3HQ.setAttribute('name','MP3HQ');
	MP3HQ.setAttribute('value','Download');
	MP3HQ.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	MP3HQ.style.borderLeft = "";
	MP3HQ.style.marginRight = "";
	MP3HQ.style.marginLeft = "";
	MP3HQ.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(MP3HQ);
	MP3HQ.addEventListener('click', function(){window.open("http://www.video2mp3.net/index.php?url=" + url + "&hq=1"); self.focus();}, false);
