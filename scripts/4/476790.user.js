// ==UserScript==
// @name           Simple YouTube Video Downloader Multiformat
// @namespace      http://vidscrab.com
// @description    A download button will be added to YouTube videos that allow you to download. No java required!
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @version        1.0
// ==/UserScript==

var DIV = document.createElement('span');
	DIV.innerHTML = '';
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-secondary-actions");
	divp.appendChild(DIV);

var url = window.location.href;


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
	INAU.addEventListener('click', function(){window.open("http://vidscrab.com/getvideo.php?videoid=" + url + "&type=Download"); self.focus();}, false);
