// ==UserScript==
// @name       Amazon.co.jp shop filter
// @namespace  none
// @version    0.1
// @description When a trader other than the amazon.co.jp is selling item, and semi-transparent to "Add to Cart".
// @match      http://www.amazon.co.jp/*
// @copyright  2013, electron
// ==/UserScript==

(function() {
  var element = document.evaluate(
    '//a[text()="在庫状況"]', document, null, 7, null);
  if (element.snapshotLength === 1) {
    var text = element.snapshotItem(0).parentNode.innerText;
    if (!(/Amazon\.co\.jp\s*が販売、発送します/.test(text))) {
      document.getElementById('buyboxDivId').style.opacity = 0.35;
    }
  }
})();
