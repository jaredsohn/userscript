// ==UserScript==
// @name Pinboard - Change Tag Link Colour in Posting Page
// @description On the posting page that shows your tag list, use custom colour for the tag links. Requires you to edit the script file a bit to choose a link colour and a hover colour.
// @include http://pinboard.in/add*
// @include http://www.pinboard.in/add*
// @include https://pinboard.in/add*
// @include https://www.pinboard.in/add*
// ==/UserScript==


// ***** CONFIGURATION *****

var linkColor = "#000";
var hoverColor = "red";

// ***** CODE *****

var tags = document.evaluate("//div/a[contains(@onclick, 'add_tag')]", document, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
if (tags.snapshotLength == 0) {
    GM_log("Couldn't find tags. Exiting script.");
    return;    
}

for (var i = 0; i < tags.snapshotLength; i++) {
  var t = tags.snapshotItem(i);
  t.setAttribute("onmouseover", "this.style.color = '" + hoverColor + "'");
  t.setAttribute("onmouseout", "this.style.color = '" + linkColor + "'");
  t.style.color = linkColor;
}