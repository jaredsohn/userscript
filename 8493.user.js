// ==UserScript==
// @author	  Nick Chirchirillo
// @name          View in Google Earth
// @description	  Adds a link to view the current window in Google Earth
// @include       http://local.google.com/*
// @include       http://maps.google.com/*
// ==/UserScript==
//Thanks to Google Operating System (www.googlesystem.blogspot.com) for the code in getkml()
var map = unsafeWindow.gApplication;

function getkml() {

	if(document.getElementById('link'))
		location.href=document.getElementById('link')+'&output=kml';
	
}

var link = document.createElement('a');
//link.setAttribute('href', '#');
link.innerHTML = '<span><a href="#">View in Google Earth</a></span>&nbsp</a>';
link.addEventListener('click', getkml, true);
	

var node = document.getElementById('print');
node.parentNode.insertBefore(link, node);

