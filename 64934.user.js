// ==UserScript==
// @name          FilmTube
// @namespace     
// @description	  Adds FilesTube links to Filmaffinity pages
// @include       http://www.filmaffinity.com/*
// ==/UserScript==
// to search titles only, http://cbpl.sirsi.net/uhtbin/cgisirsi/x/0/0/5/?item_type=DVD&srchfield1=TI^TITLE^SERIES^Title%20Processing^title&searchdata1=

(function() 
{
	function isMovieUrl(theUrl)
	{
		if (theUrl == null)
			return(false);

		// Looking for "/title/ttxxxxx/".  If any more slashes are found, then this is not a URL to the movie itself.
		var searchStr = "/es/film";
		
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
	
	function makeEssexLink(movieName)
	{
		if (movieName != null && movieName.length > 0)
		{
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));
			
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "http://www.filestube.com/search.html?q=" + movieName);
			
			var newImg = document.createElement("img");
				newImg.setAttribute("src", 'http://static.filestube.com/files/images/favicon.ico');
				newImg.setAttribute("border", "0");
				newImg.setAttribute("width", "15");
				newImg.setAttribute("height", "15");
				newImg.setAttribute("alt", "Search FilesTube");
				newImg.setAttribute("title", "Search FilesTube");
				newLink.appendChild(newImg);
			
			
			container.appendChild(newLink);
			
			return(container);
		}
		
		return(null);
	}

	function insertEssexLinks()
	{
		// Is the current page a movie page?
		if (isMovieUrl(location.href))
		{
			// This is very very very dependent on the page structure.  
			
			var heading = document.getElementsByTagName("h1")[0];
			heading.appendChild(makeEssexLink(heading.firstChild.firstChild.nodeValue));
		}
		
		var hyperlinks = document.getElementsByTagName("a");
		for (var i = 0; i < hyperlinks.length; ++i)
		{
			var node = hyperlinks[i];
			var href = node.getAttribute("href");
			if (isMovieUrl(href))
			{
				var link = makeEssexLink(getNodeText(node, true));
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

	
	
	insertEssexLinks();
	
})();

