// ==UserScript==
// @name          IMDb/TV.com Ratings in Netflix
// @namespace     http://www.hulkmad.com/gm/imdb/
// @description	  Adds IMDb/TV.com ratings/votes to Netflix pages.
// @include       http://www.netflix.com/*
// @include       http://netflix.com/*
// ==/UserScript==

/** This script calls a php script which attempts to find the rating/votes of the current movie. 
 ** For those of you wondering whether a movie is good enough to rent, this is for you.
 ** Also, it should be helpful when browsing /AllNewReleases as there are many that you may
 ** want to check. I am not sure how much bandwidth this script will take up, but if anyone
 ** has a better host to host the remote script on, any help would be appreciated.
 **
 ** This script is losely based on, and is in complement to, "Netflix Links in IMDb"
 **  http://www.artefxdesign.com/greasemonkey
 **
 ** This in turn is also based on "IMDb Links in Netflix" 
 **  http://www.j-san.net/code/greasemonkey
 ** 
 ** for questions, bugs, compliments, etc.: http://www.hulkmad.com/greasemonkey
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/

(function() 
{
	var url = "http://www.hulkmad.com/gm/imdb/imdb.php";
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
	
	function getMovieYear() {
		var year = getSpanYear();
		var year = year.substr(1,4);
		return year;
	}
	
	function makeIMDbLink(movietitle,movierating,movievotes) {
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));

			var newLink = document.createElement("a");
			newLink.setAttribute("href", encodeURI(makeIMDbUrl(movietitle)));
			newLink.setAttribute("target", "netflix");
			newLink.appendChild(document.createTextNode("(IMDb)"));
			container.appendChild(newLink);
			container.appendChild(document.createElement("br"));
			container.appendChild(document.createElement("br"));
			
			var boldness = document.createElement("b");
			boldness.appendChild(document.createTextNode("IMDb Rating: "));
			container.appendChild(boldness);
			container.appendChild(document.createTextNode(movierating));
			container.appendChild(document.createElement("br"));
			boldness = document.createElement("b");
			boldness.appendChild(document.createTextNode("IMDb Votes: "));
			container.appendChild(boldness);
			container.appendChild(document.createTextNode(movievotes));
			return(container);
	}
	
	function makeTVLink(movietitle,tvrating) {
			var container = document.createElement("span");
			container.appendChild(document.createElement("br"));
			container.appendChild(document.createElement("br"));
			
			var boldness = document.createElement("b");
			boldness.appendChild(document.createTextNode("TV.com Rating: "));
			container.appendChild(boldness);
			container.appendChild(document.createTextNode(tvrating));
			return(container);
	}
	
	function getSpanYear() {
		var descContent = document.getElementById("description-content");
		var els = descContent.getElementsByTagName("span");
		var elsLen = els.length;
		var searchClass = "year";
		var pattern = new RegExp("\\b"+searchClass+"\\b");
				
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				return ( els[i].firstChild.nodeValue );
			}
		}
		
		return "";
	}
	
	function insertIMDbLinks() {
		
		var title = getMovieTitle();
		var year = getMovieYear();

		newurl = url + "?t=" + escape(title) + "&y=" + escape(year);
		
		GM_xmlhttpRequest({
			method: "GET",
			url:newurl,
			onload:function(result) { 
				var dom = new XPCNativeWrapper(window, "DOMParser()");
				var parser = new dom.DOMParser();
				var xmlDoc = parser.parseFromString(result.responseText, "text/xml");
				
				var type = xmlDoc.getElementsByTagName("type")[0].textContent; 

				var rating = xmlDoc.getElementsByTagName("rating")[0].textContent; 
				if (type == "movie") {
					var votes = xmlDoc.getElementsByTagName("votes")[0].textContent; 
				}
				
				for (var i=0; i < document.links.length; i++) {
					var a = document.links[i];
					
					var href = a.getAttribute("href");
					if (href.indexOf('#details') >= 0) {
						if (type == "movie")
							a.parentNode.appendChild(makeIMDbLink(title,rating,votes));
						else if (type == "series")
							a.parentNode.appendChild(makeTVLink(title,rating));
					}
				} 
				
			}
		});
	}
	
	insertIMDbLinks();
})();



