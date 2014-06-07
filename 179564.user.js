// ==UserScript==
// @name        Niconico, Fix GINZA
// @namespace   http://userscripts.org/users/330241
// @include     http://www.nicovideo.jp/watch/*
// @version     1.0
// @run-at      document-end
// @grant       none
// @updateURL   http://userscripts.org/scripts/source/179564.meta.js
// ==/UserScript==
(function () {
    var w = typeof unsafeWindow == "undefined" ? window : unsafeWindow;
    var $ = w.jQuery;
    var id = "Niconico, fixed player";
    
    if (typeof w[id] != "undefined") return;
    w[id] = true;

    $('<style type="text/css" />').text('\
/* ニュースなどが表示されるマーキーの削除 */\
#textMarquee { display: none !important; }\
#playerNicoplayer { padding-top: 20px !important; }\
/* タイトル周辺のマージン修正 */\
#videoHeaderDetail h2 { max-width: 900px; }\
#videoHeaderDetail.active .videoDetailExpand, #videoHeaderDetail .videoDetailExpand { height: 28px; }\
#videoHeaderMenu .searchContainer { margin-top: -8px; }\
/* 動画情報上のボーダー削除 */\
#videoHeader .videoMainInfoContainer { border-top: 0; }\
/* タグ周辺の修正 */\
#videoTagContainer.default .tagInner { height: 48px; }\
#videoTagContainer.active .tagInner { height: auto; }\
#videoTagContainer .tagInner #videoHeaderTagList .toggleTagEdit { height: 36px; }\
#videoTagContainer .tagInner #videoHeaderTagList li { margin-right: 22px; }\
/* ウィンドウの横幅が小さい時用のマージン修正 */\
#content .videoHeaderOuter { padding: 0 5px; }\
#playerContainerWrapper { padding: 0 5px; }\
/* 検索ウィンドウの訪問済みのリンク色を変更 */\
a.itemLink:visited { color: rgb(89, 105, 121); }\
/* フッターが市場編集ウィンドウの前面に来ないよう修正 */\
#footer { z-index: 999; }\
/* メニュー開閉ボタンを左側へ移動 */\
.videoMenuToggle { left: 0; }\
#videoMenuTopList, #videoTagContainer { padding-left: 70px; padding-right: 0px; }\
#videoMenuTopList li.videoMenuList, #videoMenuTopList .videoMenuListNicoru { float: left; }\
#videoMenuTopList li.videoMenuList a.defmylistButton .popMsg { top: -16px; left: 70px; right: auto; }\
').appendTo($("head"));
    
    w.WatchApp.ns.view.tag.TagListView.DEFAULT_HEIGHT_NORMAL = 48;
    
    $("#topVideoInfo .parentVideoInfo").insertAfter("#topVideoInfo .supplementary");
})();