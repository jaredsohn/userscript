// ==UserScript==
// @name           Nico Top Pager
// @namespace      tag:kiyo.gremon@gmail.com,2010:kiyo
// @description    ニコニコ静画、ニコニコ生放送のページ移動ボタンをページ上にも表示させます
// @include        http://live.nicovideo.jp/search/*
// @include        http://seiga.nicovideo.jp/search/*
// @version        0.4
// ==/UserScript==

(function(){
    var pager = document.evaluate('id("main_area_all")/div[@class="pager_txt_list"]|id("sr_outbox")/div[@class="pager"]', document, null, 9, null).singleNodeValue;
    var beforePoint = document.evaluate('id("main_area_all")/div[./form[@class="l"]]|id("sr_outbox")/node()[1]', document, null, 9, null).singleNodeValue;
    if (!pager || !beforePoint) {
        return;
    }
    beforePoint.parentNode.insertBefore(pager.cloneNode(true), beforePoint.nextSibling);
})();