// ==UserScript==

// @name          What.CD remove required ratio from profile.

// @description   Removes required ratio from profile.

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



var personal = sidebarDivs[sidebarDivs.length-8];

var personalLis = personal.getElementsByTagName('li');



personalLis[5].style.display = "none";
