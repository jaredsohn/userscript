// NicorepoHidden を、ニコニコ動画Zeroに対応させたものです。
// ==UserScript==
// @name           NicorepoHidden
// @namespace      http://d.hatena.ne.jp/shobonengine/
// @description    ニコニコ動画(マイページ)の「最新ニコレポ」で、動画投稿や生放送開始以外のお知らせを非表示にします。
// @include        http://www.nicovideo.jp/my/top
// ==/UserScript==

(function() {
    // -------------------------------------------------------------------------
    // <li> に指定した正規表現が含まれないなら、非表示にする
    // -------------------------------------------------------------------------
    function check(li) {
        var h4 = li.getElementsByClassName('log-body')[0];
        if (h4) {
            var re = /を投稿しました。|が追加されました。/;
            if (h4.innerHTML.search(re) == -1) {
                // 非表示
                li.setAttribute('style', 'display:none;');
            }
        }	

    }

    // -------------------------------------------------------------------------
    // Ajax で新たに追加された <li> を取得し、check() を実行する
    // -------------------------------------------------------------------------
    function nodeInserted(e) {
        if (e.target.toString().match('Text') == null){
            var lists = e.target.getElementsByClassName('log');
            for (var i = 0; i < lists.length; i++) {
                var li = lists[i];
                check(li);
            }
        }
    }
    
    // -------------------------------------------------------------------------
    // main
    // -------------------------------------------------------------------------
    var SYS_THREADS = document.getElementsByClassName('nicorepo')[0];
    if (SYS_THREADS) {
        // ul#SYS_THREADS li を検索する
        var lists = SYS_THREADS.getElementsByClassName('log');
        for (var i = 0; i < lists.length; i++) {
            var li = lists[i];
            check(li);
        }
        
        // ul#SYS_THREADS に新たな <li> が追加されたら捕捉する
        SYS_THREADS.addEventListener('DOMNodeInserted', nodeInserted, false);
    }
})();