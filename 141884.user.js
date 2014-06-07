// ==UserScript==
// @name        （ω）->。
// @namespace   http://userscripts.org/users/82654
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @include     http://togetter.com/li/*
// @version     1.0.0
// ==/UserScript==

(function(){
  function maru (nodeOrDOMEvent) {
    var target = (nodeOrDOMEvent.currentTarget || nodeOrDOMEvent);
    var nodes = document.evaluate("descendant::text()[contains(., '（ω）')]",
                                  target, null, 6, null);
    for (var i = 0; i < nodes.snapshotLength; i++) {
      var node = nodes.snapshotItem(i);
      node.data = node.data.replace(/[(（]+ω[)）]+/g, "。");
    }
  }

  document.body.addEventListener("DOMNodeInserted", maru, false);
  maru(document.body);
})();
