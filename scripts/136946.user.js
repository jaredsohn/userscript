// ==UserScript==
// @name           AniDB links
// @namespace      http://localhost
// @include        http://anidb.net/perl-bin/animedb.pl?show=anime&aid=*
// @version		   2
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

var title = getElementByClassName("h1", "anime").innerHTML;
var links = getElementByClassName("span", "morelinks", getElementByClassName("tr", "g_odd resources")).children[0];
var tags = getElementByClassName("div", "g_bubble tagcloud", getElementByClassName("div", "g_section categories")).innerHTML;

var pageNames = new Array();
var pageAdressBeginning = new Array();
var pageAdressEnding = new Array();

title = title.replace("Anime: ", "");
if (tags.search("Original Work: Manga") >= 0 || tags.search("Original Work: Novel") >= 0 )
{
	// Baka-Updates Manga link
	pageNames.push("Baka-Updates Manga");
	pageAdressBeginning.push("http://www.mangaupdates.com/series.html?search=");
	pageAdressEnding.push("");
}

// Anime-Planet link
pageNames.push("Anime-Planet");
pageAdressBeginning.push("http://www.anime-planet.com/anime/all?name=");
pageAdressEnding.push("");

for(i = 0; i < pageNames.length; i++)
{
	links.appendChild(document.createTextNode(", "));
	var newLink = document.createElement('a');
	newLink.href = redirect(pageAdressBeginning[i] + title + pageAdressEnding[i]);
	newLink.innerHTML = pageNames[i];
	newLink.rel = "anidb::extern";
	newLink.target = "_blank";
	links.appendChild(newLink);
}
