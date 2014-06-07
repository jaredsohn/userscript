// ==UserScript==
// @name           facebook like-btn localize
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        *
// @version        0.1
// @date           201202142300
// ==/UserScript==

var btns = document.querySelectorAll('.connect_widget_like_button .liketext');
for (var i = 0, n = btns.length; i < n; i++) {
  btns[i].textContent = ['いいじゃん！','ええね！','よか！'][Math.floor(Math.random() * 3)];
}