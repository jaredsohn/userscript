// ==UserScript==
// @name           NicorepoHidden
// @namespace      http://d.hatena.ne.jp/shobonengine/
// @description    ニコニコ動画(マイページ)の「最新ニコレポ」で、動画投稿や生放送開始以外のお知らせを非表示にします。
// @include        http://www.nicovideo.jp/my/top
// @include        http://www.nicovideo.jp/my
// ==/UserScript==

(function() {
    // -------------------------------------------------------------------------
    // <li> に指定した正規表現が含まれないなら、非表示にする
    // -------------------------------------------------------------------------
    function check(li) {
        var h4 = li.getElementsByTagName('h4')[0];
        if (h4) {
            var re = /を投稿しました。|を開始しました。/;
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
        var li = e.target;
        check(li);
    }
    
    // -------------------------------------------------------------------------
    // div.log に指定したクラス名が含まれないなら、非表示にする
    // -------------------------------------------------------------------------
    function checkZeroVersion(nicorepo) {
        var logs = nicorepo.getElementsByClassName('log');
        for (var i = 0; i < logs.length; i++) {
            var log = logs[i];
            // コミュニティ生放送 開始
            // ユーザ生放送 開始
            // ユーザ動画 アップロード
            var re = /log-community-live-broadcast|log-user-live-broadcast|log-user-video-upload/;
            if (log.className.search(re) == -1) {
                // 非表示
                log.setAttribute('style', 'display:none;');
            }
        }
    }
    
    // -------------------------------------------------------------------------
    // Ajax で新たに追加された div.nicorepo を取得し、checkZeroVersion() を実行する
    // -------------------------------------------------------------------------
    function nodeInsertedZeroVersion(e) {
        var relatedNode = e.relatedNode;  // parent node
        if (relatedNode.className == 'nicorepo') {
            var nicorepoPage = e.target;
            checkZeroVersion(nicorepoPage);
        }
    }
    
    // -------------------------------------------------------------------------
    // main
    // -------------------------------------------------------------------------
    // 原宿バージョン
    var SYS_THREADS = document.getElementById('SYS_THREADS');
    if (SYS_THREADS) {
        // ul#SYS_THREADS li を検索する
        var lists = SYS_THREADS.getElementsByTagName('li');
        for (var i = 0; i < lists.length; i++) {
            var li = lists[i];
            check(li);
        }
        
        // ul#SYS_THREADS に新たな要素が追加されたら捕捉する
        SYS_THREADS.addEventListener('DOMNodeInserted', nodeInserted, false);
        return;
    }
    
    // Zero バージョン
    var nicorepo = document.getElementById('nicorepo');
    if (nicorepo) {
        checkZeroVersion(nicorepo);
        
        // div.nicorepo に新たな要素が追加されたら捕捉する
        var classNicorepo = nicorepo.getElementsByClassName('nicorepo')[0];
        if (classNicorepo) {
            classNicorepo.addEventListener('DOMNodeInserted', 
                                           nodeInsertedZeroVersion,
                                           false);
        }
        return;
    }
    
})();
