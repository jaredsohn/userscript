// ==UserScript==
// @name           Amazon_to_calil
// @namespace      http://d.hatena.ne.jp/Koonies/
// @description    Amazonの商品ページにカーリルへのリンクを挿入する
// @include        http://www.amazon.co.jp/*
// @version        1.2.2
// ==/UserScript==

//* bookmarklet ver.
//javascript:if(location.href.search(/[^0-9A-Z]([B0-9][0-9A-Z]{9})([^0-9A-Z]|$)/)!=-1){void(location.href='http://calil.jp/book/'+RegExp.$1);}

(function() {
    function $x(exp) {return document.evaluate(exp,document,null,7,null);}
    function $xi(exp,index) {return $x(exp).snapshotItem(index);}
    
    if (location.href.search(/[^0-9A-Z]([B0-9][0-9A-Z]{9})([^0-9A-Z]|$)/) != -1)
    {
        var isbn = RegExp.$1;
        if (isbn.match(/[0-9]+[0-9X]/g) != isbn) return;  //  本以外は除外
        
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var div = document.createElement('div');
        var link = document.createElement('a');
        var img = document.createElement('img');
        
        tr.appendChild(td);
        td.appendChild(div);
        div.appendChild(link);
        
        div.setAttribute('class', 'tiny'); 
        div.setAttribute('style', 'padding-top: 6px;'); 
        link.href = 'http://calil.jp/book/' + isbn;
        link.target = "_blank";
        link.textContent = "カーリルで図書館の蔵書検索";
        
        img.src = "http://gae.calil.jp/public/img/icon/run.gif";
        img.title = "カーリル君";
        img.setAttribute('style', 'border-style:none;'); 
        link.appendChild(img);
        
        var tbody = $xi('id("handleBuy")/table[@class="productImageGrid"]/tbody',0);
        tbody.appendChild(tr);
    }
})();
