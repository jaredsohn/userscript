// ==UserScript==

// @name          What.CD remove Unique Groups & Perfect FLACs stats from profile.

// @description   What.CD remove Unique Groups & Perfect FLACs stats from profile.

// @namespace     http://what.cd

// @include       *what.cd/user.php?id=*

// ==/UserScript==



function getClass(name) {

  var allPageTags=document.getElementsByTagName("*");

  for (i=0; i<allPageTags.length; i++) {

    if ( allPageTags[i].className == name ) return allPageTags[i];

  }

}

// stop here unless the page is a user profile

if ( location.href.split('/')[3].split('=')[0] != 'user.php?id' ) return;



var sidebar = getClass('sidebar');

var sidebarDivs = sidebar.getElementsByTagName('div');

var community = sidebarDivs[sidebarDivs.length-2];

var community2 = community.getElementsByTagName('li');




community2[5].style.display = "none";
community2[6].style.display = "none";
