// ==UserScript==
// @name          Tiddly Links
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Turn tiddly links into real links that can be bookmarked, opened in tabs, etc.
// ==/UserScript==

/*

(C) 2005 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

Notes
-----

This script is included for all pages because it will not interfere with most
non-Tiddly pages. Play with includes/excludes if there are any problems.

History
-------

2006-01-03 - Now fixes links that are initialized after page load
           - Uses homebrew GM_executeContentScript, which is only in CVS, so far
2005-09-29 - Add [[brackets]] around links with spaces. Escape URI.
2005-09-23 - Initial version

*/

open('javascript:(' + uneval(function() {
  if(!window.TiddlyWiki) return;

  function updateTiddlyLinks() {
    var c, link, result = document.evaluate('//a[(@href="javascript:;" or @href="#") and @tiddlyLink]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(c = 0; link = result.snapshotItem(c); c++) {
      var tiddlyLink = link.getAttribute('tiddlyLink');
      if(tiddlyLink) {
        if(tiddlyLink.indexOf(' ') != -1) {
          tiddlyLink = '[[' + tiddlyLink + ']]';
        }
        link.href = '#' + encodeURIComponent(tiddlyLink);
      }
    }
  }

  var oldwikify = wikify;
  wikify = function(a, b, c, d) {
    oldwikify(a, b, c, d);
    updateTiddlyLinks();
  }
}) + ')();', '_self');