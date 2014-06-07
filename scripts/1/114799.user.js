// ==UserScript==
// @name Pinboard - Slash Tag Emboldener
// @description Makes tags that have forward slashes in them stand out better in Pinboard.
// @include http://pinboard.in/*
// @include http://www.pinboard.in/*
// @include https://pinboard.in/*
// @include https://www.pinboard.in/*
// ==/UserScript==

var main_node = document.getElementById("pinboard");
if (main_node) {
  // get all the bookmarks
  var tagAnchors = document.evaluate("//div[contains(@class, 'bookmark')]/div[@class = 'display']/a[@class = 'tag']", 
                                  main_node, 
                                  null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
  for (var i = 0; i < tagAnchors.snapshotLength; i++) {      
    var tagA = tagAnchors.snapshotItem(i);   
    if (tagA.innerHTML.indexOf("/") != -1) {
      tagA.className = tagA.className + " gm_slash_tag";    
    }
  }
}

GM_addStyle(
  "a.gm_slash_tag { color: #800800; }" +
  "a.gm_slash_tag { font-weight: bold; }"
);