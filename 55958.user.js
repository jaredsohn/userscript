// ==UserScript==
// @name           change link for platform001
// @version        0.1
// @description    mixiアプリ開発ページのリンクを変更するスクリプト
// @include        http://platform001.mixi.jp/*
// @namespace      http://d.hatena.ne.jp/favril/
// @author         favril
// ==/UserScript==

(function(){
    var currentUrl = location.href;
    if (/^http:\/\/platform001\.mixi\.jp\/($|(home\.pl))/.test(currentUrl)) {
        var links = document.evaluate('id("myProfile")//div[@class="contents"]//a', document, null, 7, null);
        for (var i=0; i<links.snapshotLength; i++) {
            links.snapshotItem(i).href = links.snapshotItem(i).href.replace('run_appli.pl', 'view_appli.pl');
        }
    } else if (/^http:\/\/platform001\.mixi\.jp\/list_appli\.pl$/.test(currentUrl)) {
        var links = document.evaluate('id("bodyMainArea")//table[@class="listMain"]//a', document, null, 7, null);
        for (var i=0; i<links.snapshotLength; i++) {
            links.snapshotItem(i).href = links.snapshotItem(i).href.replace('run_appli.pl', 'view_appli.pl');
        }
    } else if (/^http:\/\/platform001\.mixi\.jp\/search_appli\.pl/.test(currentUrl)) {
        var link = document.evaluate('id("bodyArea")//li[@class="letsMakeAppli"]/a', document, null, 7, null);
        if (!link.snapshotLength) return;
        link.snapshotItem(0).href = 'add_appli.pl';
    }
})();
