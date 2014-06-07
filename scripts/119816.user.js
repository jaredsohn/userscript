// ==UserScript==
// @name          mixi_appli_request_open
// @namespace     http://userscripts.org/users/kawaz
// @description   mixiのアプリリクエストを全部クリックする
// @version       1.0
// @include       http://mixi.jp/list_appli_request.pl
// ==/UserScript==

setTimeout(function(){
  Array.prototype.slice.call(
    document.querySelectorAll("a[href*='type=request'][href*='mode=accept']"
  )).each(function(a){
    var w = window.open(a.href,"hoge"+Math.random());
    setTimeout(function(){w.close()},15000);
    setTimeout(function(){location.reload()},17000);
  });
}, 500);
