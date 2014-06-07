// ==UserScript==
// @name           Backlog Status Menu Default Open
// @namespace      http://www.akiyan.com/
// @include        https://*.backlog.jp/view/*
// ==/UserScript==

(function() {
  var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
  var d = w.document;
  d.getElementById('commentLeft').style.display = 'block';
})();
