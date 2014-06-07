// ==UserScript==
// @name        MAL Links
// @namespace   http://localhost
// @include     http://myanimelist.net/manga/*
// @include     http://myanimelist.net/manga.php?id=*
// @include     http://myanimelist.net/anime/*
// @include     http://myanimelist.net/anime.php?id=*
// @version     3
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

function redirect(link)
{
	var uriSite;
	uriSite = '<meta http-equiv=refresh content=\"0;url=' +encodeURIComponent(link)+ '\">';
	return 'data:text/html;charset=utf-8,' + uriSite;
}

var titleNode = document.getElementById("contentWrapper").children[1].cloneNode(true);
if (titleNode.children.length > 1)
{
	titleNode.removeChild(titleNode.children[1]);
}
titleNode.removeChild(titleNode.children[0]);
var title = titleNode.innerHTML;
if (title != null)
{
	//alert(title + " " + window.location);// + seriesType);
	var seriesType = window.location.href.search('/manga/');
	if (seriesType == -1)
	{
		seriesType = window.location.href.indexOf("/manga.php?id=");
		//alert(window.location.href + " " + seriesType);
	}
	
	var pageNames = new Array();
	var pageAdressBeginning = new Array();
	var pageAdressEnding = new Array();

	//title = title.replace("Anime: ", "");
	if (seriesType > 0)
	{
		// Baka-Updates Manga link
		pageNames.push("Baka-Updates Manga");
		pageAdressBeginning.push("http://www.mangaupdates.com/series.html?search=");
		pageAdressEnding.push("");
		
		// Anime-Planet link
		pageNames.push("Anime-Planet");
		pageAdressBeginning.push("http://www.anime-planet.com/manga/all?name=");
		pageAdressEnding.push("");
	}

	if (seriesType == -1)
	{
		// Anime-Planet link
		pageNames.push("Anime-Planet");
		pageAdressBeginning.push("http://www.anime-planet.com/anime/all?name=");
		pageAdressEnding.push("");
		
		// AnimeDB link
		pageNames.push("AnimeDB");
		pageAdressBeginning.push("http://anidb.net/perl-bin/animedb.pl?show=animelist&adb.search=");
		pageAdressEnding.push("&do.search=search");
	}
	
	var leftTable = getElementByClassName("td", "borderClass");
	var addBeforeMe = leftTable.children[leftTable.children.length - 2];
	var linksDiv = document.createElement("div");

	for(var i = 0; i < pageNames.length; i++)
	{
		if (i > 0)
		{
			linksDiv.appendChild(document.createTextNode(", "));
		}
		var newLink = document.createElement('a');
		newLink.rel = "noreffer";
		newLink.href = redirect(pageAdressBeginning[i] + title + pageAdressEnding[i]);
		newLink.innerHTML = pageNames[i];
		newLink.rel = "anidb::extern";
		newLink.target = "_blank";
		linksDiv.appendChild(newLink);
		//linksContent.appendChild(document.createElement('br'));
	}
	var linksTitle = document.createElement("h2");
	linksTitle.innerHTML = "External Links"
	leftTable.insertBefore(linksTitle, addBeforeMe);
	leftTable.insertBefore(linksDiv, addBeforeMe);
	leftTable.insertBefore(document.createElement("br"), addBeforeMe);
}