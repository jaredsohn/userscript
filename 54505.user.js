// ==UserScript==
// @name           blip.fm4
// @namespace      http://alphabeter.at/greasemonkey
// @include        http://fm4.orf.at/*
// @description    Adds links to blip.fm for each song from the fm4.orf.at playlist and in the daily program/track summary
// ==/UserScript==


window.setTimeout( function() {	

// track service page
if (document.URL.indexOf("/trackservicepopup")>0) {
	
	var els = document.getElementsByTagName('b');
	for (i=0; i<els.length; i++)
	{
		song =  els[i];
		group = els[i].nextSibling.nextSibling.textContent;
		title = song.textContent;
		link = '<a href="http://blip.fm/home?q='+escape(group+" - "+title)+'">';
			
		song.innerHTML=link+song.textContent+'</a>';
	}
}

// all other fm4 pages including <td class="track">
else {
//getElementsByClassName()
	var els = document.getElementsByClassName('title');
	
	for (i=0; i<els.length; i++)
	{		
		song =  els[i];
		if (song.nodeName!="TD") continue;
		
		group = song.previousSibling.previousSibling.textContent;
		title = song.textContent;
		//if parenthesis exist - remove
		pyear = title.lastIndexOf('(');
		if (pyear > 0 && pyear < title.lastIndexOf(')')) {
			title = title.substring(0,pyear);
		}
		link = '<a href="http://blip.fm/home?q='+escape(group+" - "+title)+'">';
		
		song.innerHTML=link+song.textContent+'</a>';
		
	}		
}

}, 10);

 