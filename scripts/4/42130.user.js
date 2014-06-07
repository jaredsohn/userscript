// ==UserScript==
// @name           open external links in background tab
// @namespace      http://ix.io
// @description    Open links to external domains in a background tab
// @include        *
// ==/UserScript==

function getDomain(url) {
    var parts  = url.split('//');
    var domain = parts[1];
    if(domain.indexOf('/')) {
        var p  = domain.split('/');
        domain = p[0];
    }
    if(domain.indexOf(':')) {
        var d  = domain.split(':');
        domain = d[0];
    }
    return domain;
}

function TabOpener(a) {
    var clickHandler = function(e) {
        GM_openInTab(a.href);
        e.preventDefault();
    }
    a.addEventListener('click', clickHandler, false);
}

var as = document.getElementsByTagName('a');
for (var i = 0, a; a = as[i]; i++) {
    if (a.hasAttribute('href') && !a.href.match(/^javascript:/i) && (a.href.indexOf(getDomain(document.URL)) < 0) ) {
        new TabOpener(a);
    }
}