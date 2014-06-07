// ==UserScript==
// @name           ldR: Show first feed
// @namespace      http://hail2u.net/
// @description    livedoor Readerにアクセスした時に最初のフィードを自動的に開く
// @include        http://reader.livedoor.com/reader/*
// ==/UserScript==

window.addEventListener("load", function (e) {
  var w = unsafeWindow;
  w.register_hook("after_subs_load", function () {
    w.Control.read_head_subs();
  });
}, false);
