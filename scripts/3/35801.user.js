// ==UserScript==

// @name           Delicious.com - Tag Links on Bundle Edit Page
// @namespace      http://murklins.talkoncorners.net
// @description    When you alt-click a tag on Delicious.com's tag bundle edit page, a new window opens showing your links bookmarked with that tag.
// @include        https://secure.delicious.com/settings/tags/bundle/edit*
// ==/UserScript==

// get the current account name
var scope = document.getElementById("currscope");
scope = scope.innerHTML;

var tagDiv = document.getElementById("alphacloud");
var tags = document.evaluate("ul/li", tagDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var firstBundled;
for (var i = 0; i < tags.snapshotLength; i++) {
  var li = tags.snapshotItem(i);
  li.addEventListener("click", 
    function(event) {
      if (event.altKey) {
        event.preventDefault();
        event.stopPropagation();
        var tagName = this.id.substr("input-".length);
        window.open("http://delicious.com/" + scope + "/" + encodeURIComponent(tagName));
      }
    },
    false
  );
}