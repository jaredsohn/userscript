// ==UserScript==
// @name           HatenaStarAssistOnFB
// @namespace      http://send.sh
// @description    load Hatena Star on DOMNodeInserted Event 
// @include        http://www.facebook.com/*
// ==/UserScript==
(function() {
  var win = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
  
  var timer = setTimeout(function() {
    if (timer) clearTimeout(timer);
    if (typeof win.Hatena == 'undefined') {
      timer = setTimeout(arguments.callee, 100);
    } else {
      document.addEventListener("DOMNodeInserted", assistStar, false);
    }
  }, 0);
  function assistStar(event) {
    var node = event.target;
    if (node.nodeType != 1 || !(node.tagName == 'LI' || node.tagName == 'DIV')) return;

    win.Hatena.Star.EntryLoader.loadNewEntries(node);
  }
})();
