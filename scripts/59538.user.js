// ==UserScript==
// @name           Rakuten - Transparent Sold Out2
// @version        2.0
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://esearch.rakuten.co.jp/*
// @description    楽天の「在庫無し」を半透明化します。その２
// ==/UserScript==

(function() {
    
    //各ページで実行したい内容
    function handle(node){
        //複数のエレメントを扱う場合
        var items = document.evaluate('.//b/font[@color="#ff6633"]',node,null,7,null);
        for (var i = 0; i < items.snapshotLength; i++)
        {
             item = items.snapshotItem(i);
             if(item.innerHTML) item.parentNode.parentNode.parentNode.style.opacity = '0.5';
        }
    }
    
    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
        var node = evt.target;
        handle(node);
    }, false);

    handle(document);
    
})();
