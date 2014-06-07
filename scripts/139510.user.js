// ==UserScript==
// @name        KG - default sort by Added
// @namespace   KG
// @include     http*://*karagarga.net/*
// @exclude     http*://forum.karagarga.net/*
// @version     1.2
// ==/UserScript==

// don't run in iFrames
if (window.frameElement) return;

// change Browse tab link to sort by Added date
var links = document.getElementById("ddimagetabs").getElementsByTagName("a");

for (i=0; i < links.length; i++ ) {
        if (links[i].textContent.indexOf("Browse") != -1) {
                links[i].href = links[i].href + "?sort=added&d=DESC";
        }
}


// change search form back to default sort, to see most relevant hits first
var searchForm = document.forms.namedItem("searchform");
var sortField = searchForm.elements.namedItem("sort");
sortField.value = "";