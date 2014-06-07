// ==UserScript==
// @name          Yahoo TV Smart Browse
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Move to the correct position on the page when browsing earlier or later listings
// @include       http://tv.yahoo.com/listings*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2008-02-06 - Updated to work with new Yahoo TV
2006-07-03 - Started

*/

var links = document.evaluate('.//a[contains(concat(" ", @class, " "), " back ") or contains(concat(" ", @class, " "), " forward ")]', document.body, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var link;
while(link = links.iterateNext()) {
  (function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      location.href = link.href + '#' + scrollX + ',' + scrollY;
    }, false);
  })(link);
}

if(location.hash) {
  var m = location.hash.match(/^#(\d+),(\d+)$/);
  scrollTo(parseInt(m[1], 10), parseInt(m[2], 10));
  /*addEventListener('load', function() {
    scrollTo(parseInt(m[1], 10), parseInt(m[2], 10));
  }, false);*/
}