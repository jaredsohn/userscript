// greasemonkey user script
// show all pageDiv? sections
// My code is in the public domain
// Scott Dier, 2008
//
// ==UserScript==
// @name          OnePage Startribune
// @namespace     http://www.ringworld.org/~dieman/userscripts/
// @description   show all pages on the first page
// @include       http://*.startribune.com/*
// @include       http://startribune.com/*
// ==/UserScript==
//
var counter = 1;
var element = 0;
var i = 1;

while(i) {
	try {
		element = document.getElementById('pageDiv' + counter);
	if(element.style['display']='none') {
		element.style['display']='block';
	}
	counter = counter + 1;
	} catch(e) {
		i=0;
	}
}

element = document.getElementsByTagName('table')
for(i=0; i<element.length; i++) {
	if(element[i].className == 'nextprevious') {
		element[i].style['display']='none';
	}
}