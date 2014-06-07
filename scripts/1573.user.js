// ==UserScript==
// @name          Last.fm link to MP3search.ru
// @namespace     http://www.gurkensalat.com/greasemonkey
// @description   Shows a link to MP3search.ru where I do most of my buying
// @include       http://*.last.fm/*
// @include       http://last.fm/*
// ==/UserScript==

// based on the script to link to The Pirate Bay and TorrentReactor (Last.fm TPB/TR)
// which itself seems to be based on a script to fix IMDB

// Version 0.2 - external link image...
// Version 0.1 - Works, appends links to mp3search.ru for Artists and Tracks

(function() 
{
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

	function countSlashes(theUrl)
	{
		numSlashes = 0;

		if (theUrl != null)
		{
			var searchStr = "/music";
			var pos = theUrl.indexOf(searchStr);
			// Is the prefix correct?
			if (pos >= 0)
			{
				// alert(theURL);
				numSlashes = 1;

				for (var i = 0; i < theUrl.length; ++i)
				{
					if (theUrl.substring(i, i + 1) == "/")
					{
						numSlashes++;
					}
				}
			}
		}
		
		return numSlashes;
	}

	function isArtistURL(theUrl)
	{
		if (countSlashes(theUrl) == 3)
			return true;

		//  In all other cases...
		return false;
	}

	function isTrackURL(theUrl)
	{
		if (countSlashes(theUrl) == 5)
			return true;

		//  In all other cases...
		return false;
	}

	function makeMP3SearchLink(name, type)
	{
		if (name != null && name.length > 0)
		{
			var container = document.createElement("span");
			container.appendChild(document.createTextNode("   | "));
			
			var newLink = document.createElement("a");

			if (type == "artist")
			{
				newLink.setAttribute("href", "http://www.mp3search.ru/search_albums.html?target=" + type + "&q=" + name);
			}
			else if (type == "tracks")
			{
				newLink.setAttribute("href", "http://www.mp3search.ru/search_tracks.html?target=" + type + "&q=" + name);
			}

			newLink.setAttribute("target", "mp3search");
			newLink.appendChild(document.createTextNode("MP3search "));

			var logo = document.createElement('img');
			logo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D%2BPAAAAFVBMVEVmmcwzmcyZzP8AZswAZv' +
				'%2F%2F%2F%2F%2F%2F%2F%2F9E6giVAAAAB3RSTlP%2F%2F%2F%2F%2F%2F%2F8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6' +
				'%2F9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS%2F4AVnsAZubxDVmAAAAAElFTkSuQmCC';
			newLink.appendChild(logo);

			container.appendChild(newLink);
			container.appendChild(document.createTextNode(" "));

			return(container);
		}
		
		return(null);
	}

	function insertMP3SearchLinks()
	{
		//  Ideally, we should do a XPath query here...
		var links = document.getElementsByTagName("a");
		for (var i = 0; i < links.length; ++i)
		{
			var linkNode = links[i];
			var href = linkNode.getAttribute("href");
			var name = getNodeText(linkNode, true);

			if (isArtistURL(href))
			{	
				//  Artists...
				var link = makeMP3SearchLink(name, "artist");				
				if (link != null)
				{
					linkNode.parentNode.insertBefore(link, linkNode.nextSibling);
				}
			}
			else if (isTrackURL(href))
			{
				//  Tracks...
				var pos = name.indexOf("- ");
				if (pos > -1)
				{
					name = name.substring(pos + 2);
				}

				var link = makeMP3SearchLink(name, "tracks");				
				if (link != null)
				{
					linkNode.parentNode.insertBefore(link, linkNode.nextSibling);
				}
			}
			else // some other link...
			{
				// alert(countSlashes(href) + " / " + href);
			}
		}
	}

	insertMP3SearchLinks();

})();
