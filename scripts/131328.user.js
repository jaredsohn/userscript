// ==UserScript==
// @name		LLT Episode Downloader
// @namespace	http://www.lovelinetapes.com/shows
// @include	http://lovelinetapes.com/shows/*
// @include	http://*.lovelinetapes.com/shows/*
// @include	https://lovelinetapes.com/shows/*
// @include	https://*.lovelinetapes.com/shows/*
// @run-at	document-end
// 
// @description	Download episodes from LoveLineTapes.com for offline playback
// @version		0.3.2
// ==/UserScript==

// run-once
if (window.top != window.self) return;


// vars
var tags = document.getElementsByTagName("script");	// search target: <script>'s
var i = 0;
var j = 0;
var k = 0;
var notFound = 0;
var tagsArray = [];
var payload = "https://www.google.com";


// put <script>'s into an array
for (i=0; i<tags.length; i++)
	tagsArray.push(tags.item(i));
tags = 0;

// find our payload (link to mp3)
i=0;j=0;k=0;
for (i=0; i<tagsArray.length; i++) {
	k = tagsArray[i].innerHTML.indexOf("mp3: '");
	switch (k) {
		// not found
		case -1:
			continue;
		break;
	
		default:
			payload = tagsArray[i].innerHTML.substring(k+6, tagsArray[i].innerHTML.indexOf(".mp3'")+4);
			j++;		// found it
		break;
	}
	
	if (j == 1) break;	//found it, break out
}

// didn't find it... 
//if (j == 0) notFound = 1;



// change our search target
tags = document.getElementsByTagName("div");
tagsArray = [];


// put <div>'s into an array
for (i=0; i<tags.length; i++)
	tagsArray.push(tags.item(i));
tags = 0;


// insert payload (link to mp3)
i=0;j=0;k=0;
for (i=0; i<tagsArray.length; i++) {
	switch (tagsArray[i].className) {
		case "textHeaderSmall":
			if (tagsArray[i].innerHTML.indexOf("Recording Information") != -1) {	//+21
				//if (notFound == 1) 
				tagsArray[i].innerHTML = tagsArray[i].innerHTML + "<br><li><a style='color: blue;' href='"+payload+"' class='textHeaderSmall'>DOWNLOAD THIS EPISODE</a></li>";
				j = 1
			}
		break;
	}
	
	if (j == 1) break;
}


