//Digg DuggMirror
//Version 1.0
//By Jeremy Satterfield
//Released under
//Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License
//http://creativecommons.org/licenses/by-nc-sa/3.0/

//Adds a button to your Digg pages open the cached version on Duggmirror.

// ==UserScript==
// @name          Digg DuggMirror
// @namespace     http://jsatt.blogspot.com
// @description   Adds a link to DuggMirror on every digg news item.
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

var diggs = document.getElementsByTagName('div');
for (i = 0; i < diggs.length; i++) {
	if (diggs[i].className == 'news-details') {
		url = diggs[i].getElementsByClassName('comments')[0].href;
		url = url.split("/");
		var a = document.createElement('a');
		a.href = "http://duggmirror.com/" + url[3] + "/" + url[4];
		a.innerHTML = "DuggMirror";
		a.className = "tool faved";
		a.target = "_blank";
		diggs[i].insertBefore(a, diggs[i].getElementsByClassName('comments')[0]);
	}
}
