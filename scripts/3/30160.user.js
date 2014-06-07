// ==UserScript==
// @name           Google Reader All Items Unread Counter Hider
// @namespace      http://www.arikfr.com/
// @description    Hides the unread items counter in Goolge Reader (only the all items coutner. Leaves the per feeds counts).
// @include        http://www.google.com/reader/*
// ==/UserScript==

unsafeWindow.document.watch('title',
  function(prop, oldval, newval) {
     return ("Google Reader");
  });

GM_addStyle("#reading-list-unread-count{display:none;}");
