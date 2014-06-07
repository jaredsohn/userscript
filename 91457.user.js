// ==UserScript==
// @name           tumblr hide my post
// @revision       1
// @author         KID a.k.a. blueberrystream
// @description    TumblrのDashboardから自分のpostを隠します
// @namespace      http://kid0725.usamimi.info
// @include        http*://www.tumblr.com/dashboard*
// ==/UserScript==

void(function() {
/* 定数定義 */
var CLASS_NAME = "post";
var ACCOUNT_NAME = document.forms[0].t.value;
var REBLOGGED_FROM_ME = "reblogged you";
var MY_POST = "is_mine";
var NEW_POST_LINKS = "new_post";

var lastLength = 0;

var REPLACE = function() {
  var elements = document.getElementsByClassName(CLASS_NAME);
  if (elements.length == lastLength) {
    return;
  }

  for (var i = lastLength; i < elements.length; i++, lastLength++) {
    // 新postリンクは隠さない
    if (-1 < elements[i].className.indexOf(NEW_POST_LINKS)) {
      continue;
    }
    // 自分のpost
    if (-1 < elements[i].className.indexOf(MY_POST)) {
      elements[i].style.display = 'none';
      continue;
    }
    // 自分のpostを直接reblogしたもの
    if (-1 < elements[i].innerHTML.indexOf(REBLOGGED_FROM_ME)) {
      elements[i].style.display = 'none';
      continue;
    }
    // reblog treeに自分のアカウント名があった場合
    if (-1 < elements[i].innerHTML.indexOf(ACCOUNT_NAME)) {
      elements[i].style.display = 'none';
      continue;
    }
  }
}
setInterval(REPLACE, 1000);

})();