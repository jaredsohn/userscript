// ==UserScript==
// @name           A-P 2 Links
// @namespace      http://userscripts.org
// @description    Adds Baka-Updates Manga links to manga entries.
// @include        http://www.anime-planet.com/manga/*
// @include        http://www.anime-planet.com/anime/*
// @version		   2
// ==/UserScript==

function redirect(link)
{
	var uriSite;
	uriSite = '<meta http-equiv=refresh content=\"0;url=' +encodeURIComponent(link)+ '\">';
	return 'data:text/html;charset=utf-8,' + uriSite;
}

var tabNavigator = document.getElementById("tabNavigator");
if (tabNavigator != null && document.getElementById("linksTab") == null)
{
	// Add linksTab
	var links = document.createElement('li');
	links.innerHTML = "<a href=\"javascript:viewTab('links', 'tabNavigator');\"><span>links</span></a>";
	var top4 = tabNavigator.children[0];
	var tabNav = top4.children[0];
	var tabNavigationBar = tabNav.children[0];
	tabNavigationBar.appendChild(links);
	var tabViewStack = tabNavigator.children[1];
	var linksTab = document.createElement('div');
	linksTab.id = "linksTab";
	linksTab.className = "tab";
	linksTab.style.display = "none";
	var scroll = document.createElement('div');
	scroll.className = "scroll";
	scroll.innerHTML = "<h3>External Links</h3>";
	linksTab.appendChild(scroll);
	tabViewStack.appendChild(linksTab);
	linksList = document.createElement('ul');
	linksTab.children[0].appendChild(linksList);
	
	var manga = document.getElementById("manga");
	var title = "";
	var pageNames = new Array();
	var pageAdressBeginning = new Array();
	var pageAdressMiddlePart = new Array();
	if (manga != null)
	{
		var mangaName = manga.children[1].innerHTML;
		title = mangaName;
		
		// Baka-Updates Manga link
		pageNames.push("Baka-Updates Manga");
		pageAdressBeginning.push("http://www.mangaupdates.com/series.html?search=");
		pageAdressMiddlePart.push("");
		
	}
	
	var anime = document.getElementById("anime");
	if (anime != null)
	{
		var animeName = anime.children[1].innerHTML;
		title = animeName;
	}
	
	// Common links
	// Wikipedia link
	pageNames.push("Wikipedia");
	pageAdressBeginning.push("http://en.wikipedia.org/w/index.php?title=Special%3ASearch&search=");
	pageAdressMiddlePart.push("&button=");
	
	// TV Tropes link
	pageNames.push("TV Tropes");
	pageAdressBeginning.push("http://tvtropes.org/pmwiki/search_result.php?cx=partner-pub-6610802604051523%3Aamzitfn8e7v&cof=FORID%3A10&ie=ISO-8859-1&q=");
	pageAdressMiddlePart.push("&siteurl=tvtropes.org%2Fpmwiki%2Fpmwiki.php%2FMain%2FHomePage&ref=www.google.pl%2Furl%3Fsa%3Dt%26rct%3Dj%26q%3Dtv%2Btropes%26source%3Dweb%26cd%3D1%26ved%3D0CGAQFjAA%26url%3Dhttp%253A%252F%252Ftvtropes.org%252F%26ei%3DgkrDT-njL9TO4QSs8PzWCQ%26usg%3DAFQjCNFXyqvffDkbQu7TCFs8F8Ymx_WHng");
	
	
	// Add links to the linksTab
	var i = 0;
	for (i = 0; i < pageNames.length; i++)
	{
		var newLink = document.createElement('li');
		var linkA = document.createElement('a');
		linkA.href = redirect(pageAdressBeginning[i] + title + pageAdressMiddlePart[i]);
		linkA.innerHTML = pageNames[i] + " - " + title;
		newLink.appendChild(linkA);
		linksList.appendChild(newLink);
	}
}