// ==UserScript==
// @name           nico sort
// @version        0.2
// @description    ニコ動の検索設定(ソート順)を保存するスクリプト
// @include        http://www.nicovideo.jp/*
// @namespace      http://d.hatena.ne.jp/favril/
// @author         favril
// ==/UserScript==

(function(){
    // set search option
    var opts = GM_getValue('search_sort_opts', '');
    if (opts) {
        // override
        var s = document.createElement('script');
        s.innerHTML = "function submitSearch(p, e) {" +
                      "var f = $('head_search_form'), s = String.interpret(f.s.value).strip().replace(/%20/g, '+');" +
                      "if (s != '') {(p=='/related_tag') ? location.href=p+'/'+encodeURIComponent(s) : location.href=p+'/'+encodeURIComponent(s)+'" + opts + "';}" +
                      "else if (e) { f.down('a.search_sw_1').className = 'search_sw_0'; e.className = 'search_sw_1'; f.action = p; f.s.focus(); }" +
                      "}";
        document.body.appendChild(s);
    }
    
    
    // save button
    if (/^\/search|tag\//.test(location.pathname)) {
        var btn  = document.createElement('input');
        btn.type = 'button';
        btn.className = 'submit';
        btn.value = '検索の設定を保存する';
        btn.style.marginLeft = '15px';
        btn.addEventListener('click', function() {
            GM_setValue('search_sort_opts', location.search);
            alert('検索の設定を保存しました。');
        }, false);
        
//        var inpos = document.evaluate('id("PAGEBODY")/div[@class="content_672"]/p', document, null, 7, null);
        var inpos = document.evaluate('id("PAGEBODY")/div[@class="mb8p4"]/p', document, null, 7, null);
        if (inpos.snapshotLength) inpos.snapshotItem(0).appendChild(btn);
    }
})();
