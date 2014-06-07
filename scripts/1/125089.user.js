// ==UserScript==
// @name              Baidu Avatar Blocker
// @namespace     http://tieba.baidu.com/
// @description     block the user's avatar and signature
// @include           http://tieba.baidu.com/p/*
// ==/UserScript==

// ==== Functions ====

function snapshot_query(document, expr, obj) {
  return document.evaluate(expr, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function removeNode (element) {
	if (element && element.parentNode) element.parentNode.removeChild(element);
}

function removeRubbish(document, pattern) {
  var rb = snapshot_query(document, pattern, document);
  for (var i = 0; i < rb.snapshotLength; i++) {
    removeNode(rb.snapshotItem(i));
  }
}

function removeAllRubbish(document) {
  // logo
  removeRubbish(document, "//div[contains(@class,'d_avatar_frame')]");
  // signature
  removeRubbish(document, "//div[contains(@class,'d_sign_split')]/following-sibling::img");
}

// ==== End Functions ====

removeAllRubbish(document)
