// ==UserScript==
// @name          Remove stats from startpage
// @description   Remove stats from startpage
// @namespace     http://userscripts.org/
// @include       http*what.cd/index.php
// @exclude       *user.php?id*
// ==/UserScript==


function getClass(name) {
  var allPageTags=document.getElementsByTagName("*");
  for (i=0; i<allPageTags.length; i++) {
    if ( allPageTags[i].className == name ) return allPageTags[i];
  }
}

var sidebar = getClass('sidebar');
var sidebarDivs = sidebar.getElementsByTagName('div');

var personal = sidebarDivs[sidebarDivs.length-7];
personal.style.display = 'none';