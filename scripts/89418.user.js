// ==UserScript==
// Inspired by Hide Youtube Featured Videos by joe_3 (http://userscripts.org/scripts/show/46636)
// @name           Hide Youtube Featured Videos Revised
// @namespace      *
// @description    v0.2  Hide Youtube Featured Videos and Featured This Week videos
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// Last update 2011-05-17
// ==/UserScript==

var hideByClass = ['watch-promoted-vid', 'watch-ppv-vid'];
var hideById = ['branded-playlist-module'];

//Hide elements by Class Name
for(var k=0, l=hideByClass.length;k<l;k++){
	var elems = document.getElementsByClassName(hideByClass[k]);	
	for (var i = 0; i < elems.length; i++) {
	  elems[i].style.display = 'none';
	}
}

//Hide elements by ID
for(var k=0, l=hideById.length;k<l;k++){
	if(document.getElementById(hideById[k])){
		document.getElementById(hideById[k]).style.display = 'none';
	}
}

//Hide generated pop-up tooltip
var head = document.getElementsByTagName('head');
if(head.length > 0){
	var s = document.createElement('style');
	s.type="text/css";
	s.appendChild(document.createTextNode(".yt-uix-tooltip-tip, .yt-uix-tooltip-tip-visible{display:none !important;}"));
	head[0].appendChild(s);	
}

//Hide new featured video boxes:
var elems = document.getElementsByClassName('featured-label');	
for (var i = 0; i < elems.length; i++) {	  
  elems[i].parentNode.style.display = 'none';
  
}
