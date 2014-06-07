// Homestar-Fullon
// version 0.2
// 2005-04-26
// Copyright (c) 2005, T Rice, timgm@bcheck.net
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Homestar-Fullon", and click Uninstall.
//
// ==UserScript==
// @name          Homestar-Fullon
// @namespace     http://apps.bcheck.net/greasemonkey/
// @description	  Make all of homestarrunner's cartoons fill your browser window
// @include       http://www.homestarrunner.com/*
// ==/UserScript==

(function() {
  function resize() {
    var objs=document.evaluate("//EMBED", document, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var o = objs.snapshotItem(0);
    var bar = objs.snapshotItem(1);

    if(o && o.width && o.height && o.width>0 && o.height>0) {
      var dw = window.innerWidth;
      var dh = window.innerHeight - (bar&&bar.height?bar.height*2:0);
      var ar = o.width/o.height;
      if(dw/ar <= dh)
        dh = Math.floor(dw / ar);
      else
        dw = Math.floor(dh * ar);

      /* set embed's size */
      o.width = dw;
      o.height = dh;
    }
  }

  /* remove margin */
  document.body.style.margin = "0px";

  /* resize embed when window is resized */
  window.addEventListener("resize", resize, false);

  /* resize on first load */
  resize();
})();