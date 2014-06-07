// ==UserScript==
// @name           auto_new_tab
// @namespace      http//example.com
// @include        *
// @require        http://code.jquery.com/jquery-1.5.min.js
// ==/UserScript==
(function(){
    var settings = [
        // Google
        {
            url: 'http://www.google.com/search',
            selector: 'h3 a'
        },
        
        // YouTube
        {
            url: 'http://www.youtube.com/results',
            selector: ['.result-item-thumb', 'h3 a']
        },
        
        // ニコニコ動画 キーワード検索
        {
            url: 'http://www.nicovideo.jp/search/',
            selector: ['.uad_thumbfrm p a', '.watch']
        },
        
        // ニコニコ動画 タグ検索
        {
            url: 'http://www.nicovideo.jp/tag/',
            selector: ['.uad_thumbfrm p a', '.watch']
        },
        
        // ニコニコ動画 コミュニティ動画
        {
            url: 'http://com.nicovideo.jp/community/co',
            selector: 'table[summary] a'
        },
        
        // ニコニコ動画 マイリスト
        {
        	url: 'http://www.nicovideo.jp/mylist/',
        	selector: '#SYS_page_items a'
        },
        
        // ニコニコ動画 マイページ マイリスト
        {
            url: 'http://www.nicovideo.jp/my/mylist/',
            selector: ['.mypageThumb', '.mylistVideo a']
        },
        
        // ニコニコ動画 マイページ 視聴履歴
        {
            url: 'http://www.nicovideo.jp/my/history',
            selector: ['.mypageThumb', '.mylistVideo a']
        },
        
        // ニコニコ生放送
        {
            url: 'http://live.nicovideo.jp/watch/',
            selector: '.grid a'
        }
    ];
    
    main();
    
    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(e){
        main();
    }, false);
    
    function main(){
        $(settings).each(function(){
            if(0 <= location.href.indexOf(this.url)){
                var selectorArray = this.selector instanceof Array ? this.selector : [this.selector];
                var selector = selectorArray.join(", ");
                (function(){
                    var elems = $(selector);
                    if(elems.length == 0){
                        return;
                    }
                    
                    // GM_log("selector = " + selector);
                    // GM_log("elems.length = " + elems.length);
                    elems.attr("target", "_blank");
                })();
                
                return false;
            }
        });
    }
})();
