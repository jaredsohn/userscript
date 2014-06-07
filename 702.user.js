// ==UserScript==
// @name          Good-Tutorials Hide Ads
// @namespace     http://dapope.blogspot.com
// @description	  Hides ads on Good-Tutorials.com Pages
// @include       http://good-tutorials.com/*
// @include       http://www.good-tutorials.com/*
// ==/UserScript==s

(function() {
// This hides ads on GT pages, but not for Tutorial Page popups
h = window._content.document.getElementsByTagName("head")[0];
c = window._content.document.getElementsByTagName("center")[0];
s = window._content.document.createElement("style");
s.setAttribute("type", "text/css");
s.innerHTML = ".leaderboard, .sidebar { display:none; }\n";
h.appendChild(s);
c.style.display = "none";
})();