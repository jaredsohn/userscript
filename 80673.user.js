// ==UserScript==
// @name           RT obscure for Togetter
// @description    RT/QT 以降の文字色を薄くするスクリプト
// @include        http://togetter.com/li/*
// @namespace      http://d.hatena.ne.jp/favril//
// @author         favril
// @version        0.1.0
// ==/UserScript==

(function(){
    var tweets = document.evaluate('//div[@class="tweet_box"]/ul/li//div[@class="list_body"]/h4', document, null, 7, null);
    if (!tweets.snapshotLength) return;
    
    for (var i=0, len=tweets.snapshotLength; i<len; i++) {
        var t = tweets.snapshotItem(i);
        var rt_idx = t.innerHTML.search(/[RQ]T[ 　:：]/);
        if (rt_idx != -1) {
            t.innerHTML = t.innerHTML.substring(0, rt_idx) + '<span style="color:#999">' +
                          t.innerHTML.substring(rt_idx) + '</span>';
        }
    }
})();
