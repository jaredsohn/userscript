// ==UserScript==
// @name           Turn off Nicomment
// @author         favril
// @namespace      http://script41self.seesaa.net/
// @description    ニコニコ動画のコメントをデフォルトで非表示にするスクリプト
// @version        0.3.0
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

(function(){
    var player = unsafeWindow.document.getElementById('flvplayer').wrappedJSObject;
    if(!player) return;
    var timer = setInterval(function() {
        try {
            player.ext_setCommentVisible(false); // playerの準備ができてないとここでこける
            clearInterval(timer);
        } catch(e) {
            // player isn't ready
        }
    }, 300);
})();