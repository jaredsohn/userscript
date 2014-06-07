// ==UserScript==
// @name           SelectionSearcherByNW
// @namespace      http://d.hatena.ne.jp/replication/
// @include        *
// @description    文字列を選択した状態でgキーを押下すると、新規ウインドウでGoogle検索を行う。
// @version        0.3
// ==/UserScript==

(function() {
  
  window.addEventListener("keydown", function(evt) {
    // gボタンが押下された場合
    if (evt.keyCode == 71) {
      var url = "http://www.google.co.jp/search?hl=ja&q=";
      var str = window.getSelection().toString();
      if (str != "") {
        url += encodeURIComponent(str);
        window.open(url);
      }
    }
  }, true);

})();