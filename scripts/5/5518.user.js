// ==UserScript==
// @name          Facebook Mini-Feed Killer
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Automatically clear your Facebook mini-feed. WARNING: THIS IRREVERSIBLY DELETES ALL ITEMS IN YOUR FACEBOOK MINI-FEED.
// @include       http://*.facebook.com/*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-09-05 - Created

*/

var unparsedHideIds = document.evaluate('//a[contains(@onclick, "minifeed_hide(")]/@onclick', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var c = 0, unparsedHideId; unparsedHideId = unparsedHideIds.snapshotItem(c); c++) {
  hideId = unparsedHideId.value.match(/\d+/)[0];
  if(hideId) {
    // safer than unsafeWindow:
    location.href = 'javascript:void(_minifeed_hide_click("' + hideId + '"));';
  }
}
