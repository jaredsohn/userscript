// ==UserScript==
// @id             niconico.auto.comment.hide@kyu
// @name           Niconico auto comment hide
// @version        1.1
// @namespace      http://userscripts.org/users/417618
// @author         kyu
// @description    ニコニコ動画のコメントをデフォルトで非表示にするスクリプト
// @downloadURL    http://userscripts.org/scripts/source/171996.user.js
// @include        http://www.nicovideo.jp/watch/*
// @run-at         document-end
// ==/UserScript==

(function () {
    var executeBrowserContext = function(funcOrString) {
        var code = 'javascript:(' + encodeURIComponent(funcOrString.toString()) + ')()';
        location.href = code;
    }

    function main() {
        var player = document.getElementById('flvplayer');
        // Zero
        if (player === null) {
            function setQCommentHide() {
                var npc = WatchApp.namespace.model.player.NicoPlayerConnector.updatePlayerConfig({
                    commentVisible: false
                });
            };
            
            // 初期化完了イベント
            WatchApp.namespace.model.player.PlayerAreaConnector.getInstance().addEventListener('onVideoInitialized', setQCommentHide);

        // Harajuku
        } else {
            function setHarajukuCommentHide() {
				var player = document.getElementById('flvplayer');
                player.ext_setCommentVisible(false);
            };
            
            NicoPlayerReady.register(setHarajukuCommentHide);
        }
    }
    
    executeBrowserContext(main);
})();