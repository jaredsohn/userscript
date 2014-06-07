// ==UserScript==
// @name           Filestube Search width fix.
// @namespace      http://www.facebook.com/jamey.macmillan
// @description    Gets rid of the padding on the results layer on a filestube.com search results page.
// @include        http://www.filestube.com/search.html?q=*
// @include        http://www.filestube.com/look_for.html?q=*
// ==/UserScript==

var linkbox = document.getElementsByClassName("linkbox");
linkbox[0].style.display="none";
var resultsBox = document.getElementById("results_box");
resultsBox.style.width="300px";