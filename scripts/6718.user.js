// ==UserScript==
// @name           Outside Everything2
// @version	   0.01
// @author	   ariels
// @namespace      http://ariels.me.me.me/GM
// @description    Add direct external links to E2 links that look right
// @include        http://everything2.com/*
// ==/UserScript==


/*
 * Note: We look at link text, not at the parameter passed to E2 to
 * search for inside the link href.  This is intentional: A link may
 * also have been noded, and in any case we want to keep things
 * simple.
 */

// What link *text* makes it external?
var link_re = new RegExp('^(http|ftp):');

// Snarf all <a> tags
var links = document.evaluate('//a', document, null,
			      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0; i<links.snapshotLength; i++) {
  var link = links.snapshotItem(i);
  var possible = link.textContent;
  if (link_re.test(possible)) {
    // Add a new link after link
    var n = document.createElement('a');
    n.href = possible;
    n.innerHTML = '<sup><b>GO!</b></sup>';
    var parent = link.parentNode;
    GM_log('Try to insert ' + n + ' after ' + link + ' before ' + link.nextSibling);
    parent.insertBefore(n, link.nextSibling);
  }
}
