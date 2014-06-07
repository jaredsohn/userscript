// ==UserScript==
// @name           オリンピックのネタばれ防止フィルタ
// @namespace      http://d.hatena.ne.jp/Koonies/
// @description    オリンピックの結果に関するキーワードを 『ピー』 に置換します
// @include        http://*
// @include        https://*
// @version        1.0
// ==/UserScript==

(function(){
    const ngWord = /[0-9０-９]+位|金|銀|銅|(金|銀|銅)*メダル|準*優勝|決勝|獲得|入賞|転倒|勝ち*|負け*|敗退*|初|成功|失敗|ならず|惜し|悔し|残念|無念|転倒|通過/g;
    const newWord = ' 『ピー』 ';
    const matchWord = /五輪|オリンピック/;
    
    if (!!document.body.innerHTML.match(matchWord)) {
        var x = document.evaluate("//text()[contains(., ngWord)]", document, null, 7, null);
        for(var i=0; i<x.snapshotLength; i++) {
            x.snapshotItem(i).nodeValue = x.snapshotItem(i).nodeValue.replace(ngWord, newWord);
        }
    }
})();
