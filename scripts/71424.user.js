// ==UserScript==
// @name          Remove all from startpage
// @description   Remove all from startpage
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

//remove stats
var personal = sidebarDivs[sidebarDivs.length-7];
personal.style.display = 'none';
//end of remove stats

//remove poll
var personal2 = sidebarDivs[sidebarDivs.length-3];
personal2.style.display = 'none';
//end of remove poll

//remove blog
var personal3 = sidebarDivs[sidebarDivs.length-5];
personal3.style.display = 'none';
//end of remove blog