// ==UserScript==
// @name           GPH
// @namespace      http://twitter.com/teraminato
// @description    Google先生の黒メニューから PLAY を消して仕事に集中させます。
// @include        https://www.google.co.jp/*
// @include        https://mail.google.com/*
// @version        0.2
// ==/UserScript==
(function() {
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("gb_78").style.display = "none";
}, false);
})();