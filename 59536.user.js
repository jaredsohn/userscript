// ==UserScript==
// @name           Rakuten - Transparent Sold Out
// @version        2.0
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://item.rakuten.co.jp/*
// @description	   楽天の「在庫無し」を半透明化します。
// ==/UserScript==

(function() {
    
    //各ページで実行したい内容
    function handle(node){
        //複数のエレメントを扱う場合
        var items = document.evaluate('.//span[@class="not"]',node,null,7,null);
        for (var i = 0; i < items.snapshotLength; i++)
        {
             item = items.snapshotItem(i);
             item.parentNode.style.opacity = '0.5';
        }
    }
    
    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
        var node = evt.target;
        handle(node);
    }, false);
    
    handle(document);
})();
