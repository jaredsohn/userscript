// ==UserScript==
// @name djangobb.archlinux.pl
// @namespace lobotomius.com
// @include http://archlinux.pl/forum/*
// ==/UserScript==


function node(xp, ct) {
    var r = document.evaluate(xp, ct, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
    if(r)
        return r.singleNodeValue
    else
        return null;
}

// styl

GM_addStyle(" \
    #djangobbwrap { \
        border: none; \
        margin-left: 0px; \
        margin-right: 0px; \
    } \
");

// poprawia pusty href
node('//div[@id="archnavbarlogo"]/h1/a', document).setAttribute('href', 'http://archlinux.pl/forum');








//