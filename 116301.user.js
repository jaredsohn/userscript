// ==UserScript==
// @name Pinboard - Popular Fandom Nav Link
// @namespace http://murklins.talkoncorners.net
// @description Add a link to the popular/fandom page to the top navigation menu.
// @include http://pinboard.in/*
// @include http://www.pinboard.in/*
// @include https://pinboard.in/*
// @include https://www.pinboard.in/*
// ==/UserScript==

// if can't find top_menu element, exit
menuNode = document.getElementById("top_menu")
if (!menuNode) {
  return;
}
  
// get the popular link in the nav menu
var links = document.evaluate("./a[@href = '/popular/']", menuNode, null,
                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (links.snapshotLength > 0) {     
  var popularLink = links.snapshotItem(0);
  var fandomLink = document.createElement("a");
  fandomLink.href = "/popular/fandom/";
  fandomLink.innerHTML = "fandom";
  popularLink.parentNode.insertBefore(fandomLink, popularLink);
  popularLink.parentNode.insertBefore(document.createTextNode(" ‧ "), popularLink);
}