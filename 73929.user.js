// ==UserScript==
// @name           DeSpam Reddit
// @namespace      http://www.reddit.com/
// @description    Get rid of the ad box that is now a permanent fixture of the reddit homepage
// @include        http://www.reddit.com/
// ==/UserScript==

annoying = document.getElementById("siteTable")
annoying.style.display = "none"
