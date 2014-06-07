// ==UserScript==
// @name           Gigapedia.org - select gigapedia search
// @namespace      userscripts.org
// @description    use gigapedia search instead of google
// @include        http://gigapedia.com/*
// Revision 1      : Initial Release
// Revision 2      : updated to work with new gigapedia layout
//    "     3      : gigapedia somewhat changed their listing, fix'd this
// ==/UserScript==

searching = document.getElementById("searchTypeSelect");
searching.selectedIndex = 1;