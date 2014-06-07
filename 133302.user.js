// ==UserScript==
// @name Kill walker
// @namespace http://k11i.biz/
// @include http://wired.jp/
// ==/UserScript==

(
  function() {
    var killWalker = function() {
      var parent = document.getElementById("walk");
      var child = document.getElementById("walkItem");
      if (parent && child) {
        parent.removeChild(child);
      }
    };

    killWalker();
  }
)();