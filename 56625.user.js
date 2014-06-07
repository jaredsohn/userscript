// ==UserScript==
// @name           torrents.ru - select forum search
// @namespace      userscripts.org
// @description    Use the forum search instead of the tracker search as default.
// @include        http://torrents.ru/*
// @include        http://rutracker.org/*
// ==/UserScript==

var search = document.getElementById("search-action");
for (var i = 0; i < search.length; i++) {
	if (search.options[i].value == "search.php") {
		search.selectedIndex = i;
		break;
	}
}
