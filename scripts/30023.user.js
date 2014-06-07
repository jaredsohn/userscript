// greasemonkey user script
// hide all comments on strib
// Code is in public domain
// Scott Dier, 2008
//
// ==UserScript==
// @name          NoComment Startribune
// @namespace     http://www.ringworld.org/~dieman/userscripts/
// @description   remove comment related content
// @include       http://*.startribune.com/*
// @include       http://startribune.com/*
// ==/UserScript==
//

var element = 0;
try{
	element = document.getElementById('featuredCommentBlock');
	element.style['display']='none';
} catch(e) {
}

element = document.getElementsByTagName('div')
for(i=0; i<element.length; i++) {
	if(element[i].className == 'comments') {
		element[i].style['display']='none';
	}
}