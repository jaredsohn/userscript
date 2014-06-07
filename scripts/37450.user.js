// ==UserScript==
// @name           iGoogle Netbook Remix
// @namespace      atomeo.com
// @description    The goal of this script is to preserve the style and functionality of iGoogle while making it fit into the smaller screens of Netbooks better. The Google logo and search form are removed and the "personalization" lnks are moved under the left navigation.
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// ==/UserScript==

if (!document.location.href.match(/^https?:\/\/www\.google\.com\/ig.*/))
{
	return;
}
		
// Hides the search field
search = document.getElementById("gsea");
search.style.display = "none";

// Moves the personalize links
var personalize = document.getElementById("addstuff");

var list = document.createElement("ul");
list.style.listStyleType = "none";
list.style.textAlign = "right";
list.appendChild(personalize);

var leftCol = document.getElementById("col1_contents");
leftCol.appendChild(list);

// Removes some whitespace
var block = document.getElementById("nhdrwrap");
block.style.height = "4px";
block.style.overflow = "hidden";