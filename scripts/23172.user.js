// ==UserScript==
// @name           NapalmRiot - no graphical emotes
// @namespace      net.moeffju
// @description    Disable graphical emotes on napalmriot
// @include        http://*.napalmriot.com/*
// ==/UserScript==

function degraphify() {
  var emotes = document.evaluate(
    '//img[@class="em"]', 
    document, 
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for (var i=0; i<emotes.snapshotLength; i++) {
    var node = emotes.snapshotItem(i);
    node.parentNode.replaceChild(document.createTextNode(node.getAttribute('alt')), node);
  }
}

degraphify();
window.addEventListener('DOMSubtreeModified', degraphify, true);
