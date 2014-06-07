// ==UserScript==
// @name           ニコニコ大百科 ヘッダーを下に
// @description    ページ内リンクでアンカーと被り邪魔になるので。追従専用です。
// @namespace      http://userscripts.org/users/497722
// @version        1
// @grant          GM_addStyle
// @include        http://dic.nicovideo.jp/*
// ==/UserScript==

(function(){
  GM_addStyle([
    "#topline { width: auto;  min-width: auto;}",
    ".toplinetable { background: rgba(51,51,51,0.6); width: auto; position: fixed; bottom: -10px;}",
    ".toplinetable td { width: auto; border: solid thin;}",
    ".toplinetable td a { display: inline-block;}",
    "#topbarMenu { margin: -134px 0 0 -120px; width: 34em; padding: 12px;}",
    "#topbarMenu a, #topbarRightMenu a { display: block;}",
    "#topbarRightMenu { margin: -37px 0px 0 130px;}",
    "#topbarRightMenu li { background: #111; display: inline-block; float: none; margin-right: -3px; padding: 2px 0;}",
    "#topbarLogoutMenu { margin-left: -120px;}"
  ].join(''));
})();