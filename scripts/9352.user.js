// ==UserScript==
// @name          searchgals.com CGI Link Remover (porn)
// @namespace     
// @description   Removes CGI Links from searchgals.com 
// @include       http://www.searchgals.com/*
// ==/UserScript==

var alla;
alla = document.getElementsByTagName('a');
for (var i = 0; i < alla.length; i++) {
if (alla[i].href.search("cgi-bin") != -1) { alla[i].parentNode.removeChild(alla[i]);
}
}