// ==UserScript==
// @name           Simple YouTube MP4 Downloader
// @namespace      http://www.youtubeinmp4.com
// @description    A download button will be added to YouTube videos that allow you to download. No java required!
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @version        1.7.0
// ==/UserScript==

// ==ChangeLog==
// @history        1.7.0  URL tweaked (July 20th)
// @history        1.6.0  URL tweaked
// @history        1.5.0  Adjusted for the latest update
// @history        1.4.0  Compatible with the latest YT update
// @history        1.3.3  Server update
// @history        1.3.2  Server update
// @history        1.3  MP3 section added
// @history        1.2  Download Page Edited
// @history        1.1  Servers upgraded
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
	INAU.setAttribute('value','Download MP4');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://www.youtubeinmp4.com/youtube.php?video=" + url + ""); self.focus();}, false);
