// ==UserScript==
// @name           Wikipedia pageview stats
// @namespace      geological-supplies.com
// @include        http://en.wikipedia.org/wiki/*
// ==/UserScript==

groklink = document.createElement("a");
grokli = document.createElement("li");
groklink.href="http://stats.grok.se/en/200805/" + window.location.href.substring(29);
groklink.innerHTML = "Stats";
grokli.appendChild(groklink);
document.getElementById("t-whatlinkshere").parentNode.appendChild(grokli);

