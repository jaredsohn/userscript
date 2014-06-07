// ==UserScript==
// @name          Google Images in IMDb
// @namespace     http://www.nocrew.org/~stefan/gm/
// @description	  Adds Google Images search links to IMDb pages. Ripped from TPB code, ripped from Netflix code.
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// ==/UserScript==

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
	function isActorUrl(theUrl)
	{
		if (theUrl == null) {
//			alert("Not an actor URL: "+theURL);
			return(false);
		}

		// Looking for "/name/nmxxxxx/".  If any more slashes are found, then this is not a URL to the movie itself.
		var searchStr = "/name/";
		
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
		return(false);
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
	
	function makeGoogleImageLink(actorName)
	{
		if (actorName != null && actorName.length > 0)
		{
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));
			
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "http://images.google.com/images?q=" + actorName);
//			newLink.setAttribute("target", "tpb");
			newLink.appendChild(document.createTextNode("[I]"));
			container.appendChild(newLink);

			return(container);
		}
		
		return(null);
	}

	function insertGoogleImageLinks()
	{
		// Is the current page an actor page?
		if (isActorUrl(location.href))
		{
			// This is very very very dependent on the page structure.  Unfortunately, I don't
			// see a clear way to obtain the movie name.  I tried using the title but Nexflix does not
			// like the year in parenthesis.
			
			var heading = document.getElementsByTagName("h1")[0];
			var actor = heading.firstChild.firstChild.nodeValue;
			if(actor.substr(actor.length-1,1) == ")") {
				actor = actor.substring(0,actor.indexOf("(")-1);
			}
			heading.appendChild(makeGoogleImageLink(actor));
//			alert("Heading value: "+actor);
		}
		
		var hyperlinks = document.getElementsByTagName("a");
		for (var i = 0; i < hyperlinks.length; ++i)
		{
			var node = hyperlinks[i];
			var href = node.getAttribute("href");
			if (isActorUrl(href))
			{
				var link = makeGoogleImageLink(getNodeText(node, true));
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
	
	insertGoogleImageLinks();
	
})();

