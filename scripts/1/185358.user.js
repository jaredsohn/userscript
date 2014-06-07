// ==UserScript==
// @name        Hide twitter Actions (until Rollover)
// @namespace   http://www.openvista.jp/userscript
// @description Let the interaction of twitter actions rollback to the previous version
// @include     http://twitter.com/
// @include     https://twitter.com/
// @version     0.0.1
// @grant       none
// ==/UserScript==

$(function(){
  hideActions();
});

function hideActions(){
  var style = $("<style>");
  style.text("li.stream-item:not([class*=open]) ul.tweet-actions{ display: none !important; }");
  $("head").append(style);
}