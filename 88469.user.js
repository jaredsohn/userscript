// ==UserScript==
// @name           hide duplicated unofficial retweets
// @revision       2
// @author         KID a.k.a. blueberrystream
// @description    「RT」が多重になっているpostを隠します
// @namespace      http://kid0725.usamimi.info
// @include        http*://twitter.com/*
// ==/UserScript==

void(function() {

var ENTRY_CONTENT = "entry-content";
var current = 0;

var HIDE_RT = function() {
  var elements = document.getElementsByClassName(ENTRY_CONTENT);
  var parent = null;
  var content = "";

  if (!elements) {
    return;
  }

  for (; current < elements.length; current++) {
    parent = elements[current].parentNode.parentNode.parentNode;
    content = elements[current].innerHTML;
    if (content.match(/.*RT.*RT.*/)) {
      if (parent.className.indexOf("hentry") != -1) {
        parent.style.display = "none";
      }
    }
  }
};
setInterval(HIDE_RT, 1000);

})();