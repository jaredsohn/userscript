// ==UserScript==
// @name           GoogleショッピングにAmazonと楽天のリンクを追加
// @namespace      http://d.hatena.ne.jp/Koonies/
// @description    「その他▼」の隣に「Amazon」と「楽天」を追加します
// @include        http://www.google.*/products*
// @version        1.0
// ==/UserScript==

(function() {
    function $x(exp) {return document.evaluate(exp,document,null,7,null);}
    function $xi(exp,index) {return $x(exp).snapshotItem(index);}
    
    var search = [
         { "title" : 'Amazon'   , "url" : 'http://www.amazon.co.jp/s/?index=blended&__mk_ja_JP=カタカナ&tag=koonies-22&keywords=' }
        ,{ "title" : '楽天'     , "url" : 'http://search.rakuten.co.jp/search/mall?sitem=' }
        //,{ "title" : '価格.com' , "url" : 'http://kakaku.com/search_results/?query=' }
    ];
    
    location.href.search(/products\?q=([^&]+)[&]*.*$/);
    var keyword = RegExp.$1;
    var bar = $xi('id("gbar")/nobr', 0);
    
    for (var i=0; i<search.length; i++) {
        var link = document.createElement('a');
        
        link.textContent = search[i]["title"];
        link.href = search[i]["url"] + keyword;
        
        link.target = '_blank';
        link.setAttribute('class', 'gb1');
        link.setAttribute('style', 'outline-style: none; outline-width: initial; outline-color: initial; '); 
        
        bar.appendChild(link);
    }
})();
