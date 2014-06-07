//
// Coded in 2008 by ENIGMA
//
// ==UserScript==
// @name          ProfileViewTopics
// @description   Finds poster's topic.
// @include http://*warez-bb.org/profile.php?mode=viewprofile*
// ==/UserScript==

var AuthorID = /\d+/.exec(document.URL);
var userposts = "http://www.warez-bb.org/search.php?search_author_id=" + AuthorID + "&showresults=posts";
var userthreads = "http://www.warez-bb.org/search.php?search_author_id=" + AuthorID + "&search_fields=firstpost";
var ankors = document.getElementsByTagName('a');
for (var n = 0; n < ankors.length; n++)
{
   var ankr = ankors[n];
   if(ankr.href == userposts)
   {
      newAnchorElement = document.createElement('a');
      newAnchorElement.setAttribute("href", userthreads);
      newAnchorElement.appendChild(document.createTextNode(" | Find all threads started by this user"));
      ankr.parentNode.insertBefore(newAnchorElement, ankr.nextSibling);
   }
}
