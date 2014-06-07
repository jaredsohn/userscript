// ==UserScript==
// @name           NicovideoHidden
// @author         shobonplus
// @namespace      http://d.hatena.ne.jp/shobonengine/
// @description    ニコニコ動画で、プレーヤーより下方にある HTML 要素群を非表示にします。 マイリスト再生にも対応。原宿と GINZA バージョンに対応。
// @version        1.1.2
// @include        http://www.nicovideo.jp/watch/*
// @include        http://www.nicovideo.jp/playlist/mylist/*
// @released       2011-08-25
// @updated        2013-11-10
// @compatible     Greasemonkey
// ==/UserScript==

(function(){
    // -------------------------------------------------------------------------
    // ニコニコ動画(原宿)
    // -------------------------------------------------------------------------
    /*
     * <div#PAGEMAIN>
     *   <div#PAGEHEADER>
     *   <div#PAGEBODY>
     *     <div#MATCHHEADER>
     *     <div#flvplayer_container>
     *     <div#WATCHFOOTER>
     *       <div#player_bottom_textlink>
     *       <div#player_bottom_share>
     *       others : 非表示
     *   <div#PAGEFOOTER> : 非表示
     */
    var watchfooter = document.getElementById('WATCHFOOTER');
    if (watchfooter) {
        // div#player_bottom_textlink, div#player_bottom_share 以外を非表示にする
        var childNodes = watchfooter.childNodes;
        var i;
        for (i = childNodes.length; i--;) {
            var node = childNodes[i];
            if (node.tagName === 'DIV') {
                if (node.id !== 'player_bottom_textlink' && node.id !== 'player_bottom_share') {
                    node.setAttribute('style', 'display:none;');
                }
            }
        }
    }

    // div#PAGEFOOTER を非表示にする
    var PAGEFOOTER = document.getElementById('PAGEFOOTER');
    if (PAGEFOOTER) {
        PAGEFOOTER.setAttribute('style', 'display:none;');
    }

    // -------------------------------------------------------------------------
    // ニコニコ動画(GINZA)
    // -------------------------------------------------------------------------
    /*
     * <div#content>
     *   <div#playlist> : 非表示
     *   <div#searchResultExplorerExpand> : 非表示
     * <div#bottomContentTabContainer>
     *   <div#outline> : 非表示
     * <div#footer> : 非表示
     */
    var idList = ['playlist', 
                  'searchResultExplorerExpand', 
                  'outline', 
                  'footer'];
    var i;
    for (i = idList.length; i--;) {
        var element = document.getElementById(idList[i]);
        if (element) {
            element.setAttribute('style', 'display:none;');
        }
    }
})();