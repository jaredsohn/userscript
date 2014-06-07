// ==UserScript==
// @name          Scrobbler TPB2
// @namespace     tag:peppe@peppesbodega.nu,2005-07-01:Scrobblertpb2
// @description   Shows a link to TPB
// @include       http://www.audioscrobbler.com/user/*
// ==/UserScript==

//This is a hack on an existing script to fit Audioscrobbler
//Peppe Bergqvist, peppe@peppesbodega.nu, http://peppesbodega.nu

//1/7/2005 - Initial release

//All the original docs is located below




// Patched for The Pirate Bay by Anders Kronquist, k AT fukt DOT bth DOT se
// Patched version homepage : http://www.fukt.bth.se/~k/internet/utils/greasemonkey

// Author: Ed Hager, ed@artefxdesign.com

// One thing I do to keep my Netflix queue populated is I go to IMDb and look at the top rentals
// lists.  From there I will copy the name of a movie and and then paste that name into Netflix's search page.
// It's a very tedious operation.  This script creates links in the IMDb pages that will do the work for me.  
// Now when I go to IMDb, movie URLs will each be followed by a 
// "(Netflix)" link that will take me to the Netflix search results page for that movie.

// Problems or comments?  Send me an e-mail: ed@artefxdesign.com
// For greasemonkey info: http://greasemonkey.mozdev.org/

// 4/3/2005 - I fixed a problem where the Netflix search string would be the word "null".  I also 
//   removed the target attribute from the inserted links.  Now you can use the back button to return to IMDb's site.

(function() 
{
	function isMovieUrl(theUrl)
	{
		if (theUrl == null)
			return(false);

		// Looking for "/title/ttxxxxx/".  If any more slashes are found, then this is not a URL to the movie itself.
		var searchStr = "/music/";
		
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
	
	function makeThePirateBayLink(movieName)
	{
		if (movieName != null && movieName.length > 0)
		{
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));
			
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "http://thepiratebay.org/search.php?audio=on&q=" + movieName);
//			newLink.setAttribute("target", "netflix");
			newLink.appendChild(document.createTextNode("(TPB)"));
			container.appendChild(newLink);
			
			return(container);
		}
		
		return(null);
	}

	function insertThePirateBayLinks()
	{
		// Is the current page a movie page?
		if (isMovieUrl(location.href))
		{
			// This is very very very dependent on the page structure.  Unfortunately, I don't
			// see a clear way to obtain the movie name.  I tried using the title but Nexflix does not
			// like the year in parenthesis.
			
			var heading = document.getElementsByTagName("h1")[0];
			heading.appendChild(makeThePirateBayLink(heading.firstChild.firstChild.nodeValue));
		}
		
		var hyperlinks = document.getElementsByTagName("a");
		for (var i = 0; i < hyperlinks.length; ++i)
		{
			var node = hyperlinks[i];
			var href = node.getAttribute("href");
			if (isMovieUrl(href))
			{
				var link = makeThePirateBayLink(getNodeText(node, true));
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
	
	insertThePirateBayLinks();
	
})();

