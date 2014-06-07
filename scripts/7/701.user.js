// ==UserScript==
// @name          Gizmodo Hide Ads
// @namespace     http://dapope.blogspot.com
// @description	  Hides ads on Gizmodo.com Pages
// @include       http://gizmodo.com/*
// @include       http://www.gizmodo.com/*
// ==/UserScript==

(function() {
h = window._content.document.getElementsByTagName("head")[0];
s = window._content.document.createElement("style");
s.setAttribute("type", "text/css");
s.innerHTML = "#leaderboard, #ads, #ad_floater, #ad_swap { display:none; }\n";
h.appendChild(s);
})();