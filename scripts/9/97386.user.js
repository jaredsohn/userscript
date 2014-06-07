// ==UserScript==
// @name           Caribic Islands die eigene Allianzseite URL ändern
// @namespace      Caribic Islands
// @description    Der Link zum eigenen Forum wird geändert.
// @include        http://s20.caribicislands*/s4/index.php?*
// ==/UserScript==


var alte_URL = 'http://bigbang.forumieren.de/';
var neue_URL = 'http://bigbang.forumieren.de/search.forum?search_id=newposts';

for (var i=0; i<document.getElementsByTagName('a').length-1; i++) {
  if (document.getElementsByTagName('a')[i].href == alte_URL)  document.getElementsByTagName('a')[i].href = neue_URL;
}

// Forum Link auf neue Beitraege setzen
var cell = document.getElementsByTagName('table')[3].getElementsByTagName('td')[3]; 
cell.getElementsByTagName('a')[1].href = 'http://caribic-islands.nasenprinz.de/phpBB3/search.php?search_id=newposts';
