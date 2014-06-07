// ==UserScript==
// @name         Paywall (No cookies, basic readability)
// @namespace    http://userscripts.org/users/429889
// @version      0.1
// @description  Last tested 11/08/12
// @include      http://*.nytimes.com/*
// @include      http://*.latimes.com/*
// @copyright    2012+, You
// ==/UserScript==
//-- Defines.
var d = document,
    l = d.location,
    b = d.body,
    is = {
        nyt: /.nytimes.com$/.test(l.hostname),
        lat: /.latimes.com$/.test(l.hostname),
        article: l.pathname.length > 1 && !/index.html|\/$/.test(l.pathname)
    };
//-- Nuke cookies.
if ( is.article ) {
    var c_str = document.cookie,
        r_name = /^[^=]+/,
        expires = (new Date(0)).toUTCString(),
        uses_iframes = false,
        domain;
    switch (true) {
        case is.nyt: domain = '.nytimes.com'; break;
        case is.lat: uses_iframes = true; break;
    }
    if ( uses_iframes ) {
        //-- Uses localStorage of another domain.
        //-- IFrames are pesky anyway.
        //-- Not sure why but a defer is needed.
        setTimeout(function(){
            var iframes = d.querySelectorAll('iframe');
            for ( var i = 0, l = iframes.length; i < l; i += 1 ) {
                iframes[i].parentElement.removeChild(iframes[i]);
            }
        }, 0);
    } else if (domain != null) {
        c_str.split(';').forEach(function(c){
            name = c.match(r_name);
            console.log(name);
            var new_c = name+'=; expires='+expires+'; path=/; domain='+domain;
            setTimeout(function(){
                document.cookie = new_c;
            }, 0);
        });
    }
}
    
//-- Single page.
if ( is.article ) {
    if ( is.nyt && !/pagewanted=/.test(l.search) ) {
        var head = l.search.length ? '&' : '?';
        l.search += head+'pagewanted=all';
    } else if ( is.lat ) {
        l.href = d.querySelector('a[href$="full.story"]').getAttribute('href');
    }
}