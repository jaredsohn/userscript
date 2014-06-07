// ==UserScript==
// @name           B-U Manga links
// @namespace      http://localhost
// @include        http://www.mangaupdates.com/series.html?id=*
// @include        https://www.mangaupdates.com/series.html?id=*
// @downloadURL    http://userscripts.org/scripts/source/136945.user.js
// @updateURL      http://userscripts.org/scripts/source/136945.user.js
// @version		   6
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
	
	var title = getElementByClassName("span", "releasestitle tabletitle").innerHTML;
	var table = getElementByClassName("div", "sContainer").children[0];//document.evaluate("/html/body/div/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table[2]/tbody/tr/td/div/div[2]/div", document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var lastTableElement = table.children[39];
	var adsCat = document.evaluate("/html/body/div/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table[2]/tbody/tr/td/div/div[2]/div/div[27]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var linksCat = document.createElement('div');
	linksCat.className = "sCat";
	linksCat.innerHTML = "<b>External Links</b>";
	var linksContent = document.createElement('div');
	linksContent.className = "sContent";
	
	table.insertBefore(linksCat, lastTableElement);
	table.insertBefore(linksContent, lastTableElement);
	table.insertBefore(document.createElement('br'), lastTableElement);

	var pageNames = new Array();
	var pageAdressBeginning = new Array();
	var pageAdressEnding = new Array();
	var searchName = new Array();
	
	// Anime-Planet link
	pageNames.push("Anime-Planet");
	pageAdressBeginning.push("http://www.anime-planet.com/manga/all?name=");
	searchName.push(encodeURIComponent(title));
	pageAdressEnding.push("");
	
	//MAL
	pageNames.push("MAL");
	pageAdressBeginning.push("http://myanimelist.net/manga.php?q=");
	searchName.push(encodeURIComponent(title));
	pageAdressEnding.push("");
	
	// Mangafox link
	pageNames.push("Mangafox");
	pageAdressBeginning.push("http://www.mangafox.com/search.php?name_method=cw&name=");
	var mangaFoxName = encodeURIComponent(title).replace(/%20/g, "+");
	searchName.push(mangaFoxName);
	pageAdressEnding.push("&type=&author_method=cw&author=&artist_method=cw&artist=&genres[Action]=0&genres[Adult]=0&genres[Adventure]=0&genres[Comedy]=0&genres[Doujinshi]=0&genres[Drama]=0&genres[Ecchi]=0&genres[Fantasy]=0&genres[Gender+Bender]=0&genres[Harem]=0&genres[Historical]=0&genres[Horror]=0&genres[Josei]=0&genres[Martial+Arts]=0&genres[Mature]=0&genres[Mecha]=0&genres[Mystery]=0&genres[One+Shot]=0&genres[Psychological]=0&genres[Romance]=0&genres[School+Life]=0&genres[Sci-fi]=0&genres[Seinen]=0&genres[Shoujo]=0&genres[Shoujo+Ai]=0&genres[Shounen]=0&genres[Shounen+Ai]=0&genres[Slice+of+Life]=0&genres[Smut]=0&genres[Sports]=0&genres[Supernatural]=0&genres[Tragedy]=0&genres[Webtoons]=0&genres[Yaoi]=0&genres[Yuri]=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1");
	
	// mangareader link
	pageNames.push("mangareader");
	pageAdressBeginning.push("http://www.google.pl/search?hl=pl&q=");
	searchName.push(encodeURIComponent(title));
	pageAdressEnding.push(" site:www.mangareader.net");
	
	// Batoto link
	pageNames.push("Batoto");
	pageAdressBeginning.push("http://www.batoto.net/search?name=");
	searchName.push(mangaFoxName);
	pageAdressEnding.push("&name_cond=c");
	
	var tagsNode = document.getElementById("ajax_tag_data");
	if (tagsNode != null)
	{
		var tags = tagsNode.innerHTML;
		//AniDB link
		if(tags.search("Adapted to Anime") >= 0 || tags.search("Based on an Anime") >= 0)
		{
			pageNames.push("AniDB");
			pageAdressBeginning.push("http://anidb.net/perl-bin/animedb.pl?show=animelist&adb.search=");
			searchName.push(encodeURIComponent(title));
			pageAdressEnding.push("&do.search=search");
		}
	}
	
	for(var i = 0; i < pageNames.length; i++)
	{
		var newLink = document.createElement('a');
		newLink.href = redirect(pageAdressBeginning[i] + searchName[i] + pageAdressEnding[i]);
		newLink.innerHTML = pageNames[i];
		linksContent.appendChild(newLink);
		if (i < pageNames.length - 1)
		{
			linksContent.appendChild(document.createTextNode(", "));
		}
	}