// ==UserScript==
// @name Pinboard - Popular Wikipedia & Reddit Nav Link
// @namespace http://murklins.talkoncorners.net
// @description Add a link to the popular/wikipedia & popular/reddit page to the top navigation menu.
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
  var wikiLink = document.createElement("a");
  wikiLink.href = "/popular/wikipedia/";
  wikiLink.innerHTML = "wikipedia";
  popularLink.parentNode.insertBefore(wikiLink, popularLink);
  popularLink.parentNode.insertBefore(document.createTextNode(" ‧ "), popularLink);

  var redditlink = document.createElement("a");
  redditlink.href = "/popular/reddit/";
  redditlink.innerHTML = "reddit";
  popularLink.parentNode.insertBefore(redditlink, popularLink);
  popularLink.parentNode.insertBefore(document.createTextNode(" ‧ "), popularLink);
}