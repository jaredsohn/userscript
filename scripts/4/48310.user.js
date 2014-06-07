// ==UserScript==
// @name           DisplayPublishedDateForGoogleSearch
// @namespace      http://d.hatena.ne.jp/replication/
// @include        http://*.google.*/search*
// @description    Google検索時のパラメタに自動的に&as_qdr=y15を付加する。デフォルトの値を変更したい場合は、optional_paramの値を変更してください。
// @version        0.3
// ==/UserScript==

(function() {

  var optional_param = "&as_qdr=y15"     // 過去 15 年間
  // var optional_param = "&as_qdr=y";   // １年以内
  // var optional_param = "&as_qdr=m";   // １か月以内
  // var optional_param = "&as_qdr=w";   // １週間以内
  // var optional_param = "&as_qdr=d";   // ２４時間以内
  // var optional_param = "&as_qdr=all"; // 指定なし
  
  // as_qdrオプションが付加されていない場合
  var re = new RegExp("as_qdr");
  if (!document.URL.match(re)) {
    // パラメタを付加してリダイレクトする
    window.location.replace(document.URL + optional_param);
  }
  
})();