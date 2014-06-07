// ==UserScript==
// @name          Blockbuster.com Links in IMDb
// @namespace     http://www.artefxdesign.com/greasemonkey
// @description	Adds Blockbuster search links to IMDb pages
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// ==/UserScript==

// One thing I do to keep my Netflix queue populated is I go to IMDb and look at the top rentals
// lists.  From there I will copy the name of a movie and and then paste that name into Netflix's search page.
// It's a very tedious operation.  This script creates links in the IMDb pages that will do the work for me.  
// Now when I go to IMDb, movie URLs will each be followed by a 
// "(Netflix)" link that will take me to the Netflix search results page for that movie.

// Problems or comments?  Send me an e-mail: ed@artefxdesign.com
// For greasemonkey info: http://greasemonkey.mozdev.org/

// 4/3/2005 - I fixed a problem where the Netflix search string would be the word "null".  I also 
//   removed the target attribute from the inserted links.  Now you can use the back button to return to IMDb's site.

/* 
	5/9/2005 Thom Wetzel (www.thomwetzel.com) modified the script to 
				add Blockbuster links rather than NetFlix links to IMDB.
	
	5/10/2005 - ThomW 
	------------------
	Modified the code again so it doesn't need an external server for the 
	BB icon.  I'm using a data:image/gif as the src for the image and the
	image is stored inline.  
	
	I used http://software.hixie.ch/utilities/cgi/data/data to generate
	the data. 
	
	6/5/2005 ThomW
	--------------
	Fixed to work with both Trixie(IE) and Greasemonkey(Firefox)

*/

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
	
	function makeBlockbusterLink(movieName)
	{
		if (movieName != null && movieName.length > 0)
		{
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));
			
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "http://www.blockbuster.com//search/PerformKeyWordSearchAction.action?searchType=Movies&schannel=Movies&subChan=sub&keyword=" + movieName);
			
			if (isNS) {
				var newImg = document.createElement("img");
				newImg.setAttribute("src", 'data:image/gif;base64,R0lGODlhDwAOAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKbK8GVld2Jqc29kfm9oeW9pem9seW9teG9ufGxyam9zbm91b2x7YWx9Zmx%2BbG9ydW91cGx6d298dXludXN6YXZ8fQAvnwIxngMynxY4nAAnrwArpwAvoAAvoQMupAMvpwApqwAqqAArqAAqqgIrqgMrrwMsqwAjtwAmsAAmsgAktwMmtwMntgAiuAAiuQAgvQIkuQMluQMkvAMpsgMotAYptwMxoQMwowYwqQswqA0wrBo3oh0yrCY%2BqDQ7qAAbxwAcxAAcxQMfxQMfxgMbzwIcyAMdyQMcywMdygAX0AAW0gAU1gAU1wIV1wMX1AMX1gAS2AAS2gAQ3wMU2wsa1B0b3AAH7gAH7wIN5gAK6QAJ7AMM6wMM7AAG8QAE9QEF9gAC%2BAAD%2BAMF%2BQMJ8gMK8AMI9AcM8wMR4QMQ4wMgxRAk1iQg2CEy2ycv7jg89h5DlCdLiCpMkCdAzlNTjkpRp1dIo2VPnm9ciW9Vlm9Ylm9iiGxnnWxtkW9tlWxpm29rmm9onm93gGx0hG9yinlniH1ygWxmoG%2BBXm%2BCY2%2BBan%2BJaXSG2o50e5p5Z4B%2Fg4B6jr2yM4CMVICRV4GSWpGSUJGbWrOIY6alQNKgPtWvP9K8LeasMeWrOOq9JOa%2BP%2FW3JPG1Lv%2B9IPq9KMqhUcDDKtnSNvXKGv%2FAHP%2FFGf%2FXEf%2FaEO7AIuzAOv%2FDJv%2FKLPjKNP%2FPMefnF%2BrqEvbrCv%2FpCf%2FsCP30Bf%2F7A%2F%2F4Df%2FzGufiIf%2FtJ4KZ04GN6LK68LrB8sLG98%2FP%2Ft7b49Ta9Nbe8Obq%2BOfp%2FPT0%2BPj5%2Ff%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP%2F78KCgpICAgP8AAAD%2FAP%2F%2FAAAA%2F%2F8A%2FwD%2F%2F%2F%2F%2F%2FywAAAAADwAOAAAI3QCD0GByJQ6bNW3iYHmyw0UxaTqQnJpIseJEaFGynDqjZsyWKUpgsPhAAocxLmJOocF0yYORIZs0dShCxU6ZNKfCEHM1TBeeXqNohfryRtmdU1aEeeL0K48sDpZSgakjLdkpJ8F28QJFJBapVZWkUJKG7FQOYK0yvTqi6hOrWkKaHdtzqoWvTgpg%2BbHVyFEuPdLkzDgFYpYpVKXo3DqFS9SJaDVWnErRANAfL10iUFggYoQzFB9OJdECxkyVGyZKqIhhg9kPGRZjn1rmAwocN2Sa8AgB5EWPHUvmPAsIADs%3D');
				newImg.setAttribute("border", "0");
				newImg.setAttribute("width", "15");
				newImg.setAttribute("height", "14");
				newImg.setAttribute("alt", "Search Blockbuster.com");
				newImg.setAttribute("title", "Search Blockbuster.com");
				newLink.appendChild(newImg);
			}
			else if (isIE) {
				var newText = document.createTextNode("[Blockbuster]");
				// newLink.setAttribute('style', 'font-size: 0.76em;');
				newLink.appendChild(newText);
			}
			
			container.appendChild(newLink);
			
			return(container);
		}
		
		return(null);
	}

	function insertBlockbusterLinks()
	{
		// Is the current page a movie page?
		if (isMovieUrl(location.href))
		{
			// This is very very very dependent on the page structure.  Unfortunately, I don't
			// see a clear way to obtain the movie name.  I tried using the title but Nexflix does not
			// like the year in parenthesis.
			
			var heading = document.getElementsByTagName("h1")[0];
			heading.appendChild(makeBlockbusterLink(heading.firstChild.firstChild.nodeValue));
		}
		
		var hyperlinks = document.getElementsByTagName("a");
		for (var i = 0; i < hyperlinks.length; ++i)
		{
			var node = hyperlinks[i];
			var href = node.getAttribute("href");
			if (isMovieUrl(href))
			{
				var link = makeBlockbusterLink(getNodeText(node, true));
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

	var isNS = 0;
	var isIE = 0;
	if (navigator.appName.indexOf('Netscape') != -1) isNS = 1;
	else if (navigator.appName.indexOf('Microsoft Internet Explorer') != -1) isIE = 1;
	
	insertBlockbusterLinks();
	
})();

