// ==UserScript==
// @name        Ignore leave page confirmagion
// @namespace   Ignore leave page confirmagion
// @description Ignore leave page confirmagion

// @version     0.1w
// ==/UserScript==
(function() {
  window.addEventListener("load", foo, false);

  function foo() {
    var u = "beforeunload";
    var v = unsafeWindow;
    if (v._eventTypes && v._eventTypes[u]) {
      var r=v._eventTypes[u];
      for(var s=0;s<r.length;s++) {
        v.removeEventListener(u,r[s],false);
      }
      v._eventTypes[u]=[];
    }
  } 

})();