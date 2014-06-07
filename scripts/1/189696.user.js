// ==UserScript==
// @name remove twitpic ad
// @namespace      http://d.hatena.ne.jp/tanku/
// @include        http://twitpic.com/*
// ==/UserScript==

(function(){
    var e=document.getElementById('content');
    var children=e.childNodes;
    var n=children.length;
    var del= new Array();
    for (var i=0;i<n;++i) {
        var c=children[i];
        if (c.nodeType == 1 && c.getAttribute('id') == 'media-main') {
            break;
        }
        del.push(c);
    }
    n=del.length;
    for (var i=0;i<n;++i) {
        e.removeChild(del[i]);
    }
}())