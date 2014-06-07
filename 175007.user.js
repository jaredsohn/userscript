// ==UserScript==
// @name       icotile sort lists alphabetically
// @namespace  http://www.arthaey.com/
// @version    0.3
// @match      http://icotile.ogaoga.org/*
// @copyright  2013
// ==/UserScript==

// Find all Twitter lists
var listRegex = /^list-/;
var lists = [];
var elements = document.getElementsByClassName("list-item");
for (var i = 0; i < elements.length; i++) {
    if (listRegex.test(elements[i].id)) {
        lists.push(elements[i]);
    }
}

// Sort lists by label
var sortedLists = lists.sort(function(a,b) {
    return a.getAttribute("label").localeCompare(b.getAttribute("label"));
});

// Reorder list elements alphabetically
for (var i = 0; i < sortedLists.length; i++) {
    var parent = sortedLists[i].parentNode;
    parent.removeChild(sortedLists[i]);
	parent.appendChild(sortedLists[i]);
}