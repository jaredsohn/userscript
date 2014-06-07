// ==UserScript==
// @name           show full-title for google
// @author         favril
// @namespace      http://d.hatena.ne.jp/favril/
// @description    google の検索結果で、文字切りされているタイトルをフル表示するスクリプト
// @version        0.1.1
// @include        http://www.google.co.jp/search?*
// ==/UserScript==

(function(){
    var rets = document.evaluate('id("ires")/ol/li/h3/a', document, null, 7, null);
    for (var i=0; i<rets.snapshotLength; i++) {
        var a = rets.snapshotItem(i);
        var txt = a.innerHTML;
        if (/<b>...<\/b>$/.test(txt)) a.addEventListener('mouseover', getTitle, false);
    }

    function getTitle() {
        var cacheUrl = this.parentNode.parentNode.querySelector('div.s span.f span.gl a');
        if (!cacheUrl) return;
                
        var that = this;
        GM_xmlhttpRequest({
            method: 'GET',
            url: cacheUrl,  // google cache
            //overrideMimeType: 'text/plain; charset=shift_jis',
            onload: function (res) {
                if (/<title>(.*?)<\/title>/i.test(res.responseText)) {
                    that.innerHTML = RegExp.$1.replace(/<b.+?>/g, '<em>').replace(/<\/b>/g, '</em>');
                    that.removeEventListener('mouseover', getTitle, false);
                }
            }
        });
    }
})();
