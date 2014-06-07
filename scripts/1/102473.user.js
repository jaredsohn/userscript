// ==UserScript==
// @name           What.CD Freeleech & Neutral Leech Highlighter
// @description    Easily identify if a torrent has been marked for Freeleech or Neutral Leech on What.CD
// @lastupdated    2011-05-07
// @namespace      mrduck.net
// @version        1.3
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.6
// @include        http://what.cd/*
// @include       https://ssl.what.cd/*
// ==/UserScript==

var allStrongAreas = document.getElementsByTagName('strong');
for (var i in allStrongAreas) {
    var thisStrongArea = allStrongAreas[i];
    if (thisStrongArea.innerHTML == "Freeleech!") {
        thisStrongArea.style.color = 'red';
        thisStrongArea.style.backgroundColor = 'yellow';
    }
    if (thisStrongArea.innerHTML == "Neutral Leech!") {
        thisStrongArea.style.color = 'yellow';
        thisStrongArea.style.backgroundColor = 'green';
    }
    if (thisStrongArea.innerHTML == "Reported") {
        thisStrongArea.style.color = 'yellow';
        thisStrongArea.style.backgroundColor = 'red';
    }
}