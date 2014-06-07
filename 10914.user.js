// ==UserScript==
// @name           focus to textarea
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    focus to textarea by emacs like keybind(C-x l)
// @include        *
// ==/UserScript==
//
// 2007-07-25 t.koyachi
//

(function() {
  var DEBUG_MODE = false;
  //var KEY_G = 71;
  var KEY_L = 76;
  var KEY_X = 88;
  var mode = 0;
  window.addEventListener('keydown', function(e) {
    if (!mode) {
      if(e.ctrlKey && e.keyCode == KEY_X) {
        log("C-x");
        mode = 1;
      }
    }
    else {
      if(e.ctrlKey) {
        return;
      }
      switch (e.keyCode) {
      case KEY_L:
        log("L");
        ["(//input[@type='text'])[1]",
         "//textarea[1]"].forEach(function(xpath) {
          var textarea = getFirstElementByXPath(xpath, document);
          if (textarea) {
            e.preventDefault();
            textarea.focus();
            return;
          }
          mode = 0;
        });
      default:
        log("G, canceled!");
        mode = 0;
        break;
      }
    }
  }, false);

  // via AutoPagerize
  function log(msg) {
    if (DEBUG_MODE && unsafeWindow && unsafeWindow.console) {
      unsafeWindow.console.log(msg);
    }
  }
  
  function getElementsByXPath(xpath, node) {
    var node = node || document;
    var nodesSnapshot = document.evaluate(xpath,
                                          node,
                                          null,
                                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                          null);
    var data = [];
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
      data.push(nodesSnapshot.snapshotItem(i));
    }
    return (data.length >= 1) ? data : null;
  }

  function getFirstElementByXPath(xpath, node) {
    var node = node || document
    var result = document.evaluate(xpath, node, null,
                                   XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    return result.singleNodeValue ? result.singleNodeValue : null
  }

})();

