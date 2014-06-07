// ==UserScript==
// @name        A-P No Refferal Traffic on Import Failures
// @namespace   http://localhost
// @include     http://www.anime-planet.com/adminsec/stats_imports.php*
// @version     1
// ==/UserScript==

function getElementByClassName(elementType, className, src)
{
	if (src == null)
	{
		src = document;
	}
	var tags = src.getElementsByTagName(elementType);
	var i;
	for (i = 0; i < tags.length; i++)
	{
		if (tags[i].className == className)
		{
			return tags[i];
		}
	}
	return null;
}

function decodeLink(encodedLink)
{
	var components = encodedLink.split('&');
	var seriesType = parseInt(components[0].split('=')[1]);
	var siteType = parseInt(components[1].split('=')[1]);
	var id = parseInt(components[2].split('=')[1]);
	if (seriesType == 1) //anime
	{
		if (siteType == 1)
		{
			return "http://myanimelist.net/anime.php?id=" + id;
		}
	
		if (siteType == 2)
		{
			return "http://anidb.net/perl-bin/animedb.pl?show=anime&aid=" + id;
		}
		
		if (siteType == 3)
		{
			return "http://animesuki.com/series.php/" + id + ".html";
		}
	}
	
	if (seriesType == 2) //anime
	{
		if (siteType == 1)
		{
			return "http://myanimelist.net/manga.php?id=" + id;
		}
	
		/*if (siteType == 2)
		{
			return "";
		}
		
		if (siteType == 3)
		{
			return "";
		}*/
	}
	
	return "";
}

function redirect(link)
{
	var uriSite;
	uriSite = '<meta http-equiv=refresh content=\"0;url=' +encodeURIComponent(link)+ '\">';
	return 'data:text/html;charset=utf-8,' + uriSite;
}

var table = getElementByClassName("table", "admintable");
if (table != null)
{
	var tableRows = table.getElementsByTagName("tr");
	for (var i = 1; i < tableRows.length; i++)
	{
		var a = tableRows[i].children[2].children[0];
		a.href = redirect(decodeLink(a.href));
	}
}