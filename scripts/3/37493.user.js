// ==UserScript==
// @name           Metafilter Music Tab Bonanza
// @namespace      http://www.suburbohemia.com/
// @description    Adds a "Playlists" tab to the Mefi Music tab bar, and adds the tab bar to most music.metafilter pages
// @include        http://music.metafilter.com/*
// ==/UserScript==


function MeMuTabsMain() {
	var tabBar = document.getElementById("maintab");
	if (tabBar) {
		var plTab = document.createElement("li");
		var showLink = document.createElement("a");
		showLink.setAttribute("href","/contribute/playlist.mefi");
		showLink.setAttribute("target","_self");
		showLink.setAttribute("rel","ajaxcontentarea");
		var tabText = document.createTextNode("Playlists");
		showLink.appendChild(tabText);
		plTab.appendChild(showLink);
		tabBar.appendChild(plTab);
	} 
	if (tabBar == null) {
		var tabBar = document.createElement("ul");
		tabBar.setAttribute("id","maintab");
		tabBar.setAttribute("class","shadetabls");
		var memupage = document.getElementById("page");
		var memuh2 = document.getElementsByTagName("h2");
		memuh2 = memuh2 ? memuh2[0] : null;
		tabBar.innerHTML = '<li><a target="_self" rel="ajaxcontentarea" href="/">Songs</a></li><li><a target="_self" rel="ajaxcontentarea" href="/home/talk">Talk</a></li><li><a target="_self" rel="ajaxcontentarea" href="/home/charts">Charts</a></li><li><a target="_self" rel="ajaxcontentarea" href="/home/challenges">Challenges</a></li><li><a href="/contribute/playlist.mefi" target="_self" rel="ajaxcontentarea">Playlists</a></li>';
		if (memupage) {
			if (memuh2 && memuh2.innerHTML.indexOf("Playlists") >= 0) {
				tabBar.innerHTML = '<li><a target="_self" rel="ajaxcontentarea" href="/">Songs</a></li><li><a target="_self" rel="ajaxcontentarea" href="/home/talk">Talk</a></li><li><a target="_self" rel="ajaxcontentarea" href="/home/charts">Charts</a></li><li><a target="_self" rel="ajaxcontentarea" href="/home/challenges">Challenges</a></li><li class="selected"><a href="/contribute/playlist.mefi" target="_self" rel="ajaxcontentarea">Playlists</a></li>';
			}
			memupage.insertBefore(tabBar,memupage.firstChild);
		} else if (memuh2) {
			var pagetop = memuh2.parentNode;
			pagetop.insertBefore(tabBar,memuh2);
		}
	}
}

MeMuTabsMain();

