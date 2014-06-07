// ==UserScript==
// @name           show the user following me
// @revision       14
// @author         KID a.k.a. blueberrystream
// @description    Twitterの他ユーザのホームで被フォロー状況を表示します。
// @namespace      http://kid0725.usamimi.info
// @include        http*://twitter.com/*
// @exclude        http*://twitter.com/
// @exclude        http*://twitter.com/login
// @exclude        http*://twitter.com/invitations/find*
// @exclude        http*://twitter.com/account/*
// @exclude        http*://twitter.com/#replies
// @exclude        http*://twitter.com/#inbox
// @exclude        http*://twitter.com/#favorites
// @exclude        http*://twitter.com/following
// @exclude        http*://twitter.com/followers
// @exclude        http*://twitter.com/*/following
// @exclude        http*://twitter.com/*/followers
// @exclude        http*://twitter.com/timeline/#search*
// @exclude        http*://twitter.com/about*
// @exclude        http*://twitter.com/jobs
// @exclude        http*://twitter.com/tos
// @exclude        http*://twitter.com/privacy
// @exclude        http*://twitter.com/session
// @exclude        http*://twitter.com/*/lists*
// ==/UserScript==

void(function() {

/* 定数定義 */
var META_NAME_USER_SCREEN_NAME = "session-user-screen_name";
var META_NAME_PAGE_SCREEN_NAME = "page-user-screen_name";
var DIV_CLASS_STYLE_TARGET_CHILD_BLOCK = "profile-controls";
var DIV_CLASS_FOLLOWED_JUDGE = "direct-messageable";
var DIV_ID_INSERT_BLOCK = "__sufm_insert_block__";
var DIV_CLASS_INSERT_BLOCK = "profile-controls round";
var DIV_STYLE_INSERT_BLOCK = "border-style: none; padding: 0; margin: 0; background-color: transparent; position: absolute;";
var DIV_ID_INSERT_CHILD_BLOCK = "__sufm_insert_child_block__";
var DIV_CLASS_INSERT_CHILD_BLOCK = "is-relationship";
var DIV_STYLE_INSERT_CHILD_BLOCK = "-x-system-font: none; float: left; font-family: 'Helvetica',Sans-serif; font-size: 15px; font-size-adjust: none; font-stretch: normal; font-style: normal; font-variant: normal; font-weight: normal; line-height: 26px; text-align: left;";
var SPAN_ID_INSERT_GRANDCHILD_INLINE = "__sufm_insert_child_inline__";
var SPAN_CLASS_INSERT_GRANDCHILD_INLINE = "is-following";
var SPAN_STYLE_INSERT_GRANDCHILD_INLINE = "display: inline-block;";
var I_STYLE_INSERT_GRANDCHILD_INLINE = "background-position: -144px -16px; position: relative; top: 1px; margin-right: 5px; height: 13px; width: 15px;";
var CLASS_JUDGE_BLOCKING = "is-blocked";
var ID_JUDGE_LANGUAGE = "settings_link";
// デフォルト, 日本語, 英語, スペイン語, フランス語, イタリア語, ドイツ語
var MESSAGES_FOLLOWED = {"default":"Followed", "設定":"被フォロー中", "Settings":"Followed", "Configuración":"Esta seguido", "Paramètres":"Vous etes suivi", "Impostazioni":"Followed", "Einstellungen":"Gefolgt"};
var MESSAGES_NOT_FOLLOWED = {"default":"Not followed.", "設定":"フォローされていません。", "Settings":"Not followed.", "Configuración":"Usted no se ha seguido.", "Paramètres":"Vous n'etes pas suivi.", "Impostazioni":"Non seguiti.", "Einstellungen":"Nicht gefolgt."};
var STYLES_TOP = new Array(180, 187);
var STYLES_LEFT = {"default":179, "設定":173, "Settings":179, "Configuración":180, "Paramètres":165, "Impostazioni":179, "Einstellungen":179};

/* 共用変数定義 */
var elements = null;

var styleChangeBlock = null;
var targetElement = null;
var insertElement = null;

var extraStyle = '';
var styleLeft = STYLES_LEFT["default"];

var MESSAGE_FOLLOWED = MESSAGES_FOLLOWED["default"];
var MESSAGE_NOT_FOLLOWED = MESSAGES_NOT_FOLLOWED["default"];


/* メッセージ挿入位置取得処理 */
elements = document.getElementsByClassName(DIV_CLASS_STYLE_TARGET_CHILD_BLOCK);
targetElement = elements[0].parentNode;

/* 起動判定 */
// 自分のページの場合 [rev.9]
elements = document.getElementsByTagName("meta");
var userScreenName = null;
var pageScreenName = null;
for (var i = 0; i < elements.length; i++) {
  if (elements[i].name == META_NAME_USER_SCREEN_NAME) {
    userScreenName = elements[i].content;
  }
  if (elements[i].name == META_NAME_PAGE_SCREEN_NAME) {
    pageScreenName = elements[i].content;
  }
  if (userScreenName != null && pageScreenName != null) {
    break;
  }
}
if (userScreenName == null || pageScreenName == null || userScreenName == undefined || pageScreenName == undefined || userScreenName == pageScreenName) {
  return;
}
// /followers では起動しない [rev.10]
if (-1 < location.pathname.indexOf("/followers")) {
  return;
}
// /followingでは起動しない [rev.10]
if (-1 < location.pathname.indexOf("/following")) {
  return;
}
// ブロックしている場合は起動しない [rev.11]
var elements = document.getElementsByClassName(CLASS_JUDGE_BLOCKING);
if (elements == null || elements == undefined || elements.length == 8) {
  return;
}

/* メッセージを表示言語にあわせる */
// ブラウザ言語での判定を廃止 [rev.10]
var languageElement = document.getElementById(ID_JUDGE_LANGUAGE);
if (languageElement == null || languageElement == undefined) {
  return;
}
MESSAGE_FOLLOWED = MESSAGES_FOLLOWED[languageElement.innerHTML];
MESSAGE_NOT_FOLLOWED = MESSAGES_NOT_FOLLOWED[languageElement.innerHTML];

/* 表示言語によってメッセージ表示位置を調整する */
styleLeft = STYLES_LEFT[languageElement.innerHTML];

/* フォロー関係取得処理 */
// ページ構成から判断するようにしたので、API不要に [rev.6]
var followed = false;
elements = document.getElementsByClassName(DIV_CLASS_FOLLOWED_JUDGE);
if (elements.length != 0) {
  followed = true;
}

/* 表示処理 */
// 挿入するものを用意
if (followed) {     // フォローされている
  extraStyle += ' left: ' + styleLeft + 'px; top: ' + STYLES_TOP[0] + 'px;';

  insertElement = document.createElement("div");
  insertElement.setAttribute("id", DIV_ID_INSERT_BLOCK);
  insertElement.setAttribute("style", DIV_STYLE_INSERT_BLOCK + extraStyle);
  targetElement.appendChild(insertElement);

  targetElement = document.getElementById(DIV_ID_INSERT_BLOCK);
  insertElement = document.createElement("div");
  insertElement.setAttribute("id", DIV_ID_INSERT_CHILD_BLOCK);
  insertElement.setAttribute("style", DIV_STYLE_INSERT_CHILD_BLOCK);
  targetElement.appendChild(insertElement);

  targetElement = document.getElementById(DIV_ID_INSERT_CHILD_BLOCK);
  insertElement = document.createElement("span");
  insertElement.setAttribute("id", SPAN_ID_INSERT_GRANDCHILD_INLINE);
  insertElement.setAttribute("style", SPAN_STYLE_INSERT_GRANDCHILD_INLINE);
  targetElement.appendChild(insertElement);

  targetElement = document.getElementById(SPAN_ID_INSERT_GRANDCHILD_INLINE);
  insertElement = document.createElement("i");
  insertElement.setAttribute("style", I_STYLE_INSERT_GRANDCHILD_INLINE);
  targetElement.appendChild(insertElement);

  insertElement = document.createElement("strong");
  insertElement.innerHTML = MESSAGE_FOLLOWED;
  targetElement.appendChild(insertElement);
} else {            // フォローされていない
  extraStyle += ' height: 12px; text-align: left; left: ' + styleLeft + 'px; top: ' + STYLES_TOP[1] + 'px;';

  insertElement = document.createElement("div");
  insertElement.setAttribute("id", DIV_ID_INSERT_BLOCK);
  insertElement.setAttribute("class", DIV_CLASS_INSERT_BLOCK);
  insertElement.setAttribute("style", DIV_STYLE_INSERT_BLOCK + extraStyle);
  targetElement.appendChild(insertElement);

  targetElement = document.getElementById(DIV_ID_INSERT_BLOCK);
  targetElement.innerHTML = MESSAGE_NOT_FOLLOWED;
}

/* ブロックした相手のホームでは被フォロー状況を表示しない [rev.11]*/
var BLOCK_CHECK = function() {
  var elements = document.getElementsByClassName(CLASS_JUDGE_BLOCKING);
  var element = document.getElementById(DIV_ID_INSERT_BLOCK);
  if (element == null || element == undefined) {
    return;
  }

  if (elements.length == 8) {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
};
setInterval(BLOCK_CHECK, 1000);

})();