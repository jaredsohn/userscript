// ==UserScript==
// @name           YouTube Music Mode
// @namespace      YouTubeMM
// @include        http://www.youtube.com/*
// ==/UserScript==

document.getElementById('watch-player').style.background = '#FFFFFF';
mplc = document.getElementById('watch-actions');

btn = document.createElement('button');
//btn.setAttribute('onclick', 'document.getElementById(\'watch-player\').style.height=(window.rsz ? \'390px\' : \'40px\');document.getElementById(\'watch-player\').style.paddingBottom=(window.rsz ? \'0px\' : \'175px\');document.getElementById(\'watch-player\').style.paddingTop=(window.rsz ? \'0px\' : \'175px\');window.rsz=!window.rsz;return false;');
btn.setAttribute('onclick', 'document.getElementById(\'watch-player\').style.height=(window.rsz ? \'390px\' : \'40px\');document.getElementById(\'watch-player\').style.paddingBottom=(window.rsz ? \'0px\' : \'350px\');window.rsz=!window.rsz;return false;');
btn.title = 'Play in Music Mode';
btn.type = 'button';
btn.className = 'yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip';
btnCont = document.createElement('span');
btnCont.className = 'yt-uix-button-content';
btnCont.innerHTML = 'Music Mode';
btn.appendChild(btnCont);
mplc.appendChild(btn);