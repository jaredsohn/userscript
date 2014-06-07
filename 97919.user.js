// ==UserScript==
// @name           BBC iPlayer TV Only 
// @description Removes the annoying radio link and the redirection from iplayer to radio.
// @version       1.0
// @history        1.0 initial
// @include        http://*bbc.co.uk/iplayer/*
// ==/UserScript==

if (window.location.href == 'http://www.bbc.co.uk/iplayer/radio') {
   window.location.href = 'http://www.bbc.co.uk/iplayer/tv';
}

document.getElementById('nav-logo').childNodes(1).href = "/iplayer/tv/";
document.getElementById('nav-radio').style.display = 'none';