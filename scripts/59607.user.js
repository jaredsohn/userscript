// ==UserScript==
// @name           Hatena Diary - Direct to the Image
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://d.hatena.ne.jp/*
// @version        2.0
// @description    はてなフォトライフ画像をクリックしたときに、直接元画像に飛ぶようにします。 
// ==/UserScript==

(function() {
    //各ページで実行したい内容
    function handle(node){
        //複数のエレメントを扱う場合
        var items = document.evaluate('.//img[@class="hatena-fotolife"]',node,null,7,null);
        for (var i = 0; i < items.snapshotLength; i++)
        {
             var item = items.snapshotItem(i);
             item.parentNode.href = item.src;
        }
    }
    

    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
	    var node = evt.target;
            handle(node);
    }, false);
    handle(document);
})();

