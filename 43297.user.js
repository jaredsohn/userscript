// ==UserScript==
// @name           blip.fm4
// @namespace      http://alphabeter.at/greasemonkey
// @include        http://fm4.orf.at/trackservicepopup/*
// ==/UserScript==


window.setTimeout( function() {	


var els = document.getElementsByTagName('b');
for (i=0; i<els.length; i++)
{
	song =  els[i];
	group = els[i].nextSibling.nextSibling;
	link = '<a href="http://blip.fm/home?q='+escape(group.textContent+" - "+song.textContent)+'">';
		
	song.innerHTML=link+song.textContent+'</a>';
}

}, 10);
