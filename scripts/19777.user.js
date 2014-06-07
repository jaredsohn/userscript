// ==UserScript==
// @name          Essex Library Search
// @namespace     
// @description	  Adds Essex Library Search links to IMDb pages
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// ==/UserScript==
// to search titles only, http://cbpl.sirsi.net/uhtbin/cgisirsi/x/0/0/5/?item_type=DVD&srchfield1=TI^TITLE^SERIES^Title%20Processing^title&searchdata1=

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
	
	function makeEssexLink(movieName)
	{
		if (movieName != null && movieName.length > 0)
		{
			var container = document.createElement("span");
			container.appendChild(document.createTextNode(" "));
			
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "http://horizon.cefls.org/ipac20/ipac.jsp?menu=search&aspect=subtab37&npp=10&ipp=20&spp=20&profile=all&ri=&index=.TW&oper=and&x=6&y=12&aspect=subtab37&index=.AW&term=&oper=and&index=.TW&term=&oper=and&index=.SW&term=&limitbox_1=CO01+%3D+vid&sort=3100014&term=" + movieName);
			
			var newImg = document.createElement("img");
				newImg.setAttribute("src", 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANcSURBVHjaHFPbSxtpFD9z%2FZxJMonWhGQ0WfCSC1XbbFZDYIVQF3e1raS7L30vhdKlsG9bCiX%2Fw7rQQikU2RdZKH1oJYvaB7tiausSxWAaaJqLuZikTmIyk%2BvY%2FdIPfm%2FfOb%2FLOYeo1%2BuQTqchFArB7OwslEql76LRqLdardpkWdY6HA5CVdWIXq%2F%2Fa2BgoM0wTHdychJ4ngca8CNJEmq1mrHZbH5bKBQWSpJ0oQNQpjSaWjSRqGo5rkuQ5M%2BSJC1YrdYHNE2nenV0rxBjsFgs%2Fr6%2BuakbczpzP7ndAXZ%2FX4vKZaGJUEMeHc0XBWH9OJ2O7%2B3t3fV4PH9wHJelgsEgGw6Hg18ALjsnJmTn0dFvwtOnBl2nww8HAhQbjyNhZ2fQ2GjMsB6PXG%2B1tLlsdqTRaGxR4%2BPjl7a3txcueb2Ho5HIPS4chi7HgfXhQ9DPzUH%2FtWtgCASAyGRAf3JiP7fb9969f38FK83SiURiuov1mzudX9CbN3Dh9m0gcRgnKysgbW4C2dcHtE4HXxACdX0d%2BgXhhwGz%2BR9VUS6T2Hx6yGbb4TIZ0XjzJnx%2B%2BRKaySRopqagz2oFJRYDORoF1mwGFZP05%2FMWmmE%2BxmKxf3FWpEHgea3F69VU3r6FKpbdYxW8Xjjd2AA9Hp%2FB74fi6ipY7twBw8wM4RoZmW61WnPU0tLSfAvgVMxmf1RWV2kCS%2ByenYF8cAAi%2FgyqCrlHj0DB7GdbW8BcvAivc7lnGoSmaL%2Ff%2F%2BJdJKKeIlQYNBq%2FkatVQKIIWrcbupIE%2BSdPoHV8DBRuSrbbUGg2ZafD8ZweG%2Fub3N3drRwdHExnKGqFnJ8HUlEAYa9wfg7JYBBaOOVeaIA3Efl8ULBYXsQPD29ptVqedrlcbcSyE8efPg0bPJ7XY%2B32lc6rV1DGEgk8MgKHxOBGDPadu379MJ1MJkrFYgCv8WNCwUy5XM65vLwcMotiashq3TdJ0lWxWrWqqRRDmUxwNjxc%2BMhxG%2Fli8XM2lRpdXFy8j%2B8gSlQqFcDjgmQyaVtbW3vwIR5XGJ6vszxPuux2lMpkanqdTmnVat8PiWLYbDY%2Fx4i7cSZfDwNfDdhstrTP57uHELqKJd0Q9Hq1Vi7%2FyarqrwJCoS5FfRAE4T%2BTyZQ9xzZ6%2BF%2BAAQBS9YCSg%2FgqagAAAABJRU5ErkJggg%3D%3D');
				newImg.setAttribute("border", "0");
				newImg.setAttribute("width", "15");
				newImg.setAttribute("height", "15");
				newImg.setAttribute("alt", "Search Essex");
				newImg.setAttribute("title", "Search Essex");
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

