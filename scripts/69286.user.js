// ==UserScript==
// @name              mixi external link opener
// @namespace         http://drikin.com/
// @description       外部ブログを利用してるユーザーの日記リンクをマークして、直接、外部リンクに飛ぶようにリンク先を変更します。
// @include           http://mixi.jp/*
// ==/UserScript==
var base_url = "http://mixi.jp/";
var src = location.href;

if (src.indexOf(base_url) == -1) {
  return;
}

var ts = "view_diary.pl?url=";
var os = "&owner_id=";
var as = document.getElementsByTagName('a');

for (var i = 0; i < as.length; i++) {
  var t = as[i];
  var src = t.getAttribute('href');
  if (src.indexOf(ts) != -1) {
    var url = decodeURIComponent(src.substring(ts.length, src.indexOf(os)));
    t.setAttribute('href', url);
    t.setAttribute('target', '_blank');
    t.setAttribute('style', 'font-weight: bold; background-color:yellow;');
  }
}
