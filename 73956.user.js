// ==UserScript==
// @name           Reddit sans Headerbar
// @namespace      http://www.reddit.com/
// @description    Get rid of the list of reddits, which has been described by some as "awkward"
// @include        http://www.reddit.com/*
// ==/UserScript==

headerbar = document.getElementById("sr-header-area")
headerbar.style.display = "none"
