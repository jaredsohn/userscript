// ==UserScript==
// @name           GooglePersonalizedSearchOff
// @namespace      http://d.hatena.ne.jp/replication/
// @include        https://www.google.co.jp/search*
// @description    Googleパーソナライズ検索を無効にする。
// @version        1.0
// @grant          none
// ==/UserScript==

(function() {

  var optional_param = "&pws=0";
  // pwオプションが付加されていない場合
  var re = new RegExp("pws");
  if (!document.URL.match(re)) {
    // パラメタを付加してリダイレクトする
    window.location.replace(document.URL + optional_param);
  }
  
})();