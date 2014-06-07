// ==UserScript==
// @name          Androidマーケットリンク化
// @namespace     http://wiijpn.blog69.fc2.com/
// @description   market:リンクをPC版マーケットへのリンクに変更
// @include       http://*
// @include       https://*
// ==/UserScript==


(function () {
  var links = document.links;
  for (var i = 0; i < links.length; i++) {
    var a = links.item(i);
    if (a.href.match(/market:\/\/(details\?id=(.*))$/)) {
      a.href = "https:\/\/market\.android\.com\/" + RegExp.$1;
    }
  }
})();
