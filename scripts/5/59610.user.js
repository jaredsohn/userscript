// ==UserScript==
// @name           Hatena Diary - Add Edit Details Link
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://d.hatena.ne.jp/*
// @version        2.0
// @description    はてなダイアリーで「詳細編集」リンクを付けます。
// ==/UserScript==

(function() {
    //各ページで実行したい内容
    function handle(node){
        //複数のエレメントを扱う場合
        var items = document.evaluate('.//div[@class="section"]/p[@class="sectionheader"]/span[@class="edit"]',node,null,7,null);
        for (var i = 0; i < items.snapshotLength; i++)
        {
             var item = items.snapshotItem(i);
             var title = document.evaluate('./h3[@class="title"]/a', item.parentNode.parentNode, null,7,null).snapshotItem(0);
             var url = title.href;
             if(!url.match(/(.*)\/(.*?)\/.*?$/)) return;
             var base = RegExp.$1, date = RegExp.$2;
             var editUrl = base + '/edit?date=' + date;
             
             sectionHeader = item.parentNode;
             var a =document.createElement('a');
             var span = document.createElement('span');
             span.innerHTML = ' | ';
             a.href = editUrl;
             a.innerHTML = '詳細編集';
             span.appendChild(a);
             sectionHeader.appendChild(span)
        }
    }
    
    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
	    var node = evt.target;
        handle(node);
    }, false);
    
    handle(document);
})();

