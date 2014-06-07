// ==UserScript==
// @name           fix links in google search results
// @namespace      http://regolit.com
// @include        http://google.com/search*
// @include        http://www.google.com/search*
// @include        http://google.ru/search*
// @include        http://www.google.ru/search*
// ==/UserScript==

(function(){
    var links = document.getElementsByTagName('A'), e;
    for (var i = 0; i < links.length; i++) {
        e = links[i];
        if (e.className == 'l') {
            e.onmousedown = undefined;
        }
    }
})();
