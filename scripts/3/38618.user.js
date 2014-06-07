// CouchSurfing: Neutral References
// Version 1.0
// 2008-12-14
// 2008 by Carlos Martin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CouchSurfing: Neutral References", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==

// @name           CouchSurfing: Neutral References

// @namespace      http://sites.google.com/site/cscarloszgz

// @description    Insert the text "Neutral" to neutral references to make them text searchable

// @include        http://www.couchsurfing.org/people*

// @include        http://www.couchsurfing.org/profile*

// @include        http://www.couchsurfing.org/mapsurf*

// @include        http://www.couchsurfing.com/people*

// @include        http://www.couchsurfing.com/profile*

// @include        http://www.couchsurfing.com/mapsurf*

// ==/UserScript==

var divs = document.evaluate("//div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null)
for (var i = 0; i < divs.snapshotLength; i++) {
  var div = divs.snapshotItem(i); 
  if (div.className == "reference_from" || div.className == "reference_to" || div.className == "refnotIRL") {
      if (div.innerHTML.search (/&nbsp;<p>/g) != -1) { 
        div.innerHTML = div.innerHTML.replace (/&nbsp;<p>/g,"<div style='color:black;font-weight:bold;'>Neutral</div><p>");
      }
      div.innerHTML = div.innerHTML.replace (/<img src\p{S}\p{P}\/images\/icon_surfed_with.gif/g, "<small>[S]</small><img src='/images/icon_surfed_with.gif");
  }
}
