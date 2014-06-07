// ==UserScript==
// @name          Last.fm with Google
// @namespace     http://mll02.free.fr
// @description   Shows a link to Google next to any artist link on last.fm. Version 0.3.
// @include       http://*.last.fm/*
// @include       http://last.fm/*
// ==/UserScript==

// changelog
// v0.3
// - better display even in user pages
// - avoids getting shown on "recommended music" links
// v0.2
// - now uses image (blue G)

(function() 
{

	var localeTLD = ".com"; //set your tld here, example ".fr". Default is ".com"

	function isArtistURL(theUrl)
	{
		if (theUrl == null)
			return(false);

		// Looking for "/music/".  If any more slashes are found, then this is not a URL to the artist itself.
		var searchStr = "/music/";
		
		// We don't want links to music recommendation
		if (theUrl.indexOf("/recommended/music/") >= 0) return (false) ;

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
	
	function makeLink(artistName)
	{
		if (artistName != null && artistName.length > 0 && artistName != "Overview" && artistName != "Music")
		{
			var container = document.createElement("span");
			
			container.appendChild(document.createTextNode(" "));
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "http://www.google" + localeTLD + "/search?q=" + artistName + "");

			var newImg = document.createElement("img");
			newImg.setAttribute("src", "http://www.google.com/nav_first.gif");
			newImg.setAttribute("style", "display: inline; margin-bottom: -10px; position: relative;"); //height: 13px;width: 9px;");
			newLink.appendChild(newImg);
			
//			newLink.appendChild(document.createTextNode("{G}"));
			
			container.appendChild(newLink);

			return(container);
		}
		
		return(null);
	}

	function insertLinks()
	{
		
		var hyperlinks = document.getElementsByTagName("a");
		for (var i = 0; i < hyperlinks.length; ++i)
		{
			var node = hyperlinks[i];
			var href = node.getAttribute("href");
			//alert (href);
			if (isArtistURL(href))
			{
				var link = makeLink(getNodeText(node, true));
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
	
	insertLinks();
	
})();
