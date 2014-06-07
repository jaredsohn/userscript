// ==UserScript==
// @name          IMDb Links in AllConsuming
// @namespace     http://www.j-san.net/code/greasemonkey
// @description	  Adds IMDb search links to AllConsuming pages
// @include       http://www.allconsuming.net/*
// @include       http://allconsuming.net/*
// ==/UserScript==

/** This script simply adds a link to IMDb from a standard item Page in AllConsuming.
 ** Note: this doesn't always make sense. You might be looking for a novel that was
 ** never turned into a movie. Obviously, IMDb won't find it.
 ** The link should show up under the "see this on Amazon link"
 **
 ** this script is an almost exact copy of my "imdb links in netflix script"
 ** see http://www.j-san.net/code/greasemonkey for more
 ** 
 ** for questions, bugs, compliemtents, etc.: jason at j-san dot net
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
	function makeIMDbUrl(movietitle) {
		var imdburl = 'http://www.imdb.com/find?q='+ escape(movietitle) +';tt=on;nm=on;mx=20;';
		return imdburl;
	}

	/* create a div, insert the link, and set the style */
	function makeIMDbLink(movietitle) {
			var container = document.createElement("div");
			container.innerHTML = '&rarr; <a href="'+ makeIMDbUrl(movietitle) +'  class=\'amazon-link\' >see this on IMDb</a>';
			container.setAttribute('style', 'text-transform:none !important;font-weight:normal !important;');
			return(container);
	}
	
	/* insert the new div w/ link into the document */
	function insertIMDbLinks() {
		var title = getMovieTitle();
		
		/* no id attributes so we have to do this the hard way
		   luckily, there is only one div with the basicTitle class
		   and it contains the 'DETAILS' section of the side bar
		   so we can just chuck our new div in there.
		*/
		var divs = document.getElementsByTagName('div');
		for (var i=0; i < divs.length; i++) {
			if ( divs[i].className == 'item-header-body' ) {
				divs[i].appendChild(makeIMDbLink(title));
				break;
			}
		}
	}
	
	insertIMDbLinks();
})();


