// ==UserScript==
// @name        当前页面打开
// @namespace   McDelfino
// @description 当前页面打开
// @include     *
// @grant       none
// @version     1
// ==/UserScript==

(function(){
    var links=document.getElementsByTagName('a');
    for(i=0;i<links.length;i++) {
         links[i].target="_self";
    }

    var inputlinks=document.getElementsByTagName('input');
    for(i=0;i<inputlinks.length;i++) {
         inputlinks[i].target="_self";
    }
})();