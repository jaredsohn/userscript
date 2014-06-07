// ==UserScript==
// @name		Shortener Istemezuk
// @namespace		twitter
// @include		http://twitter.com/*
// @include		https://twitter.com/*
// ==/UserScript==

window.addEventListener(
	"click", 
	function(event) {
		if( event.target.className == "twitter-timeline-link" ) {
			var ultimate = event.target.getAttribute("data-ultimate-url");
			event.target.href = ultimate ? ultimate : event.target.getAttribute("data-expanded-url");
		}
	},
	false );

