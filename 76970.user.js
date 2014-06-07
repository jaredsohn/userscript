// ==UserScript==
// @name           shindanmaker_auto_submitter
// @version        1.0.1
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    診断メーカーで名前入力と診断結果の表示を自動で行います。
// @include        http://shindanmaker.com/*
// @exclude        http://shindanmaker.com/
// @exclude        http://shindanmaker.com/c/*
// ==/UserScript==
(function () {
    var yourId = ""; // input your id / 診断するときに使いたい名前を入力
    
    var id = document.getElementsByName('u')[0];
    if (!id.value) {
        id.value = yourId;
    }
    if (id.value && !document.getElementsByClassName('result').length) {
        document.forms[0].submit();
    }
})();
