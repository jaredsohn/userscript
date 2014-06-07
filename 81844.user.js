// ==UserScript==
// @name           mixi_checkOff_addFriend
// @namespace      http://haman29.sakura.ne.jp/gm/
// @version 	   1.0
// @description    mixi (http://mixi.jp) でマイミク申請をする画面の[仲良しに追加する」のチェックを外します.
// @include        http://mixi.jp/add_friend.pl*
// ==/UserScript==
document.getElementById("buddy").removeAttribute("checked");
