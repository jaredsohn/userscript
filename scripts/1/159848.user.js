// ==UserScript==
// @id             ss5adR
// @name           ShuShu5.com Ad Space Remover
// @version        1.0.1.0
// @namespace      Jixun.Org
// @author         Jixun66
// @description    Remove the AD Space @ shushu5.com
// @include        http://*.shushu5.com/*
// @include        http://shushu5.com/*
// @run-at         document-end
// ==/UserScript==

(function () {
    /* Func :: rA
    *    Remove All element by query
    */
    function rA (a) {
        var p=document.querySelectorAll (a);
        for (i=0; i<p.length; i++) { p[i].parentNode.removeChild (p[i])};
    }
    
    // Ad space
    var p = document.querySelector ('.bad').parentNode;
    if (p.tagName.toLowerCase() == 'div') { p.parentNode.removeChild(p) }
    
    // "Baidu Share" Buttons
    rA ('#bdshare');
    
    // Clean article title
    var dTitle = document.querySelector ('.ptit');
    dTitle.innerHTML = '<h1>' + dTitle.querySelector ('h1').innerHTML + '</h1>';
})();