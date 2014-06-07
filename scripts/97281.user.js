// ==UserScript==
// @name           Cooperation HatenaStar and FB Like
// @namespace      http://send.sh
// @description    cooperation HatenaStar and FB like on Facebook
// @include        http://www.facebook.com/*
// ==/UserScript==
(function () {
  var win = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
  var doc = win.document;
  doc.addEventListener('DOMNodeInserted', function(event) {
    var node = event.target;
    if (node.nodeType != 1) return;
    if (node.tagName != 'SPAN') return;
    if (node.className != 'hatena-star-star-container') return;
    node.addEventListener('click', cooperate, false);
  }, false);
  function cooperate(event) {
    var parent = event.target.parentNode.parentNode;
    var result = doc.evaluate(
      'button[@name="like"]', parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    );
    var likeButton = result.singleNodeValue;
    if (!likeButton) return;
    var click = doc.createEvent('MouseEvent');
    click.initEvent('click', true, true);
    likeButton.dispatchEvent(click);
  }
})();
