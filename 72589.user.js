// ==UserScript==
// @name           Blip.pl - Expand links and citations
// @namespace      http://userscripts.org/users/20935
// @description    Expand links and citations
// @author         Wojciech 'KosciaK' Pietrzok
// @version        0.1.1
// @include        http://blip.pl/*
// @include        http://www.blip.pl/*
// @include        http://*.blip.pl/*
// ==/UserScript==


function expand() {
    xpath = "//a[@title and contains(.,'[')]"
    var got = document.evaluate(xpath, document, null, 5, null), result=[];
    while (next = got.iterateNext())
        result.push(next);
    
    for (i=0; i < result.length ; i++) {
        if (result[i].innerHTML == "[blip]") {
            result[i].style.background = "#DDD"
            result[i].style.color = "#FF5B00"
        } 

        inner = "[" + result[i].title + "]"    
        result[i].innerHTML = inner
        result[i].removeAttribute('title')
    }
    setTimeout(expand, 2500)
}

(function() {
    expand()
})();
