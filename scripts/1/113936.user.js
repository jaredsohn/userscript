// ==UserScript==
// @name           YouTubePromoteHidden
// @namespace      http://d.hatena.ne.jp/shobonengine/
// @description    YouTubeのプロモート動画を非表示にします。
// @include        http://www.youtube.com/watch*
// ==/UserScript==

(function() {
    function nodeInserted(e) {
        var inserted = e.target;
        var tagName = inserted.tagName;
        // <li> 要素以外を非表示にする
        if (tagName != 'LI') {
            if (tagName) {  // Text など tagName が undefined の要素を除外する
                inserted.setAttribute('style', 'display:none;');
            }
            return;
        }
        // プロモート動画を非表示にする
        if (inserted.className == 'video-list-item watch-pyv-vid') {
            inserted.setAttribute('style', 'display:none;');
            return;
        }
    }

    var watchRelated = document.getElementById('watch-related');
    if (watchRelated) {
        watchRelated.addEventListener('DOMNodeInserted', nodeInserted, false);
    }
    
    var watchSidebar = document.getElementById('watch-sidebar');
    if (watchSidebar) {
        watchSidebar.addEventListener('DOMNodeInserted', nodeInserted, false);
    }
    
    // #ppv-container を #watch-related から削除して「おすすめ動画」を非表示にする
    var ppvContainer = document.getElementById('ppv-container');
    var watchRelated = document.getElementById('watch-related');
    if (ppvContainer && watchRelated) {
        watchRelated.removeChild(ppvContainer);
    }
})();
