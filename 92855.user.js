// ==UserScript==
// @name           page error - auto reload
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        *
// @version        0.1
// @date           20101216235
// ==/UserScript==

// http://q.hatena.ne.jp/1292500995

if(/^ページ読み込みエラー$|^503 Service Temporarily Unavailable$/.test(document.title)) {
  setTimeout(function() {
    location.reload();
  }, 8000);
}