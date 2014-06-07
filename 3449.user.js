// ==UserScript==
// @name          Last.fm titles with Google
// @namespace     http://mll02.free.fr
// @description   Shows a link to Google next to an artist's name on artists/albums/tracks pages on last.fm. Version 0.3.
// @include       http://*.last.fm/music/*
// @include       http://last.fm/music/*
// ==/UserScript==

// changelog
// v0.3
// - initial release

(function() 
{

	var localeTLD = ".com"; //set your tld here, example ".fr". Default is ".com"

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
			
			container.setAttribute("style", "display: inline;");
			
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
		
		var titles = document.getElementsByTagName("h1");
		var node;
		var class;
		var link;
		
		//for the artist's name when on an artist page
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

		//for the artist's name when on an album / track page
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