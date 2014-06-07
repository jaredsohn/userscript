// ==UserScript==
// @name           Google: Add "search English page" radio button
// @namespace      http://hail2u.net/
// @description    Googleの検索フォームに「英語のページを検索」というradioボタンを追加し、簡単に英語のページからのみ検索できるようにする。
// @include        http://www.google.com/search?*
// ==/UserScript==

var $ = document.getElementById;
var lr = $("il").value;

if (lr === "lang_ja") {
  $("issferb").innerHTML += '<input type="radio" id="ilen" name="lr" value="lang_en"><label for="ilen">英語のページを検索</label> ';
} else {
  $("issferb").innerHTML += '<input type="radio" id="ilja" name="lr" value="lang_ja"><label for="ilja">日本語のページを検索</label> ';
}
