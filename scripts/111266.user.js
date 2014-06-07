// ==UserScript==
// @name           NicoliveHidden
// @author         shobonplus
// @namespace      http://d.hatena.ne.jp/shobonengine/
// @description    ニコニコ生放送で、プレーヤーより下方にある HTML 要素群を非表示にします。原宿と Q バージョンに対応。
// @version        1.1
// @include        http://live.nicovideo.jp/watch/*
// @include        http://watch.live.nicovideo.jp/watch/*
// @released       2011-08-25
// @updated        2013-06-21
// @compatible     Greasemonkey
// ==/UserScript==

(function(){
    // 非表示にする要素の id リスト
    var idList = ['page_footer', 
                  'body_footer', 
                  'footer_ads', 
                  'footerAd', 
                  'seiga', 
                  'ichiba', 
                  'nf_infobox', 
                  'vmailform', 
                  'carousel', 
                  'footer', 
                  'watch_tab_box',  // Q
                  'watch_zapping_box'  // Q
                 ];

    var i;
    for (i = idList.length; i--;) {
        var element = document.getElementById(idList[i]);
        if (element) {
            element.setAttribute('style', 'display:none;');
        }
    }

    // 非表示にする要素の class リスト
    var classList = ['page_top'];

    for (i = classList.length; i--;) {
        var elements = document.body.getElementsByClassName(classList[i]);
        for (var j = elements.length; j--;) {
            var element = elements[j];
            if (element) {
                element.setAttribute('style', 'display:none;');
            }
        }
    }

    // div#player_btm の margin-bottom を 0 にする
    var player_btm = document.getElementById('player_btm');
    if (player_btm) {
        player_btm.setAttribute('style', 'margin-bottom: 0;');
    }

    // div#all_cover の padding-bottom を 0 にする
    var all_cover = document.getElementById('all_cover');
    if (all_cover) {
        all_cover.setAttribute('style', 'padding-bottom: 0;');
    }

    // -------------------------------------------------------------------------
    // ニコニコ動画(Q)
    // -------------------------------------------------------------------------
    
    // タイトル欄の [詳細] をクリック: div#watch_tab_box を再表示
    var detailScrolls = document.getElementsByClassName('detail_scroll');
    for (var i = detailScrolls.length; i--;) {
        var detailScroll = detailScrolls[i];  // <span.detail_scroll>
        if (detailScroll) {
            // クリックイベント
            detailScroll.addEventListener('click', function (e) {
                // <div#watch_tab_box>
                var element = document.getElementById('watch_tab_box');
                if (element) {
                    // style="display:none;" をリセット
                    element.setAttribute('style', '');
                }
            }, false);
        }
        break;
    }
})();