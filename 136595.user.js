// ==UserScript==
// @name           googleLinkRedirectRemoval
// @namespace      download
// @description    Gets rid of Google link redirects
// @include        http://*.google.com/search?*
// @include        https://*.google.com/search?*
// @include        http://www.google.*
// @include        https://www.google.*
// @include        http://images.google.*
// @include        http://news.google.*
// @include        https://encrypted.google.*
// ==/UserScript==

String.prototype.toObj = function(s) {
    var r = {}, c = this.split('&'), t;
    for(var i = 0; i < c.length; i++) {
        t = c[i].split('=');
        r[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
    }
    return r;
}
function anchorMatch(a) {
    for(; a; a = a.parentNode) if(a.localName == 'a') return a;
    return null;
}

if(document.title.indexOf("Google News") != -1 || location.pathname.indexOf("/news") == 0) {
    var a=document.querySelectorAll(".title a, .sources a, .source-link a, .additional-article a, .thumbnail a");
    addEventListener("mousedown", function(e) {
        var c = anchorMatch(e.target);
        for(var i = 0; i < a.length; i++) {
            if(c == a[i]) return e.stopPropagation();
        }
    }, true);
} else {
    addEventListener("mousedown", function(e) {
        var a = anchorMatch(e.target);
        if(a && a.localName == "a") {
            var m = a.getAttribute("onmousedown");
            var h = a.getAttribute("href");
           
            if(m && m.indexOf("return") == 0) {
                a.removeAttribute("onmousedown");
            } else if(h) {
                if(h.indexOf("http://") == 0) h = h.substr(h.indexOf("/", 7));
                if(h.indexOf("/url?") == 0) {
                    h = h.substr(5).toObj();
                    a.setAttribute('href', decodeURIComponent(h.url || h.q));
                    a.setAttribute('rel', 'noreferrer');
                }
            }
        }
    }, true);
} 
