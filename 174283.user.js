// ==UserScript==
// @name		Reddit Imgur Proxy
// @description		View imgur images on reddit through their official filmot proxy 
// @namespace		http://twitter.com/studavis
// @include		http://reddit.com/*
// @include		http://*.reddit.com/*
// ==/UserScript==

// get jQuery from Reddit
$ = unsafeWindow.jQuery;

//set the filmot server 
var theServers = new Array(1); //change to correct number of elements
theServers[0] = 'filmot.org/$1'

//wire up links based on href
$('a[href*="imgur.com"]').filter(function(){
		return $(this).attr('href').match(/imgur.com\/(.*\.(jpg|gif|png|jpeg))/i)  //grab only image links
}).each(function(){
			convertLinkToProxy($(this));
	})

function convertLinkToProxy(A){
	//if the link isn't an image, give it an icon 
	if (!A.hasClass('thumbnail')){
		A.css('background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADdJREFUeNpiVFVVZSAFMDGQCEjWwIIpdOkWM5qIntpffBowFdHXD9TwNKbXR4CncbmeXk4CCDAAIAkKjIllIowAAAAASUVORK5CYII=)')
		.css('background-position','left top')
		.css('background-repeat','no-repeat')
		.css('padding-left','20px')
	}
	A.attr('href', A.attr('href').replace(/imgur.com\/(.*\.(jpg|gif|png|jpeg))/i, theServers[(Math.floor(Math.random()* theServers.length))]))
	.attr('title', 'Proxied Imgur.com link')

}