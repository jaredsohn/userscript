// ==UserScript==
// @name           bash.org.ru tweaks
// @namespace      jsn
// @description    Remove annoying ads
// @include        http://bash.org.ru/*
// ==/UserScript==

var results = document.getElementsByTagName("a") ;

for ( var i=0; i < results.length; i++) {
    if (results[i].href.indexOf("zadolba.li") >= 0) {
        var p = results[i].parentNode ;
        if (p.id != 'navstrip') p.parentNode.removeChild(p) ;
    }
}

