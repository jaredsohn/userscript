// ==UserScript==
// @name           Show Full Title of Hotentry
// @author         favril
// @namespace      http://script41self.seesaa.net/
// @description    はてなブックマークの人気エントリーのタイトルを省略せずに表示するスクリプト
// @version        0.1.2
// @include        http://b.hatena.ne.jp/hotentry*
// ==/UserScript==

(function(){
    var hotentries = document.evaluate('//a[@class="entry-link"]', document, null, 7, null);
    for(var i=0; i<hotentries.snapshotLength; i++) {
        var he = hotentries.snapshotItem(i);
        he.innerHTML = he.title;
    }
})();
