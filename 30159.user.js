// ==UserScript==
// @name           Google Reader Unread Items Counters Hider
// @namespace      http://www.arikfr.com/
// @description    Hides the "unread items" counters in Google Reader (the per feed counters and the all items counters).
// @include        http://www.google.com/reader/*
// ==/UserScript==

unsafeWindow.document.watch('title',
  function(prop, oldval, newval) {
     return ("Google Reader");
  });

GM_addStyle(".unread-count {display: none;} #reading-list-unread-count{display:none;}");