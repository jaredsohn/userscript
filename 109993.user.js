// ==UserScript==
// @name          ytrep
// @description   repeat youtube vid
// @match         http://*.youtube.com/watch*
// ==/UserScript==

(function(){
var strVid = (window.location.href).match(/[?&]v=([^&#]*)/)[1];
var nodePoint = document.getElementById("eow-title");
var nodeLink = document.createElement('a');
nodeLink.setAttribute('href', 'v/' + strVid + '&loop=1&autoplay=1&playlist=' + strVid + '&autohide=1');
var nodeImg = document.createElement('img');
nodeImg.setAttribute('src','http://www.mylesbros.co.uk/murog/rep.png');
nodeImg.setAttribute('border', 0);
nodeLink.appendChild(nodeImg);
nodePoint.appendChild(nodeLink);
})()