// ==UserScript==
// 
// @name           Stop Leave Warning
// @namespace	   StopLeaveWarning
// @description    Prevents the modal "Are you sure you want to leave this page" warning in FF
// @version        0.1
// @author         Laker Netman
// @include	   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @copyright	   2013
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
