// ==UserScript==
// @name           show the user following me on list
// @revision       11.2
// @author         biikame
// @namespace      http://userscripts.org/scripts/show/64382
// @include        http*://twitter.com/following
// @include        http*://twitter.com/following?*
// @include        http*://twitter.com/*/following
// @include        http*://twitter.com/*/following?*
// @include        http*://twitter.com/*/followers
// @include        http*://twitter.com/*/followers?*
// @include        http*://twitter.com/*/*/members
// @include        http*://twitter.com/*/*/members?*
// @include        http*://twitter.com/*/*/subscribers
// @include        http*://twitter.com/*/*/subscribers?*
// ==/UserScript==

void(function() {

/* 定数定義 */
var META_NAME_USER_SCREEN_NAME = "session-user-screen_name";
var META_NAME_PAGE_SCREEN_NAME = "page-user-screen_name";
// デフォルト, 日本語, 英語, スペイン語, フランス語
var MESSAGES_FOLLOWED = {"default":"Followed", "ホーム":"被フォロー中", "Home":"Followed", "Inicio":"Esta seguido", "Accueil":"Vous etes suivi"};
var MESSAGES_NOT_FOLLOWED = {"default":"Not followed.", "ホーム":"フォローされていません。", "Home":"Not followed.", "Inicio":"Usted no se ha seguido.", "Accueil":"Vous n'etes pas suivi."};
var STYLES_TOP = new Array(178, 184);
var STYLES_LEFT = {"default":161, "ホーム":145, "Home":161, "Inicio":134, "Accueil":161};

/* 共用変数定義 */
var elements = null;

var styleChangeBlock = null;
var targetElement = null;
var insertElement = null;

var extraStyle = '';
var styleLeft = STYLES_LEFT["default"];

var MESSAGE_FOLLOWED = MESSAGES_FOLLOWED["default"];
var MESSAGE_NOT_FOLLOWED = MESSAGES_NOT_FOLLOWED["default"];


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
if (userScreenName == pageScreenName && -1 < location.pathname.indexOf("/followers")) {
  return;
}


/* おまけ ChromeでListアイコンの表示が残念なことになっているのを修正 */
if (-1 < navigator.userAgent.indexOf("Chrome")) {
  elements = document.getElementsByClassName("list-menu");
  if (elements.length != 0) {
    var run = true;
    run = run && location.pathname.indexOf("/following") < 0;
    run = run && location.pathname.indexOf("/followers") < 0;
    run = run && location.pathname.indexOf("/subscribers") < 0;
    for (var i = 0; i < elements[0].childNodes.length; i++) {
      if (run && (elements[0].childNodes[i].tagName == "BUTTON" || elements[0].childNodes[i].tagName == "button")) {
        elements[0].childNodes[i].style.width = "72px";
      }
    }
  }
}


/* メッセージを表示言語にあわせる */
// ブラウザ言語での判定を廃止 [rev.10]
var homeLinkElement = document.getElementById("home_link");
MESSAGE_FOLLOWED = MESSAGES_FOLLOWED[homeLinkElement.innerHTML];
MESSAGE_NOT_FOLLOWED = MESSAGES_NOT_FOLLOWED[homeLinkElement.innerHTML];

/* 表示言語によってメッセージ表示位置を調整する */
styleLeft = STYLES_LEFT[homeLinkElement.innerHTML];
if (-1 < navigator.userAgent.indexOf("Opera")) {
  // for Opera
  styleLeft += 11;
}


elements = document.getElementsByTagName("head");
targetElement = elements[0];

insertElement = document.createElement("style");
insertElement.setAttribute("type", "text/css");
targetElement.appendChild(insertElement);
targetElement = insertElement;

insertElement = document.createTextNode(
  "#follow_grid .__sufm_insert_is-relationship-outer__{position:absolute;top:0;right:0}" +
  "#follow_grid .__sufm_insert_is-relationship-outer__ .is-following{position:relative;}"
);
targetElement.appendChild(insertElement);

var userElements = document.getElementsByClassName("user");
for (var i = 0; i < userElements.length; i++) {
  var userElement = userElements[i];
  
  elements = userElement.getElementsByClassName("user-actions");
  if (elements.length == 0) {
    continue;
  }
  
  /* フォロー関係取得処理 */
  // ページ構成から判断するようにしたので、API不要に [rev.6]
  var followed = false;
  if (-1 < userElement.getAttribute("class").indexOf("direct-messageable")) {
    followed = true;
  }
  
  /* メッセージ挿入位置取得処理 */
  elements = userElement.getElementsByClassName("is-relationship");
  var moveElement = elements[0];
  
  /* 表示処理 */
  insertElement = document.createElement("span");
  insertElement.setAttribute("class", "__sufm_insert_is-relationship-outer__");
  moveElement.parentNode.insertBefore(insertElement, moveElement);
  targetElement = insertElement;
  
  targetElement.appendChild(moveElement);
  
  insertElement = document.createTextNode(" ");
  targetElement.appendChild(insertElement);
  
  insertElement = document.createElement("span");
  if (followed) {
    insertElement.setAttribute("style", "padding-left:.5em;visibility:visible");
  }
  else {
    insertElement.setAttribute("style", "padding-left:.5em;visibility:hidden");
  }
  targetElement.appendChild(insertElement);
  targetElement = insertElement;
  
  insertElement = document.createElement("i");
  insertElement.setAttribute("style", "height:9px;width:10px;margin-right:5px;background-position:-160px -16px;");
  targetElement.appendChild(insertElement);
  
  insertElement = document.createElement("strong");
  targetElement.appendChild(insertElement);
  targetElement = insertElement;
  
  insertElement = document.createTextNode(MESSAGE_FOLLOWED);
  targetElement.appendChild(insertElement);
}

})();
