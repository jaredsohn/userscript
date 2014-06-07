// ==UserScript==
// @name           GC UserMenu QuickAccess
// @namespace      Geocaching
// @description    V1.0.20110509 - Adds a QuickMenu to Top-Menu on geocaching.com
// @include        http://www.geocaching.com/*
// ==/UserScript==

(function(){
	var debugMode = false;
	if (debugMode) alert("loading script quickaccess menu");

	
	var memberStatusSpan = document.getElementById('ctl00_litPMLevel');
	if (debugMode) alert("memberStatusSpan = " + memberStatusSpan);
	var isPremium = memberStatusSpan.innerHTML.indexOf('Premium') == 0;
	if (debugMode) alert("ispremium = " + isPremium);
	
	// creating menu
	var navTag = document.getElementById('Navigation');
	
	if (navTag == null) {
		return;
	}
	var mnuTag = navTag.getElementsByTagName("ul")[0];
	if (mnuTag == null) {
		return;
	}
	
	var qckliTag = document.createElement("li");
	var qckaTag = document.createElement("a");
	qckaTag.id="ctl00_hlNavQuickMenu";
	qckaTag.title="Quick Menu";
	qckaTag.href="#";
	
	var textqckTag = document.createTextNode("Quick Menu ▼");
	qckaTag.appendChild(textqckTag);
	
	if (debugMode) alert("qckliTag = " + qckliTag);
	var subulTag = document.createElement("ul");
	subulTag.className = "SubMenu";
	if (debugMode) alert("subulTag = " + subulTag);
	
	// Submenu Your Friends
	var yourFriendsLI = createMenuItem("Your Friends", "/my/myfriends.aspx");
	subulTag.appendChild(yourFriendsLI);
	// End SubMenu Your Friends
	
	// SubMenu Your GeoCaches
	var yourCachesLI = createMenuItem("Your Geocaches", "/my/owned.aspx");
	subulTag.appendChild(yourCachesLI);
		
	if (isPremium) {
		// SubMenu PocketQuery (only append on premium member)
		var pocketQueryLI = createMenuItem("Your Pocket Queries", "/pocket/default.aspx");
		subulTag.appendChild(pocketQueryLI);
		// End SubMenu PocketQuery
	
		// Submenu CreatePocketQuery (only append on premium member)
		var createQueryLI = createMenuItem("Create Pocket Query", "/pocket/gcquery.aspx");
		subulTag.appendChild(createQueryLI);
		// End SubMenu CreatePocketQuery
	}
	
	// SubMenu Watchlist
	var yourWatchlistLI = createMenuItem("Watchlist", "/my/watchlist.aspx");
	subulTag.appendChild(yourWatchlistLI);
	
	// SubMenu Your Trackables (later)
	//var yourTrackablesLI = createMenuItem("Your Trackables", "/my/owned.aspx");
	//subulTag.appendChild(yourCachesLI);
		
	// adding elements to "QuickMenu"
	var emptyTextNode1 = document.createTextNode("");
	var emptyTextNode2 = document.createTextNode("");
	var emptyTextNode3 = document.createTextNode("");
	
	qckliTag.appendChild(emptyTextNode1);
	qckliTag.appendChild(qckaTag);
	//if (debugMode) alert("appended qckaTag");
	qckliTag.appendChild(emptyTextNode2);
	qckliTag.appendChild(subulTag);
	//if (debugMode) alert("appended subulTag");
	qckliTag.appendChild(emptyTextNode3);
	mnuTag.appendChild(qckliTag);
	//if (debugMode) alert("appended qckliTag");
	
	if (debugMode) alert("finished processing script 'UserMenu QuickAccess'");
	
function createMenuItem(title, href) {
	//if (debugMode) alert("title = " + title + " - href = " + href);
	var menuLI = document.createElement("li");
	//if (debugMode) alert("menu li created");
	var menuA = document.createElement("a");
	var titleshort = title.replace(/\s/,"");
	//if (debugMode) alert("title without whitespaces = '" + titleshort + "'");
	menuA.id = "ctl00_hlSubNav" + titleshort;
	menuA.title = title;
	menuA.href = href;
	//if (debugMode) alert("menu a created");
	
	var textamenu = document.createTextNode(title);
	menuA.appendChild(textamenu);
	menuLI.appendChild(menuA);
	if (debugMode) alert("menu '" + title + "' created");
	return menuLI;
}
	
})();