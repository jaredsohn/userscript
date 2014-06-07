// ==UserScript==
// @name        Leave Stopper
// @namespace   Leave Stopper
// @description Leave Stopper
// @author	Vlad Aficuk
// @include     http://adfoc.us/*
// @version     1.0
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