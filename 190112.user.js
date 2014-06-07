// ==UserScript==
// @name        Facebook Like button remover
// @namespace   http://scripts.namdx1987.org/
// @description Remove the like buttons on facebook pages
// @include     https://*.facebook.com/*
// @include     http://*.facebook.com/*
// @version     1
// @grant       none
// ==/UserScript==

var pat=/^like/i;
document.addEventListener("DOMNodeInserted", function(e){
    var as=document.getElementsByTagName("a");
    for(var a of as)
    {
        var att=a.getAttribute("title");
            
        if(a.textContent.match(pat)||(att&&att.match(pat)))
        {
            a.remove();
        }
    }
})