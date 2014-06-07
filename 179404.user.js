// ==UserScript==
// @name       Bing Homepage Google Search
// @namespace  http://devilishdb.deviantart.com
// @version    1.0
// @description  Makes searches on the Bing homepage go to Google results.
// @match      http://www.bing.com/*
// ==/UserScript==

document.getElementById("sb_form").setAttribute("action","http://www.google.com/search");