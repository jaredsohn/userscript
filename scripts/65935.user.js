// ==UserScript==
// @name           Pixiv Hide Private Illusts
// @namespace      http://curige.x.fc2.com/greasemonky/
// @description    pixivのイラスト管理ページで、全体公開をデフォルトにします。
// @include        http://www.pixiv.net/*
// ==/UserScript==
(function(){
    var _doc = document;
    var targetXP = '//li[@class="navi_illust"]/a[@title="作品の管理"]';
    var res = _doc.evaluate(targetXP, _doc, null, 7, null);
    res.snapshotItem(0).href += '?res=full';
})();
