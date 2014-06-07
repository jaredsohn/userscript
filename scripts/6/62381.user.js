// ==UserScript==
// @name           ldR: Auto fullscreen
// @namespace      http://hail2u.net/
// @description    livedoor Readerを自動的にフルスクリーンにする
// @include        http://reader.livedoor.com/reader/*
// ==/UserScript==

window.addEventListener("load", function (e) {
  var w = unsafeWindow;
  w.Control.toggle_leftpane();
  w.Control.toggle_fullscreen();
  w.Control.toggle_fullscreen();
}, false);
