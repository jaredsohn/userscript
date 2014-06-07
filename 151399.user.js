// ==UserScript==
// @name          Imgur Homepage Cleanup
// @namespace     http://example.org
// @description   Hides the large image wall on the new imgur homepage.
// @match	      http://imgur.com/gallery/*
// ==/UserScript==

/*
var UrlHost = window.location.hostname;//returns host
var Urlhref = window.location.href;//returns the full url
var UrlPath = window.location.pathname;//returns everything after .com, if this is empty, you're on the front page
var patty = /imgur/g
if (patty.test(UrlHost))
{
var patt = /gallery/g;

if ( patt.test(Urlhref) ) { //if you're on a gallery page, hide the comments
	var hideMe = document.getElementById('caption');
	if(hideMeA){
		hideMeA.style.display = 'none';
	}
}

else if ( ! UrlPath) {
	var hideMeB = document.getElementByID('imagelist');
	if(hideMeB){
		hideMeB.style.display = 'none';
	}
}
}
*/
var hideMe = document.getElementById('under-image');
	if(hideMeA){
		hideMeA.style.display = 'none';
	}