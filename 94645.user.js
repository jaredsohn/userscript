// ==UserScript==
// @name           Search Userscripts Using Google
// @version        1.0
// @author         ArpitNext
// @namespace      techraga
// @description    This script modifies the search box properties to search userscripts.org content using Google.
// @include       https://*.userscripts.org
// @include         http://userscripts.org/*
// @include         https://userscripts.org/*
// ==/UserScript==

(function () {
var SearchForm = document.getElementById('script_search');
SearchForm.action = "http://www.google.com/cse";
var inpbox = SearchForm.appendChild(document.createElement("input"));
inpbox.setAttribute("type", "hidden");
inpbox.setAttribute("name", "cx");
inpbox.setAttribute("value", "001187697058226525231:afmutczuer4");
})();