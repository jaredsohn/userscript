// ==UserScript==
// @name Remove TV Tropes Namespace from Title
// @namespace http://userscripts.org/users/527104
// @description Removes the namespace from the tab title of a TV Tropes article so it's easier to tell the article name from a glance.
// @include *tvtropes.org*
// @version 2.0
// ==/UserScript==

var filteredNamespaces = new Array(
    "Main",
    "VideoGame",
    "Literature",
    "TVShow",
    "Music",
    "Anime",
    "Series",
    "Franchise"
);

var regex = new RegExp("(" + filteredNamespaces.join("|") + ")\/", "i");
var title = document.getElementsByTagName("title")[0] || null;

if (title) {
    title.innerHTML = title.innerHTML.trim().replace(regex, "");
}