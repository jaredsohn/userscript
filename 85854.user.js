// ==UserScript==
// @name           delete twitter submit button
// @revision       1
// @author         KID a.k.a. blueberrystream
// @description    TwitterのPOSTボタンを消します。
// @namespace      http://kid0725.usamimi.info
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

void(function() {

/* 設定 */
var ACCOUNTS = new Array();
ACCOUNTS.push("account1")
ACCOUNTS.push("account2")

/* 定数定義 */
var META_NAME_USER_SCREEN_NAME = "session-user-screen_name";
var INPUT_ID_SUBMIT_BUTTON = "tweeting_button";

/* 共用変数 */
var elements = null;

/* スクリーンネームを取得する */
elements = document.getElementsByTagName("meta");
var userScreenName = null;
for (var i = 0; i < elements.length; i++) {
  if (elements[i].name == META_NAME_USER_SCREEN_NAME) {
    userScreenName = elements[i].content;
    break;
  }
}
if (userScreenName == null || userScreenName == undefined) {
  return;
}

/* 投稿ボタンを潰す */
for (var i = 0; i < ACCOUNTS.length; i++) {
  if (userScreenName == ACCOUNTS[i]) {
    var button = document.getElementById(INPUT_ID_SUBMIT_BUTTON);
    if (button != null && button != undefined) {
      button.parentNode.removeChild(button);
    }
    break;
  }
}

})();