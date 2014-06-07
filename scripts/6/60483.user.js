// ==UserScript==
// @name           show my screen name
// @revision       4
// @author         KID a.k.a. blueberrystream
// @description    Twitterのログアウトリンクに自分のスクリーンネームを表示します。
// @namespace      http://kid0725.usamimi.info
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/login
// ==/UserScript==

void(function() {
/* 定数定義 */
var META_NAME_USER_SCREEN_NAME = "session-user-screen_name";

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

/* 表示する */
var target = document.getElementById("sign_out_link");
if (target != null && target != undefined && target.innerHTML.indexOf(userScreenName) < 0) {
  target.innerHTML =  target.innerHTML + "[" + userScreenName + "]";
}

})();