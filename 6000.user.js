// ==UserScript==

// @name          YouTube better embed
// @description   Produce cleaner code for embedding video

// @include       http://youtube.com/watch?*
// @include       http://www.youtube.com/watch?*

// ==/UserScript==



/*



(C) 2006 Lenny Domnitser

Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html



History

-------


2007-08-29 - YouTube pages now have 2 embed fields, so fill both
2007-08-22 - Fix for new YouTube pages
2007-03-22 - Fixed dumbass error (innerHTML was misspelled)

2006-10-18 - Made



*/



var id = location.href.match(/[\?&]v=(.*?)(?:&|$)/)[1];
var embedCode = '<object width="425" height="350" data="http://www.youtube.com/v/' + id + '" type="application/x-shockwave-flash"><a href="http://www.youtube.com/watch?v=' + id + '">' + document.title + '</a></object>';
Array.forEach(document.getElementsByName('embed_code'), function(el) {
  el.value = embedCode;
});