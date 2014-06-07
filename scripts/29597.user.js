// ==UserScript==

// @name           MSDN fuller screen

// @namespace      http://noNameSpaceYet

// @description    Removes undesirable top navigation from MSDN so more content can be seen.
// @include        http://msdn.microsoft.com/*

// ==/UserScript==

// Note: The author does not take credit for the following code. It was copied from
// the user script "Remove All Facebook Ads", found at http://userscripts.org/scripts/show/13787
// July 4, 2008 without permission.

window.addEventListener("load", function(e) {
  var elements = document.evaluate("//div[@class='GlobalBar'] | //div[@class='NavigationBox'	] | //div[@id='ctl00_ib1_Panel1'] | //div[contains(@id, 'ctl00_Masthead1_')] | //div[contains(@class, 'thinnavtab')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < elements.snapshotLength; i++) {
    var thisElement = elements.snapshotItem(i);
    thisElement.parentNode.removeChild(thisElement);
  }
}, false);