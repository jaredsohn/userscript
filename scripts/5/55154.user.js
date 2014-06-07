// ==UserScript==
// @name           Hypem hide remixes
// @namespace      maeki.org
// @description    Hide remixes from the list
// @include        http://hypem.com/*
// ==/UserScript==

function HideRemixes() {
var trackInfoDivs = document.getElementsByClassName('track-info');
var thisDiv;
for (var i=0; i<trackInfoDivs.length; i++) {
  thisDiv = trackInfoDivs[i];
  if (thisDiv.parentNode.textContent.match(/remix|mashup/i)) {
	thisDiv.parentNode.style.display='none';
      }
 }
}

var viewall = document.getElementById('top25');
var hideLink = document.createElement('a');
hideLink.textContent = 'HIDE REMIXES';
hideLink.href='#';
hideLink.class=''

hideLink.addEventListener("click", HideRemixes, true);

viewall.parentNode.insertBefore(hideLink, viewall);