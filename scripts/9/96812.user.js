// ==UserScript==
// @name		Facebook- No Theater
// @author		Tyler Charlesworth
// @namespace	http://www.tyworks.net/
// @version		1.1
// @description	Removes photo theater on Facebook.
// @include		http://*.facebook.com/*
// @include		https://*.facebook.com/*
// ==/UserScript==

function noTheater() {
	var theTheater = document.getElementById('fbPhotoTheater');
	
	if(theTheater != null) {
		theTheater.style.display = "none";
		
		if( (document.getElementById('myphoto') == null) && document.body.baseURI.match(/(\?|&)theater(&|$)/i)) {
			// upsets back/forward history- location.assign(document.body.baseURI.replace(/(\?theater$)|(&theater$)|((&)theater&)/, "$4"));
			document.location.href = document.location.href; // refresh gets rid of the theater view
			clearInterval(noTheaterId);
		}
	}
}

var noTheaterId = setInterval(noTheater, 100);
