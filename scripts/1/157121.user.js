// ==UserScript==
// @name           Fluttershy's 4chan <wbr> Remover
// @version        1.0
// @include        boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @run-at         document-end
// ==/UserScript==


var wbrs = document.getElementsByTagName('wbr');
 
for (var i=0; i < wbrs.length; i++) {
        var t = wbrs[i].parentNode.innerHTML;
    wbrs[i].parentNode.innerHTML = t.replace(/<wbr>/g,'').replace(/<\/wbr>/g,'');
}