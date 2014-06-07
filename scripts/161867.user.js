
// ==UserScript==
// @name             Mangaupdate Series Preview
// @namespace        http://userscripts.org/users/tommy
// @description      Show series preview on mangaupdate.com when mouseover 
// @include          http://www.mangaupdates.com/series.html*
// @include          http://www.mangaupdates.com/releases.html*
// @grant            none
// @version          1.0
// ==/UserScript==
(function () {
    function c(e, t) {
        var n = t || document;
        var r = e.substr(0, 1);
        switch (r) {
            case "#":
                return n.getElementById(e.substring(1));
                break;
            case ".":
                var i = n.getElementsByClassName(e.substring(1));
                if (!i.length) return 0;
                if (i.length == 1) return i[0];
                return i;
                break;
            case ">":
                var s = n.getElementsByName(e.substring(1));
                if (!s.length) return 0;
                if (s.length == 1) return s[0];
                return s;
                break;
            default:
                var o = [],
                    u = n.getElementsByTagName(e);
                if (u.length) {
                    u.length == 1 ? u = u[0] : 0;
                    return u
                } else {
                    var a = document.evaluate(".//" + e, n, null, 5, null);
                    var f;
                    while (f = a.iterateNext()) {
                        o.push(f)
                    }
                    o.length == 1 ? o = o[0] : o.length == 0 ? o = null : null;
                    return o
                }
        }
    }
    function h(e, t) {
        var n = 0,
            r = e.length;
        for (var i = e[0]; n < r && t.call(i, n, i) !== false; i = e[++n]) {}
    }
    function p(e, t, n) {
        if (e.addEventListener) {
            return e.addEventListener(t, n, false)
        }
    }
    function d(e, t, n) {
        if (e.removeEventListener) {
            return e.removeEventListener(t, n, false)
        }
    }
    function v(e) {
        if (!b) return;
        if (e.keyCode == 87) {
            s.scrollTop = s.scrollTop - 50;
            e.preventDefault()
        }
        if (e.keyCode == 83) {
            s.scrollTop = s.scrollTop + 50;
            e.preventDefault()
        }
        s.focus()
    }
    function m(e) {
        y.dimension.left = e.pageX;
        y.dimension.top = e.pageY;
        y.open(this);
        e.preventDefault()
    }
    function g(e) {
        if (!b) return;
        x()
    }
    function E() {
        if (!b) {
            return
        }
        var e = y.getCurrent();
        if (e == null) return;
        if (typeof e.image.ready != "undefined") {
            var t = setInterval(function () {
                if (b) {
                    if (e.image.ready) {
                        clearInterval(t);
                        t = null;
                        y.skin.onReady(S)
                    }
                } else {
                    clearInterval(t);
                    t = null
                }
            }, 10)
        }
    }
    function S() {
        if (!b && !y.gallery.length) {
            return
        }
        var t = function () {
            k(a, {
                visibility: "hidden",
                opacity: ""
            });
            var t = function () {
                s.focus()
            };
            k(e, "opacity", "0");
            k(e, "visibility", "visible");
            T(e, "opacity", 1, .35, t)
        };
        T(a, "opacity", 0, .2, t)
    }
    function x() {
        k(O.body, "visibility", "hidden");
        s.scrollTop = 0;
        y.removeContent();
        b = false
    }
    function T(e, t, n, r, i) {
        var s = t == "opacity",
            o = s ? y.setOpacity : function (e, n) {
                e.style[t] = "" + n + "px"
            };
        if (!r || r == 0) {
            o(e, n);
            if (i) {
                i()
            }
            return
        }
        var u = parseFloat(y.getStyle(e, t)) || 0;
        var a = n - u;
        if (a == 0) {
            if (i) {
                i()
            }
            return
        }
        r *= 1e3;
        var f = (new Date).getTime(),
            l = function (e) {
                return 1 + Math.pow(e - 1, 3)
            }, c = f + r,
            h;
        var p = setInterval(function () {
            h = (new Date).getTime();
            if (!b) {
                clearInterval(p);
                p = null;
                return
            }
            if (h >= c) {
                clearInterval(p);
                p = null;
                o(e, n);
                if (i) {
                    i()
                }
            } else {
                o(e, u + l((h - f) / r) * a)
            }
        }, 10)
    }
    function N(e, t, n, r) {
        T(e, "top", n, .35);
        T(e, "height", t, .35, r)
    }
    function C(e, t, n, r) {
        T(e, "left", n, .35);
        T(e, "width", t, .35, r)
    }
    function k(e, t, n) {
        if (typeof t == "object") {
            for (var r in t) {
                if (/top|left|right|height|width/i.test(r)) t[r] = "" + t[r] + "px";
                e.style[r] = t[r]
            }
        }
        if (/top|left|right|height|width/i.test(t)) n = "" + n + "px";
        e.style[t] = n
    }
    var e, t, n, r, i, s, o, u, a, f, l;
    var y = {};
    y.cache = {};
    y.dimension = {};
    y.gallery = [];
    y.current = -1;
    y.getCurrent = function () {
        return y.current > -1 ? y.gallery[y.current] : null
    };
    var b = false,
        w = false;
    y.open = function (e) {
        if (b) {
            return
        }
        y.skin.onOpen();
        b = true;
        if (w) {
            var t = setInterval(function (e) {
                if (!w) {
                    x();
                    y.open(e);
                    clearInterval(t);
                    t = null
                }
            }, e, 10);
            return
        }
        var n = y.makeGallery(e);
        y.gallery = n[0];
        y.current = n[1];
        var r = y.getCurrent();
        if (r == null) {
            return
        }
        if (y.gallery.length) y.skin.onLoad(E)
    };
    y.close = function () {
        if (!b) {
            return
        }
        x()
    };
    y.setOpacity = function (e, t) {
        var n = e.style;
        n.opacity = t == 1 ? "" : t
    };
    y.clearOpacity = function (e) {
        y.setOpacity(e, 1)
    };
    y.getStyle = function () {
        var e = document.defaultView && document.defaultView.getComputedStyle;
        return function (t, n) {
            var r;
            if (e) {
                var i = getComputedStyle(t, null);
                if (i) {
                    r = i[n]
                }
                if (n == "opacity" && r == "") {
                    r = "1"
                }
            } else {
                r = t.currentStyle[n]
            }
            return r
        }
    }();
    y.removeContent = function () {
        y.gallery = [];
        y.current = -1;
        h(c("#USO-img-container").children, function (e, t) {
            t.parentNode.removeChild(t)
        });
        h([i, o, u, f, s, l], function (e, t) {
            t.innerHTML = ""
        });
        h([O.body, t, e, a], function (e, t) {
            if (t && t.removeAttribute && t.hasAttribute("style")) t.removeAttribute("style")
        });
        n = null
    };
    y.makeGallery = function (e) {
        var t = [],
            n = -1;
        var r = y.getCache(e);
        obj = r ? r : y.getHTML(e, y.parse);
        y.addCache(e, obj);
        t = [obj];
        n = 0;
        return [t, n]
    };
    y.getCache = function (e) {
        var t = e[L];
        return t in y.cache && y.cache[t]
    };
    y.getHTML = function (e, t) {
        if (!w) {
            w = true
        }
        if (typeof e !== "string" && e.nodeName !== "a") {
            var n = e;
            for (; n.nodeName == "a"; n = n.parentNode) {
                if (n.nodeName == "a") e = n.href
            }
        }
        var r = new XMLHttpRequest,
            i;
        r.onload = function () {
            var e = document.createElement("div");
            e.innerHTML = r.responseText;
            i = e
        };
        r.open("GET", e, false);
        r.send(null);
        return t(i)
    };
    y.parse = function (e) {
        var t = {};
        t.image = {};
        t.image.src = function (e) {
            var t = c("center/img", e);
            if (t) return t.src;
            return "data:image/gif;base64,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"
        }(e);
        t.title = function (e) {
            return c(".tabletitle", e).textContent.trim()
        }(e);
        t.description = function (e) {
            var t = c('div[contains(@style,"justify")]', e);
            if (!t || t.innerHTML.indexOf("N/A") > -1) return "Sorry,description is unavailable...";
            return t.innerHTML
        }(e);
        t.genre = function (e) {
            var t = c('a[contains(@href,"genresearch")]', e);
            if (t && t.nodeType) {
                return t.textContent.trim()
            }
            if (t && t.length) {
                var n = [];
                for (var r = 0; r < t.length; ++r) {
                    n.push(t[r].textContent)
                }
                return n.join(", ").trim()
            }
            return "N/A"
        }(e);
        t.rate = function (e) {
            var t = c('div[contains(text(),"Average")]', e);
            if (!t) return "N/A";
            if (/Average:\s*([^\/]+)/i.exec(t.textContent)) {
                return RegExp.$1.trim()
            }
        }(e);
        t.scanlated = function (e) {
            var t = c('div/b[contains(text(),"Completely")]', e).parentNode.nextElementSibling;
            return t.textContent.trim()
        }(e);
        return t
    };
    y.init = function (e) {
        y.skin.init();
        h(c(e), function (e, t) {
            if (t.hasAttribute("title")) {
                t.removeAttribute("title")
            }
            p(t, "mouseover", m);
            p(t, "mouseout", g);
            p(window, "keydown", v)
        })
    };
    var L = "cacheKey",
        A = 1;
    y.addCache = function (e, t) {
        var n = e[L],
            r;
        if (typeof n == "undefined") {
            n = A++;
            e[L] = n
        }
        if (!t) return;
        y.cache[n] = t;
        if (w) w = false
    };
    y.appendHTML = function (e, t) {
        if (e.insertAdjacentHTML) {
            e.insertAdjacentHTML("beforeend", t)
        }
    };
    var O = {};
	O.markup = (function() {
		return ['<div id="USO-body">',
			'    <div id="USO-container">',
			'        <div id="USO-img-container"></div>',
			'        <div id="USO-detail">',
			'            <div id="title"></div>',
			'            <div id="description"></div>',
			'            <div id="genre">',
			'            <div id="genpro"></div>',
			'                <div id="genval"></div>',
			'            </div>',
			'            <div id="footer">',
			'                <div id="rate"></div>',
			'                <div id="scanlated"></div>',
			'            </div>',
			'        </div>',
			'    </div>',
			'    <div id="USO-loading">',
			'        <div id="USO-loading-inner">',
			'            <span>loading</span>',
			'        </div>',
			'    </div>',
			'</div>'].join('\n');
	})();

	O.style = (function() {
		return ['',
			'<style type="text/css">',
			'#USO-body {',
			'        width: 20px;',
			'        height: 10px;',
			'        background: #E2E7ED;',
			'        position: absolute;',
			'        display: none;',
			'        border: 1px solid black;',
			'}',
			'#USO-container {',
			'        position: relative;',
			'        visibility: hidden;',
			'        margin: 5px;',
			'        height: 190px;',
			'        color: #52667C;',
			'}',
			'#USO-img-container {',
			'        float: left;',
			'}',
			'#USO-detail {',
			'        float: right;',
			'        height: 190px;',
			'        width: auto',
			'}',
			'#title {',
			'        font-size: 12pt;',
			'        font-family: arial;',
			'        color: #51657C;',
			'        margin-bottom: 10px;',
			'        text-align: center;',
			'}',
			'#description {',
			'        font-size: 12px;',
			'        text-align: justify;',
			'        margin-bottom: 12px;',
			'        height: 35%;',
			'        overflow-x: hidden;',
			'        overflow-y: auto;',
			'}',
			'#genre {',
			'        text-align: justify;',
			'        width: inherit;',
			'        height: 20px;',
			'        font-size: 14px;',
			'}',
			'#genpro {',
			'        float:left;',
			'}',
			'#genval {',
			'        float: right;',
			'        height: 45pxpx;',
			'        width: 84%;',
			'        overflow: hidden;',
			'        text-align: left;',
			'}',
			'#footer {',
			'        position: absolute;',
			'        bottom: 0;',
			'        clear: both;',
			'        width: inherit;',
			'}',
			'#rate {',
			'        float: left;',
			'}',
			'#scanlated {',
			'	float: right;',
			'}',
			'#USO-loading {',
			'        height: 100%;',
			'        background: none repeat scroll 0 0 #232323',
			'        position: relative;',
			'        visibility: hidden;',
			'}',
			'#USO-loading-inner {',
			'        width: 100%;',
			'        top: 50%;',
			'        height: 24px;',
			'        margin-top: -12px;',
			'        line-height: 24px;',
			'        text-align: center;',
			'        font-size: 16px;',
			'        position: absolute;',
			'        color: #52667C;',
			'}',
			'#USO-loading-inner span {',
			'        background: url("data:image/gif;base64,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") no-repeat scroll 0 0 transparent;',
			'        display: inline-block;',
			'        padding-left: 34px;',
			'}',
			'#footer div {',
			'        font-size: 14px;',
			'}',
			'</style>'].join('\n');
	})()
	
    O.init = function () {
        y.appendHTML(document.body, O.markup);
        y.appendHTML(document.head, O.style);
        O.body = c("#USO-body");
        e = c("#USO-container");
        a = c("#USO-loading");
        t = c("#USO-detail");
        r = c("#USO-img-container");
        i = c("#title");
        s = c("#description");
        o = c("#genpro");
        u = c("#genval");
        f = c("#rate");
        l = c("#scanlated")
    };
    O.onOpen = function () {
        k(O.body, {
            top: y.dimension.top + 60,
            left: y.dimension.left + 175 + 15,
            display: "block",
            height: 80,
            width: 100,
            opacity: .8
        });
        k(a, "visibility", "visible")
    };
    O.onLoad = function (e) {
        var t = y.getCurrent();
        if (t == null) return;
        var n = "<span>",
            a = "</span>",
            c = new Image;
        c.id = "imageId";
        t.image.ready = false;
        c.src = t.image.src;
        c.onload = function () {
            var e = parseInt(c.naturalWidth * 190 / c.naturalHeight);
            t.image.height = 190;
            t.image.width = e > 135 ? 131 : e;
            t.image.ready = true;
            c.onload = null
        };
        r.appendChild(c);
        i.innerHTML = "<strong>" + t.title + "</strong>";
        s.innerHTML = n + t.description + a;
        o.innerHTML = "<strong>Genre: </strong>";
        u.innerHTML = n + t.genre + a;
        f.innerHTML = "<strong>Rate: </strong>" + n + t.rate + a;
        l.innerHTML = "<strong>Completely Scanlated?: </strong>" + n + t.scanlated + a;
        if (e) {
            e()
        }
    };
    O.onReady = function (e) {
        if (!b || !y.gallery.length) return;
        var r = y.getCurrent();
        n = c("#imageId");
        if (!n) return;
        n.height = r.image.height;
        n.width = r.image.width;
        k(t, {
            width: 450 - (5 * 3 + r.image.width),
            height: 190
        });
        var i = function () {
            T(O.body, "opacity", 1, .35, e)
        };
        N(O.body, 200, y.dimension.top);
        C(O.body, 450, y.dimension.left + 15, i)
    };
    y.skin = O;
    y.init('a[contains(@href,"series.html?id")]')
})()