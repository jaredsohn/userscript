// ==UserScript==
// @name           A Few URLs Auto Open All
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Automatically open a tab for each link
// @include        http://afewurls.com/*
// @exclude        http://afewurls.com/
// ==/UserScript==

/*

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-09-17 - Open only if linked from somewhere (referrer check)
2007-08-27 - Made

*/

const TOO_MANY = 6;
if(document.referrer && document.referrer != 'http://afewurls.com/') {
  var result = document.evaluate('//li/a/@href', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if(result.snapshotLength < TOO_MANY || confirm('Open ' + result.snapshotLength + ' tabs?')) {
    for(var c = 0, href; href = result.snapshotItem(c); c++)
      GM_openInTab(href.nodeValue);
  }
}