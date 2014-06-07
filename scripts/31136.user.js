// ==UserScript==
// @name           KG - WikiArtist
// @namespace      http://wikipedia.org
// @description    searching casting at Wikipedia
// @include        http://*.imdb.com/*
// @include        http://imdb.com/*
// ==/UserScript==


(function() 
{
	function isMovieUrl(theUrl)
	{
		if (theUrl == null)
			return(false);

		// Looking for "/title/ttxxxxx/".  If any more slashes are found, then this is not a URL to the movie itself.
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
			newLink.setAttribute("href", "http://en.wikipedia.org/wiki/Special:Search?&search=" + '"' + movieName + '"');
			newLink.setAttribute("style", "-moz-opacity: 0.4;");
			
			var newImg = document.createElement("img");
				newImg.setAttribute("src", 'data:image/gif;base64,R0lGODlhCgAKAIcAAAAAADExMTk5OUJCQkpKSlJSUlpSWlpaWmtra3Nrc3t7e4SEhIyMjJSUlJycnKWcpa2trb29vb3GvcbGxs7OztbW1t7e3t7n3ufn5+/v7+/37/f39/f/9////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAGMALAAAAAAKAAoAAAhTAMcIHEgQQgELBi84gCABAYYDECwQgOAgw4QIYxwcyOAgQIQNEcdgGDDhgoAICAcqWDChgIIIFQZOGMBgAoEFGQZuSABhQwMHBEVuGJMhZ9CjAQEAOw%3D%3D');
				newImg.setAttribute("border", "0");
				newImg.setAttribute("width", "9");
				newImg.setAttribute("height", "9");
				newImg.setAttribute("alt", "Wikipedia");
				newImg.setAttribute("title", "Wikipedia");
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