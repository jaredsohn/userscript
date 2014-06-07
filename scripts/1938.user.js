// ==UserScript==
// @name            IMDb Ratings for Vue (MyVue.com)
// @description     Adds IMDb ratings and votes to MyVue.com pages
// @author          David Kaspar
// @namespace       http://www.davidkaspar.com/gm/
// @include         http://www.myvue.com/cinemas/index*
// @include         http://myvue.com/cinemas/index*
// ==/UserScript==

/** This script calls a php script which attempts to find the rating/votes of the current movie. 
 ** For those of you wondering whether a movie is good enough to view, this is for you.
 **
 ** This script is based on "IMDb Ratings in Netflix" from http://www.hulkmad.com/gm/
 **
 ** This in turn is loosely based on, and is in complement to, "Netflix Links in IMDb"
 **  http://www.artefxdesign.com/greasemonkey
 **
 ** This in turn is also based on "IMDb Links in Netflix" 
 **  http://www.j-san.net/code/greasemonkey
 ** 
 ** for questions, bugs, compliments, etc.: http://www.davidkaspar.com/blog/contact.php
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **
 ** Version:    1.2
 **             Compatible with Firefox 1.5 and GM 0.6.4
 **             Uses Mozilla EX4 instead of DOMParser to parse XmlhttpRequest responses
 **             Adds a tag line for movie as title for IMDB link (hover to see it)
 **             Cache IMDB results locally for 6 hours to cut down on IMDB calls
 ** Bugs:       Some IMDB titles are not parsed correctly resulting in invalid XML resulting in blank info
 **
 **
 ** Version:    1.1
 **             Replaced original Hulkmad endpoint with my own (www.davidkaspar.com) to lower load on Hulkmad site
 **             Added more meta information to XML result (year, tag line, genre, URL)
 **             Provide direct link to IMDB movie page instead of search
 **
 **
 ** Version:    1.0
 ** Bugs:       sometimes does not find film at IMDB but on refresh it does
 **             sometimes misses the last movie
 **             uses year 2005 for all movies, will have to be changed manually next year :-)
 **
 **/

(function() 
{
	var url = "http://www.davidkaspar.com/gm/imdb/imdb.php";

	/* given the movie title, let's make a url */
	function makeIMDbUrl(movietitle) {
		var imdburl = 'http://www.imdb.com/find?q='+ movietitle +';tt=on;nm=on;mx=20;';
		return imdburl;
	}
	
    // Create a link node with supplied data (title, rating, votes)
	function makeIMDbLink(movietitle,movierating,movievotes, movieUrl, tagLine) {
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));

			var newLink = document.createElement("a");
			newLink.setAttribute("href", movieUrl);
			newLink.setAttribute("target", "imdb");
            newLink.setAttribute("title", tagLine);
			newLink.appendChild(document.createTextNode("(IMDb)"));
			container.appendChild(newLink);
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
    
    // Scrape all movie titles from the index page (all links with class="filmname")
    function getMovieTitles() {   
        var findPattern = "//a[contains(@class, 'filmname')]";
        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

        var result = new Array();
        var i=0;
        while ( (res = resultLinks.snapshotItem(i) ) !=null ) {
            result[i] = res;
            i++;
        }
        return result;

    }

    // Fetch ratings for this movie title and append link node in document
    function insertRating(node) {
        var title = removeProblematicChars(node.innerHTML.toLowerCase());
		newurl = url + "?t=" + escape(title) + "&y=2005";
		
        GM_xmlhttpRequest({
			method:"GET",
			url:newurl,
			onload:function(result) {
                //remove xml declaration for XML() to work!
				var xmlDoc = new XML(result.responseText.replace(/<\?xml version="1.0"\?>/,''));
				var rating = xmlDoc..rating[0];
                if (rating.indexOf("Awaiting")<0) {
                    rating+="/10";
                }
				var votes = xmlDoc..votes[0];
                var movieUrl = xmlDoc..url[0];
                var tagLine = xmlDoc..tagline[0];

                node.parentNode.insertBefore(document.createElement("br"), node);
                node.parentNode.appendChild(makeIMDbLink(title, rating, votes, movieUrl, tagLine));
			}
		});
    }

    // Strip or replace cahracters/phrases that cause problems when looking up ratings
    // & -> and, trim spaces, remove (YEAR), remove (ST)
    function removeProblematicChars(text) {
        var result = trimString(text);
        var result = result.replace(/&amp;/,'and').replace(/\s\(\d+\)/,'').replace(/\(\sst\s\)\s/,'');
        return result;
    }
    
    //Trim leading and trailing spaces, is there no better way in JS?
    function trimString (str) {
        var tStr = str.replace(/^\s+/g, '').replace(/\s+$/g, '');        
        return tStr;
    }

    //Main wrapper function that is executed by FireFox
	function insertIMDbLinks() {
		var movieNodes = getMovieTitles();
        
		var i=0;
        while ( movieNodes[i] !=null ) {           
            insertRating(movieNodes[i]);
            i++;
        }
	}
	
	insertIMDbLinks();
    
})();
