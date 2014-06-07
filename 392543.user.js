// ==UserScript==
// @name       Preloadr
// @namespace  http://www.facebook.com/joshumax
// @version    0.1.2
// @description Preload pages and speed up your browsing experience! Powered by InstantClick.
// @include    http://*/*
// @include    https://*/*
// @copyright  2014+, joshumax
// ==/UserScript==

// The script is wrapped in an anonymous function
(function() {
// Uses InstantClick (http://instantclick.io/)

/*
 * Copyright (c) 2014 Alexandre Dieulot
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var debug = false;
var InstantClick = function (g, h) {
    function m(a) {
        var c = a.indexOf("#");
        return -1 == c ? a : a.substr(0, c)
    }

    function n(a) {
        for (;
            "A" != a.nodeName;) a = a.parentNode;
        return a
    }

    function v(a) {
        for (var c = 0; c < p[a].length; c++) p[a][c]()
    }

    function w(a, c) {
        var d = g.implementation.createHTMLDocument("");
        d.documentElement.innerHTML = c;
        g.documentElement.replaceChild(d.body, g.body);
        d = g.createElement("i");
        d.innerHTML = a;
        g.title = d.textContent
    }

    function z(a) {
        l(n(a.target).href)
    }

    function A(a) {
        a = n(a.target);
        a.addEventListener("mouseout", B);
        q ?
            (x = a.href, e = setTimeout(l, q)) : l(a.href)
    }

    function C(a) {
        1 < a.which || a.metaKey || a.ctrlKey || (a.preventDefault(), y(n(a.target).href))
    }

    function B() {
        e ? (clearTimeout(e), e = !1) : !a.isPreloading || a.isPreloading && a.isWaitingForCompletion || (a.xhr.abort(), a.isPreloading = !1, a.isWaitingForCompletion = !1)
    }

    function D(b) {
        if (!(4 > a.xhr.readyState) && 0 != a.xhr.status) {
            a.timing.ready = +new Date - a.timing.start;
            b = a.xhr.responseText;
            var c = b.indexOf("<title"); - 1 < c && (a.title = b.substr(b.indexOf(">", c) + 1), a.title = a.title.substr(0, a.title.indexOf("</title")));
            c = b.indexOf("<body"); - 1 < c ? (a.body = b.substr(c), b = a.body.indexOf("</body"), -1 < b && (a.body = a.body.substr(0, b)), b = m(a.url), f[b] = {
                body: a.body,
                title: a.title,
                scrollY: b in f ? f[b].scrollY : 0
            }) : a.hasBody = !1;
            a.isWaitingForCompletion && (a.isWaitingForCompletion = !1, y(a.url))
        }
    }

    function r(a) {
        for (var c = g.getElementsByTagName("a"), d, f = h.protocol + "//" + h.host, e = c.length - 1; 0 <= e; e--) d = c[e], d.target || d.hasAttribute("download") || 0 != d.href.indexOf(f + "/") || -1 < d.href.indexOf("#") && m(d.href) == k || (s ? d.hasAttribute("data-no-instant") : !d.hasAttribute("data-instant")) || (t ? d.addEventListener("mousedown", z) : d.addEventListener("mouseover", A), d.addEventListener("click", C));
        if (!a) {
            a = g.getElementsByTagName("script");
            var l, e = 0;
            for (j = a.length; e < j; e++) c = a[e], c.hasAttribute("data-no-instant") || (d = g.createElement("script"), c.src && (d.src = c.src), c.innerHTML && (d.innerHTML = c.innerHTML), f = c.parentNode, l = c.nextSibling, f.removeChild(c), f.insertBefore(d, l))
        }
        v("change")
    }

    function l(b) {
        !t && "display" in a.timing && 100 > +new Date - (a.timing.start + a.timing.display) ||
            (e && (clearTimeout(e), e = !1), b || (b = x), a.isPreloading && b == a.url || a.isPreloading && a.isWaitingForCompletion || (a.isPreloading = !0, a.isWaitingForCompletion = !1, a.url = b, a.body = !1, a.hasBody = !0, a.timing = {}, a.timing.start = +new Date, a.xhr.open("GET", b), a.xhr.send()))
    }

    function y(b) {
        "display" in a.timing || (a.timing.display = +new Date - a.timing.start);
        if (e) a.url && a.url != b ? h.href = b : (l(b), a.isWaitingForCompletion = !0);
        else if (!a.isPreloading || a.isPreloading && a.isWaitingForCompletion) h.href = b;
        else if (a.hasBody)
            if (a.body) {
                f[k].scrollY =
                    pageYOffset;
                a.isPreloading = !1;
                a.isWaitingForCompletion = !1;
                w(a.title, a.body);
                b = a.url.indexOf("#");
                b = -1 < b && g.getElementById(a.url.substr(b + 1));
                var c = 0;
                if (a.url != h.href && b)
                    for (; b.offsetParent; b = b.offsetParent) c += b.offsetTop;
                scrollTo(0, c);
                history.pushState(null, null, a.url);
                k = m(h.href);
                r()
            } else a.isWaitingForCompletion = !0;
            else h.href = a.url
    }
    var k, x, e, f = {}, a = {}, s = !0,
        t, q, p = {
            change: []
        }, u = "pushState" in history;
    return {
        supported: u,
        init: function () {
            if (!u) v("change");
            else if (!k) {
                for (var b = 0; b < arguments.length; b++) {
                    var c =
                        arguments[b];
                    !0 === c ? s = !1 : "mousedown" == c ? t = !0 : "number" == typeof c && (q = c)
                }
                k = m(h.href);
                f[k] = {
                    body: g.body.outerHTML,
                    title: g.title,
                    scrollY: pageYOffset
                };
                a.xhr = new XMLHttpRequest;
                a.xhr.addEventListener("readystatechange", D);
                a.url = !1;
                a.body = !1;
                a.hasBody = !0;
                a.title = !1;
                a.isPreloading = !1;
                a.isWaitingForCompletion = !1;
                a.timing = {};
                r(!0);
                addEventListener("popstate", function () {
                    var a = m(h.href);
                    a != k && (a in f ? (f[k].scrollY = pageYOffset, k = a, w(f[a].title, f[a].body), scrollTo(0, f[a].scrollY), r()) : h.href = h.href)
                })
            }
        },
        on: function (a,
            c) {
            p[a].push(c)
        },
        debug: function () {
            return {
                currentLocationWithoutHash: k,
                p: a,
                pHistory: f,
                supported: u,
                useBlacklist: s
            }
        }
    }
}(document, location);
// Activate Preloadr
InstantClick.init(50);
if (debug == true) {
	console.log("Preloadr enabled!");
}
})();