// ==UserScript==
// @name        Youtube-Chordify link
// @namespace   https://www.youtube.com/results
// @include	https://www.youtube.com/results*
// @include	http://www.youtube.com/results*
// @include	http://www.youtube.com/watch*
// @include	https://www.youtube.com/watch*
// @version     1
// @grant       none
// ==/UserScript==

function addLinkToClass(entryString) {
	var results = document.getElementsByClassName(entryString);
	
	for (var i = 0; i< results.length; i++) {
		var entry = results.item(i);
		var link = entry.getElementsByTagName("a").item("0");
		
		entry.innerHTML += "<a href=\"http://chordify.net/?url="+link.toString()+"\"> CHORDIFY ! </a>";
	}
}

function addLinkToId(entryString) {
	var results = document.getElementById(entryString);
	
	for (var i = 0; i< results.length; i++) {
		var entry = results.item(i);
		var link = entry.getElementsByTagName("a").item("0");
		
		entry.innerHTML += "<a href=\"http://chordify.net/?url="+link.toString()+"\"> CHORDIFY ! </a>";
	}
}

if (window.location.href.indexOf("search_query=") > 0) {
	console.log("search_query_chordify");
	addLinkToClass("yt-lockup-content");
} else if (window.location.href.indexOf("v=") > 0) {
	console.log("video_chordify");
	addLinkToClass("related-list-item");
	document.getElementById("watch-headline-title").innerHTML += "<a href=\"http://chordify.net/?url="+window.location.href+"\"> CHORDIFY ! </a>"
}
