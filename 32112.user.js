// ==UserScript==
// @name           MySpace Footer Search Remove
// @namespace      http://www.heeyo.net
// @description    Removes the search bar at the footer of MySpace pages (completely pointlessly placed as there is a search bar at the top of the page also)
// @include        http://*.myspace.com/*
// @exclude        http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=*
// ==/UserScript==

var search_footer = document.getElementById('search_footer');
if (search_footer) {
   search_footer.parentNode.removeChild(search_footer);
}