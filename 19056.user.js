// ==UserScript==
// @name          Cobb Library Search
// @namespace     
// @description	  Adds Cobb Library Search links to IMDb pages
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// ==/UserScript==


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
	
	function makeCobbCatLink(movieName)
	{
		if (movieName != null && movieName.length > 0)
		{
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));
			
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "http://cbpl.sirsi.net/uhtbin/cgisirsi/x/0/0/5/?item_type=DVD&searchdata1=" + movieName);
			
			var newImg = document.createElement("img");
				newImg.setAttribute("src", 'data:image/gif;base64,R0lGODlhDwAPANUEAMWUGcmoSeW2KOPIgvz58Z1yE7uNGdiqJKuDGaR7Ea2AFZJrEbqKFraXM5x4FPj17v7%2B%2Fal9FLWEE9S3Z7KKG9CdHOHEcs%2B1ZffrzKJ2DolkCLGGGejLNIxoEr2cRZVtDaF%2FF4NeD%2Bzl0Z58GNK8eqB3EqeAGJpyEMKNEJ%2BAG7GNLsivaMq3fvvFMevhw%2FG%2FLPfv1fvy2OjfxurAKsGdP%2FHFLbGBDfTcPKeIG9bBgayQIcyiIcWhPZdvEnJSDv%2F%2F%2FyH5BAEAAAQALAAAAAAPAA8AAAa1QIJQOAjwAoOhkmBBgBwjXEIxWQYSDR0FNHKASrShRaMDLRQAAMVkyqyEp9GocKgJDq2KofchDDQ7CAgzMxwdLwARFQAsHj0HGxECHDcfdycMFR4qIT0KaC8zCR0GHwoLDQ1oDBEREhILPh0nCRkBOQwUBhIMJSG%2FJyUIKDkECSMbDAoZCx0FPRQKEkITGQgGKBEOEQAGFDZVQjwJ1wYIGwDoAUsXCCVrCAwGF0tDJB4NASRLQQA7');
				newImg.setAttribute("border", "0");
				newImg.setAttribute("width", "15");
				newImg.setAttribute("height", "15");
				newImg.setAttribute("alt", "Search CobbCat");
				newImg.setAttribute("title", "Search CobbCat");
				newLink.appendChild(newImg);
			
			
			container.appendChild(newLink);
			
			return(container);
		}
		
		return(null);
	}

	function insertCobbCatLinks()
	{
		// Is the current page a movie page?
		if (isMovieUrl(location.href))
		{
			// This is very very very dependent on the page structure.  
			
			var heading = document.getElementsByTagName("h1")[0];
			heading.appendChild(makeCobbCatLink(heading.firstChild.firstChild.nodeValue));
		}
		
		var hyperlinks = document.getElementsByTagName("a");
		for (var i = 0; i < hyperlinks.length; ++i)
		{
			var node = hyperlinks[i];
			var href = node.getAttribute("href");
			if (isMovieUrl(href))
			{
				var link = makeCobbCatLink(getNodeText(node, true));
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

	
	
	insertCobbCatLinks();
	
})();

