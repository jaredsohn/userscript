// ==UserScript==
// @name           Test AutoPagerize on Google Search
// @version        2.0
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.tld/search?*
// @description    AutoPagerizeを継ぎ足されたページのみに適用する方法を確認するスクリプトです。
// ==/UserScript==

(function() {
    function handle(node){
        alert('new page loaded');
        var result = '';
        
        // ドット"."なし → 1ページ目から全部適用
        result += '(1) //a[@class="l"] (Without Dot)\n';
        var items = document.evaluate('//a[@class="l"]',node,null,7,null);
        for (var i = 0; i < items.snapshotLength; i++)
        {
           result += items.snapshotItem(i);
           result += '\n';
        }
        
        // ドット"."あり → 新しく読み込んだページのみ適用
        result += '\n(2) .//a[@class="l"] (With Dot)\n';
        var items = document.evaluate('.//a[@class="l"]',node,null,7,null);
        for (var i = 0; i < items.snapshotLength; i++)
        {
           result += items.snapshotItem(i);
           result += '\n';
        }
        
        alert(result);
    }
    
    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
        var node = evt.target;
        //var requestURL = evt.newValue;
        //var parentNode = evt.relatedNode;
        handle(node);
    }, false);
    handle(document);
})();
