// ==UserScript==
// @name       SUCCESS Timeout Blocker
// @namespace  http://foooomio.net/
// @version    1.0.0
// @description    滋賀大学キャンパス教育支援システム（SUCCESS）のタイムアウトをブロックします。
// @include    https://success.shiga-u.ac.jp/Portal/*
// @license    MIT License
// ==/UserScript==

var INTERVAL = 10 * 60 * 1000;

setInterval(function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', location.href);
  xhr.send();
}, INTERVAL);
