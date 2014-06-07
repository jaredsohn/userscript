// ==UserScript==
// @name           Nico Mylist Search
// @author         favril
// @namespace      http://script41self.seesaa.net/
// @description    ニコニコ動画の公開マイリスト検索のフォームを追加するスクリプト
// @version        0.1.0
// @include        http://www.nicovideo.jp/openlist/*
// ==/UserScript==

(function(){
    var inpos = document.evaluate('//div[@class="content_672"]', document, null, 7, null);
    if ( !inpos ) return;
    inpos = inpos.snapshotItem(0);

    var box = document.createElement('div');
    box.style.marginBottom = '20px';
    var myform = document.createElement('form');
    myform.addEventListener('submit', function(event){
        // event cancel
        event.preventDefault();
        event.stopPropagation();
        
        // get video id
        var vid = this.elements[0].value;
        
        location.href = '/openlist/' + vid.replace(/[\s　]+/g, '+');
    }, false);
    
    var btn   = document.createElement('input');
    btn.value = 'マイリスト検索';
    btn.type  = 'submit';

    var txt   = document.createElement('input');
    txt.type  = 'text';
    txt.style.width = '250px';
    txt.value = location.href.substring(33).replace(/\+/g,' '); // http://www.nicovideo.jp/openlist/
    
    myform.appendChild(txt);
    myform.appendChild(btn);
    box.appendChild(myform);
    inpos.parentNode.insertBefore(box, inpos);
})();
