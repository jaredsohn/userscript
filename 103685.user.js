// ==UserScript==
// @name           adanliujnl
// @include        *
// ==/UserScript==
(function(){

  function $x(xpath, context) {
    var nodes = [];
    try {
      var doc = context || document;
      var results = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);
      var node;
      while (node = results.iterateNext())
        nodes.push(node);
    } catch (e) {
    }
    return nodes;
  }

  function likeAll() {
    $x("//button[contains(@title,'いいね！')][not(contains(@title,'を'))]").forEach(function(n){
      n.click();
    });
  }

  likeAll();
  window.setInterval(likeAll, 5000);

})();