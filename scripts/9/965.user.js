// ==UserScript==
// @name          IMDb Links in Netflix
// @namespace     http://www.j-san.net/code/greasemonkey
// @description	  Adds IMDb search links to Netflix pages
// @include       http://www.netflix.com/*
// @include       http://netflix.com/*
// ==/UserScript==

/** This script simply adds a link to IMDb from a standard Movie Page in Netflix. 
 ** This can be useful if you switch back and forth half as much as I do.
 ** The link should show up next to the "More Movie Details" link, which is to the right
 ** of the summary blurb.
 **
 ** This script is losely based on, and is in complement to, "Netflix Links in IMDb"
 **  http://www.artefxdesign.com/greasemonkey
 ** 
 ** for questions, bugs, compliemtents, etc.: jason@j-san.net
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/

(function() 
{
	/* get the Movie Title from the current Netflix page */
	function getMovieTitle() {
		/* We're going to find the Movie Title from the title in the HEAD section.
			It's the easiest place to find the info. We just have to strip off the "Netflix: "
		*/
		var movietitle = document.title.slice(9);
		return movietitle;
	}

	/* given the movie title, let's make a url */
	function makeIMDbUrl(movietitle) {
		var imdburl = 'http://www.imdb.com/find?q='+ movietitle +';tt=on;nm=on;mx=20;';
		return imdburl;
	}


	function makeIMDbLink(movietitle) {
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));
			
			var newLink = document.createElement("a");
			newLink.setAttribute("href", encodeURI(makeIMDbUrl(movietitle)));
			newLink.setAttribute("target", "netflix");
			newLink.appendChild(document.createTextNode("(IMDb)"));
			container.appendChild(newLink);
			
			return(container);
	}
	
	
	function getTextContent(n) {
		var s = '';
		var children = n.childNodes;
		for(var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.nodeType == 3) {  /* Node.TEXT_NODE */
				s += child.data;
			} else {
				s += getTextContent(child);
			}
		}
		return s;
	}
	
	function insertIMDbLinks() {
		var title = getMovieTitle();

		for (var i=0; i < document.links.length; i++) {
			var a = document.links[i];
			
			var href = a.getAttribute("href");
			if (href.indexOf('#details') >= 0) {
				/*insert link*/
				a.parentNode.appendChild(makeIMDbLink(title));
			}
		}
	}
	
	insertIMDbLinks();
})();


