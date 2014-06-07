// ==UserScript==
// @name YouTube View More Uploader Videos
// @namespace YVMUV
// @description See a sleek list of additional videos from the same user that have been uploaded from within your video player.  
// @version 02.07.13.0147
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @author drhouse
// @updateURL https://userscripts.org/scripts/source/154295.meta.js
// ==/UserScript==

var theurl = document.URL;
var links = document.getElementById('body-container').getElementsByTagName('a');

if (location.href.toString().indexOf("list") == -1 && parent.location.href.toString().indexOf("watch") != -1 && parent.location.href.toString().indexOf("feed") == -1 && parent.location.href.toString().indexOf("watch_") == -1)
	window.location.href = (theurl + "&list=UL");

for(var i=0 ; i<links.length ; i++){
    if (links[i].href.toString().indexOf("watch") != -1 && links[i].href.toString().indexOf("list") <= -1 && links[i].href.toString().indexOf("feed") == -1 && links[i].href.toString().indexOf("watch_") == -1)
    	links[i].setAttribute('href', links[i].getAttribute('href').split('&')[0] + '&list=UL');
}