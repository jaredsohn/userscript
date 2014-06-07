// ==UserScript==
// @name           hide recommended users completely
// @revision       4
// @author         KID a.k.a. blueberrystream
// @description    Twitterのおすすめユーザーを完全に非表示にします
// @namespace      http://kid0725.usamimi.info
// @include        http*://twitter.com/*
// ==/UserScript==

void(function() {
/* 定数定義 */
var DIV_RECOMMENDED_USER_BLOCK = "recommended_users";

/* メイン処理 */
var block = document.getElementById(DIV_RECOMMENDED_USER_BLOCK);
if (block == null || block == undefined) {
  return;
}

block.style.display = "none";

})();