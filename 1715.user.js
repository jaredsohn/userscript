// ==UserScript==
// @name          IMDb Links in tv.tv2.dk
// @namespace     http://www.tobez.org/download/greasemonkey/
// @description	  Adds IMDb search links to Danish TV2 TV guide
// @include       http://tv.tv2.dk/*
// ==/UserScript==

/**
 ** tv2imdb.user.js version 0.01
 **
 ** ----------------------------------------------------------------------------
 ** "THE BEER-WARE LICENSE" (Revision 42)
 ** <tobez@tobez.org> wrote this file.  As long as you retain this notice you
 ** can do whatever you want with this stuff. If we meet some day, and you think
 ** this stuff is worth it, you can buy me a beer in return.   Anton Berezin
 ** ----------------------------------------------------------------------------
 **
 ** This script adds links to IMDb from Danish TV2 TV guide.
 ** The problem is that the guide translates a number of titles
 ** to Danish, not always showing the original title anywhere.
 ** So IMDb will have trouble finding a minority of titles.
 **
 ** This script is losely based on IMDb Links in Netflix
 ** 
 ** for questions, bugs, compliemtents, etc.: tobez@tobez.org
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **
 **/

(function() 
{
	/* given the movie title, let's make a url */
	function makeIMDbUrl(movietitle) {
		var imdburl = 'http://www.imdb.com/find?q='+ encodeURIComponent(movietitle) +';tt=on;nm=on;mx=20;';
		return imdburl;
	}


	function makeIMDbLink(movietitle) {
			var container = document.createElement("span");
			container.setAttribute("class", "udsendelse-symboler");
			container.appendChild(document.createTextNode(" "));
			
			var newLink = document.createElement("a");
			newLink.setAttribute("href", makeIMDbUrl(movietitle));
			newLink.setAttribute("target", "_top");
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

	function process_description(d) {
		var title = "";
		var i = d.getElementsByTagName("i");

		for (var k = 0; k < i.length; k++) {
			var t = getTextContent(i[k]);
			title = t.match(/\((.*?)\)/)[1];
			if (title) break;
		}

		if (!title) {
			var spans = d.parentNode.getElementsByTagName("span");
			for (var k = 0; k < spans.length; k++) {
				var c = spans[k].getAttribute("class");
				if (c == "udsendelse-titel") {
					title = getTextContent(spans[k]);
					break;
				}
			}
		}

		if (title) {
			var divs = d.parentNode.getElementsByTagName("div");
			if (divs.length > 0) {
				divs[0].appendChild(makeIMDbLink(title));
			} else {
				d.parentNode.appendChild(makeIMDbLink(title));
			}
		}
	}
	
	function insertIMDbLinks() {
        var dsc = document.getElementsByTagName("div");
		for (var i = 0; i < dsc.length; i++) {
			var d = dsc[i];
			var n = d.getAttribute("name");
			if (n == "divBeskrivelseLang") {
				process_description(d);
			}
		}
	}
	
	insertIMDbLinks();
})();
