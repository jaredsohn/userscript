// ==UserScript==
// @name           TehConnection Freeleech Highlighter Alt
// @description    Easily identify if a torrent has been marked for freeleech on TC
// @lastupdated    2010-09-24
// @namespace      vVQeZNpfMZ
// @version        0.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.6
// @include	   https://tehconnection.eu*
// @include	   http://tehconnection.eu*
// ==/UserScript==

var allStrongAreas = document.getElementsByTagName('strong');
for (var i in allStrongAreas) {
    var thisStrongArea = allStrongAreas[i];
    if (thisStrongArea.innerHTML == "Freeleech!") {
        thisStrongArea.style.color = 'green'; //Change the color to whatever you want i.e. blue, yellow, orange, red etc.
    }
}