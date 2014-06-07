// ==UserScript==
// @name           Jimmy, Go Away
// @namespace      wikipedia.org
// @include        http://*.wikipedia.org/*
// @include        http://*.wikimedia.org/*
// @include        http://*.wiktionary.org/*
// ==/UserScript==

var jimmy = document.getElementById("siteNotice");
if (jimmy) {
    jimmy.parentNode.removeChild(jimmy);
}

