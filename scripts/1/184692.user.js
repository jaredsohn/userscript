// ==UserScript==
// @name           removeBlank_anchor
// @description    ページ内リンクのtarget属性を_selfにする
// @include        http*
// @exclude        
// ==/UserScript==
(function () {

    function handle () {
        var anchor = document.getElementsByTagName('a');
        var nodeList = Array.slice(anchor);
        for (var i = 0, l = nodeList.length, a; i < l; i++) {
            a = nodeList[i];
            a.target = '_self';
        };
    }

    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(event){
        handle();
    }, false);

    handle();

}());
