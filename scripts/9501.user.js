// ==UserScript==
// @name          netflix Links in AllConsuming
// @namespace     userscripts.org
// @description	  Adds netflix search links to AllConsuming pages
// @include       http://www.allconsuming.net/*
// @include       http://allconsuming.net/*
// ==/UserScript==

/** This script is basically a copy of Jason Brackins' script for IMDb links in AllConsuming
 ** All I did was replace the IMDb information with that of Netlfix
 ** original script is available at http://userscripts.org/scripts/show/4003
 **
 ** 
 ** 
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/
 

(function() 
{
	/* get the Movie Title from the current AllConsuming page */
	function getMovieTitle() {
		var title = new String ( document.title.replace(' on All Consuming', '') );
		/* get rid of subtitles and editions. they just get in the way of the search */
		title = title.replace(/ - .*/gi, '');
		title = title.replace(/ \(\w*screen edition\)/gi, '');
		return title;
	}

	/* given the movie title, let's make a url */
	function makeNetflixUrl(movietitle) {
		var Netflixurl = 'http://www.netflix.com/Search?v1='+ escape(movietitle);
		return Netflixurl;
	}

	/* create a div, insert the link, and set the style */
	function makeNetflixLink(movietitle) {
			var container = document.createElement("div");
			container.innerHTML = '&rarr; <a href="'+ makeNetflixUrl(movietitle) +'  class=\'amazon-link\' >see this on Netflix</a>';
			container.setAttribute('style', 'text-transform:none !important;font-weight:normal !important;');
			return(container);
	}
	
	/* insert the new div w/ link into the document */
	function insertNetflixLinks() {
		var title = getMovieTitle();
		
		/* no id attributes so we have to do this the hard way
		   luckily, there is only one div with the basicTitle class
		   and it contains the 'DETAILS' section of the side bar
		   so we can just chuck our new div in there.
		*/
		var divs = document.getElementsByTagName('div');
		for (var i=0; i < divs.length; i++) {
			if ( divs[i].className == 'item-header-body' ) {
				divs[i].appendChild(makeNetflixLink(title));
				break;
			}
		}
	}
	
	insertNetflixLinks();
})();


