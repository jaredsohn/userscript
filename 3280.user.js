// ==UserScript==
// @name          Completely Idiotic
// @namespace     http://www.randomchaos.com/software/firefox/greasemonkey/completely_idiotic/
// @description	  Adds 'Which is, of course, completely idiotic.' to the end of every paragraph on news sites.
// @include       http://news.google.com/*
// @include       http://www.foxnews.com/*
// @include       http://www.washingtonpost.com/*
// @include       http://nytimes.com/*
// @include       http://www.bbc.co.uk/*

// ==/UserScript==s

(function() {
	paragraphs = document.getElementsByTagName( 'P' );

	for ( i=0; i<paragraphs.length; i++
){ 
		content = paragraphs[i].innerHTML; 
		content+= ' Which is, of course, completely idiotic.'; 	
		paragraphs[i].innerHTML = content; 
	}
})();