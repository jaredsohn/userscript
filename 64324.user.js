// ==UserScript==
// @name           StopTheAgeVideoAutoPlay
// @namespace      StopTheAgeVideoAutoPlay
// @description    Stops videos playing automatically on TheAge.com.au
// @include        http://www.theage.com.au/*
// ==/UserScript==
//
//
for (var i=0; i<document.links.length; i++) {
	var link; 

	link = document.links[i];

	var url = link.href.toLowerCase();

	if (url.substring(url.length - 11,url.length)=="autostart=1"){
		link.href = url.substring(0,url.length-11)+"autostart=0";
	}
}






	"http://www.theage.com.au/national/no-website-crash-says-cfa-just-service-interruptions-20091216-kvq9.html?autostart=1"
	
