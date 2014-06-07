// ==UserScript==
// @name          Last.fm 2 Discogs
// @namespace     http://maybe78.blogspot.com
// @description   Shows a link to Discogs artist search next to any artist link on last.fm
// @include       http://*.last.fm/*
// @include       http://last.fm/*
// ==/UserScript==

// changelog


(function() 
{

	var localeTLD = ".com"; 
	function isArtistURL(theUrl)
	{
		if (theUrl == null)
			return(false);

			var searchStr = "/music/";
		
				if (theUrl.indexOf("/recommended/music/") >= 0) return (false) ;

		var pos = theUrl.indexOf(searchStr);
				if (pos >= 0)
		{
			var temp = theUrl.substring(pos + searchStr.length);
			
						var pos = temp.indexOf("/");
						if (pos == -1)
				return(true);
			temp = temp.substring(pos+1);
			
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
			newLink.setAttribute("href", "http://www.discogs.com/search?type=all&q=" + artistName + "&btn=Search");

			var newImg = document.createElement("img");
			newImg.setAttribute("src", "http://stat.discogs.com/images/dislogo.gif");
			newImg.setAttribute("style", "display: inline; margin-bottom: -3px; position: relative;"); 
			newImg.setAttribute("height", "18");
			newLink.appendChild(newImg);
			
 		//newLink.appendChild(document.createTextNode("[d]"));
			
			container.appendChild(newLink);

			return(container);
		}
		
		return(null);
	}

	function insertLinks()
	{
		
		var titles = document.getElementsByTagName("h1");
		var node;
		var class;
		var link;
		
		for (var i = 0; i < titles.length; ++i)
		{
			node = titles[i];
			class = node.getAttribute("class");
			if (class.indexOf("h1artist") >= 0)
			{
				link = makeLink(getNodeText(node, true));
				if (link != null)
				{
					node.appendChild(link);
				}
			}
		}

		titles = document.getElementsByTagName("a");
		for (i = 0; i < titles.length; ++i)
		{
			node = titles[i];
			class = node.getAttribute("class");
			if ( class != null)
			{
				if (class.indexOf("miniartist") >= 0)
				{
					link = makeLink(getNodeText(node, true));
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

	}
	
	insertLinks();
	
})();