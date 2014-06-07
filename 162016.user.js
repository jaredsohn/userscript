
// ==UserScript==
// @name           airliners.net large image viewer
// @namespace      http://userscripts.org/users/tommy
// @description    Large image viewer.show the largeest image when mouseover on airliners.net 
// @include        http://www.airliners.net/search/*
// @grant          none
// @version        1.0
// @license        2013+, you
// ==/UserScript==

(function () {
    
	function h(e) {
        var t = e.substr(0, 1);
        switch (t) {
            case "#":
                return document.getElementById(e.substring(1));
                break;
            case ".":
                var n = document.getElementsByClassName(e.substring(1));
                if (!n.length) return 0;
                if (n.length == 1) return n[0];
                return n;
                break;
            case ">":
                var r = document.getElementsByName(e.substring(1));
                if (!r.length) return 0;
                if (r.length == 1) return r[0];
                return r;
                break;
            default:
                var i = [],
                    s = document.getElementsByTagName(e);
                if (s.length) {
                    s.length == 1 ? s = s[0] : 0;
                    return s
                } else {
                    var o = document.evaluate(".//" + e, document, null, 5, null);
                    var u = o.iterateNext();
                    while (u) {
                        i.push(u);
                        u = o.iterateNext()
                    }
                    i.length == 1 ? i = i[0] : i.length == 0 ? i = 0 : null;
                    return i
                }
        }
    }
    function p(e, t, n) {
        if (e.addEventListener) {
            e.addEventListener(t, n, false)
        }
    }
    function d(e, t, n) {
        if (e.removeEventListener) {
            e.removeEventListener(t, n, false)
        }
    }
    function v(e, t) {
        var n = 0,
            r = e.length;
        for (var i = e[0]; n < r && t.call(i, n, i) !== false; i = e[++n]) {}
    }
    function m(e) {
        if (document.compatMode == '"CSS1Compat"') {
            return document.documentElement["client" + e]
        }
        return document.body["client" + e]
    }
    function g() {
        r.style.width = m("Width") + "px";
        r.style.height = m("Height") + "px"
    }
    function y() {
        r.style.top = document.documentElement.scrollTop + "px";
        r.style.left = document.documentElement.scrollLeft + "px"
    }
    function b(e) {
        return h("#" + e)
    }
    function w(e) {
        var t = u,
            n = t.naturalWidth,
            r = t.naturalHeight;
        var o = e.screenX - a.X;
        a.X += o;
        a.dataX = Math.max(Math.min(0, a.dataX + o), i.clientWidth - n);
        var f = e.screenY - a.Y;
        a.Y += f;
        a.dataY = Math.max(Math.min(0, a.dataY + f), s.clientHeight - r);
        t.style.top = a.dataY + "px";
        t.style.left = a.dataX + "px"
    }
    function E(e) {
        e.preventDefault();
        proxy.className = "grab";
        d(proxy, "mousemove", w);
        d(proxy, "mouseup", E)
    }
    function S() {
        t.skin.onClose();
        t.gallery = [];
        t.current = -1;
        n = false
    }
    function x(e) {
        if (e.keyCode == 27 && n) {
            S();
            e.preventDefault()
        }
    }
    function T(e, n, r, i, s) {
        var o = n == "opacity",
            u = o ? t.sOpct : function (e, t) {
                e.style[n] = "" + t + "px"
            };
        if (i == 0) {
            u(e, r);
            if (s) {
                s()
            }
            return
        }
        var a = parseFloat(t.GS(e, n)) || 0;
        var f = r - a;
        if (f == 0) {
            if (s) {
                s()
            }
            return
        }
        i *= 1e3;
        var l = (new Date).getTime(),
            c = function (e) {
                return 1 + Math.pow(e - 1, 3)
            }, h = l + i,
            p;
        var d = setInterval(function () {
            p = (new Date).getTime();
            if (p >= h) {
                clearInterval(d);
                d = null;
                u(e, r);
                if (s) {
                    s()
                }
            } else {
                u(e, a + c((p - l) / i) * f)
            }
        }, 5)
    }
    function N(e, t, n, r) {
        T(i, "top", t, n);
        T(s, "height", e, n, r)
    }
    function C(e, t, n, r) {
        T(i, "left", t, n);
        T(i, "width", e, n, r)
    }
    function k(e) {
        t.open(this);
        e.preventDefault()
    }
    function L() {
        a = {
            X: null,
            Y: null,
            dataX: 0,
            dataY: 0
        };
        return a
    }
    function A(e) {
        if (e.button == 0) {
            e.preventDefault();
            proxy.className = "grabbing";
            a.X = e.screenX;
            a.Y = e.screenY;
            p(proxy, "mousemove", w);
            p(proxy, "mouseup", E)
        }
    }
    function O() {
        var e = function () {
            var e = function () {
                l.style.visibility = "visible";
                u.style.opacity = 1
            };
            f.style.visibility = "hidden";
            body.insertBefore(u, body.firstChild);
            T(u, "opacity", .9, .5, e)
        };
        T(f, "opacity", 0, .35, e)
    }
    var e = {};
    var t = {};
    t.cache = {};
    t.skin = e;
    t.gallery = [];
    t.current = -1;
    var n = false;
    var r, i, s, o, u, a, f, l, c;
    e.markup = function () {
        return ["", 
		'<div id="container">',
		'    <div id="overlay"></div>',
		'    <div id="wrapper">',
		'        <div id="wrapper-inner">',
		'            <div id="body-inner">',
		'                <div id="proxy" class="grab"></div>',
		'                <div id="loading">',
		'                    <div id="loading-inner">',
		'                        <span>loading</span>',
		'                    </div>',
		'                </div>',
		'                <div id="toolkit">',
		'                    <div id="close">',
		'                    <a title="close" id="close-button"></a>',
		'                    </div>',
		'                </div>',
		'            </div>',
		'        </div>',
		'    </div>',
		'</div>'].join("\n")
    }();
    e.style = function () {
        return ['<style type="text/css">',
		"#container {",
		"		visibility: hidden;",
		"       position: fixed;",
		"		z-index: 1000;",
		"		display: none;",
		"		margin: 0;",
		"		padding: 0;",
		"		top: 0;",
		"		right: 0;",
		"		bottom: 0;",
		"		left: 0;", "}",
		"#overlay {",
		"		background: #000000;",
		"		opacity: 0.8;",
		"       position: relative;",
		"       width:100%;",
		"       height:100%;",
		"}", "#wrapper {",
		"       width: 300px;",
		"		position: absolute;",
		"       overflow: hidden;",
		"       border: 1px solid #303030",
		"}",
		"#wrapper-inner {",
		"       background: 1px solid #303030",
		"       position: relative;",
		"       overflow: hidden;",
		"       height: 175px;", "}",
		"#body-inner {",
		"       position:relative;",
		"       width: 100%;",
		"       height: 100%;",
		"       background: none repeat scroll 0 0 #060606;",
		"}", "#body-inner img {",
		"		position: absolute",
		"}",
		"#proxy {",
		"       position: absolute;",
		"       width: 100%;",
		"       height: 100%;",
		"       cursor: -moz-grab;",
		"}",
		"#toolkit {",
		"       position: absolute;",
		"       overflow: hidden;",
		"       margin: 0;",
		"       padding: 0;",
		"       top: 0;",
		"       right: 0;",
		"       visibility: hidden;",
		"}",
		"#close {",
		"       height: 16px;",
		"       float:  right;",
		"       padding: 2px 0;",
		"       width: 45%;", "}",
		"#close a {",
		"		cursor: pointer;",
		"       float: right;",
		"       display: block;",
		"       height: 16px;",
		"       width: 16px;",
		"       margin-left: 3px;",
		'       background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKFJREFUeNpi/P//PwMlgHHADWAAGYCGo4CYDYs4CMcCMTOyGLqCov8QsB2LIROgcovwGaAFxM+xGALT/A2IPfAZgM2Qybg04zIAZsir/wiAVTM+A0B4KZIBp4GYkxQDYM7+BcQfkLzDSYwB06AafkKdrYvkHQxD0DU3ommGiSMbshqfAXJAfBtHgOlC5SyRxbElZWYg/osj4WLIDXxmAggwAHTlHTWidTHeAAAAAElFTkSuQmCC");',
		"}",
		"#loading {",
		"       position: relative;",
		"       height: 100%;",
		"       background-color: #060606;",
		"}",
		"#loading-inner {",
		"       position: absolute;",
		"       width: 100%;",
		"       top: 50%;",
		"       font-size: 14px;",
		"       height: 24px;",
		"       line-height: 24px;",
		"       margin-top: -12px;",
		"       text-align:center;",
		"       color: #FFFFFF;,",
		"       font-weight: 200;",
		"}",
		"#loading-inner span{",
		"      display: inline-block;",
		"      padding-left: 34px;",
		'      background: url("data:image/gif;base64,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")  no-repeat scroll 0 0 transparent;',
		"}",
		".grab {",
		"      cursor: -moz-grab !important;",
		"	   cursor: -webkit-grab !important;",
		"	   cursor: move;", "}",
		".grabbing {",
		"      cursor: -moz-grabbing !important;",
		"	   cursor: -webkit-grabbing !important;",
		"	   cursor: move;",
		"}",
		"</style>"].join("\n");
    }();
    e.init = function () {
        document.body.insertAdjacentHTML("beforeend", e.markup);
        document.head.insertAdjacentHTML("beforeend", e.style);
        r = b("container");
        i = b("wrapper");
        s = b("wrapper-inner");
        body = b("body-inner");
        proxy = b("proxy");
        f = b("loading");
        o = b("close-button");
        l = b("toolkit");
        c = b("overlay")
    };
    e.onOpen = function () {
        r.style.display = "block";
        g();
        L();
        i.style.top = parseFloat((window.innerHeight - i.clientHeight) / 2) + "px";
        i.style.left = parseFloat((r.offsetWidth - i.clientWidth) / 2) + "px";
        p(window, "keydown", x);
        p(proxy, "mousedown", A);
        v([o, c], function (e, t) {
            p(t, "click", S)
        });
        r.style.opacity = 0;
        r.style.visibility = "visible";
        T(r, "opacity", .99, .35, function () {
            r.style.opacity = ""
        })
    };
    e.onClose = function () {
        d(proxy, "mousedown", A);
        d(window, "keydown", x);
        v([o, c], function (e, t) {
            d(t, "click", S)
        });
        v([r, i, s, f, l], function (e, t) {
            if (t.hasAttribute("style")) {
                t.removeAttribute("style")
            }
        });
        if (u && u.parentNode) {
            u.parentNode.removeChild(u)
        }
        if (u && typeof u.onload == "function") {
            u.onload = null
        }
        u = null
    };
    t.init = function (e) {
        t.skin.init();
        v(h(e), function (e, n) {
            if (n.localName != "a" && n.localName == "img") n = n.parentNode;
            if (n.hasAttribute("onmouseover")) n.removeAttribute("onmouseover");
            if (n.hasAttribute("onmouseout")) n.removeAttribute("onmouseout");
            t.aDc(n)
        })
    };
    var M = "cacheKey",
        _ = 1;
    t.aDc = function (e) {
        var n = e[M];
        if (n == undefined) {
            n = _++;
            e[M] = n;
            p(e, "mouseover", k);
        }
        t.cache[n] = t.mObj(e)
    };
    t.mObj = function (e) {
        var t = {
            id: "myImage",
            content: e.children[0].src.replace(/small/i, "photos")
        };
        return t
    };
    t.gCU = function () {
        return t.current > -1 ? t.gallery[t.current] : null
    };
    t.open = function (e) {
        if (n) return;
        var r = t.mGL(e);
        t.gallery = r[0];
        t.current = r[1];
        var i = t.gCU();
        if (i == null) {
            return
        }
        if (t.gallery.length) {
            n = true;
            return t.onload(i)
        }
    };
    t.mGL = function (e) {
        var n = [],
            r = -1;
        if (e.tagName) {
            var i = t.gtC(e);
            var s = i ? i : mObj(e)
        }
        n = [s];
        r = 0;
        return [n, r]
    };
    t.gtC = function (e) {
        var n = e[M];
        return n in t.cache && t.cache[n]
    };
    t.onload = function (e) {
        var n = new Image;
        n.src = e.content;
        n.id = e.id;
        n.onload = function () {
            n.height = n.naturalHeight;
            n.width = n.naturalWidth;
            u = n;
            u.style.opacity = 0;
            C(m("Width") - 10 * 2, 10, .45, O);
            N(window.innerHeight - 10 * 2, 10, .45)
        };
        t.skin.onOpen()
    };
    t.GS = function (e, t) {
        var n, r = document.defaultView && document.defaultView.getComputedStyle;
        if (r) {
            var i = getComputedStyle(e, null);
            if (i) {
                n = i[t]
            }
            if (t == "opacity" && n == "") {
                n = "1"
            }
        } else {
            n = e.currentStyle[t]
        }
        return n
    };
    t.sOpct = function (e, t) {
        e.style.opacity = t == 1 ? "" : t
    };
    t.cOpct = function (e) {
        t.sOpct(e, 1)
    };
	
    t.init('img[contains(@src,"small")]')
	
})()