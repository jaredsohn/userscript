// ==UserScript==
// @name            phpman2jp
// @version         0.1.7
// @description     phpmanual for japanese
// @author          Keisuke SATO
// @namespace       http://riaf.jp
// @include         http://php.net/*
// @include         http://*.php.net/*
// ==/UserScript==

(function(unsafeWindow){
  if (!unsafeWindow.location.href.match(/php.net\/manual/i)) {
    var la = document.evaluate('//option[normalize-space(text())="Japanese"]', document, null, 7, null);
    if (la.snapshotLength) {
      location.href = 'http://jp2.php.net/manual/' + la.snapshotItem(0).value;
    }
  }
  var se = document.evaluate('id("headsearch")//input[@name="lang"]', document, null, 7, null);
  if (se.snapshotLength) {
    se.snapshotItem(0).value = "ja";
  }
})(this.unsafeWindow || window);