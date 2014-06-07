// ==UserScript==
// @name        nicosJumpCanceler
// @namespace   https://github.com/segabito/
// @description 「＠ジャンプ」を無効化
// @include     http://www.nicovideo.jp/watch/*
// @version     1.0.0
// @grant none
// ==/UserScript==

(function(window) {

  if (window.WatchJsApi) {
    window.WatchJsApi.nicos.addEventListener('nicoSJump', function(e) {
        e.cancel();
        window.WatchApp.namespace.init.PopupMarqueeInitializer.popupMarqueeViewController.onData(
          '「@ジャンプ」コマンドをキャンセルしました'
        );
    });
  }


})(unsafeWindow || window);