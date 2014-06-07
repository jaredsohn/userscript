// ==UserScript==
// @name           Youtube MP3 Download
// @author	   elhombre
// @version        1.0
// @description    Add a button to download mp3 in HQ from video2mp3.net
// @include        http://youtube.com/watch?*v=*
// @include        http://*.youtube.com/watch?*v=*
// @include        https://youtube.com/watch?*v=*
// @include        https://*.youtube.com/watch?*v=*
// ==/UserScript==

// URL
var url = location.href

// Create My Button HQ
var btnMP3 = document.createElement('button');
btnMP3.setAttribute('class',' yt-uix-button yt-uix-button-hh-text yt-uix-tooltip');
btnMP3.setAttribute('role', 'button');
btnMP3.setAttribute('data-tooltip-text', 'Descargar el audio de este video (video2mp3)');
btnMP3.setAttribute('data-orientation', 'vertical');
btnMP3.setAttribute('data-position', 'bottomright');
btnMP3.addEventListener('click', function(){window.open("http://www.video2mp3.net/index.php?url=" + url + "&hq=1"); self.focus();}, false);
var btnText = document.createElement('span');
btnText.setAttribute('class','yt-uix-button-content');
btnText.innerHTML = 'MP3';
btnMP3.appendChild(btnText);

var spanC = document.createElement('span');
spanC.appendChild(btnMP3);
// Add before buttons Like/Dislike
var divp = document.getElementById('watch7-sentiment-actions');
divp.appendChild(spanC);

// Add before Title
//var h1Title = document.getElementById('watch-headline-title');
//h1Title.appendChild(spanC);