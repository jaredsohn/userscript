// Fix DVD-News Navigation
// Version 1.0
// by: Volker Friese
// Date: June 14, 2005
// ---
// ==UserScript==
// @name fixdvdnewsnav
// @description Corrects the Page-Skip-Values of the "Coming Soon Site" from dvd-news.de to full page skip
// @include http://www.dvd-news.de/suche_comingsoon.php*
// ==/UserScript==

(function() {

  var i, skipPrev = 0, skipNext = 0, prevLink = 0, nextLink = 0;
  var tmp = new String();

  // Looking for the two page skip links
  for (i = 0; i < document.links.length; ++i) {
    tmp = String(document.links[i]);
    if (tmp.lastIndexOf("suche_comingsoon.php?skip=") > -1) {
      prevLink = i;
      nextLink = i+1;
      break;
    }
  }

  // Getting the original skip value from the link to the next page
  tmp = String(document.links[nextLink]);
  i = tmp.lastIndexOf("=") + 1;
  skipNext = parseInt(tmp.substr(i , tmp.length - i));

  // Correcting the skip value of the link to the next page
  if (skipNext < 30)
    skipNext = 30;
  else skipNext += 20;

  // Correcting the skip value of the link to the previous page
  skipPrev = skipNext - 60;
  if (skipPrev < 0) skipPrev = 0;

  // Setting new values
  document.links[prevLink].href = "suche_comingsoon.php?skip=" + skipPrev;
  document.links[nextLink].href = "suche_comingsoon.php?skip=" + skipNext;

})();
