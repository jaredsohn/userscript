// ==UserScript==
// @name          Hatena Bookmark Full Title
// @namespace     http://blog.fkoji.com/
// @description	  Hatena Bookmark Full Title
// @include       http://b.hatena.ne.jp/*
// @exclude       http://b.hatena.ne.jp/video*
// ==/UserScript==

(function() {
    var link = document.getElementsByTagName('a');
    var len = link.length;
    for (var i = 0; i < len; i++) {
        if (!link[i].title || link[i].title == '') {
            continue;
        }
        if (link[i].parentNode.nodeName.toLowerCase() != 'h3') {
            continue;
        }
        if (link[i].innerHTML.match(/\.\.\.$/)) {
            link[i].innerHTML = link[i].title;
        }
    }
})();
