// ==UserScript==
// @name           eow_auto_focus
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    英辞郎 on the WEBで、画面がアクティブになった時や別部分をクリックした時に、カーソルのフォーカスを単語入力欄へ移動します。
// @include        http://eow.alc.co.jp/*
// ==/UserScript==
(function () {
    var events = ['focus', 'click'];
    for (var i = 0; i < events.length; i++) {
        document.addEventListener(events[i], function (e) {
            document.getElementById('q').focus();
        }, false);
    }
})();
