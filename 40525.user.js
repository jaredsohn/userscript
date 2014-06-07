// ==UserScript==
// @name           Lastspot
// @namespace      http://anders.mellbratt.se/lastspot
// @description    Last.fm vs Spotify
// @include        http://last.fm/*
// @include        http://*.last.fm/*
// @include        http://lastfm.*/*
// @include        http://*.lastfm.*/*
// ==/UserScript==

//20081018

// Now let's try this with Spotify instead - adaptation by Anders Mellbratt, anders@mellbratt.se, http://anders.mellbratt.se/lastspot

//----

//This is a hack on an existing script to fit Audioscrobbler
//Peppe Bergqvist, peppe@peppesbodega.nu, http://peppesbodega.nu

//20060221

// Incorporates fix by Stephen Paulger and additional site (Jabberwalker) thanks to matt

// 20050822
//norcimo
//This is a further hack for last.fm, to add links on pages other than user pages and also links to torrentreactor.net

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

		// Looking for "/music/".  If any more slashes are found, then this is not a URL to the artist.
		var searchStr = "/music/";
		
		var pos = theUrl.indexOf(searchStr);
		// Is the prefix correct?
		if (pos == 0)
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
		//Ugly way of getting rid of some unwanted links, En & Sv for now
		if (movieName != null && movieName.length > 0 && movieName != "Overview" && movieName != "Music" && movieName != "Översikt" && movieName != "Lägg till i mitt bibliotek" && movieName != "Dela med dig" && movieName != "Svenska" && movieName != "Add to my Library" && movieName != "Share" && movieName != "English" && movieName != "Tagg")
		{
			//Remove leading whitespace	
			var artist = movieName.replace(/  /ig,"");
			//Create link to Spotify search
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "spotify:search:artist:\"" + artist + "\"");
			//Use image as indicator of link
			var newImg = document.createElement("img");
			newImg.setAttribute("src", "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%07%08%06%00%00%00%C0%A7%87%EE%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00HIDATx%DAblZ%26%AB%C8%C0%C00%07%88%9D%80x%1F%10%A7%B0%00%89%A5%40l%C9%00%01%20%89%D5LH%020%60%0C%12%BC%86%26x%0D%24%18%01%C47%A1%02%20%3A%02d%E6e%20%D6%40V%CA%C4%80%05%00%04%18%00%E5%5C%0A%B8%EFz%AED%00%00%00%00IEND%AEB%60%82");
			newLink.appendChild(newImg);
			container.appendChild(newLink);
			
			return(container);
		}
		
		return(null);
	}

	function insertThePirateBayLinks()
	{
		
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


