// ==UserScript==
// @name           google
// @namespace      
// @author         .
// @description    remove google search and image link redirection to speed up your browsing and hide referrer
// @include        *google.*/*
// @exclude        *userscripts.org*
// @version        1.0.1
// @run-at         document-start
// ==/UserScript==

var hideReferer = true,
    newTab = true,
    showCache = false;

var ua = navigator.userAgent,
    wK = ua.toLowerCase().indexOf('webkit') > -1,
    S = location.protocol === 'https:';

function addEvent(a, b, c) {
    if (a.addEventListener) {
        a.addEventListener(b, c, false);
    }
}

function removeEvent(a, b, c) {
    if (a.removeEventListener) {
        a.removeEventListener(b, c, false);
    }
}

if (Object.defineProperty) {
    Object.defineProperty(window, 'rwt', {
        value: function () {},
        writable: false,
        configurable: false
    })
} else {
    window.__defineGetter__('rwt', function () {
        return function () {}
    })
}

if (showCache) {
    addEvent(window, 'DOMNodeInserted', cache);
}

function cache() {
    var cc = document.querySelectorAll('.vshid');
    if (cc) {
        for (var i = 0; i < cc.length; ++i) {
            cc[i].style.display = 'inline';
        }
    }
}

function proxy(e) {
    if (e && e.localName == 'a' && (e.className == 'l' || e.id == 'rg_hl' || e.className == 'rg_l' || e.className == 'rg_ilmn' || e.parentNode.className == 'vshid' || e.parentNode.className == 'gl' || e.parentNode.className == 'r')) {
        e.onmousedown ? e.removeAttribute('onmousedown') : 0;
        var m = /(&url=([^&]+)|imgurl=([^&]+))(&w=\d+&h=\d+)?&ei/g.exec(decodeURIComponent(e.href));
        if (m) e.href = m[2] || m[3];
        if (newTab) e.target = "_blank";
        if (hideReferer) {
            if (wK && !S) {
                e.rel = "noreferrer";
            } else if (!S && e.href.indexOf('http-equiv="refresh"') == -1) {
                e.href = 'data:text/html, <meta http-equiv="refresh" content="0;URL=' + encodeURIComponent(e.href) + '" charset="utf-8">';
            }
        }
    }
}

function tunnel(e, f) {
    if (e && e.localName == 'a' && (e.className == 'l' || e.id == 'rg_hl' || e.className == 'rg_ilmn' || e.className == 'irc_but' || e.className == 'rg_l' || e.parentNode.className == 'vshid' || e.parentNode.className == 'gl' || e.parentNode.className == 'r')) {
        if (e.href.indexOf('http-equiv="refresh"') > -1) {
            var rLink = /URL=([^"]+)/g.exec(decodeURIComponent(e.href));
            if (rLink) {
                e.href = rLink[1];
            }
        }
    }
    removeEvent(f, 'mouseout', fixer);
}

function fixer(e) {
    var a = e.target,
        b = a;
    if (a.localName != 'a') {
        for (; a; a = a.parentNode) {
            tunnel(a, b);
        }
    } else {
        tunnel(a, b);
    }
}

function doStuff(e) {
    var a = e.target;
    addEvent(a, 'mouseout', fixer);
    if (a && a.className == 'rg_i') {
        a.removeAttribute('class');
    }
    if (a.localName != 'a') {
        for (; a; a = a.parentNode) {
            proxy(a);
        }
    } else {
        proxy(a);
    }
}

addEvent(window, "mousedown", doStuff);