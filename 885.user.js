// ==UserScript==
// @name          MRQE Links in Netflix
// @namespace     http://www.washingtonhikes.com/code
// @description	  Adds MRQE search links to Netflix pages
// @include       http://www.netflix.com/*
// @include       http://netflix.com/*
// ==/UserScript==

/** This script adds a link to Movie Review Query Engine from a standard Movie Page in Netflix. 
 ** I often find myself looking for more reviews than those supplied via Netflix.
 ** The link should show up rightmost in the list of links below the summary blurb.
 **
 ** This script is blatently ripped off from, and is in complement to, "IMDb Links in Netflix"
 **  by http://www.j-san.net/code/greasemonkey
 **  
 ** Feel free to email improvements/suggestions to firefox[at]washingtonhikes[dot]com 
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
	function makeMRQEUrl(movietitle) {
		var MRQEurl = 'http://www.mrqe.com/lookup?isindex='+ movietitle;
		return MRQEurl;
	}


	function makeMRQELink(movietitle) {
			var container = document.createElement("span");
			/* weird spacing thing */
			container.setAttribute("style","font-size:12px;");
			container.appendChild(document.createTextNode("\u00A0"));
			var newLink = document.createElement("a");
			newLink.setAttribute("href", encodeURI(makeMRQEUrl(movietitle)));
			newLink.setAttribute("target", "mrqe");
			newLink.appendChild(document.createTextNode("MRQE"));
			container.appendChild(newLink);
						
			return(container);
	}
	
	function makeSpacer () {
			var spacer = document.createElement("span");
			spacer.setAttribute("style","font-size:18px; color:#AAAAAA;");
			spacer.appendChild(document.createTextNode("\u00A0|\u00A0"));
			
			return(spacer);
	
	}
	

	function insertMRQELinks() {
		var title = getMovieTitle();

		
		
		
		for (var i=0; i < document.links.length; i++) {
			var a = document.links[i];
			var href = a.getAttribute("href");
			if (href.indexOf('mdptabAtAGlance') >= 0) {
				/*insert link*/
				a.parentNode.appendChild(makeSpacer());
				a.parentNode.appendChild(makeMRQELink(title));
				break;
			}
			else if (href.indexOf('mdptabAlsoRented') >= 0) {
				/*insert link*/
				a.parentNode.appendChild(makeSpacer());
				a.parentNode.appendChild(makeMRQELink(title));
				break;
			}
		}
	}
	
	insertMRQELinks();
})();


