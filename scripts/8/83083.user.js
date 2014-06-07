// ==UserScript==
// @name           hide recommended users
// @revision       4
// @author         KID a.k.a. blueberrystream
// @description    Twitterのおすすめユーザーを非表示にします
// @namespace      http://kid0725.usamimi.info
// @include        http*://twitter.com/*
// ==/UserScript==

void(function() {
/* 定数定義 */
var DIV_RECOMMENDED_USER_BLOCK = "recommended_users";

/* メイン処理 */
var parent = document.getElementById(DIV_RECOMMENDED_USER_BLOCK);
if (parent == null || parent == undefined) {
  return;
}

parent.getElementsByTagName("div")[0].getElementsByTagName("ul")[0].style.display = "none";

})();