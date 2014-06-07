// ==UserScript==
// @name           eow_support_next_inputs
// @version        1.1.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    英辞郎 on the WEBで、キーボードから最初の入力を行った時に自動で単語入力欄をクリアしてフォーカスします。
// @include        http://eow.alc.co.jp/*
// ==/UserScript==
(function () {
    var enabled = true;
    document.addEventListener('keydown', function (e) {
        // アルファベットか日本語の入力を行った場合に入力欄をクリアしてフォーカス
        var isInput = e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 229;
        var isSingle = !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey;
        if (enabled && isInput && isSingle) {
            var inputNode = document.getElementById('q');
            inputNode.value = '';
            inputNode.focus();
        }
        // ページを開いた後の最初の入力がそれ以外のキーだった場合は何もせず無効化
        enabled = false;
    }, false);
    document.addEventListener('focus', function (e) {
        enabled = true;
    }, false);
})();
