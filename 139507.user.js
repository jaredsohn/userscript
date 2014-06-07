// ==UserScript==
// @name        KG - director searches sort by year
// @namespace   KG
// @include     http*://*karagarga.net/*
// @exclude	http*://*karagarga.net/adsearch.php*
// @exclude     http*://forum.karagarga.net/*
// @version     1.4
// ==/UserScript==

// no longer needed and it breaks the site search
return;

// don't run in iframes
if (window.frameElement) return;

// if Director is selected in the search form, change sort to year
var searchForm = document.forms.namedItem("searchform");
var searchType = searchForm.elements.namedItem("search_type");

var code = "javascript: var s=document.forms.searchform.sort; var t=document.forms.searchform.search_type; var tt=t.options[t.selectedIndex].value; if ( tt == 'director') { s.value = 'year'; } else { s.value=''; } return true; ";

searchType.setAttribute("onchange", code);


// change director name search links to sort by year - browse page
if (window.location.href.indexOf('browse.php') != -1) {
	var links = document.links;
	for (i=0; i < links.length; i++) {
		if (links[i].href.indexOf('&dirsearch=') != -1 && links[i].className != "panel") {
			if (links[i].href.indexOf("#") == (links[i].href.length -1)) continue;
			changeLink(links[i]);
		}
	}
}

function changeLink(link) {
	var query = link.textContent + "";
	query = query.replace(" ", "+");
	link.href = "/browse.php?search_type=director&sort=year&search=" + query;
}

// change director name search links to sort by year - details page
if (window.location.href.indexOf('details.php') != -1) {
	var links = document.links;
	for (i=0; i < links.length; i++) {
		if (links[i].href.indexOf('search_type=director') != -1) {
			links[i].href += "&sort=year";
		}
	} 
}