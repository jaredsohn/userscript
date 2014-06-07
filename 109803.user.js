// ==UserScript==
// @name           Expand Select Elements
// @namespace      DansUtils
// @description    Expands select elements to show all options
// @include        *
// ==/UserScript==

// Get select elements
selectElements = document.getElementsByTagName("select");

// Set size to number of options for each select element
for (var i = 0; i < selectElements.length; i++) {
    selectElements[i].size = selectElements[i].getElementsByTagName("option").length;
}