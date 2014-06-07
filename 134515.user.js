// ==UserScript==
// @name          Add Scholar and Books links to Google search pages
// @description   This script adds the Scholar and Books search links to the top and side bars of the Google search page, then periodically updates the links with the current query
// @include       http://google.*
// @include       https://google.*
// @include       http://www.google.*
// @include       https://www.google.*
// @include       http://books.google.*
// @include       https://books.google.*
// @include       http://scholar.google.*
// @include       https://scholar.google.*
// @include       http://maps.google.*
// @include       https://maps.google.*
// @version       2012.9.18
// ==/UserScript==

// version history:
//   2012.5.30 - initial release
//   2012.6.17 - fixed bug in Books search URL that caused double quotes in
//               search string to erroneously change to HTML entity &quot;
//   2012.9.13 - updated to work with new Scholar page, as it has changed 
//               the layout and id attributes of the top bar
//   2012.9.18 - fixed bug in Scholar top bar where links were not set up
//               when search string was empty

var booksURL = 'http://www.google.com/search?tbm=bks&';
var scholarURL = 'http://scholar.google.com/scholar?';
var updateFrequency = 250; // in milliseconds

function addUpdateTopSideBarLink(name, tsURLPrefix) {
	var topBarId = 'gb_' + name;
	var sideBarId = 'side_' + name;

	// add link to side bar if it doesn't exist already
	if (document.getElementById(sideBarId)==null) {
		var ms = document.getElementById('ms');
		if (ms!=null) {
			var ms_ul = ms.children[0];
			var sideNew = document.createElement('li');
			sideNew.className = 'mitem';
			sideNew.innerHTML = "<a class='kl' id='"+sideBarId+"' href='"+tsURLPrefix+"'>"+name+"</a>";
			ms_ul.insertBefore(sideNew, ms_ul.children[ms_ul.length-1]); // insert before More
		}
	}

	// top bar
	gbz = document.getElementById('gbz');
	if (gbz!=null) {
		gbtc = gbz.getElementsByClassName('gbtc');
		if (gbtc.length!=0) {
			var gbt = gbtc[0].getElementsByClassName('gbt');
			
			// add top bar link if it's not there already
			if (document.getElementById(topBarId)==null) {
				if (gbt.length>=2) { // should have at least Search and More present
					var gbNew = document.createElement('li');
					gbNew.className = "gbt";
					gbNew.innerHTML = "<a class='gbzt' id='"+topBarId+"' href='"+tsURLPrefix+"'><span class='gbtb2'></span><span class='gbts'>"+name+"</span></a>";
					gbtc[0].insertBefore(gbNew, gbtc[0].children[gbt.length-1]); // insert before More
				}
			}
			
			// look for search query in top bar links
			for(var i=0; i<gbt.length; i++) {
				currentHref = gbt[i].children[0].href;
				if (currentHref.search(/(\?|&)q=/)>0) {
					var searchURLFragment = currentHref.substring(currentHref.search(/(\?|&)q=/)+1).split("&")[0];
					break;
				}
			}
			
			// if found, update top bar and side bar link
			if (searchURLFragment) {
				var newURL = tsURLPrefix + searchURLFragment;
				if (document.getElementById(topBarId)!=null) {
					document.getElementById(topBarId).href = newURL;
				}
				if (document.getElementById(sideBarId)!=null) {
					document.getElementById(sideBarId).href = newURL;
				}
			}
		}
	}
	else 
	{
		// top bar only for scholar (it has no side bar links to other search types)
		gs_gb_lt = document.getElementById('gs_gb_lt');
		if (gs_gb_lt!=null) {
		
			// add link if it doesn't exist
			if (document.getElementById(topBarId)==null) {
				if (gs_gb_lt.children.length>=2) { // should have at least Web and More present
					var gbNew = document.createElement('a');
					gbNew.id = topBarId;
					gbNew.href = tsURLPrefix;
					gbNew.innerHTML = name;
					gs_gb_lt.insertBefore(gbNew, gs_gb_lt.children[gs_gb_lt.children.length-1]); // insert before More
				}
			}
			
			// look for search query in top bar links
			for(var i=0; i<gs_gb_lt.children.length; i++) {
				currentHref = gs_gb_lt.children[i].href;
				if (currentHref.search(/(\?|&)q=/)>0) {
					var searchURLFragment = currentHref.substring(currentHref.search(/(\?|&)q=/)+1).split("&")[0];
					break;
				}
			}
			
			// if found, update top bar link
			if (searchURLFragment) {
				var newURL = tsURLPrefix + searchURLFragment;
				if (document.getElementById(topBarId)!=null) {
					document.getElementById(topBarId).href = newURL;
				}
			}
		}
	}
}

function addUpdateTopSideBarLinks() {
	addUpdateTopSideBarLink('Books', booksURL);
	addUpdateTopSideBarLink('Scholar', scholarURL);
	
	setTimeout(addUpdateTopSideBarLinks, updateFrequency);
}

addUpdateTopSideBarLinks();