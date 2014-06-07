// ==UserScript==
// @name           Slashdot - Tooltip /. article link titles
// @namespace      http://khopis.com/scripts
// @description    Adds tooltip for references to Slashdot articles
// @include        http://slashdot.tld/*
// @include        http://*.slashdot.tld/*
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2008 by Adam Katz
// @license        AGPL v3+
// @version        0.1
// @lastupdated    2008-12-30
// ==/UserScript==

// BUG:  Slashdot's AJAX format means links from expanded comments are loaded
//       *after* the page loads and therefore after this script runs, so their
//       titles are not made into tooltips.  I don't know of a decent solution.

var this_title = document.title;
var links = document.evaluate(
  "//a[contains(@href,'slashdot.org') and contains(@href,'id=')]",
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

function setTooltip(link, this_title) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: link.href,
    onload: function(page) {
      var link_title = page.responseText.match("<title>(.+)</title>");
      // if we got a title, and it's not the same as the current page
      if (link_title && link_title[1] != this_title) {
        link_title = link_title[1].replace(/^Slashdot . /,'');
        // only if the link doesn't already have the title in its text
        if ( ! link.innerHTML.match(link_title) ) {
          link.setAttribute("title", link_title);
        }
      }
    } // end onload function
  });
}

// Limit this to 100 so the system won't hang if there are too many
// (and so that we don't "slashdot" Slashdot).
for (var i=0; i<links.snapshotLength && i<100; i++) {
  var art_ref = links.snapshotItem(i);
  if ( location.pathname + location.search == art_ref.href
         .replace(/^[^:]*:\/\/[^\/]+\/([^#]+)(#.*)?/,"/$1") )
    { continue; } // the link points to this page, skip to next link
  setTooltip(art_ref, document.title);
}
