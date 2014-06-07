// ==UserScript==
// @name          GreenCine Links in IMDb
// @description	  Adds GreenCine search links to IMDb pages
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// ==/UserScript==

// This script is a blatant ripoff of the Netflix script written by ed@artefxdesign.com.
// Please send all praise to him.  However, if anything breaks with this script, it's
// probably my fault.  So email me about that.

// A little blurb about Netflix V. GreenCine.  Netflix is a great service, and they
// pioneered dvd-rental-by-mail.  They have a very large selection.  So, why do I
// subscribe to GreenCine, even though they are (ever so slightly) more expensive?
//
// 1. Much greater selection of independent, foreign, vintage and rare films
// 2. GreenCine Film Community: GC works very hard to foster a community of film
//    lovers, with everything from guest articles, to a film blog, to hosted screenings.
// 3. Support local companies.  GreenCine is a San Francisco-based company, so I
//    get my movies really quickly, and am putting money into the local economy.
// 4. Knowledge and responsiveness of both staff and fellow GC subscribers: I'm sure
//    there are passionate film buffs working for (and subscribing to) Netflix, but
//    I don't think they can hold a candle to the film geeks in the GreenCine
//    community.

// Problems or comments?  Send me an e-mail: raphael@thetechangel.com
// For greasemonkey info: http://greasemonkey.mozdev.org/

(function() 
{
	function isMovieUrl(theUrl)
	{
		if (theUrl == null)
			return(false);

		// Looking for "/title/ttxxxxx/".  If any more slashes are found, then this is not a URL to the movie itself.
		var searchStr = "/title/";
		
		var pos = theUrl.indexOf(searchStr);
		// Is the prefix correct?
		if (pos >= 0)
		{
			var temp = theUrl.substring(pos + searchStr.length);
			
			// Are there any more slashes? One more is ok.
			var pos = temp.indexOf("/");
			// If there are no more slashes, then success.
			if (pos == -1)
				return(true);
			temp = temp.substring(pos+1);
			
			// Is there anything left?
			return (temp == null || temp.length == 0);
		}
	}		
	
	function getNodeText(node, goDeep)
	{
		var nodeText = node.nodeValue;
		
		if (goDeep && nodeText == null && node.childNodes != null && node.childNodes.length > 0)
		{
			nodeText= "";
			
			for (var i=0; i < node.childNodes.length; ++i)
			{
				nodeText += getNodeText(node.childNodes.item(i), goDeep);	
			}
		}
		return(nodeText == null ? "" : nodeText);
	}
	
	function makeGreenCineLink(movieName)
	{
		if (movieName != null && movieName.length > 0)
		{
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));
			
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "http://www.greencine.com/advancedSearch?action=gSearch&TITLE=" + movieName + "&STUDIO=&ACTOR=&DIRECTOR=&OTHER=&MPAA_RATING=Any&GENRE=Any&YEAR=Any&LANGUAGE=Any&SUBTITLE=Any");
//			newLink.setAttribute("target", "GreenCine");
			newLink.appendChild(document.createTextNode("(GreenCine)"));
			container.appendChild(newLink);
			
			return(container);
		}
		
		return(null);
	}

	function insertGreenCineLinks()
	{
		// Is the current page a movie page?
		if (isMovieUrl(location.href))
		{
			// This is very very very dependent on the page structure.  Unfortunately, I don't
			// see a clear way to obtain the movie name.  I tried using the title but Nexflix does not
			// like the year in parenthesis.
			
			var heading = document.getElementsByTagName("h1")[0];
			heading.appendChild(makeGreenCineLink(heading.firstChild.firstChild.nodeValue));
		}
		
		var hyperlinks = document.getElementsByTagName("a");
		for (var i = 0; i < hyperlinks.length; ++i)
		{
			var node = hyperlinks[i];
			var href = node.getAttribute("href");
			if (isMovieUrl(href))
			{
				var link = makeGreenCineLink(getNodeText(node, true));
				if (link != null)
				{
					if (node.nextSibling == null)
						node.parentNode.appendChild(link);
					else
						node.parentNode.insertBefore(link, node.nextSibling);
				}
			}				
		}
	}
	
	insertGreenCineLinks();
	
})();
