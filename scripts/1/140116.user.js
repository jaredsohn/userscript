// ==UserScript==
// @name        SomePostMan's Wish
// @namespace   http://www.reddit.com/r/SomebodyMakeThis/comments/xobjc/smt_javascript_a_greasemonkey_script_to_make/
// @include     http://imgur.com/a/*
// @version     1
// ==/UserScript==

(function(){
 els = document.getElementsByTagName("a");
 for (var i=0;i<els.length;i++){
  els[i].href = els[i].href.replace("h.",".");
 }
})();