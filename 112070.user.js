// ==UserScript==
// @name        Lyrics Here by Rob W
// @description Instant Lyrics for YouTube, Grooveshark, Spotify and many other sites. Multiple sources and a manual search form ensure that most lyrics are found. To configure this script, visit https://robwu.nl/lyricshere/
// @author      Rob W <gwnRob@gmail.com>
// @namespace   Rob W
// @version     3.9
// @website     https://userscripts.org/scripts/show/112070
// @updateURL   https://userscripts.org/scripts/source/112070.meta.js
// @downloadURL https://userscripts.org/scripts/source/112070.user.js
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @include     http://grooveshark.com/*
// @include     http://html5.grooveshark.com/*
// @include     http://retro.grooveshark.com/*
// @include     http://play.spotify.com/*
// @include     https://play.spotify.com/*
// @include     http://*.jango.com/*
// @include     https://*.jango.com/*
// @include     http://*.accuradio.com/*
// @include     https://*.accuradio.com/*
// @include     http://*.deezer.com/*
// @include     https://*.deezer.com/*
// @include     http://8tracks.com/*
// @include     https://8tracks.com/*
// @include     http://www.rdio.com/*
// @include     https://www.rdio.com/*
// @include     http://music.xbox.com/*
// @include     https://music.xbox.com/*
// @include     http://play.google.com/music/*
// @include     https://play.google.com/music/*
// @include     http://music.google.com/*
// @include     https://music.google.com/*
// @include     http://rob.lekensteyn.nl/youtubelyrics/*
// @include     https://rob.lekensteyn.nl/youtubelyrics/*
// @include     http://robwu.nl/youtubelyrics/*
// @include     https://robwu.nl/youtubelyrics/*
// @include     http://robwu.nl/lyricshere/*
// @include     https://robwu.nl/lyricshere/*
// @icon        https://robwu.nl/lyricshere/icons/32.png
// @run-at      document-start
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/**
 * (c) 2013 Rob W <gwnRob@gmail.com>
 * Website: https://robwu.nl/lyricshere/
 * 
 * Distributed under the MIT license (http://opensource.org/licenses/MIT)
 *
 * Milestones:
 *  4 sep 2011 - Initial release of version 1 and 2 branches
 *  8 jan 2013 - Public release of version 3 branch - new features and a modular codebase
 *  9 jan 2013 - Released Safari extension
 * 10 jan 2013 - Released Opera extension
 * 11 jan 2013 - Released Firefox add-on
 *  5 feb 2013 - Published Internet Explorer extension
 * 12 feb 2013 - Grooveshark support (13 Feb: added support for HTML5 and Retro Grooveshark)
 * 15 apr 2013 - Spotify support
 * 18 jul 2013 - Added support for Chromium-based Opera (15)
 *  2 aug 2013 - Jango support
 * 25 oct 2013 - AccuRadio support
 *  2 dec 2013 - Rename "YouTube Lyrics by Rob W" to "Lyrics Here by Rob W"
 * 27 dec 2013 - Started to code-sign Firefox add-on and Internet Explorer extension
 *  7 jan 2014 - IE extension submitted and approved in the Internet Explorer Gallery
 *  8 feb 2014 - Deezer support
 *  8 feb 2014 - 8tracks support
 * 28 feb 2014 - Rdio support
 * 21 apr 2014 - Xbox Music support
 * 26 apr 2014 - Google Music support
 * 
 * Websites:
 * - https://robwu.nl/lyricshere/
 * - http://userscripts.org/scripts/show/112070
 * - https://chrome.google.com/webstore/detail/lifkpflabnobkgbjpcmocmgcajlecbcp
 * - https://addons.mozilla.org/firefox/addon/youtube-lyrics-by-rob-w/
 * - https://addons.opera.com/en/extensions/details/youtube-lyrics-by-rob-w/
 * - http://www.iegallery.com/Addons/Details/16391
 * 
 * Contact:
 * - Rob W <gwnRob@gmail.com>
 * 
 * Distributed in the following forms:
 * - Chrome extension
 * - Firefox add-on
 * - Safari extension
 * - Opera extension
 * - Internet Explorer extension (32 and 64 bits)
 * - Hybrid userscript (Greasemonkey / NinjaKit / Tampermonkey / Opera)
 * 
 * A full list plus links to the distributed versions can be found at
 * https://robwu.nl/lyricshere/#get-extension
 *
 * Change log:
 * https://robwu.nl/lyricshere/CHANGELOG
 */
(function() {
    var e, t, r;
    (function(n) {
        function o(e, t) {
            return L.call(e, t);
        }
        function i(e, t) {
            var r, n, o, i, s, c, a, l, u, d, p = t && t.split("/"), h = v.map, m = h && h["*"] || {};
            if (e && "." === e.charAt(0)) if (t) {
                for (p = p.slice(0, p.length - 1), e = p.concat(e.split("/")), l = 0; e.length > l; l += 1) if (d = e[l], 
                "." === d) e.splice(l, 1), l -= 1; else if (".." === d) {
                    if (1 === l && (".." === e[2] || ".." === e[0])) break;
                    l > 0 && (e.splice(l - 1, 2), l -= 2);
                }
                e = e.join("/");
            } else 0 === e.indexOf("./") && (e = e.substring(2));
            if ((p || m) && h) {
                for (r = e.split("/"), l = r.length; l > 0; l -= 1) {
                    if (n = r.slice(0, l).join("/"), p) for (u = p.length; u > 0; u -= 1) if (o = h[p.slice(0, u).join("/")], 
                    o && (o = o[n])) {
                        i = o, s = l;
                        break;
                    }
                    if (i) break;
                    !c && m && m[n] && (c = m[n], a = l);
                }
                !i && c && (i = c, s = a), i && (r.splice(0, s, i), e = r.join("/"));
            }
            return e;
        }
        function s(e, t) {
            return function() {
                return h.apply(n, S.call(arguments, 0).concat([ e, t ]));
            };
        }
        function c(e) {
            return function(t) {
                return i(t, e);
            };
        }
        function a(e) {
            return function(t) {
                g[e] = t;
            };
        }
        function l(e) {
            if (o(y, e)) {
                var t = y[e];
                delete y[e], b[e] = !0, p.apply(n, t);
            }
            if (!o(g, e) && !o(b, e)) throw Error("No " + e);
            return g[e];
        }
        function u(e) {
            var t, r = e ? e.indexOf("!") : -1;
            return r > -1 && (t = e.substring(0, r), e = e.substring(r + 1, e.length)), [ t, e ];
        }
        function d(e) {
            return function() {
                return v && v.config && v.config[e] || {};
            };
        }
        var p, h, m, f, g = {}, y = {}, v = {}, b = {}, L = Object.prototype.hasOwnProperty, S = [].slice;
        m = function(e, t) {
            var r, n = u(e), o = n[0];
            return e = n[1], o && (o = i(o, t), r = l(o)), o ? e = r && r.normalize ? r.normalize(e, c(t)) : i(e, t) : (e = i(e, t), 
            n = u(e), o = n[0], e = n[1], o && (r = l(o))), {
                f: o ? o + "!" + e : e,
                n: e,
                pr: o,
                p: r
            };
        }, f = {
            require: function(e) {
                return s(e);
            },
            exports: function(e) {
                var t = g[e];
                return t !== void 0 ? t : g[e] = {};
            },
            module: function(e) {
                return {
                    id: e,
                    uri: "",
                    exports: g[e],
                    config: d(e)
                };
            }
        }, p = function(e, t, r, i) {
            var c, u, d, p, h, v, L = [];
            if (i = i || e, "function" == typeof r) {
                for (t = !t.length && r.length ? [ "require", "exports", "module" ] : t, h = 0; t.length > h; h += 1) if (p = m(t[h], i), 
                u = p.f, "require" === u) L[h] = f.require(e); else if ("exports" === u) L[h] = f.exports(e), 
                v = !0; else if ("module" === u) c = L[h] = f.module(e); else if (o(g, u) || o(y, u) || o(b, u)) L[h] = l(u); else {
                    if (!p.p) throw Error(e + " missing " + u);
                    p.p.load(p.n, s(i, !0), a(u), {}), L[h] = g[u];
                }
                d = r.apply(g[e], L), e && (c && c.exports !== n && c.exports !== g[e] ? g[e] = c.exports : d === n && v || (g[e] = d));
            } else e && (g[e] = r);
        }, e = t = h = function(e, t, r, o, i) {
            return "string" == typeof e ? f[e] ? f[e](t) : l(m(e, t).f) : (e.splice || (v = e, 
            t.splice ? (e = t, t = r, r = null) : e = n), t = t || function() {}, "function" == typeof r && (r = o, 
            o = i), o ? p(n, e, t, r) : setTimeout(function() {
                p(n, e, t, r);
            }, 15), h);
        }, h.config = function(e) {
            return v = e, h;
        }, r = function(e, t, r) {
            t.splice || (r = t, t = []), o(g, e) || o(y, e) || (y[e] = [ e, t, r ]);
        }, r.amd = {
            jQuery: !0
        };
    })(), r("config-greasemonkey", [], function() {
        var e = {};
        return e.getItem = function(e, t) {
            setTimeout(function() {
                var r = GM_getValue(e);
                "string" == typeof r && (r = JSON.parse(r)), t(r);
            }, 0);
        }, e.setItem = function(e, t, r) {
            t = JSON.stringify(t), setTimeout(function() {
                GM_setValue(e, t), r(!0);
            }, 0);
        }, e.removeItem = function(e, t) {
            setTimeout(function() {
                GM_deleteValue(e), t(!0);
            }, 0);
        }, e.clear = function(e) {
            setTimeout(function() {
                for (var t = GM_listValues(), r = 0; t.length > r; r++) GM_deleteValue(t[r]);
                e(!0);
            }, 0);
        }, e.init = function() {}, e;
    }), r("config-userscript", [], function() {
        var e = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, t = {}, r = "rwYTL.", n = "robw_ytl", o = "/robots.txt#lyrics-settings", i = [ "http://www.youtube.com", "https://www.youtube.com" ], s = i.concat("https://rob.lekensteyn.nl", "http://rob.lekensteyn.nl", "https://robwu.nl", "http://robwu.nl");
        return t.getItem = function(t, n) {
            var o = localStorage.getItem(r + t);
            if ("string" == typeof o) try {
                o = JSON.parse(o);
            } catch (i) {
                e("config.getItem error: " + i), o = void 0;
            }
            n(o);
        }, t.setItem = function(t, n, o) {
            var i = !1;
            try {
                localStorage.setItem(r + t, JSON.stringify(n)), i = !0;
            } catch (s) {
                e("config.setItem error: " + s);
            }
            o(i);
        }, t.removeItem = function(e, t) {
            localStorage.removeItem(r + e), t(!0);
        }, t.clear = function(e) {
            for (var t = [], n = localStorage.length - 1; n >= 0; --n) {
                var o = localStorage.key(n);
                o && 0 === o.indexOf(r) && t.push(o);
            }
            t.forEach(function(e) {
                localStorage.removeItem(e);
            }), e(!0);
        }, t.init = function() {
            function r() {
                return (location.protocol + "//" + location.host).toLowerCase();
            }
            function c() {
                return (location.pathname + location.hash).toLowerCase();
            }
            if (-1 !== i.indexOf(r()) && c() === o && (addEventListener("message", function(e) {
                if (-1 !== s.indexOf(e.origin) && "string" == typeof e.data) {
                    var r = e.data.match(/^(@(\D+)\d+)(getItem|setItem|removeItem|clear)(\[[\S\s]*\])$/);
                    if (r) {
                        var o = r[1], i = r[2];
                        if (n === i) {
                            var c = r[3], a = JSON.parse(r[4]);
                            a.push(function() {
                                var t = [].slice.call(arguments), r = o + "callback" + JSON.stringify(t);
                                e.source.postMessage(r, e.origin);
                            }), t[c].apply(t, a);
                        }
                    }
                }
            }, !0), parent.postMessage("Hello", "*")), -1 !== s.indexOf(r()) && c() !== o) {
                var a = {}, l = {}, u = {};
                i.forEach(function(e) {
                    u[e] = {
                        frame: null,
                        queue: [],
                        useless: null
                    };
                }), addEventListener("message", function(t) {
                    if (-1 !== s.indexOf(t.origin) && "string" == typeof t.data) if ("Hello" !== t.data) {
                        var r = t.data.match(/^(@(\D+)\d+)callback(\[[\S\s]*\])$/);
                        if (r) {
                            var o = r[1], i = r[2];
                            if (i === n) {
                                var c = JSON.parse(r[3]);
                                l[o] ? l[o](c) : e("Callback not found for ID " + o);
                            }
                        }
                    } else {
                        clearTimeout(a[t.origin]), u[t.origin].useless = !1;
                        for (var d; d = u[t.origin].queue.shift(); ) d(t.source);
                    }
                }, !0);
                var d = function(e, t, r, i) {
                    var s = "@" + n + (0 | 1e9 * Math.random()), c = s + t + JSON.stringify(r), d = u[e];
                    if (l[s] = function(e) {
                        delete l[s], i.apply(this, e);
                    }, null !== d.useless) d.useless ? l[s]([]) : d.frame.contentWindow.postMessage(c, e); else if (d.queue.push(function(t) {
                        t.postMessage(c, e);
                    }), !d.frame) {
                        d.frame = document.createElement("iframe"), d.frame.style.cssText = "border:0;margin:0;width:1px;height:1px;pointer-events: none;", 
                        d.frame.src = e + o;
                        var p = function() {
                            d.useless !== !1 && (d.useless = !0), d.frame.removeEventListener("error", p, !0), 
                            l[s] && l[s]([]);
                        };
                        d.frame.addEventListener("error", p, !0);
                        var h = function() {
                            d.frame.removeEventListener("load", h, !0), d.useless !== !1 && (a[e] = setTimeout(p, 2e3));
                        };
                        d.frame.addEventListener("load", h, !0), (document.body || document.documentElement).appendChild(d.frame);
                    }
                }, p = function(e, r) {
                    var n = t[e], o = "getItem" === e;
                    t[e] = function() {
                        var s = [].slice.call(arguments), c = s.pop(), a = o ? null : !0, l = 0, u = function(e) {
                            o ? (null === a || void 0 === a) && (a = e) : a = a && e, ++l === i.length && c(a);
                        };
                        n.apply(t, s.concat(u));
                        for (var p = 0; i.length > p; p++) {
                            var h = i[p];
                            h !== r && d(h, e, s, u);
                        }
                    };
                };
                -1 !== i.indexOf(r()) ? (p("setItem", r()), p("removeItem", r()), p("clear", r())) : (p("setItem"), 
                p("getItem"), p("removeItem"), p("clear"));
            }
        }, t;
    }), r("config", [ "config-greasemonkey", "config-userscript" ], function(e, t) {
        return "function" == typeof GM_getValue && "function" == typeof GM_setValue && "function" == typeof GM_listValues && (t = e), 
        t.init(), t;
    }), r("processRequest-greasemonkey", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            var t = e.url, r = {
                url: t,
                abort: function() {
                    o && o.abort();
                }
            }, o = GM_xmlhttpRequest({
                method: e.method || "GET",
                url: t,
                headers: e.headers,
                onload: function(i) {
                    var s = i.status, c = i.responseText;
                    r.abort = n, o = null, s >= 200 && 300 > s || 304 === s ? e.found({
                        url: t,
                        responseText: c
                    }) : e.fail({
                        url: t
                    });
                },
                onerror: function() {
                    r.abort = n, o = null, e.fail({
                        url: t
                    });
                },
                data: e.payload
            });
            o && e.afterSend(r);
        }
        var n = function() {};
        t.processRequest = r;
    }), r("processRequest-xhr", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            var t = e.url, r = new XMLHttpRequest(), i = {
                url: t,
                abort: function() {
                    r && (i.abort = o, r.abort(), r = null);
                }
            };
            if (r.open(e.method || "GET", t, !0), e.headers) for (var s = Object.keys(e.headers), c = 0; s.length > c; c++) {
                var a = s[c];
                if (n.call(e.headers, a)) {
                    var l = e.headers[a];
                    r.setRequestHeader(a, l);
                }
            }
            r.onload = function() {
                if (i.abort !== o) {
                    var n = r.status, s = r.responseText;
                    i.abort = o, r = null, n >= 200 && 300 > n || 304 === n ? e.found({
                        url: t,
                        responseText: s
                    }) : e.fail({
                        url: t
                    });
                }
            }, r.onerror = function() {
                i.abort !== o && (i.abort = o, r = null, e.fail({
                    url: t
                }));
            };
            try {
                r.send(e.payload);
            } catch (u) {
                "undefined" != typeof console && console && console.error && console.error(u.message), 
                e.fail({
                    url: t
                });
            }
            r && e.afterSend(i);
        }
        var n = Object.prototype.hasOwnProperty, o = function() {};
        t.processRequest = r;
    }), r("processRequest-cors", [ "require", "exports", "module", "processRequest-xhr" ], function(e, t) {
        function r(e) {
            return function(t) {
                t && t.url && (t.url = t.url.replace(i, "")), e(t);
            };
        }
        function n(e) {
            o({
                url: i + e.url,
                afterSend: r(e.afterSend),
                fail: r(e.fail),
                found: r(e.found),
                method: e.method,
                payload: e.payload,
                headers: e.headers
            });
        }
        var o = e("processRequest-xhr").processRequest, i = ("http:" === location.protocol ? "http" : "https") + "://cors-anywhere.herokuapp.com/";
        t.processRequest = n;
    }), r("processRequest", [ "processRequest-greasemonkey", "processRequest-cors" ], function(e, t) {
        return "function" == typeof GM_xmlhttpRequest ? e : t;
    }), r("ScrapedSource", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            return this instanceof r ? (this.parseOptions(e), this.validate(), void 0) : (n("ScrapedSource", "invalid_constructor_call", 'Constructor cannot be called as a function. Use "new ScrapedSource(options)" instead of "ScrapedSource(options)"'), 
            void 0);
        }
        var n = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        }, o = /^\$[A-Za-z]+$/, i = /\$\{([A-Za-z]+)\}|\$([A-Za-z]+)/g;
        r.Scheme = {
            identifier: "string",
            disabled: [ "undefined", "boolean" ],
            url_result: [ "string", "function" ],
            method_result: [ "undefined", "string" ],
            payload_result: [ "undefined", "string", "function" ],
            headers_result: [ "undefined", "object", "function" ],
            process_result: "function",
            url_search: [ "string", "function" ],
            method_search: [ "undefined", "string" ],
            payload_search: [ "undefined", "string", "function" ],
            headers_search: [ "undefined", "object", "function" ],
            process_search: "function"
        }, r.StrictScheme = !1, r.prototype.disabled = !1, r.prototype.validate = function() {
            var e = this;
            return Object.keys(this.constructor.Scheme).every(function(t) {
                return e.validateKey(t, e[t]);
            });
        }, r.prototype.validateKey = function(e, t) {
            if (!this.constructor || !this.constructor.Scheme) return n("ScrapedSource::validateKey", "scheme_not_found", 'The caller\'s constructor must have a property "Scheme"!'), 
            !1;
            var r = this.constructor.Scheme[e];
            if (!r) {
                if (!o.test(e)) return this.constructor.StrictScheme ? (n("ScrapedSource::validateKey", "unknown_key", "Unknown key " + e + ", forbidden by strict scheme!"), 
                !1) : !0;
                r = "function";
            }
            Array.isArray(r) || (r = [ r ]);
            var i = typeof t;
            return t && (t.test && t.exec ? i = "regexp" : Array.isArray(t) && (i = "array")), 
            -1 === r.indexOf(i) ? (n("ScrapedSource::validateKey", "type_mismatch", 'typeof "' + e + '" must be "' + r + '"! Actual type: "' + i + '"'), 
            !1) : !0;
        }, r.prototype.parseOptions = function(e) {
            if ("object" != typeof e) return n("ScrapedSource::parseOptions", "type_mismatch", "Argument options is required and must be an object!"), 
            !1;
            var t = this;
            return Object.keys(e).every(function(r) {
                var n = t.validateKey(r, e[r]);
                return n && (t[r] = e[r]), n;
            });
        }, r.prototype.get_url = function(e, t) {
            var r = this, o = r["url_" + e];
            return "function" == typeof o ? (o = o.call(r, t), "string" != typeof o && n("ScrapedSource::get_url", "type_mismatch", "url_" + e + " dit not return a string."), 
            o) : ("string" != typeof o && n("ScrapedSource::get_url", "type_mismatch", "url_" + e + " is not a string."), 
            r.expand_vars(o, t));
        }, r.prototype.expand_vars = function(e, t) {
            var r = this, o = !0;
            return e = e.replace(i, function(e, i, s) {
                return i = "$" + (i || s), "function" == typeof r[i] ? r[i](t) : (n("ScrapedSource::expand_vars", "invalid_parameter", "No function found for " + i), 
                o = !1, void 0);
            }), o ? e : null;
        }, r.prototype.getMethod = function(e) {
            var t = this["method_" + e];
            return "string" == typeof t ? t : null;
        }, r.prototype.getHeaders = function(e, t) {
            var r = this, n = r["headers_" + e];
            return "function" == typeof n && (n = n.call(r, t)), !n || "object" != typeof n || n instanceof Array ? null : n;
        }, r.prototype.getPayload = function(e, t) {
            var r = this, o = r["payload_" + e];
            if ("function" == typeof o && (o = o.call(r, t)), "string" != typeof o) return null;
            var s = !0;
            return o = o.replace(i, function(e, o, i) {
                return o = "$" + (o || i), "function" == typeof r[o] ? r[o](t) : (n("ScrapedSource::getPayload", "invalid_parameter", "No function found for " + o), 
                s = !1, void 0);
            }), s ? o : null;
        }, t.ScrapedSource = r;
    }), r("InfoProvider", [ "require", "exports", "module", "processRequest", "ScrapedSource" ], function(e, t) {
        function r(e) {
            this.parseSources(e);
        }
        var n = e("processRequest").processRequest, o = e("ScrapedSource").ScrapedSource, i = Object.prototype.hasOwnProperty, s = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        }, c = function(e, t) {
            if (t) {
                for (var r in t) i.call(t, r) && (e[r] = t[r]);
                return e;
            }
        }, a = function(e, t) {
            var r = [].slice.call(arguments, 2);
            return function() {
                return e.apply(t, r);
            };
        };
        r.prototype.parseSources = function(e) {
            if (!(e instanceof Array)) return s("InfoProvider::parseSources", "type_mismatch", "The only argument must be an array of ScrapedSource instances!"), 
            void 0;
            var t = [];
            e.forEach(function(e, r) {
                e instanceof o ? t.push(e) : s("InfoProvider::parseSources", "type_mismatch", "Source " + r + " is not a ScrapedSource instance!");
            }), this.sources = t, this.sourceCount = e.length;
        }, r.prototype.query = function(e, t, r, i) {
            function l(e, t) {
                return ++x > 7 ? (b(), s("InfoProvider::query:_processURL", "redirect_loop", "Too many redirects"), 
                void 0) : (e.redirSource && e.redirSource instanceof o && (h = e.redirSource, y.sourceIdentifier = h.identifier), 
                n({
                    url: e.redir,
                    afterSend: S,
                    fail: b,
                    found: function(e) {
                        e.tempData = t, u(e);
                    },
                    method: e.method,
                    payload: e.payload,
                    headers: e.headers
                }), void 0);
            }
            function u(e) {
                y.url = e.url, h.process_result(e.responseText, {
                    fail: b,
                    found: function(e) {
                        e.redir ? l(e, e.tempData) : L(e);
                    }
                }, {
                    url: e.url,
                    query: t,
                    tempData: e.tempData
                });
            }
            function d(e) {
                y.url = e.redir || e.url, h.process_search(e.responseText, {
                    fail: b,
                    found: l
                }, {
                    url: e.url,
                    query: t,
                    tempData: e.tempData
                });
            }
            var p = this;
            if (p.abort(), "function" != typeof r || !t || !e) return s("InfoProvider::query", "invalid_args", "Usage: function( String type, object query, function callback(result) )"), 
            void 0;
            i = +i || 0;
            var h = p.sources[i], m = !1, f = p.lastTimeAborted, g = c({}, t), y = {
                sourceIndex: i,
                sourceCount: p.sourceCount,
                sourceIdentifier: "<unknown>",
                searchTerms: t.searchTerms,
                url: "",
                retry: a(p.query, p, e, g, r, i),
                query: t,
                abort: null
            };
            p.sourceCount > i + 1 ? y.next = a(p.query, p, e, g, r, i + 1) : y.restart = a(p.query, p, e, g, r);
            var v = function(e, t, n) {
                if (!m && p.lastTimeAborted === f) {
                    m = n;
                    var o = {};
                    c(o, y), c(o, t), o.type = e, r(o);
                }
            }, b = function(e) {
                v("fail", e, !0);
            }, L = function(e) {
                v("found", e, !0);
            }, S = function(e) {
                p._abort = e.abort, v("fetching", e, !1);
            };
            if (!h) return b(), void 0;
            h.$SEARCHTERMS && (y.searchTerms = h.$SEARCHTERMS(t));
            var w = h.get_url(e, t);
            if (y.url = w, y.sourceIdentifier = h.identifier, !w) return b(), void 0;
            var x = 0;
            n({
                url: w,
                afterSend: S,
                fail: b,
                found: function(t) {
                    m || ("search" === e ? d(t) : u(t));
                },
                method: h.getMethod(e, t),
                payload: h.getPayload(e, t),
                headers: h.getHeaders(e, t)
            });
        }, r.prototype.lastTimeAborted = 0, r.prototype.abort = function() {
            this.lastTimeAborted++;
            var e = this._abort;
            e && (this._abort = null, e());
        }, t.InfoProvider = r;
    }), r("normalize_accents", [ "require", "exports", "module" ], function(e, t) {
        var r = Object.prototype.hasOwnProperty, n = {
            a: [ "ª", "à", "á", "â", "ã", "ä", "å", "ā", "ă", "ą", "ǎ", "ȁ", "ȃ", "ȧ", "ᵃ", "ḁ", "ẚ", "ạ", "ả", "ₐ", "ａ" ],
            A: [ "À", "Á", "Â", "Ã", "Ä", "Å", "Ā", "Ă", "Ą", "Ǎ", "Ȁ", "Ȃ", "Ȧ", "ᴬ", "Ḁ", "Ạ", "Ả", "Ａ" ],
            b: [ "ᵇ", "ḃ", "ḅ", "ḇ", "ｂ" ],
            B: [ "ᴮ", "Ḃ", "Ḅ", "Ḇ", "Ｂ" ],
            c: [ "ç", "ć", "ĉ", "ċ", "č", "ᶜ", "ⅽ", "ｃ" ],
            C: [ "Ç", "Ć", "Ĉ", "Ċ", "Č", "Ⅽ", "Ｃ" ],
            d: [ "ď", "ᵈ", "ḋ", "ḍ", "ḏ", "ḑ", "ḓ", "ⅾ", "ｄ" ],
            D: [ "Ď", "ᴰ", "Ḋ", "Ḍ", "Ḏ", "Ḑ", "Ḓ", "Ⅾ", "Ｄ" ],
            e: [ "è", "é", "ê", "ë", "ē", "ĕ", "ė", "ę", "ě", "ȅ", "ȇ", "ȩ", "ᵉ", "ḙ", "ḛ", "ẹ", "ẻ", "ẽ", "ₑ", "ｅ" ],
            E: [ "È", "É", "Ê", "Ë", "Ē", "Ĕ", "Ė", "Ę", "Ě", "Ȅ", "Ȇ", "Ȩ", "ᴱ", "Ḙ", "Ḛ", "Ẹ", "Ẻ", "Ẽ", "Ｅ" ],
            f: [ "ᶠ", "ḟ", "ｆ" ],
            F: [ "Ḟ", "℉", "Ｆ" ],
            g: [ "ĝ", "ğ", "ġ", "ģ", "ǧ", "ǵ", "ᵍ", "ḡ", "ｇ" ],
            G: [ "Ĝ", "Ğ", "Ġ", "Ģ", "Ǧ", "Ǵ", "ᴳ", "Ḡ", "Ｇ" ],
            h: [ "ĥ", "ȟ", "ʰ", "ḣ", "ḥ", "ḧ", "ḩ", "ḫ", "ẖ", "ℎ", "ｈ" ],
            H: [ "Ĥ", "Ȟ", "ᴴ", "Ḣ", "Ḥ", "Ḧ", "Ḩ", "Ḫ", "Ｈ" ],
            i: [ "ì", "í", "î", "ï", "ĩ", "ī", "ĭ", "į", "ǐ", "ȉ", "ȋ", "ᵢ", "ḭ", "ỉ", "ị", "ⁱ", "ｉ" ],
            I: [ "Ì", "Í", "Î", "Ï", "Ĩ", "Ī", "Ĭ", "Į", "İ", "Ǐ", "Ȉ", "Ȋ", "ᴵ", "Ḭ", "Ỉ", "Ị", "Ｉ" ],
            j: [ "ĵ", "ǰ", "ʲ", "ｊ" ],
            J: [ "Ĵ", "ᴶ", "Ｊ" ],
            k: [ "ķ", "ǩ", "ᵏ", "ḱ", "ḳ", "ḵ", "ｋ" ],
            K: [ "Ķ", "Ǩ", "ᴷ", "Ḱ", "Ḳ", "Ḵ", "K", "Ｋ" ],
            l: [ "ĺ", "ļ", "ľ", "ˡ", "ŀ", "ḷ", "ḻ", "ḽ", "ⅼ", "ｌ" ],
            L: [ "Ĺ", "Ļ", "Ľ", "ᴸ", "Ḷ", "Ḻ", "Ḽ", "Ⅼ", "Ｌ" ],
            m: [ "ᵐ", "ḿ", "ṁ", "ṃ", "ⅿ", "ｍ" ],
            M: [ "ᴹ", "Ḿ", "Ṁ", "Ṃ", "Ⅿ", "Ｍ" ],
            n: [ "ñ", "ń", "ņ", "ň", "ŉ", "ṅ", "ṇ", "ṉ", "ṋ", "ｎ" ],
            N: [ "Ñ", "Ń", "Ņ", "Ň", "ᴺ", "Ṅ", "Ṇ", "Ṉ", "Ṋ", "Ｎ" ],
            o: [ "º", "ò", "ó", "ô", "õ", "ö", "ō", "ŏ", "ő", "ǒ", "ǫ", "ȍ", "ȏ", "ȯ", "ᵒ", "ọ", "ỏ", "ｏ" ],
            O: [ "Ò", "Ó", "Ô", "Ö", "Õ", "Ō", "Ŏ", "Ő", "Ǒ", "Ǫ", "Ȍ", "Ȏ", "Ȯ", "ᴼ", "Ọ", "Ỏ", "Ｏ" ],
            p: [ "ᵖ", "ṕ", "ṗ", "ｐ" ],
            P: [ "ᴾ", "Ṕ", "Ṗ", "Ｐ" ],
            q: [ "ｑ" ],
            Q: [ "Ｑ" ],
            r: [ "ŕ", "ŗ", "ř", "ȑ", "ȓ", "ʳ", "ᵣ", "ṙ", "Ṛ", "ṛ", "ṟ", "ｒ" ],
            R: [ "Ŕ", "Ŗ", "Ř", "Ȑ", "Ȓ", "ᴿ", "Ṙ", "Ṟ", "Ｒ" ],
            s: [ "ś", "ŝ", "ş", "š", "ș", "ṡ", "ṣ", "ｓ" ],
            S: [ "Ś", "Ŝ", "Ş", "Š", "Ș", "Ṡ", "Ṣ", "Ｓ" ],
            t: [ "ţ", "ť", "ț", "ᵗ", "ṫ", "ṭ", "ṯ", "ṱ", "ẗ", "ｔ" ],
            T: [ "Ţ", "Ť", "Ț", "ᵀ", "Ṫ", "Ṭ", "Ṯ", "Ṱ", "Ｔ" ],
            u: [ "ù", "ú", "û", "ü", "ũ", "ū", "ŭ", "ů", "ű", "ư", "ǔ", "ȕ", "ȗ", "ᵘ", "ᵤ", "ṳ", "ṵ", "ṷ", "ụ", "ủ", "ｕ" ],
            U: [ "Ù", "Ú", "Ü", "Û", "Ũ", "Ū", "Ŭ", "Ů", "Ű", "Ų", "Ư", "Ǔ", "Ȕ", "Ȗ", "ᵁ", "Ṳ", "Ṵ", "Ṷ", "Ụ", "Ủ", "Ｕ" ],
            v: [ "ṽ", "ṿ", "ᵛ", "ᵥ", "ｖ" ],
            V: [ "Ṽ", "Ṿ", "ⱽ", "Ｖ" ],
            w: [ "ŵ", "ʷ", "ẁ", "ẃ", "ẅ", "ẇ", "ẉ", "ẘ", "ｗ" ],
            W: [ "Ŵ", "ᵂ", "Ẁ", "Ẃ", "Ẅ", "Ẇ", "Ẉ", "Ｗ" ],
            x: [ "ˣ", "ẋ", "ẍ", "ₓ", "ｘ" ],
            X: [ "Ẋ", "Ẍ", "Ｘ" ],
            y: [ "ý", "ÿ", "ŷ", "ȳ", "ʸ", "ẏ", "ẙ", "ỳ", "ỵ", "ỷ", "ỹ", "ｙ" ],
            Y: [ "Ý", "Ŷ", "Ÿ", "Ȳ", "Ẏ", "Ỳ", "Ỵ", "Ỷ", "Ỹ", "Ｙ" ],
            z: [ "ź", "ż", "ž", "ẑ", "ẓ", "ẕ", "ｚ" ],
            Z: [ "Ź", "Ż", "Ž", "Ẑ", "Ẓ", "Ẕ", "Ｚ" ]
        }, o = {}, i = "";
        for (var s in n) if (r.call(n, s)) for (var c = n[s], a = 0; c.length > a; a++) o[c[a]] = s, 
        i += c[a];
        i = RegExp("[" + i + "]", "gi"), t.normalize_accents = function(e) {
            return e ? e.replace(i, function(e) {
                return r.call(o, e) ? o[e] : e;
            }) : e;
        };
    }), r("SourceScraperUtils", [ "require", "exports", "module", "normalize_accents" ], function(e, t) {
        var r = e("normalize_accents").normalize_accents, n = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, o = {};
        o.toStringArray = function(e, t) {
            if (!e) return [];
            if (t || (t = {}), !t.isFirstChild && !(e = e.firstChild)) return [];
            var r = {};
            for (r.tags = t.tags || /^(?:[bui]|strong|em)$/i, r.flushBefore = t.flushBefore || /^br$/i, 
            r.flushAfter = t.flushAfter, r.lineAfterFlush = t.lineAfterFlush, r.isEndNode = t.isEndNode, 
            r.ignoreNode = t.ignoreNode, r.tmpLine = "", r.lines = [], i(e, r), r.tmpLine && r.lines.push(r.tmpLine.trim()); r.lines.length && !r.lines[0]; ) r.lines.shift();
            for (var n = r.lines.length; --n > 0 && !r.lines[n]; ) r.lines.pop();
            return r.lines;
        };
        var i = function(e, t) {
            if (e) do {
                if (t.isEndNode && t.isEndNode(e)) return;
                if (!t.ignoreNode || !t.ignoreNode(e)) if (3 === e.nodeType) t.tmpLine += e.nodeValue; else if (1 === e.nodeType) {
                    var r = e.tagName;
                    t.flushBefore && t.flushBefore.test(r) && (t.lines.push(t.tmpLine.trim()), t.tmpLine = ""), 
                    t.tags && t.tags.test(r) && i(e.firstChild, t), t.flushAfter && t.flushAfter.test(r) && (t.tmpLine && (t.lines.push(t.tmpLine.trim()), 
                    t.tmpLine = ""), t.lineAfterFlush && t.lineAfterFlush.test(r) && t.lines.push(""));
                }
            } while (e = e.nextSibling);
        };
        try {
            new DOMParser().parseFromString("", "text/html").body, o.toDOM = function(e) {
                return new DOMParser().parseFromString(e, "text/html");
            };
        } catch (s) {
            if (o.toDOM = function(e) {
                var t = document.implementation.createHTMLDocument("");
                return e && !/^\s+$/.test(e) && (t.open(), t.write(e + "</html>"), t.close()), t;
            }, window.opera) o.toDOM = function(e) {
                var t = document.implementation.createHTMLDocument("");
                return e = e.replace(/<img\s/gi, "<img src "), t.documentElement.innerHTML = e, 
                t;
            }; else try {
                if (!o.toDOM("<body><p></p></body>").querySelector("p")) return o.toDOM = function(e) {
                    var t = document.implementation.createHTMLDocument("");
                    return t.documentElement.innerHTML = e, t;
                }, void 0;
            } catch (s) {
                o.toDOM = function(e) {
                    var t = /<title\b[^>]*>([\S\s]+)<\/title/i.exec(e);
                    if (t) {
                        var r = document.createElement("div");
                        t = t[1].split(/<\/textarea/i)[0], r.innerHTML = "<textarea>" + t + "</textarea>", 
                        t = r.firstChild.value, r = null;
                    } else t = "";
                    e = e.replace(/^\s*<!doctype[^>]*>/i, ""), e = e.replace(/<(link|image)\b/gi, "$& href=data: "), 
                    e = e.replace(/<(img|script|style|video|audio|source|bgsound)\b/gi, "$& src=data: "), 
                    e = e.replace(/<\/?(object|applet)\b/gi, "$&dp"), e = e.replace(/<style\b/gi, "$& disabled "), 
                    e = e.replace(/\bo([Nn])/g, "&#111;$1").replace(/\bO([Nn])/g, "&#79;$1"), e = e.replace(/\b(style\s*=)/gi, "s$1");
                    var n;
                    e = e.replace(/<body\b/i, "<s tub></s>$&"), document.implementation.createHTMLDocument ? n = document.implementation.createHTMLDocument(t) : (n = document.createElement("html"), 
                    n.documentElement = n, n.getElementById = function(e) {
                        return n.querySelector("#" + ("" + e).replace(/\W/g, "\\$&"));
                    }, n.head = n.appendChild(document.createElement("head")), n.title = t, n.body = n.appendChild(document.createElement("body"))), 
                    n.body.innerHTML = e;
                    var o = n.body.querySelector("s[tub]");
                    if (o && o.parentNode === n.body) {
                        for (var i; (i = n.body.firstChild) != o; ) n.head.appendChild(i);
                        n.body.removeChild(o);
                    }
                    return n;
                };
            }
        }
        o.normalize_accents = r, o.search = {};
        var c = {};
        o.search.engines = c, o.search.isSearchURL = function(e) {
            for (var t in c) if (c[t].r_url.test(e)) return !0;
            return !1;
        }, o.search.get_url = function(e) {
            var t = c[e.engine] || c.bing;
            return t.get_url(e);
        }, o.search.getResultsFromResponse = function(e, t) {
            if (!e || "string" != typeof e) return [];
            var r;
            if (t && t.url) for (var o in c) if (c[o].r_url.test(t.url)) {
                r = c[o];
                break;
            }
            return r || (r = c.bing, n("SourceScraperUtils:search:getResultsFromResponse", "response_not_recognized", "Not recognized as a search result: " + (t && t.url))), 
            r.getResultsFromResponse(e);
        }, c.bing = {}, c.bing.r_url = /^https?:\/\/m\.bing\.com\//, c.bing.get_url = function(e) {
            var t = "http://m.bing.com/search?q=", r = e.query;
            return e.site && (r = "site:" + e.site + " " + r), t += encodeURIComponent(r);
        }, c.bing.getResultsFromResponse = function(e) {
            for (var t, r, o = [], i = /<a href="(\/ins\?[^"]*?&amp;url=([A-Za-z0-9+\/=_]+)&amp;[^"]+)/g; null !== (t = i.exec(e)); ) {
                var s = t[2];
                try {
                    for (var c = s.split("_"), a = 0; c.length > a; ++a) 0 === a ? r = "" : r += 1 === a ? "?" : "&", 
                    r += window.atob(c[a]);
                } catch (l) {
                    n("SourceScraperUtils:bing:getResultsFromResponse", "atob_error", "Failed to decode the URL, " + l), 
                    r = t[1].replace(/&amp;/g, "&");
                }
                o.push(r);
            }
            if (!o.length) {
                i = /<a href="(https?:[^"]+)/g;
                var u = e.indexOf('id="content"');
                for (u > 0 && (i.lastIndex = u); null !== (t = i.exec(e)); ) {
                    r = t[1], r = r.replace(/&amp;/g, "&");
                    try {
                        r = decodeURI(r);
                    } catch (l) {}
                    var d = r.split("/")[2];
                    /(?:bing|live|microsoft|microsofttranslator|msn)\.com$/.test(d) || o.push(r);
                }
            }
            return o;
        }, c.bing_www = {}, c.bing_www.r_url = /^https?:\/\/www\.bing\.com\//, c.bing_www.get_url = function(e) {
            var t = "http://www.bing.com/search?q=", r = e.query;
            return e.site && (r = "site:" + e.site + " " + r), t += encodeURIComponent(r);
        }, c.bing_www.getResultsFromResponse = c.bing.getResultsFromResponse, c.soso = {}, 
        c.soso.r_url = /^https?:\/\/www\.soso\.com\//, c.soso.get_url = function(e) {
            var t = "http://www.soso.com/q?w=", r = e.query;
            return e.site && (r = "site:" + e.site + " " + r), t += encodeURIComponent(r);
        }, c.soso.getResultsFromResponse = function(e) {
            var t = e.search(/<body\b/i);
            t > 0 && (e = e.substr(t));
            for (var r, n = /<h3 .*?<a [^>]*?\bhref="(https?:\/\/[^"]+)"/g, o = []; null !== (r = n.exec(e)); ) o.push(r[1]);
            return o;
        }, c.google = {}, c.google.r_url = /^https:\/\/encrypted\.google\.com\//, c.google.get_url = function(e) {
            var t = "https://encrypted.google.com/search?q=", r = e.query;
            return e.site && (r = "site:" + e.site + " " + r), t += encodeURIComponent(r);
        }, c.google.getResultsFromResponse = function(e) {
            for (var t, r = /<h3 class="r"><a href="(https?:\/\/[^"]+)"/g, n = []; null !== (t = r.exec(e)); ) n.push(t[1]);
            return n;
        }, t.SourceScraperUtils = o;
    }), r("LyricsSource", [ "require", "exports", "module", "ScrapedSource", "SourceScraperUtils" ], function(e, t) {
        function r(e) {
            e && n(e), s.call(this, e);
        }
        function n(e) {
            e.searchterms_site || (e.searchterms_site = e.identifier), !e.url_result && e.searchterms_result && (e.url_result = a.url_result), 
            !e.url_search && e.searchterms_search && (e.url_search = a.url_search), !e.process_result && e.process_result_selector && (e.process_result = a.process_result), 
            !e.process_search && e.r_url_result && (e.process_search = a.process_search);
        }
        function o(e, t) {
            return t && t.keepAccents || (e = c.normalize_accents(e)), e;
        }
        function i(e) {
            return e = e.replace(/["*:+@%$#()\[\]|]/g, " "), e = e.replace(/\s-([^\s])/g, " - $1"), 
            e = e.replace(/^[\s\-']+|[\s\-']+$/g, ""), e = e.replace(/\s+/g, " ");
        }
        var s = e("ScrapedSource").ScrapedSource, c = e("SourceScraperUtils").SourceScraperUtils;
        r.prototype = Object.create(s.prototype), r.prototype.constructor = r, r.Scheme = {
            identifier: "string",
            disabled: [ "undefined", "boolean" ],
            homepage: "string",
            description: [ "undefined", "string" ],
            searchengine: [ "undefined", "string" ],
            searchterms_site: [ "undefined", "string" ],
            searchterms_search: [ "undefined", "string" ],
            searchterms_result: [ "undefined", "string" ],
            r_url_result: [ "regexp" ],
            process_result_exclude_pattern: [ "undefined", "regexp" ],
            process_result_selector: [ "undefined", "string", "array" ],
            process_result_scraper_options: [ "undefined", "object" ],
            process_result_fallback: [ "undefined", "function" ],
            process_result_get_title: [ "undefined", "function" ],
            process_result_replace_url: [ "undefined", "array" ],
            process_search_replace_url: [ "undefined", "array" ],
            url_result: [ "string", "function" ],
            method_result: [ "undefined", "string" ],
            payload_result: [ "undefined", "string", "function" ],
            headers_result: [ "undefined", "object", "function" ],
            process_result: "function",
            url_search: [ "string", "function" ],
            method_search: [ "undefined", "string" ],
            payload_search: [ "undefined", "string", "function" ],
            headers_search: [ "undefined", "object", "function" ],
            process_search: "function"
        }, r.prototype.handleSearch = function(e, t) {
            return this.process_lyrics(e, t);
        };
        var a = {};
        a.url_result = function(e) {
            return c.search.get_url({
                engine: this.searchengine,
                site: this.searchterms_site,
                query: this.expand_vars(this.searchterms_result, e)
            });
        }, a.url_search = function(e) {
            return c.search.get_url({
                engine: this.searchengine,
                site: this.searchterms_site,
                query: this.expand_vars(this.searchterms_search, e)
            });
        }, a.process_result = function(e, t, r) {
            if (c.search.isSearchURL(r.url)) return this.process_search(e, t, r);
            if (this.process_result_exclude_pattern && this.process_result_exclude_pattern.test(e)) return t.fail(), 
            void 0;
            var n, o = c.toDOM(e), i = this.process_result_selector;
            if (Array.isArray(i)) for (var s = 0; !n && i.length > s; ++s) n = o.querySelector(i[s]); else n = o.querySelector(i);
            var a = c.toStringArray(n, this.process_result_scraper_options);
            if (a.length) {
                var l;
                if (this.process_result_get_title) {
                    if (l = this.process_result_get_title(o), !l) return t.fail(), void 0;
                } else l = o.title.replace(/\s+Lyrics\s*$/i, "");
                var u = {
                    lyrics: a,
                    title: l
                }, d = this.process_result_replace_url;
                if (d) {
                    for (var p = r.url, h = 0; d.length > h; h += 2) p = p.replace(d[h], d[h + 1]);
                    u.url = p;
                }
                t.found(u);
            } else this.process_result_fallback ? this.process_result_fallback(o, t, r) : t.fail();
        }, a.process_search = function(e, t, r) {
            for (var n = c.search.getResultsFromResponse(e, r), o = 0; n.length > o; ++o) {
                var i = n[o];
                if (this.r_url_result.test(i)) {
                    var s = this.process_search_replace_url;
                    if (s) for (var a = 0; s.length > a; a += 2) i = i.replace(s[a], s[a + 1]);
                    return t.found({
                        redir: i
                    }), void 0;
                }
            }
            t.fail();
        }, r.prototype.$ARTIST$SONG = function(e, t) {
            return e += "", e = e.replace(/\([^)]*\)/g, ""), e = e.replace(/\[[^\]]*\]/g, ""), 
            e = o(e, t), e = i(e);
        }, r.prototype.$ARTIST = function(e, t) {
            return this.$ARTIST$SONG(e.artist + "", t);
        }, r.prototype.$SONG = function(e, t) {
            return this.$ARTIST$SONG(e.song + "", t);
        }, r.prototype.$SEARCHTERMS = function(e, t) {
            if (e.artist && e.song) return i(e.artist + " - " + e.song);
            if (!e.videotitle && e.searchTerms) return e.searchTerms;
            var r = e.videotitle + "";
            return r = r.replace(/\([^)]*\)/g, " "), r = r.replace(/\[[^\]]*\]/g, " "), r = r.replace(/\b(ft|feat)\b[^\-]+/i, ""), 
            r = r.replace(/\bhd\b/i, ""), r = r.replace(/(?:w.(?:th)? ?)?((?:on)?.?screen ?)?lyrics?/i, ""), 
            r = r.replace(/\b(?:(?:piano|guitar|drum|acoustic|instrument(?:al)?) ?)?cover( by [^ )\]]+)?/i, ""), 
            r = r.replace(/\b(?:recorded )?live (?:at|@|on).+$/i, ""), r = r.replace(/\b\d{1,2}[\-.\/]\d{1,2}[\-.\/](?:(?:1[789]|20)\d{2}|\d{2})\b/, ""), 
            r = r.replace(/[(\[][^\])]*(?:20|19)\d{2}[^\])]*[)\]]/, ""), r = r.replace(/\b1[789]\d{2}|20\d{2}\b/, ""), 
            r = r.replace(/\bYouTube\b/gi, ""), r = r.replace(/\bre.?uploaded\b/i, ""), r = r.replace(/\bhigh[\- ]?quality\b/i, ""), 
            r = r.replace(/\boffici?al\b/i, ""), r = r.replace(/\b(minecraft|rsmv|mmv|(?:(?:naruto|bleach|avatar|toradora|final ?fantasy ?\d{0,2})[^a-z0-9]+)?amv)/i, ""), 
            r = r.replace(/\b(?:full )?music\b/gi, ""), r = r.replace(/\bdemo\b/i, ""), r = r.replace(/\bfan(?:[\- ]?(?:video|made))?\b/i, ""), 
            r = r.replace(/\b(videos?|audio|acoustic)/gi, ""), r = r.replace(/\b(on ?)?iTunes\b/i, ""), 
            r = r.replace(/(^|[^a-z0-9])(?:240|360|480)p\b/i, ""), r = r.replace(/\.(3gp?[2p]|as[fx]|avi|flv|m[4o]v|mpe?g?[34]|rm|webm|wmv)\s*$/i, ""), 
            r = o(r, t), r = r.replace(/(?:^|\s)([^a-z0-9 ])(\1+)(?=\s|$)/gi, " "), r = i(r);
        }, r.prototype.$encSEARCHTERMS = function(e, t) {
            return encodeURIComponent(this.$SEARCHTERMS(e), t);
        }, t.LyricsSource = r;
    }), r("sources/shared", {
        lyricsSources: []
    }), r("MultiLyricsSource", [ "require", "exports", "module", "LyricsSource", "sources/shared" ], function(e, t) {
        function r(e) {
            e && n(e), o.call(this, e);
        }
        function n(e) {
            !e.url_result && e.url_search && (e.url_result = e.url_search), !e.process_result && e.process_search && (e.process_result = e.process_search);
        }
        var o = e("LyricsSource").LyricsSource, i = e("sources/shared");
        r.prototype = Object.create(o.prototype), r.prototype.constructor = r, r.Scheme = {
            identifier: "string",
            disabled: [ "undefined", "boolean" ],
            homepage: "string",
            description: [ "undefined", "string" ],
            url_result: [ "undefined", "string", "function" ],
            process_result: [ "undefined", "function" ],
            url_search: [ "string", "function" ],
            process_search: [ "undefined", "function" ],
            getSources: [ "undefined", "function" ],
            getResultsFromResponse: "function"
        }, r.prototype.r_url_result = /$./, r.prototype.process_result = r.prototype.process_search = function(e, t) {
            for (var r = this.getSources(), n = this.getResultsFromResponse(e), o = n.length, i = 0; r.length > i; ++i) {
                var s = r[i];
                if (s.disabled) for (var c = s.r_url_result, a = 0; o > a; ++a) {
                    var l = n[a];
                    if (c.test(l)) return t.found({
                        redir: l,
                        redirSource: s
                    }), void 0;
                }
            }
            t.fail();
        }, r.prototype.getSources = function() {
            var e = i.lyricsSources;
            return e.length || console && console.log("Used MultiLyricsSource::getSources before shared.lyricsSources was ready!"), 
            e;
        }, t.MultiLyricsSource = r;
    }), r("sources/lyrics.wikia.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !1,
            identifier: "lyrics.wikia.com",
            homepage: "http://lyrics.wikia.com/",
            description: "The biggest lyrics database, containing millions of lyrics in several languages.",
            searchterms_search: '"This song is performed by" $SEARCHTERMS',
            r_url_result: /^https?:\/\/lyrics\.wikia\.com\/(?!(?:Category|User|Help|File|MediaWiki|LyricWiki)(?:_Talk)?:|(?:Talk|User_blog|Top_10_list):)[^:]+:./i,
            url_result: "http://lyrics.wikia.com/$ARTIST:$SONG",
            process_result_selector: ".lyricbox",
            process_result_fallback: function(e, t) {
                var r = e.querySelector(".redirectText a[href]");
                return r && (r = r.getAttribute("href") || "", "/" === r.charAt(0) && (r = "http://lyrics.wikia.com" + r), 
                r) ? (t.found({
                    redir: r
                }), void 0) : (t.fail(), void 0);
            },
            process_result_get_title: function(e) {
                var t = e.title.split(" Lyrics - Lyric Wiki")[0].replace(":", " - ");
                return t = t.replace(/^(Gracenote|LyricFind):/, "");
            },
            $ARTIST$SONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, e = r.prototype.$ARTIST$SONG.call(this, e, t), 
                e = e.replace(/ /g, "_"), e = e.replace(/^_+|_+$/g, ""), e = e.replace(/(_|^)(.)/g, function(e, t, r) {
                    return t + r.toUpperCase();
                });
            },
            $ARTIST: function(e, t) {
                var n = r.prototype.$ARTIST.call(this, e, t);
                return /^(Category|User|Help|File|Special|Talk)$/i.test(n) && (n += "_(Artist)"), 
                n;
            }
        });
    }), r("sources/multi/bing.com", [ "require", "exports", "module", "MultiLyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("MultiLyricsSource").MultiLyricsSource, n = e("SourceScraperUtils").SourceScraperUtils.search.engines.bing;
        t.source = new r({
            disabled: !1,
            identifier: "bing.com",
            homepage: "http://www.bing.com/",
            description: "Search in all known lyrics sites at once.\nIt is recommended to put this source near the top of the list.\nOnly disabled sources are used in the search query.",
            url_search: function(e) {
                var t = this.getSources();
                if (!t.length) return "";
                for (var r = "/search?q=" + encodeURIComponent(this.$SEARCHTERMS(e) + " (site:" + t[0].searchterms_site), n = 1; t.length > n; ++n) {
                    var o = encodeURIComponent(" OR site:" + t[n].searchterms_site);
                    if (o.length + r.length >= 2047) break;
                    r += o;
                }
                return r += ")", r = "http://www.bing.com" + r;
            },
            getResultsFromResponse: n.getResultsFromResponse
        });
    }), r("sources/lyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils;
        t.source = new r({
            disabled: !1,
            identifier: "lyrics.com",
            homepage: "http://www.lyrics.com/",
            description: "Millions of lyrics in several languages.",
            r_url_result: /^https?:\/\/www\.lyrics\.com\/.+-lyrics-.+\.html$/i,
            url_result: "http://www.lyrics.com/$SONG-lyrics-$ARTIST.html",
            method_search: "POST",
            headers_search: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            payload_search: "what=all&keyword=$encSEARCHTERMS",
            url_search: "http://www.lyrics.com/search.php?what=all&keyword=$encSEARCHTERMS",
            process_result_exclude_pattern: />Submit Lyrics</,
            process_result_selector: "#lyrics,#lyric_space",
            process_result_scraper_options: {
                tags: /^(?:[buiap]|div|strong|em)$/i,
                flushBefore: /^(p|br|div)$/i,
                flushAfter: /^(p|br|div)$/i
            },
            process_search: function(e, t) {
                var r = n.toDOM(e), o = r.querySelector('a[href^="/"][href*="-lyrics-"][href$=".html"].lyrics_preview'), i = o && o.getAttribute("href");
                i ? (i = "http://www.lyrics.com" + i, t.found({
                    redir: i
                })) : t.fail();
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/[^a-z0-9\- ]/g, ""), 
                e = e.replace(/ /g, "-"), e = e.replace(/-{2,}/, "-"), e = e.replace(/^-|-$/, "");
            }
        });
    }), r("sources/metrolyrics.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !1,
            identifier: "metrolyrics.com",
            homepage: "http://www.metrolyrics.com/",
            description: "Millions of lyrics in several languages.",
            url_result: "http://m.metrolyrics.com/$SONG-lyrics-$ARTIST.html",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/(?:m|www)\.metrolyrics\.com\/[a-z0-9\-]+-lyrics-[a-z0-9\-]+\.html$/,
            process_result_exclude_pattern: /Looks like we don.t have the lyrics just yet|Unfortunately, we don.t/,
            process_result_selector: [ "#lyrics-body-text", ".lyrics-body,.lyricsbody,.gnlyricsbody" ],
            process_result_scraper_options: {
                tags: /^(?:[buip]|strong|em)$/i,
                flushBefore: /^(br|p)$/i,
                flushAfter: /^p$/i
            },
            process_result_get_title: function(e) {
                return e.title.replace(/ Lyrics(?:\s*\| MetroLyrics)?\s*$/i, "");
            },
            process_result_replace_url: [ /^(https?:\/\/)m\./, "$1www." ],
            process_search_replace_url: [ /^(https?:\/\/)www\./, "$1m." ],
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/[^a-z0-9+\- ]/g, ""), e = e.replace(/[\- ]+/g, "-"), e = e.replace(/^-+|-+$/g, "");
            }
        });
    }), r("sources/lyricsmania.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "lyricsmania.com",
            homepage: "http://www.lyricsmania.com/",
            description: "Millions of English, French, German, Spanish and Italian lyrics (and others).",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyricsmania\.com\/(?!.*_(?:traduzione|ubersetzung|traduction|traduccion|traducao)_lyrics).+_lyrics_.+\.html$/i,
            url_result: "http://www.lyricsmania.com/$SONG_lyrics_$ARTIST.html",
            process_result_selector: ".lyrics-body, .discography > .col-left",
            process_result_scraper_options: {
                ignoreNode: function(e) {
                    return 3 === e.nodeType ? !/^Lyrics to /.test(e.nodeValue) : void 0;
                }
            },
            process_result_get_title: function(e) {
                var t = /^(.+ - .+) Lyrics$/.exec(e.title);
                return t ? t[1] : (t = /^(.*?) \(([^)]*)\) lyrics /.exec(e.title), t ? t[2] + " - " + t[1] : void 0);
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/&/g, "and"), 
                e = e.replace("[ost]", "_soundtrack_"), e = e.replace(/[ \/]/g, "_"), e = e.replace(/[^a-z0-9!,_\-@*:$°]/g, "");
            }
        });
    }), r("sources/azlyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils;
        t.source = new r({
            disabled: !1,
            identifier: "azlyrics.com",
            homepage: "http://www.azlyrics.com/",
            description: "Hundred thousands of mostly English lyrics.",
            r_url_result: /^https?:\/\/www\.azlyrics\.com\/lyrics\/[^\/]+\/[^\/]+\.html$/i,
            url_result: "http://www.azlyrics.com/lyrics/$ARTIST/$SONG.html",
            method_search: "GET",
            url_search: "http://search.azlyrics.com/search.php?q=$encSEARCHTERMS",
            process_result_selector: 'div[style="margin-left:10px;margin-right:10px;"]',
            process_result_get_title: function(e) {
                var t = e.title.split("LYRICS -");
                return t[0] = t[0].replace(/([A-Z])(\S*)/g, function(e, t, r) {
                    return t.toUpperCase() + r.toLowerCase();
                }), t = t.join("-");
            },
            process_search: function(e, t) {
                var r = n.toDOM(e), o = r.querySelector('a[href^="http://www.azlyrics.com/lyrics/"]');
                o ? t.found({
                    redir: o.href
                }) : t.fail();
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/^(the|an?) /, ""), e = e.replace(/[^a-z0-9]/g, "");
            },
            $SEARCHTERMS: function(e, t) {
                var n = r.prototype.$SEARCHTERMS.call(this, e, t);
                return e.videotitle && (n = n.replace(/\s+-\s+/g, " ")), n;
            }
        });
    }), r("sources/lyricstime.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !1,
            identifier: "lyricstime.com",
            homepage: "http://www.lyricstime.com/",
            description: "Millions of lyrics in several languages.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyricstime\.com\/.+-lyrics\.html$/i,
            url_result: "http://www.lyricstime.com/$ARTIST-$SONG-lyrics.html",
            process_result_selector: "#songlyrics > p",
            $ARTIST$SONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, e = r.prototype.$ARTIST$SONG.call(this, e, t), 
                e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), e = e.replace(/[^a-z0-9]/g, "-"), 
                e = e.replace(/-{2,}/g, "-"), e = e.replace(/^-+|-+$/g, "");
            }
        });
    }), r("sources/stlyrics.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !1,
            identifier: "stlyrics.com",
            homepage: "http://www.stlyrics.com/",
            description: "OST (original sound track) lyrics (movies, games, musicals, etc.) and (popular) song lyrics.",
            searchterms_result: "$SONG Lyrics by $ARTIST",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.stlyrics\.com\/(songs\/[^\/]+|lyrics)\/[^\/]+\/.+/i,
            process_result_selector: '[src*="ringup_song.js"] + br',
            process_result_scraper_options: {
                isFirstChild: !0,
                isEndNode: function(e) {
                    return 8 === e.nodeType ? /Lyrics End/.test(e.nodeValue) : void 0;
                }
            },
            process_result_get_title: function(e) {
                var t = e.title;
                if (!/\([^)]*translation|^TRANSLATION:/i.test(t)) return t = /^(.+?) Lyrics — (.+?) \|/.exec(t), 
                t ? t[2] + " - " + t[1] : void 0;
            }
        });
    }), r("sources/lyricsmode.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !1,
            identifier: "lyricsmode.com",
            homepage: "http://www.lyricsmode.com/",
            description: "Millions of lyrics in many languages.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyricsmode\.com\/lyrics\/(.)\/\1[^\/]+\/.+\.html$/i,
            url_result: "http://www.lyricsmode.com/lyrics/$ARTISTFIRSTLETTER/$ARTIST/$SONG.html",
            process_result_selector: "#lyrics_text",
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/[ \-]/g, "_"), 
                e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), e = e.replace(/[^a-z0-9_\-]/g, ""), 
                e = e.replace(/_{2,}/g, "_"), e = e.replace(/^_+|_+$/g, "");
            },
            $ARTISTFIRSTLETTER: function(e) {
                return this.$ARTIST(e).charAt(0);
            }
        });
    }), r("sources/magistrix.de", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "magistrix.de",
            homepage: "http://magistrix.de/lyrics/",
            description: "German source with hundred thousands of lyrics (German, English and others).",
            searchterms_site: "magistrix.de/lyrics",
            searchterms_result: "SONGTEXT $ARTIST $SONG",
            searchterms_search: "SONGTEXT $SEARCHTERMS",
            r_url_result: /^http:\/\/www\.magistrix\.de\/lyrics\/[^\/]+\/(?!.*\bUebersetzung-d+\.html$)[^\/]+-\d+\.html/i,
            process_result_selector: '.lyric-content > div[itemprop="text"]',
            process_result_scraper_options: {
                tags: /^([buip]|strong|em)$/i,
                flushBefore: /^(br|p)$/i,
                flushAfter: /^p$/i
            },
            process_result_get_title: function(e) {
                var t = e.title.replace(/\s+| Magistrix\.de$/, ""), r = t.split(" Lyrics von ");
                return 2 === r.length ? r[2] + " - " + r[1] : t.replace(/\s+Lyrics$/, "");
            }
        });
    }), r("sources/leoslyrics.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "leoslyrics.com",
            homepage: "http://www.leoslyrics.com/",
            description: "Hundred thousands of lyrics in many languages, popular among Idian users.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.leoslyrics\.com\/[^\/]+\/.+-lyrics\/?$/i,
            url_result: "http://www.leoslyrics.com/$ARTIST/$SONG-lyrics/",
            process_result_selector: ".song > div",
            process_result_get_title: function(e) {
                var t = e.querySelector(".title-header h2 + ul > li a");
                t = t && t.textContent.replace(/\s*Lyrics\s*$/i, "").trim();
                var r = e.querySelector(".title-header h2");
                r = r && r.textContent.replace(/\s*Lyrics\s*$/i, "").trim();
                var n = t && r ? t + " - " + r : e.title.replace(/\sLYRICS$/i, "");
                return n;
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/[.' +]/g, "-"), 
                e = e.replace(/[^a-z0-9!\-]/g, ""), e = e.replace(/-{2,}/g, "-");
            }
        });
    }), r("sources/vagalume.com.br", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "vagalume.com.br",
            homepage: "http://www.vagalume.com.br/",
            description: "Brazilian site providing millions of lyrics in many languages.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^http:\/\/(www|m)(\.vagalume\.com\.br\/(?!(my|top100|especiais|news|plugin|facebook|browse|playlisteiros)\/).*?\/(?!(discografia|fotos|popularidade|relacionados|news)\b).*?)$/i,
            url_result: "http://www.vagalume.com.br/$ARTIST/$SONG.html",
            process_result_selector: "#lyr_original > div, .lyric > pre",
            process_result_scraper_options: {
                tags: /^(?:[buip]|strong|em|span)$/i,
                flushBefore: /^(?:br|p)$/i,
                flushAfter: /^p$/i
            },
            process_result_get_title: function(e) {
                var t = e.title.replace(/ - VAGALUME$/i, ""), r = t.split(" - ");
                return 2 === r.length ? r[1] + " - " + r[0] : t;
            },
            process_result_replace_url: [ /^(https?:\/\/)m\./, "$1www." ],
            process_search_replace_url: [ /-cifrada(\.html)?$/i, "$1" ],
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/[ .]/g, "-"), e = e.replace(/[^a-z0-9\-]/g, ""), e = e.replace(/-{2,}/g, "-"), 
                e = e.replace(/^-|-$/g, "");
            }
        });
    }), r("sources/letras.mus.br", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "letras.mus.br",
            homepage: "http://letras.mus.br/",
            description: "A big Brazilian source with millions of lyrics (also in many other languages).",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/letras\.mus\.br\/.*?\/.*?\//i,
            url_result: "http://letras.mus.br/$ARTIST/$SONG/",
            process_result_selector: "#div_letra,#letra_original",
            process_result_scraper_options: {
                tags: /^(?:[buip]|strong|em|div)$/i,
                flushBefore: /^(?:br|p|div)$/i,
                flushAfter: /^(?:p|div)$/i,
                lineAfterFlush: /^p$/i
            },
            process_result_get_title: function(e) {
                var t, r = e.querySelector("#identificador_musica"), n = e.querySelector("#identificador_artista");
                return t = r && n ? r.textContent + " - " + n.textContent : e.title.replace(/\([^)]+\)/g, "");
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/[_ ]/g, "-"), 
                e = e.replace(/[^a-z0-9\-]/g, ""), e = e.replace(/-{2,}/g, "-"), e = e.replace(/^-+|-+$/g, "");
            }
        });
    }), r("algorithms", [ "require", "exports", "module", "normalize_accents" ], function(e, t) {
        function r(e, t) {
            e += "", e = e.toLocaleLowerCase(), t || (e = s(e), e = e.replace(/[.,?\/"':;|\\\]\[\{\}\(\)\-_=+!@#$%\^&*~`]/g, " ")), 
            e = (" " + e + " ").replace(/\s+/g, " ");
            for (var r = {}, n = -1, o = e.length - 1; o > ++n; ) {
                var i = e.substr(n, 2);
                r[i] = r[i] ? r[i] + 1 : 1;
            }
            return {
                length: o,
                hash: r
            };
        }
        function n(e, t, n) {
            var o = r(e, n), i = r(t, n), s = 0, c = o.length + i.length;
            if (!o.length || !i.length) return c ? 0 : 1;
            var a, l;
            i.length > o.length ? (a = o.hash, l = i.hash) : (a = i.hash, l = o.hash);
            for (var u = Object.keys(a), d = 0; u.length > d; ++d) {
                var p = u[d];
                l[p] && (s += a[p] > l[p] ? l[p] : a[p]);
            }
            return 2 * s / c;
        }
        function o(e) {
            if (-1 == e.indexOf("-")) return null;
            e = e.match(/^(.+?)\s-\s(.+)/) || e.match(/^(.+?)\s-(.+)/) || e.match(/^(.+?)-\s(.+)/) || e.match(/^(.+?)-(.+)/);
            var t = e[1].trim(), r = e[2].trim();
            return t && r ? [ t, r ] : null;
        }
        function i(e, t, r) {
            r = !isNaN(r) && isFinite(r) ? +r : .3;
            var i = o(e), s = o(t);
            return i && s ? n(i[0], s[0]) > r && n(i[1], s[1]) > r : n(e, t) > r;
        }
        var s = e("normalize_accents").normalize_accents;
        t.getSimilarityCoefficient = n, t.splitSongTitle = o, t.isTitleSimilar = i;
    }), r("sources/darklyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils", "algorithms" ], function(e, t) {
        function r(e) {
            return e.replace(/[^a-z0-9'. ]/i, " ").replace(/\s+/, " ").trim();
        }
        function n(e) {
            return e && e.replace(/^\s*\d+\./, "").trim() || "";
        }
        function o(e, t) {
            for (var r, o = -1/0, i = 0; e.length > i; i++) {
                var s = e[i], a = n(s.textContent).toLowerCase(), l = c.getSimilarityCoefficient(a, t);
                l > o && (o = l, r = s);
            }
            return o > .3 ? r : null;
        }
        var i = e("LyricsSource").LyricsSource, s = e("SourceScraperUtils").SourceScraperUtils, c = e("algorithms");
        t.source = new i({
            disabled: !0,
            identifier: "darklyrics.com",
            homepage: "http://www.darklyrics.com/",
            description: "Dark Lyrics is provides Metal lyrics for 4500+ bands.",
            r_url_result: /^https?:\/\/www\.darklyrics\.com\/lyrics\/[^\/]+\/[^\/]+\.html$/i,
            url_result: function(e) {
                return "http://www.darklyrics.com/search?q=" + encodeURIComponent(r(this.$ARTIST(e)) + " " + r(this.$SONG(e)));
            },
            url_search: function(e) {
                return "http://www.darklyrics.com/search?q=" + encodeURIComponent(r(this.$SEARCHTERMS(e)));
            },
            process_result: function(e, t, r) {
                if (/^https?:\/\/www\.darklyrics\.com\/search/.test(r.url)) return this.process_search(e, t, r);
                var i = s.toDOM(e), c = i.querySelectorAll("h3 > a");
                if (!c) return t.fail(), void 0;
                var a = i.title.split(/\sLyrics\s/i, 1)[0].toLowerCase(), l = r.query.song && this.$SONG(r.query);
                l || (l = this.$SEARCHTERMS(r.query) || "", l = l.toLowerCase().replace(a, " "), 
                l = l.replace(/\s+/, " ").replace(/^[\s\-]+|[\s\-]+$/g, ""));
                var u = o(c, l);
                if (!u || !u.parentNode) return t.fail(), void 0;
                var d = s.toStringArray(u.parentNode.nextSibling, {
                    isFirstChild: !0,
                    isEndNode: function(e) {
                        return "H3" === e.nodeName.toUpperCase();
                    }
                });
                if (d.length) {
                    a = a.replace(/([a-z])(\S*)/g, function(e, t, r) {
                        return t.toUpperCase() + r.toLowerCase();
                    }), l = n(u.textContent);
                    var p = a + " - " + l;
                    t.found({
                        lyrics: d,
                        title: p,
                        url: r.url.replace(/(#\d*)?$/, "#" + u.name)
                    });
                } else t.fail();
            },
            process_search: function(e, t, r) {
                var n = s.toDOM(e), i = n.querySelectorAll('a[href*="lyrics/"][href*=".html#"]'), c = o(i, this.$SEARCHTERMS(r.query)), a = c && c.getAttribute("href").replace(/^(?!http)/i, "http://www.darklyrics.com/");
                return /^http:\/\/www\.darklyrics\.com\/lyrics\//i.test(a) ? (t.found({
                    redir: a
                }), void 0) : (t.fail(), void 0);
            }
        });
    }), r("sources/metal-archives.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils", "algorithms" ], function(e, t) {
        function r(e, t, r) {
            if (e) {
                for (var n = -1, o = -1/0, s = 0; e.length > s; s++) {
                    var c = r(e[s]);
                    if (c) {
                        var a = i.getSimilarityCoefficient(c, t);
                        if (a > o && (n = s, o = a, 1 == a)) break;
                    }
                }
                return o > .3 ? n : -1;
            }
        }
        var n = e("LyricsSource").LyricsSource, o = e("SourceScraperUtils").SourceScraperUtils, i = e("algorithms"), s = /^https?:\/\/www\.metal-archives\.com\/search\/ajax-advanced\/searching\/songs\/\?songTitle=(.*?)&bandName=(.*)/, c = /^https?:\/\/www\.metal-archives\.com\/albums\/([^\/]+)\/([^\/]+).*/i, a = /"https?:\/\/www\.metal-archives\.com\/albums\/([^\/]+)\/([^\/]+).*?"/i;
        t.source = new n({
            disabled: !0,
            identifier: "metal-archives.com",
            homepage: "http://www.metal-archives.com/",
            description: "The Metal Archives is an extensive database (90k+ bands) of metal lyrics.",
            r_url_result: c,
            url_result: function(e) {
                return "http://www.metal-archives.com/search/ajax-advanced/searching/songs/?songTitle=" + encodeURIComponent(this.$SONG(e)) + "&bandName=" + encodeURIComponent(this.$ARTIST(e));
            },
            url_search: function(e) {
                return o.search.get_url({
                    site: "metal-archives.com/albums",
                    query: this.$SEARCHTERMS(e)
                });
            },
            process_result: function(e, t, r) {
                if (s.test(r.url) || c.test(r.url)) return this.process_search(e, t, r);
                if (/^\s*(<[^>]*>)?\(lyrics not available\)/i.test(e)) return t.fail(), void 0;
                var n = o.toDOM(e), i = n.querySelectorAll("h3 > a");
                if (!i) return t.fail(), void 0;
                var a = o.toStringArray(n.body);
                a.length ? t.found({
                    lyrics: a,
                    title: r.tempData && r.tempData.song_title || "(N/A)",
                    url: r.tempData && r.tempData.song_url || r.url
                }) : t.fail();
            },
            process_search: function(e, t, n) {
                if (!/^https?:\/\/www\.metal-archives\.com\//.test(n.url)) {
                    for (var i = o.search.getResultsFromResponse(e, n), l = 0; i.length > l; l++) {
                        var u = i[l];
                        if (c.test(u)) return t.found({
                            redir: u
                        }), void 0;
                    }
                    return t.fail(), void 0;
                }
                var d, p, h, m, f, g;
                if (s.test(n.url)) try {
                    var y = JSON.parse(e);
                    if (d = this.$ARTIST(n.query), p = this.$SONG(n.query), !y || !y.aaData || !y.aaData.length) return t.fail(), 
                    void 0;
                    if (m = r(y.aaData, d + "/" + p, function(e) {
                        var t = e[1] && a.exec(e[1]);
                        return t ? t[1] + "/" + t[2] : void 0;
                    }), -1 === m) return t.fail(), void 0;
                    var v = y.aaData[m];
                    f = a.exec(v[1]), h = f[0], d = v[0].match(/[^><]+(?=<\/a>)/i), d = d && d[0].trim() || decodeURIComponent(f[1]).replace(/_/, " "), 
                    p = v[3], g = /lyricsLink_(\d+)/.exec(v[4]), g = g ? g[1] : 0;
                } catch (b) {
                    return t.fail(), void 0;
                } else if (c.test(n.url)) {
                    var L = o.toDOM(e), S = L.querySelectorAll("tr[id^=song]");
                    d = L.querySelector(".band_name"), d ? d = d.textContent.trim() : (f = c.match(n.url), 
                    d = decodeURIComponent(f[1]).replace(/_/, " ")), p = n.query.song && this.$SONG(n.query);
                    var w = "";
                    if (p || (p = this.$SEARCHTERMS(n.query), w = d), p = p.toLowerCase(), m = r(S, p, function(e) {
                        return /\d/.test(e.id) ? (e = e.previousElementSibling, e && e.cells && e.cells[1] ? w + " " + e.cells[1].textContent.trim().toLowerCase() : void 0) : void 0;
                    }), -1 === m) return t.fail(), void 0;
                    var x = S[m];
                    h = n.url, p = x.previousElementSibling.cells[1].textContent.trim(), g = x.id.replace(/\D+/, "");
                }
                t.found({
                    redir: "http://www.metal-archives.com/release/ajax-view-lyrics/id/" + g,
                    tempData: {
                        song_url: h,
                        song_title: d + " - " + p
                    }
                });
            }
        });
    }), r("sources/musica.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "musica.com",
            homepage: "http://www.musica.com/",
            description: "Spanish site with 800k lyrics.",
            searchterms_result: '"letras.asp?letra=" "Letra de" "$SONG" de "$ARTIST"',
            searchterms_search: '"Letra de" "letras.asp?letra=" $SEARCHTERMS',
            r_url_result: /^https?:\/\/www\.musica\.com\/letras\.asp\?.*?letra=\d+/i,
            process_result_selector: 'font[style*="line-height"][style*=family]',
            process_result_get_title: function(e) {
                var t, r, n = e.querySelectorAll('h1 a[href*="letras.asp?letra"]');
                return 2 === n.length ? (r = n[0].textContent.trim(), t = n[1].textContent.replace(/\([^)]*\)\s*$/, "").trim()) : (n = e.title.match(/^Letra de (.+) de (.+) - MUSICA\.COM$/)) && (r = n[1], 
                t = n[2]), r && t ? r + " " + t : void 0;
            },
            process_search_replace_url: [ "version=movil", "" ],
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.replace(/([a-z])!([a-z])/gi, "$1i$2"), 
                e = e.replace(/[":']/g, " "), e = e.replace(/ +/, " ");
            }
        });
    }), r("sources/shironet.mako.co.il", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils, o = function(e) {
            return /[\u0590-\u05FF]/.test(e);
        };
        t.source = new r({
            disabled: !0,
            identifier: "shironet.mako.co.il",
            homepage: "http://shironet.mako.co.il/",
            description: "The best source for Hebrew lyrics.",
            r_url_result: /^https?:\/\/shironet\.mako\.co\.il\/artist\?type=lyrics/,
            url_result: function(e) {
                return this.url_search(e);
            },
            url_search: function(e) {
                return e = this.$SEARCHTERMS(e), o(e) ? "http://shironet.mako.co.il/searchSongs?type=lyrics&q=" + encodeURIComponent(e) : "";
            },
            process_result: function(e, t, r) {
                if (/^https?:\/\/shironet\.mako\.co\.il\/searchSongs/.test(r.url)) return this.process_search(e, t, r);
                var o = n.toDOM(e), i = o.querySelector(".artist_lyrics_text"), s = n.toStringArray(i);
                if (s.length) {
                    var c = o.querySelector(".artist_singer_title");
                    c = c && c.textContent.trim();
                    var a = o.querySelector(".artist_song_name_txt");
                    a = a && a.textContent.trim();
                    var l = c + " - " + a;
                    t.found({
                        lyrics: s,
                        title: l
                    });
                } else t.fail();
            },
            process_search: function(e, t) {
                var r = n.toDOM(e), o = r.querySelector('a[href*="/artist?type=lyrics"][class*="search"]'), i = o && o.getAttribute("href").replace(/^\//i, "http://shironet.mako.co.il/");
                i ? t.found({
                    redir: i
                }) : t.fail();
            },
            $ARTIST$SONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, e = r.prototype.$ARTIST$SONG.call(this, e, t), 
                e = e.replace(/[^\u0590-\u05FF\d\-]+/g, " "), e = e.replace(/^[ \-]+|[ \-]+$/g, ""), 
                e = e.replace(/ +/g, " ");
            },
            $SEARCHTERMS: function(e, t) {
                var r, n = function(e) {
                    return e = e.replace(/[^\u0590-\u05FF\d\-]+/g, " "), e = e.replace(/(מילים לשיר|עם מילים|עם כתוביות|קאבר|אקוסטי|בהופעה)/g, " "), 
                    e = e.replace(/^[ \-]+|[ \-]+$/g, ""), e = e.replace(/ +/g, " ");
                };
                if (!e.videotitle && (r = e.searchTerms, !r)) {
                    var o = this.$ARTIST(e, t), i = this.$SONG(e, t);
                    o && i && (r = n(o + " - " + i));
                }
                return !r && e.videotitle && (r = e.videotitle, r = r.replace(/\([^)]*\)/g, " "), 
                r = r.replace(/\[[^\]]*\]/g, " "), r = n(r), r || (r = n(e.videotitle))), r;
            }
        });
    }), r("sources/angolotesti.it", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "angolotesti.it",
            homepage: "http://www.angolotesti.it/",
            description: "The largest lyrics provider of Italy, with hundred thousands of lyrics.",
            searchterms_result: "$SONG Testo $ARTIST",
            searchterms_search: "$SEARCHTERMS Testo",
            r_url_result: /^https?:\/\/(?:www\.)?angolotesti\.it\/([0-9a-z])\/[^\/]*\d\/[^\/]*\d/i,
            process_result_selector: ".testo",
            process_result_get_title: function(e) {
                return e.title.replace(/^(.+?) Testo (.+?)$/, "$2 - $1");
            }
        });
    }), r("sources/paroles2chansons.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "paroles2chansons.com",
            homepage: "http://www.paroles2chansons.com/",
            description: "Lyrics for French and popular foreign songs.",
            searchterms_result: "Paroles $SONG - $ARTIST lyrics",
            searchterms_search: "Paroles $SEARCHTERMS lyrics",
            r_url_result: /^https?:\/\/(www|m)(\.paroles2chansons\.com\/paroles-[^\/]+\/paroles-.*?.html.*)$/i,
            process_result_selector: "#content > p, #paroles",
            process_result_get_title: function(e) {
                return e.title.replace(/^Paroles /, "").replace(/ \(lyrics\)$/, "");
            },
            process_result_replace_url: [ /^(https?:\/\/)m\./, "$1www." ],
            process_search_replace_url: [ /^(https?:\/\/)www\./, "$1m." ]
        });
    }), r("sources/rapgenius.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "rapgenius.com",
            homepage: "http://rapgenius.com/",
            description: "Over 100k of rap, rock and some pop lyrics.",
            searchterms_result: "$ARTIST $SONG Lyrics",
            searchterms_search: "$SEARCHTERMS Lyrics",
            r_url_result: /^https?:\/\/(?:rock\.)?rapgenius\.com\/[^\/]+-lyrics\/?$/,
            process_result_selector: ".lyrics",
            process_result_scraper_options: {
                tags: /^(?:[abuip]|strong|em)$/i,
                flushAfter: /^p$/i,
                lineAfterFlush: /^p$/i
            },
            process_result_get_title: function(e) {
                var t = e.querySelector(".song_title");
                return t = t ? t.textContent.trim().replace(/–/g, "-").replace(/ Lyrics$/, "") : e.title.split("|", 1)[0];
            }
        });
    }), r("sources/tekstowo.pl", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "tekstowo.pl",
            homepage: "http://www.tekstowo.pl/",
            description: "The largest Polish lyrics site with 700k+ lyrics (including songs from other languages).",
            searchterms_result: "$ARTIST - $SONG",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.tekstowo\.pl\/piosenka,[^,]+,[^,]+.html$/i,
            process_result_selector: ".song-text > h2",
            process_result_scraper_options: {
                isFirstChild: !0
            },
            process_result_get_title: function(e) {
                return e.title.split(" - tekst piosenki, ", 1)[0];
            }
        });
    }), r("sources/animelyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils, o = function(e, t, r) {
            var o = e.indexOf(t);
            if (-1 !== o) {
                var i = e.indexOf(r, o);
                if (-1 !== i) {
                    e = e.substring(o, i + r.length);
                    var s = n.toDOM("<body>" + e + "</body>");
                    return s.body.firstElementChild;
                }
            }
        };
        t.source = new r({
            disabled: !0,
            identifier: "animelyrics.com",
            homepage: "http://www.animelyrics.com/",
            description: "Anime, J-Pop / J-Rock - Japanese lyrics (Romaji and Kanji). English translations are often available.",
            searchterms_result: "$ARTIST $SONG",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^http:\/\/www\.animelyrics\.com\/(?:anime|game|jpop|dance|dancecd|doujin)\/[^\/]+\/[^\/]+\.(?:htm|jis)$/i,
            process_result: function(e, t, r) {
                if (n.search.isSearchURL(r.url)) return this.process_search(e, t, r);
                var i, s = o(e, "<div id=kanji>", "</div>");
                if (s && (i = n.toStringArray(s, {
                    tags: /^a$/i
                })), !s && (s = o(e, "<table border=0 cellspacing=0>", "</table>"))) {
                    for (var c = document.createDocumentFragment(), a = s.querySelectorAll(".romaji .lyrics"), l = 0; a.length > l; ++l) c.appendChild(a[l]);
                    i = n.toStringArray(c, {
                        tags: /^span$/i,
                        flushAfter: /^span$/i
                    });
                }
                if (!s && (s = o(e, "<span class=lyrics>", "</span>")) && (i = n.toStringArray(s)), 
                i && i.length) {
                    var u, d = o(e, '<ul id="crumbs">', "</ul>").querySelectorAll("li"), p = d[d.length - 2], h = d[d.length - 1];
                    p && h ? (p = p.textContent, h = h.textContent.split(" - ", 1)[0], u = p.length > 30 ? h : p + " - " + h) : u = "?", 
                    t.found({
                        lyrics: i,
                        title: u
                    });
                } else t.fail();
            }
        });
    }), r("sources/mojim.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "mojim.com",
            homepage: "http://mojim.com/",
            description: "Millions of Asian (Chinese, Japanese, Korean, ...) and English lyrics.",
            searchengine: "soso",
            searchterms_result: "$SONG $ARTIST mojim",
            searchterms_search: "$SEARCHTERMS mojim",
            r_url_result: /^http:\/\/(?:[^\/]*\.)?mojim\.com\/(?:cn|jp|tw|us)y\d+x\d+x\d(?:\.htm)?$/i,
            process_result_selector: "#fsZ > dl > dd",
            process_result_scraper_options: {
                tags: /^a$/i,
                ignoreNode: function(e) {
                    return 1 === e.nodeType && ("A" === e.tagName.toUpperCase() || !!e.querySelector("a"));
                }
            },
            process_result_get_title: function(e) {
                var t = /^(.+) (?:\u6b4c[\u8bcd\u8a5e]|Lyrics) (.+) \u203b Mojim\.com/.exec(e.title);
                if (t) {
                    var r = t[1].replace(/\(.*\)/g, "").trim(), n = t[2].replace(/\(.*\)/g, "").trim();
                    return n + " - " + r;
                }
            },
            process_search_replace_url: [ /^(https?:\/\/)(?!cn\.|jp\.|tw\.)[^\/]+\.(mojim\.com)/, "$1$2" ]
        });
    }), r("sources/multi/google.com", [ "require", "exports", "module", "MultiLyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("MultiLyricsSource").MultiLyricsSource, n = e("SourceScraperUtils").SourceScraperUtils.search.engines.google;
        t.source = new r({
            disabled: !0,
            identifier: "google.com",
            homepage: "https://encrypted.google.com/",
            description: "Search in all known lyrics sites at once using Google.\nIt is recommended to put this source near the top of the list.\nOnly disabled sources are used in the search query.",
            url_search: function(e) {
                var t = this.getSources();
                if (!t.length) return "";
                for (var r = "/search?q=" + encodeURIComponent(this.$SEARCHTERMS(e) + " (site:" + t[0].searchterms_site), n = 1; t.length > n; ++n) {
                    var o = encodeURIComponent(" OR site:" + t[n].searchterms_site);
                    if (o.length + r.length >= 2045) break;
                    r += o;
                }
                return r += ")", r = "https://encrypted.google.com" + r;
            },
            getResultsFromResponse: n.getResultsFromResponse
        });
    }), r("sources/songmeanings.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "songmeanings.com",
            homepage: "http://songmeanings.com/",
            description: "A few million song lyrics in various languages.",
            searchterms_site: "songmeanings.com/songs/view",
            searchterms_result: "$ARTIST $SONG Lyrics",
            searchterms_search: "$SEARCHTERMS Lyrics",
            r_url_result: /^https?:\/\/songmeanings\.com\/songs\/view\/\d+\//,
            process_result_selector: "#textblock",
            process_result_get_title: function(e) {
                var t = e.title.split(" Lyrics | ", 1)[0];
                return t;
            }
        });
    }), r("sources/songlyrics.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "songlyrics.com",
            homepage: "http://www.songlyrics.com/",
            description: "Over 750k lyrics.",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^http:\/\/www\.songlyrics\.com\/[^\/]+\/[^\/]+-lyrics\//i,
            url_result: "http://www.songlyrics.com/$ARTIST/$SONG-lyrics/",
            process_result_selector: "#songLyricsDiv",
            process_result_get_title: function(e) {
                var t = e.querySelector("h1");
                return t = t ? t.textContent : e.title, t = t.replace(/ Lyrics$/i, "");
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/\./g, "-"), e = e.replace(/[^a-z0-9+\- !]/g, ""), e = e.replace(/[\- ]+/g, "-");
            },
            $SONG: function(e, t) {
                var n = r.prototype.$SONG.call(this, e, t);
                return n = n.replace(/-$/, "");
            }
        });
    }), r("sources/songteksten.nl", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "songteksten.nl",
            homepage: "http://http://songteksten.nl/",
            description: "Dutch site with over 350k song lyrics.",
            searchterms_site: "songteksten.nl/songteksten",
            searchterms_result: "$ARTIST $SONG",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.songteksten\.nl\/songteksten\/\d+/i,
            process_result_selector: 'span[itemprop="description"]',
            process_result_get_title: function(e) {
                var t = e.title.match(/^\u266b (.*) songtekst \|/);
                return t ? t[1] : void 0;
            }
        });
    }), r("sources/stixoi.info", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "stixoi.info",
            homepage: "http://www.stixoi.info/",
            description: "A Greek website with over 55k Greek lyrics.",
            searchterms_result: '"stixoi.php?info=Lyrics" "song_id" $SONG $ARTIST',
            searchterms_search: '"stixoi.php?info=Lyrics" "song_id" $SEARCHTERMS',
            r_url_result: /^https?:\/\/www\.stixoi.info\/stixoi.php\?info=Lyrics&act=(det2edit|details)&song_id=\d+/i,
            process_result_selector: ".singers + *",
            process_result_scraper_options: {
                isFirstChild: !0
            },
            process_result_get_title: function(e) {
                var t = e.querySelector('.creators a[href*="singer_id"]');
                t = t ? t.textContent : "";
                var r = e.title.replace("stixoi.info: ", "");
                return t + " - " + r;
            },
            process_search_replace_url: [ /\bact=(det2edit|details)\b/i, "act=details", /\binfo=lyrics\b/i, "info=Lyrics" ]
        });
    }), r("sources/plyrics.com", [ "require", "exports", "module", "LyricsSource", "SourceScraperUtils" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource, n = e("SourceScraperUtils").SourceScraperUtils;
        t.source = new r({
            disabled: !0,
            identifier: "plyrics.com",
            homepage: "http://www.plyrics.com/",
            description: "Lyrics for punk, indie, hardcore and ska songs.",
            r_url_result: /^https?:\/\/www\.plyrics\.com\/lyrics\/[^\/]+\/[^\/]+\.html$/i,
            url_result: "http://www.plyrics.com/lyrics/$ARTIST/$SONG.html",
            method_search: "GET",
            url_search: "http://search.plyrics.com/search.php?q=$encSEARCHTERMS",
            process_result_selector: ".pmedia",
            process_result_scraper_options: {
                isFirstChild: !0
            },
            process_result_get_title: function(e) {
                var t = e.title.split("LYRICS -");
                return t[0] = t[0].replace(/([A-Z])(\S*)/g, function(e, t, r) {
                    return t.toUpperCase() + r.toLowerCase();
                }), t = t.join("-");
            },
            process_search: function(e, t) {
                var r = n.toDOM(e), o = r.querySelector('a[href^="http://www.plyrics.com/lyrics/"]');
                o ? t.found({
                    redir: o.href
                }) : t.fail();
            },
            $ARTIST$SONG: function(e, t) {
                return e = r.prototype.$ARTIST$SONG.call(this, e, t), e = e.toLowerCase(), e = e.replace(/([a-z])!([a-z])/g, "$1i$2"), 
                e = e.replace(/^(the|an?) /, ""), e = e.replace(/[^a-z0-9]/g, "");
            },
            $SEARCHTERMS: function(e, t) {
                var n = r.prototype.$SEARCHTERMS.call(this, e, t);
                return e.videotitle && (n = n.replace(/\s+-\s+/g, " ")), n;
            }
        });
    }), r("sources/guitarparty.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "guitarparty.com",
            homepage: "http://www.guitarparty.com/",
            description: "Icelandic lyrics and guitar chords (guitar chords not displayed by extension, just click on the link to their website).",
            searchterms_result: "song $ARTIST $SONG",
            searchterms_search: "song $SEARCHTERMS",
            r_url_result: /^https?:\/\/[^.]+\.guitarparty.com\/(en|is)?\/?song\/[^\/]+(\/|$)/,
            process_result_selector: ".song-no-chords",
            process_result_scraper_options: {
                tags: /^p$/i,
                flushAfter: /^p$/i
            },
            process_result_get_title: function(e) {
                var t = /^(.+) \(\s*(.*?)\s*\) ‒/.exec(e.title);
                return t ? t[2] + " - " + t[1] : void 0;
            },
            process_search_replace_url: [ /:\/\/[^.]+\./i, "://www." ],
            $ARTIST$SONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, r.prototype.$ARTIST$SONG.call(this, e, t);
            },
            $SEARCHTERMS: function(e, t) {
                return (t || (t = {})).keepAccents = !0, r.prototype.$SEARCHTERMS.call(this, e, t);
            }
        });
    }), r("sources/lyrics.my", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "lyrics.my",
            homepage: "http://www.lyrics.my/",
            description: "Lyrics for Malaysian, Indonesian, Nasyid and some English songs (about 20k).",
            searchterms_result: "$ARTIST $SONG",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyrics\.my\/artists\/.+\/lyrics\/./i,
            process_result_selector: ".show_lyric",
            process_result_scraper_options: {
                tags: /^(?:[buip]|strong|em)$/i,
                flushBefore: /^(?:br|p)$/i,
                flushAfter: /^p$/i,
                ignoreNode: function(e) {
                    return 1 !== e.nodeType || /^br$/i.test(e.tagName) && (e = e.previousSibling) ? 3 === e.nodeType ? e.nodeValue.lastIndexOf("://lyrics.my") > 0 : void 0 : !1;
                }
            },
            process_result_get_title: function(e) {
                var t = e.title.split(" Lyrics | Lyrics.My", 1)[0];
                return t;
            }
        });
    }), r("sources/lyricsmasti.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "lyricsmasti.com",
            homepage: "http://www.lyricsmasti.com/",
            description: "Lyrics for Hindi movie songs.",
            searchengine: "bing_www",
            searchterms_result: "Lyrics of $SONG $ARTIST",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyricsmasti\.com\/song\/\d+\/get_lyrics_of_.+$/i,
            process_result_selector: "#lcontent1",
            process_result_scraper_options: {
                ignoreNode: function(e) {
                    return 3 === e.nodeType ? /l[ .]*y[ .]*r[ .]*i[ .]*c[ .]*s[ .]*m[ .]*a[ .]*s[ .]*t[ .]*i[ .]*c[ .]*o[ .]*m/i.test(e.nodeValue) : void 0;
                }
            },
            process_result_get_title: function(e) {
                var t = e.querySelector('meta[property="og:title"]');
                if (t) {
                    t = t.getAttribute("content");
                    var r = e.querySelector(".header5 + h3");
                    if (r) {
                        if (r) r = r.textContent.replace(/\s*,\s*/g, " & "); else {
                            if (r = /\((.+) \d{4}\)$/.exec(e.title), !r) return;
                            r = r[0];
                        }
                        return r + " - " + t;
                    }
                }
            }
        });
    }), r("sources/hindilyrics.net", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "hindilyrics.net",
            homepage: "http://www.hindilyrics.net/",
            description: "Lyrics for Hindi movie songs and albums.",
            searchengine: "bing_www",
            searchterms_result: "lyrics of $SONG $ARTIST",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.hindilyrics\.net\/([a-z]*-)?lyrics\/of-.+$/i,
            process_result_selector: "pre > font",
            process_result_get_title: function(e) {
                var t = e.querySelector('.ten.columns, font[size="2"]');
                if (t) {
                    t = t.textContent;
                    var r = /\bSong: *([^\n]{1,150})/.exec(t);
                    if (r) {
                        r = r[1].trim();
                        var n = /\bSinger\(s\): *([^\n]{1,300})/.exec(t);
                        if (n) n = n[1].split(/ *, */), n = 4 > n.length ? n.join(" & ") : n[0]; else {
                            if (n = /\bMovie(?: or Album)?: *([^\n]{1,150})/.exec(t), !n) return;
                            n = n[1];
                        }
                        return n = n.trim(), n + " - " + r;
                    }
                }
            }
        });
    }), r("sources/lyricsmint.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "lyricsmint.com",
            homepage: "http://www.lyricsmint.com/",
            description: "Hindi song lyrics.",
            searchengine: "bing_www",
            searchterms_result: "lyrics of $SONG $ARTIST",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.lyricsmint\.com\/\d{4}\/\d{2}\/.*$/i,
            process_result_selector: "#lyric > p",
            process_result_get_title: function(e) {
                var t = e.querySelector(".songinfo");
                if (t) {
                    var r = t.textContent, n = /\bSingers?: *([^\n;]{1,300})/.exec(r);
                    if (n) {
                        n = n[1].split(/ *, */), n = 4 > n.length ? n.join(" & ") : n[0], n = n.trim();
                        var o = /\bSong: *([^\n]{1,150})/.exec(r);
                        return o ? o = o[1].trim() : (o = t.querySelector("b,strong"), o && (o = /^\s*(.+?) Lyrics from/.exec(o.textContent), 
                        o && (o = o[1])), o || (o = e.title.split(/[ .]+LYRICS/i)[0])), n + " - " + o;
                    }
                }
            }
        });
    }), r("sources/newreleasetuesday.com", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "newreleasetuesday.com",
            homepage: "http://www.newreleasetuesday.com/home.php",
            description: "Christian lyrics.",
            searchterms_result: "$SONG Lyrics by $ARTIST",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.newreleasetuesday\.com\/lyricsdetail.php?.*lyrics_id=\d+/i,
            process_result_selector: "hr + br + table + br",
            process_result_scraper_options: {
                isFirstChild: !0,
                isEndNode: function(e) {
                    return 1 === e.nodeType && "TABLE" === e.nodeName.toUpperCase();
                }
            },
            process_result_get_title: function(e) {
                var t = /^(.+?) Song Lyrics \| (.+?) Lyrics \|/.exec(e.title);
                return t ? t[2] + " - " + t[1] : void 0;
            }
        });
    }), r("sources/karaoketexty.cz", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "karaoketexty.cz",
            homepage: "http://www.karaoketexty.cz/",
            description: "Czech lyrics site with a few hundred thousand lyrics (mainly Czech and English, but also some other languages).",
            searchterms_result: "$ARTIST $SONG",
            searchterms_search: "$SEARCHTERMS",
            r_url_result: /^https?:\/\/www\.karaoketexty\.cz\/texty-pisni\/[^\/]*[^\/0-9]\/.+/i,
            process_result_selector: ".text",
            process_result_get_title: function(e) {
                var t = e.querySelector('meta[property="og:title"]');
                return t ? t.getAttribute("content") : void 0;
            },
            $ARTISTSONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, e = r.prototype.$ARTIST$SONG.call(this, e, t);
            }
        });
    }), r("sources/supermusic.sk", [ "require", "exports", "module", "LyricsSource" ], function(e, t) {
        var r = e("LyricsSource").LyricsSource;
        t.source = new r({
            disabled: !0,
            identifier: "supermusic.sk",
            homepage: "http://www.supermusic.sk/",
            description: "Slovak lyrics site with almost 100k lyrics in Slovak, English and other languages.",
            searchterms_result: "skupina $ARTIST $SONG text -intitle:preklad",
            searchterms_search: "skupina $SEARCHTERMS -intitle:preklad",
            r_url_result: /^https?:\/\/www\.supermusic\.(sk|eu)\/skupina\.php\?.*idpiesne=\d+/i,
            process_result_exclude_pattern: /illegally published copyright content/,
            process_result_selector: "td.piesen > font",
            process_result_scraper_options: {
                tags: /^(?:pre|[bui]|strong|em)$/i,
                ignoreNode: function(e) {
                    if (3 === e.nodeType) {
                        var t = e.nodeValue;
                        if (/^[ehgda]--|^   A  /.test(t)) return !0;
                        if (t.lastIndexOf(":") >= 0) {
                            var r = e.nextSibling;
                            if (r && 3 === r.nodeType) return 0 === r.nodeValue.lastIndexOf("   A  ", 0);
                        }
                    }
                }
            },
            process_result_get_title: function(e) {
                var t = /^(.+ - .+) \[(?!preklad).*Supermusic.(sk|eu)\]$/.exec(e.title);
                return t ? t[1] : void 0;
            },
            process_search_replace_url: [ /^(https?:\/\/www\.supermusic\.)sk/i, "$1eu" ],
            $ARTISTSONG: function(e, t) {
                return (t || (t = {})).keepAccents = !0, e = r.prototype.$ARTIST$SONG.call(this, e, t);
            }
        });
    }), r("sources/lyrics", [ "require", "exports", "module", "config", "MultiLyricsSource", "sources/shared", "sources/lyrics.wikia.com", "sources/multi/bing.com", "sources/lyrics.com", "sources/metrolyrics.com", "sources/lyricsmania.com", "sources/azlyrics.com", "sources/lyricstime.com", "sources/stlyrics.com", "sources/lyricsmode.com", "sources/magistrix.de", "sources/leoslyrics.com", "sources/vagalume.com.br", "sources/letras.mus.br", "sources/darklyrics.com", "sources/metal-archives.com", "sources/musica.com", "sources/shironet.mako.co.il", "sources/angolotesti.it", "sources/paroles2chansons.com", "sources/rapgenius.com", "sources/tekstowo.pl", "sources/animelyrics.com", "sources/mojim.com", "sources/multi/google.com", "sources/songmeanings.com", "sources/songlyrics.com", "sources/songteksten.nl", "sources/stixoi.info", "sources/plyrics.com", "sources/guitarparty.com", "sources/lyrics.my", "sources/lyricsmasti.com", "sources/hindilyrics.net", "sources/lyricsmint.com", "sources/newreleasetuesday.com", "sources/karaoketexty.cz", "sources/supermusic.sk" ], function(e, t) {
        for (var r = e("config"), n = e("MultiLyricsSource").MultiLyricsSource, o = e("sources/shared"), i = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, s = [ e("sources/lyrics.wikia.com").source, e("sources/multi/bing.com").source, e("sources/lyrics.com").source, e("sources/metrolyrics.com").source, e("sources/lyricsmania.com").source, e("sources/azlyrics.com").source, e("sources/lyricstime.com").source, e("sources/stlyrics.com").source, e("sources/lyricsmode.com").source, e("sources/magistrix.de").source, e("sources/leoslyrics.com").source, e("sources/vagalume.com.br").source, e("sources/letras.mus.br").source, e("sources/darklyrics.com").source, e("sources/metal-archives.com").source, e("sources/musica.com").source, e("sources/shironet.mako.co.il").source, e("sources/angolotesti.it").source, e("sources/paroles2chansons.com").source, e("sources/rapgenius.com").source, e("sources/tekstowo.pl").source, e("sources/animelyrics.com").source, e("sources/mojim.com").source, e("sources/multi/google.com").source, e("sources/songmeanings.com").source, e("sources/songlyrics.com").source, e("sources/songteksten.nl").source, e("sources/stixoi.info").source, e("sources/plyrics.com").source, e("sources/guitarparty.com").source, e("sources/lyrics.my").source, e("sources/lyricsmasti.com").source, e("sources/hindilyrics.net").source, e("sources/lyricsmint.com").source, e("sources/newreleasetuesday.com").source, e("sources/karaoketexty.cz").source, e("sources/supermusic.sk").source ], c = 2, a = function(e) {
            var t = e && e.schemeVersion || 0, r = function(e, t) {
                var r = d(s, e);
                if (-1 === r) return i("_applySchemeUpdate", "not_found", "No listing found for ID " + e), 
                void 0;
                var n = s.splice(r, 1)[0];
                s.splice(t, 0, n);
            };
            2 > t && r("bing.com", 1);
        }, l = 0; s.length > l; ++l) s[l]._disabled = s[l].disabled;
        var u = function(e) {
            o.lyricsSources.length = 0;
            for (var t = 0; e.length > t; ++t) {
                var r = e[t];
                r instanceof n || o.lyricsSources.push(r);
            }
        }, d = function(e, t) {
            for (var r = 0; e.length > r; r++) if (e[r].identifier === t) return r;
            return -1;
        }, p = function(e, t) {
            if (e) for (var r = e.length - 1; r >= 0; --r) {
                var n = e[r], o = d(t, n);
                o >= 0 ? t.unshift(t.splice(o, 1)[0]) : i("getLyricsSources", "id_unknown", 'Unknown identifier found in the "order" preference.');
            }
        }, h = function(e, t, r) {
            if (e) for (var n = r.length - 1; n >= 0; --n) {
                var o = r[n].identifier;
                r[n].disabled = -1 !== e.indexOf(o) ? !0 : t && -1 !== t.indexOf(o) ? !1 : r[n]._disabled;
            }
        }, m = function(e) {
            for (var t = e.length - 1; t >= 0; --t) e[t].disabled === !0 && e.splice(t, 1);
        }, f = function(e, t) {
            r.getItem("lyricsSourcePreferences", function(r) {
                a(r);
                for (var n = s.slice(0), o = n.length, i = 0, c = o - 1; c >= 0; --c) n[c].disabled = n[c]._disabled;
                r && (r.order && (i = r.order.length), p(r.order, n), h(r.blacklist, r.whitelist, n)), 
                u(n.slice(0)), e && m(n), n.stats = {
                    Old: i,
                    New: o - i,
                    Total: o
                }, t(n);
            });
        }, g = function(e) {
            f(!1, e);
        }, y = function(e) {
            f(!0, e);
        };
        t.getAllLyricsSources = g, t.getLyricsSources = y, t.schemeVersion = c;
    }), r("SimpleTemplating", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            return this instanceof r ? (this.useTemplate(e), void 0) : new r(e);
        }
        function n(e, t, r) {
            var n = /^on(.+)$/.exec(r);
            if (!n) return e[r] = t[r], void 0;
            var o = n[1], i = "data-robw-" + o, s = e[i], c = t[r];
            s && (e.removeEventListener(o, s, !1), delete e[i]), "function" == typeof c && (e.addEventListener(o, c, !1), 
            e[i] = c);
        }
        var o = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, i = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        };
        r.prototype.useTemplate = function(e) {
            var t = e.tagName;
            if (t && e.cloneNode) return this.element = e, this;
            t || (t = "div");
            var r = document.createElement(t);
            return Object.keys(e).forEach(function(t) {
                "tagName" !== t && (r[t] = e[t]);
            }), this.element = r, this;
        }, r.prototype.getElement = function() {
            return this.element || i("SimpleTemplating::getElement", "invalid_state", "Cannot use getElement() before an element has been defined! Construct the base element using useTemplate(template)"), 
            this.element;
        }, r.prototype.update = function(e) {
            var t = this.getElement();
            return Object.keys(e).forEach(function(r) {
                var i = t.querySelectorAll(r);
                if (i.length) for (var s = e[r], c = s._pre, a = s._post, l = i.length - 1; l >= 0; --l) {
                    var u = i[l], d = {};
                    "function" == typeof c && c(u, d);
                    for (var p = Object.keys(s), h = 0; p.length > h; ++h) {
                        var m = p[h];
                        "_pre" !== m && "_post" !== m && n(u, s, m);
                    }
                    "function" == typeof a && a(u, d);
                } else o("SimpleTemplating::update", "no_nodes", "No matching nodes found for " + r);
            }), this;
        }, t.SimpleTemplating = r;
    }), r("text", {
        load: function(e) {
            throw Error("Dynamic load not allowed: " + e);
        }
    }), r("text!style/lyricsPanel.css", [], function() {
        return "@font-face{font-family:'lyricshereicons';src:url('https://robwu.nl/lyricshere/icons/v3.7/lyricshereicons.eot');src:url('https://robwu.nl/lyricshere/icons/v3.7/lyricshereicons.eot?#iefix') format('embedded-opentype'),url('data:application/font-woff;base64,d09GRgABAAAAAAxYAA4AAAAAFHgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABRAAAAEQAAABWVspgnWNtYXAAAAGIAAAAfAAAAcL3+FJXY3Z0IAAAAgQAAAAUAAAAHAZv/3BmcGdtAAACGAAABPkAAAmRigp4O2dhc3AAAAcUAAAACAAAAAgAAAAQZ2x5ZgAABxwAAAJlAAADMnB9rfZoZWFkAAAJhAAAADUAAAA2ABqxKGhoZWEAAAm8AAAAIAAAACQHOANNaG10eAAACdwAAAAcAAAAHBbTAABsb2NhAAAJ+AAAABAAAAAQAkIDE21heHAAAAoIAAAAIAAAACAAwwnSbmFtZQAACigAAAGQAAADIZIf/2Bwb3N0AAALuAAAAEgAAABd0UR8ynByZXAAAAwAAAAAVgAAAFaSoZr/eJxjYGR2ZpzAwMrAwVTFtIeBgaEHQjM+YDBkZGJgYGJgZWbACgLSXFMYHBiu///PHPQ/iyGKWY4hESjMCJIDAOWaDBR4nGNgYGBhYGBgBmIVBkYGEEgB8hjBfGYGLgYGxiygCgcgn4eBg4EJrPqG6ibVPepi//+D1V9H8P5r3Qq85XHjPdQkOGBkYxiugJGJWJU8YDICykMPketAfANkHgOD6iYIBsWK6h4IBoW7uhgEM7AyMH7lBWOgOQCvWxiIeJxjYEADRgxGzHL/54MwABEGA+N4nJ1V2XbTVhSVPGRwEjpkoKAO19w4UOvKhCkYMGkqxXYhHRwIrQQdpAx05J3HPutrjkK7Vh/5tO59PSS0dK22LJbPvkdbZ9g650YcIyp9Gohr1KGSlwOprD2WSvdJXNd1L4+VDAZxXbYST0mbqJ0kSmrd7FAu8VjrKlknWCfj5SBWT1WeZ6AM4hQeZUlEG0QbqZcmSeKJ4yeJFmcQHyVJICWjEKfSyFBCNRrEUtWhTOnQq9cTcdNAykajHnVYVPdDxSfHNafUrANGKlc5whXr1Ua+G6cDL3uQxDrBs62HMR54rH6UKpCKkenIP3ZKTpSGgVRx1KFW4ugwk1/3kUwqzUCmjGJFpe6BuN39dNsWMT10Or4uSpVGqrq5ziia7dHxqIMoD9nG6aTc0Nn28OUZU1SrXXGz7UBmDVxKyWx0n0QAHSZS4+kBTjWcAqkZ9UfF2efPARLJXJSqPFUyh3oDmTM7e3Ex7W4nq7JwpJ8HMm92duOdh0OnV4d/0foXTOHMR4/iYn4+QvpQan4iTiSlRljM8qeGH3FXIEK5MYgLF8rgU4Q5dEXa2WZd47Ux9obP+UqpYT0J2uij+H4K/U4kKxxnUaP1SJzNY9d1rdxnUEu1uxc7Mq9DlSLu7wsLrjPnhGGeFgtVX5753gU0/waIZ/xA3jSFS/uWKUq0b5uiTLtoigrtElSlXTbFFO2KKaZpz5pihvYdU8zSnjMy4//L3OeR+xze8ZCb9l3kpn0PuWnfR27aD5CbViE3bR25aS8gN61GbtpVozp2BBoGaRdSFUHQNLL6YdxWm/VA1ow0fGlg8i5iyPrqREedtbXKH8V/deILB3Jpoqe7Iheb4i6v2xY+PN3uq4+aRt2w1fjGkfIwHkZ6HJrQWfnN4b/tTd0umu4yqjLoARVMCsAAZe1AAtM62wmk9Zqn+PIHYFyGeM5KQ7VUnzuGpu/leV/3sTnxvsftxi63XHd5CVnWDXJj9vDfUmSq6x/lLa1UJ0esKyePVWsYQyq8KLq+kpR7tLUbvyipsvJelNbK55OQmz2DG0Jbtu5hsCNMacolHl5TpSg91FKOskMsbynKPOCUiwtahsS4DnUPamvE6aF6GBsLIYahtL0QcEgpXRXftMp38R6ra9jo+MUV4el6chIRn+Iq+1HwVNdG/egO2rxm3TKDKVWqp/uMT7Gv2/ZRWWmkjrMXt1QH1zTrGjkV00/ka+B0bzho3QM9VHw0QSNVNcfoxihjNJY15d8EdDFWfsNo1WL7PdxPnaRVrLlLmOybE/fgtLv9Kvu1nFtG1v3XBr1t5IqfIzG/LQr8Owdit2QN1DuTgRgLyFnQGMYWJncYroNtxG32Pyan/9+GhUVyVzsau3nqw9WTUSV32fK4y012WdejNkfVThr7CI0tDzfm2OFyLLbEYEG2/sH/Me4Bd2lRAuDQyGWYiNp0oZ7q4eoeq7FtOFcSAXbNseN0AHoALkHfHLvW8wmA9dwj5y7AfXIIdsgh+JQcgs/IuQXwOTkEX5BDMCCHYJecOwAPyCF4SA7BHjkEj8jZBPiSHIKvyCGIySFIyLkN8JgcgifkEHxNDsE3Rq5OZP6WB9kA+s6im0CpnRoc2jhkRq5N2Ps8WPaBRWQfWkTqkZHrE+pTHiz1e4tI/cEiUn80cmNC/YkHS/3ZIlJ/sYjUZ8aXmSMprw6e844O/gSX6q1eAAAAAAEAAf//AA94nHVSz08TQRR+b2bZLT9kx+3MrBqKZPsrtAh107QJNrAUAxyIHEiQRDSBeMKLNy94ociBeDVpGoOXclK4GjkaL96J/4ZpYnrc+qYlejDu4Xvz5r3M977vLSDQhz/YHqQgGwUpPW5bwLDOkQGwDQoMNhGBwaq8I5NWspjV0g7m0LGDfK68iATVSngXCbR0Eb95mdA7OvJCT4iTEyG8QZbxTr56YSCazf7V+9N+A2VB6J3SCMTWu+RrnEECJJSiezLp3RTu+I2x0ZHhMQSsMwKEDQqAm0DJKsKQBQlMcLeIoRb2VE5UsJp38o7v+FW/iu2Lbjdud7totbZaze1Wa7vZ2uJscLfTjXdaW80mVQwaG4wXvMGegYJbkXLQGEGTsX0ihl1fSu4VsySSpA+jMYG0YyX0UfOGKqgHKu7EHVmTBaXwhZrXBB9TymRu3FGqIGvmXsXv1B+u+QGXa8SRRAr7VNiVvuFC6RguND4TzTAaow0XvVCTBGpaz9Pj6BJ3QeH3FFU00RJRQcq4g66UBQ0Dbb2f7IodQ8bsObgtnP/ueUJKs+e+0P6i5/B604t4vWoag8q+ZlfuupgR7TbBujBR/M1dt912X2pzODtz/210Z00D0fd+9T7w13yS/sE8zETTY8gtHxlndeA0JGdPwLJgk2SMLJNPo/gwqbMTakgWk7lKdQEn0Z9E29Fmqv60eTsd5PK5qtThAuYCxx71Z6PSQeOgVA4TUxPqIr3yPH2uEysb9YNS9Kjx5ZC9+by8hK8ef4pKZQzvl4/fLiTUeWZvNX0hU+mwFJ0/PTy8bNSXfgPgOpYiAAAAeJxjYGRgYABiM8brvPH8Nl8ZuJlfAEUYzh0KegyhpRb///J/PnMzsxyQy8HABBIFAFbEDQcAAAB4nGNgZGBgDvqfxRDF/IKB4f9n5k4GoAgKYAcAiUUFiwPoAAAB1gAAA0gAAAOgAAADoAAAAxEAAAN8AAAAAAAAAEQAhgC8APQBQgGZAAEAAAAHACgAAgAAAAAAAgAKABcAbgAAAEEJkQAAAAB4nIWQy0rDQBSG//QmtqCg4E6ZlbQI6Q03rgqVFnHXRQV3aZwmKelMmUyFrn0En8KN7+DKt/BZ/JsMIgVry7Tf+c6ZyzkATvAFD8XnmqtgD8eMCi7hALeOy/T3jivkR8dVNJA4rtFbx3Vc4cVxA6d45wle5ZDRAh+OPVx4V45LOPLuHJfpHxxXyGvHVZx5r45r9G+O65h6n44buCydD/VqY5IotqI5bIlep9sXs43QVIkKUhGsbaxNJgZirpWVaar9UC9TbgmzWBqZhFplExmt08Ds2J1wKk2WaCW6fmcnM5ZKmsDKp+3N2XPUs3Yu5kYvxcjdKVZGL2Ro/dja1U27/fstGEJjhQ0Mhxsh5lgFmrQt/vfQQRd90owVgpVFVQKFAClNgDV3xHkmYzzgmjNStJIVKdlHyN8lubglZGXMrOFK8pyimTCKeFrKM80/tfuz09xkNNtYsAOffezfM2akchvkL3/66TnDM9/Vo7XsbNudybsRGO30KTjHbW5BE9L7+TQt7Q3a/P4xl29Kt52seJxjYGKAAC4G7ICdgYGRiZGZkYWRlZGNkZ0tOTEvOTWHD0LpJmcWJeekpjCVFrCk5JfnsSbn5BenshWnJhYlZzAwAABwrA9SS7gAyFJYsQEBjlm5CAAIAGMgsAEjRLADI3CyBCgJRVJEsgoCByqxBgFEsSQBiFFYsECIWLEGA0SxJgGIUVi4BACIWLEGAURZWVlZuAH/hbAEjbEFAEQAAA==') format('woff'),url('https://robwu.nl/lyricshere/icons/v3.7/lyricshereicons.ttf') format('truetype'),url('https://robwu.nl/lyricshere/icons/v3.7/lyricshereicons.svg#lyricshereicons') format('svg');font-weight:normal;font-style:normal}.L759-font-icon,.L759-font-icon *{font-family:'lyricshereicons' !important;font-style:normal;font-weight:normal;speak:none}\n.center-icon{text-align:center;line-height:1.1em}\n.L759-overlay{position:fixed;bottom:0;right:0;width:100%;height:100%;background-color:transparent !important;z-index:2000000001}\n.L759-overlay,.L759-container,.L759-container *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}\n.L759-noselect::-moz-selection{background-color:transparent}\n.L759-noselect::selection{background-color:transparent}\n.L759-container~.ui-front.ui-widget-overlay,.L759-container~.ui-front.ui-dialog{z-index:2000000002}\n.L759-container{position:fixed;top:2px;right:2px;width:275px;z-index:2000000002;overflow:hidden;background-color:#fff !important;color:#000 !important;border:1px solid #bbe !important;padding:5px 1px 1px 5px;display:block;border-radius:5px 5px 5px 0;min-height:25px;min-width:67px;-webkit-box-shadow:1px 1px 4px lightGrey;box-shadow:1px 1px 4px lightGrey;font-size:14px;font-family:arial,sans-serif}.L759-container.boxsizingbug{min-height:17px;min-width:59px}\n.L759-container *{color:inherit !important;font-size:inherit;font-family:inherit}\n.L759-container,.L759-container *{line-height:1.1em;text-align:left}\n.L759-container button,.L759-container input{display:inline-block;height:20px;margin:0;border:0;background-color:transparent !important;padding:0;line-height:1.2em;font-size:13px;color:#000 !important}\n.L759-container .L759-buttons button{background-color:#ccc !important;cursor:pointer;padding:0 5px;font-size:16px;color:#333 !important}\n.L759-container .L759-chrome-permission-request{font-weight:bold;font-size:1.1em}.L759-container .L759-chrome-permission-request,.L759-container .L759-chrome-permission-request .L759-permission-description{text-align:center}\n.L759-container .L759-chrome-permission-request button{height:auto;margin:3px;border:0;padding:5px 8px;line-height:1;font-weight:bold;font-size:inherit}.L759-container .L759-chrome-permission-request button.L759-b-yes{background-color:#480 !important;color:#fff !important}.L759-container .L759-chrome-permission-request button.L759-b-yes:hover{background-color:#370 !important}\n.L759-container .L759-chrome-permission-request button.L759-b-no{background-color:#d10 !important;color:#eee !important}.L759-container .L759-chrome-permission-request button.L759-b-no:hover{background-color:#c00 !important}\n.L759-container a,.L759-container .L759-link-style{cursor:pointer;color:#438bc5 !important;text-decoration:none}\n.L759-container a:hover,.L759-container .L759-link-style:hover{text-decoration:underline;background-color:transparent !important}\n.L759-container .L759-title{border-bottom:3px double #99f !important;font-size:17px;line-height:15px;height:22px;margin-right:25px;overflow:hidden;cursor:move;white-space:nowrap;text-overflow:ellipsis}\n.L759-container .L759-close{position:absolute;height:25px;width:25px;top:0;right:0;z-index:50;cursor:pointer;display:block;background-color:#f50 !important;color:#eee !important;font-size:17px;text-align:center;line-height:1.1em}\n.L759-container .L759-close:hover{background-color:#f50 !important;color:#fff !important}\n.L759-container .L759-top-bar{border:0;border-bottom:1px solid;border-bottom-color:#759 !important;padding:2px 0;position:relative;z-index:1}.L759-container .L759-top-bar .L759-link-container{text-align:center}\n.L759-container .L759-top-bar .L759-toggle-info{display:inline-block;padding:0 3px;border:1px solid;cursor:default;color:#438bc5 !important;border-color:transparent !important}.L759-container .L759-top-bar .L759-toggle-info:not(.L759-info-toggled):hover{border-style:dotted}\n.L759-container .L759-top-bar .L759-toggle-info:hover,.L759-container .L759-top-bar .L759-toggle-info.L759-info-toggled{position:relative;z-index:1;padding-bottom:1px;margin-bottom:-1px;background-color:#fff !important;border-color:#759 !important;border-bottom-color:#fff !important}.L759-container .L759-top-bar .L759-toggle-info:hover+.L759-info-wrapper,.L759-container .L759-top-bar .L759-toggle-info.L759-info-toggled+.L759-info-wrapper{display:block}\n.L759-container .L759-top-bar .L759-info-wrapper{display:none;position:relative}.L759-container .L759-top-bar .L759-info-wrapper:hover{display:block}\n.L759-container .L759-top-bar .L759-info{position:absolute;border:1px solid;border-color:#759 !important;min-height:40px;width:100%;padding:2px 2px 2px 40px;background:2px 2px no-repeat url(\"https://robwu.nl/lyricshere/icons/32.png\") !important;background-color:#fff !important}.L759-container .L759-top-bar .L759-info.L759-http{background-image:url(\"http://robwu.nl/lyricshere/icons/32.png\") !important}\n.L759-container .L759-top-bar .L759-info .L759-song-title{font-style:italic}\n.L759-container .L759-top-bar .L759-info .L759-link-to-found-source{font-weight:bold}\n.L759-container .L759-content{overflow:auto;word-wrap:break-word}.L759-container .L759-content>div{padding-top:2px}\n.L759-container .L759-content .L759-lyrics-line{min-height:1.1em;padding-left:1em;text-indent:-1em}.L759-container .L759-content .L759-lyrics-line.L759-highlight{background-color:#ff0}\n.L759-container .L759-content .L759-result[dir=rtl] .L759-lyrics-line{padding-left:0;padding-right:1.2em}\n.L759-container .L759-line-finder-wrapper{position:relative;display:block;width:100%;height:0;z-index:1}\n.L759-container .L759-line-finder{position:absolute;width:100%;height:1.5em;bottom:0;background-color:#fff;padding-right:60px;border:1px solid #ce8500;-webkit-box-shadow:0 0 3px #ce8500;box-shadow:0 0 3px #ce8500;display:none}.L759-container .L759-line-finder.L759-visible{display:block}\n.L759-container .L759-line-finder .L759-finder-searchterms{width:100%;height:100%;line-height:1;font-size:.9em;padding-left:1px;position:relative;z-index:1}\n.L759-container .L759-line-finder.L759-line-notfound .L759-finder-searchterms{outline:1px solid #f33;outline-offset:0}\n.L759-container .L759-line-finder button{position:absolute;top:0;bottom:0;width:20px;height:100%;background-color:#e4e4e4 !important;color:#666 !important;text-align:center;line-height:1.1em;font-size:12px;padding:4px}.L759-container .L759-line-finder button:hover,.L759-container .L759-line-finder button:focus,.L759-container .L759-line-finder button:active{background-color:#d3d3d3 !important;color:#000 !important}\n.L759-container .L759-line-finder button:active{background-color:#ddd !important}\n.L759-container .L759-line-finder .L759-find-prev{right:40px}\n.L759-container .L759-line-finder .L759-find-next{right:20px}\n.L759-container .L759-line-finder .L759-find-hide{right:0}.L759-container .L759-line-finder .L759-find-hide :last-child{display:none}\n.L759-container .L759-line-finder .L759-find-hide :last-child :first-child,.L759-container .L759-line-finder .L759-find-hide:hover :first-child,.L759-container .L759-line-finder .L759-find-hide:focus :first-child,.L759-container .L759-line-finder .L759-find-hide:active :first-child{display:none}\n.L759-container .L759-line-finder .L759-find-hide :last-child :last-child,.L759-container .L759-line-finder .L759-find-hide:hover :last-child,.L759-container .L759-line-finder .L759-find-hide:focus :last-child,.L759-container .L759-line-finder .L759-find-hide:active :last-child{display:inline}\n.L759-container .L759-searchbox{padding-left:12px;line-height:16px;width:100%}.L759-container .L759-searchbox .L759-searchterms{width:100%;float:left;margin:0 -30px 0 0;padding:0 30px 0 0;border:1px solid lightGrey !important}.L759-container .L759-searchbox .L759-searchterms:-moz-placeholder{color:#cacaca !important}\n.L759-container .L759-searchbox .L759-searchterms::-moz-placeholder{color:#cacaca !important}\n.L759-container .L759-searchbox .L759-searchterms::-webkit-input-placeholder{color:#cacaca !important}\n.L759-container .L759-searchbox .L759-searchterms:-ms-input-placeholder{color:#cacaca !important}\n.L759-container .L759-searchbox .L759-searchterms:focus:-moz-placeholder{color:transparent !important}\n.L759-container .L759-searchbox .L759-searchterms:focus::-moz-placeholder{color:transparent !important}\n.L759-container .L759-searchbox .L759-searchterms:focus::-webkit-input-placeholder{color:transparent !important}\n.L759-container .L759-searchbox .L759-searchterms:focus:-ms-input-placeholder{color:transparent !important}\n.L759-container .L759-searchbox .L759-dosearch{width:30px;background-color:#fafafa !important;color:#666 !important;border:1px solid lightGrey !important;height:20px;text-align:center;line-height:1.1em;font-weight:bold;font-size:13px;cursor:default}.L759-container .L759-searchbox .L759-dosearch:hover,.L759-container .L759-searchbox .L759-dosearch:focus,.L759-container .L759-searchbox .L759-dosearch:active{background-color:#fcfcfc !important;color:#000 !important}\n.L759-container .L759-searchbox .L759-dosearch:active{background-color:#eee !important}\n.L759-container .L759-searchbox .L759-searchterms,.L759-container .L759-searchbox .L759-dosearch{border-bottom-right-radius:5px}\n.L759-container .L759-resizer{position:absolute;left:0;bottom:0;width:17px;height:17px;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAKklEQVQ4jWMIDQ39z0ApABkyahCmRooNwqZppBtEjCaCBhGradSgATAIAGuTiXfwFGCyAAAAAElFTkSuQmCC\") !important;cursor:sw-resize}\n.L759-skin-dark{background-color:#000 !important;color:#ccc !important;border-color:#888 !important;-webkit-box-shadow:1px 1px 4px #777;box-shadow:1px 1px 4px #777}.L759-skin-dark button,.L759-skin-dark input{background-color:transparent !important;color:#ccc !important}\n.L759-skin-dark .L759-buttons button{background-color:#333 !important;color:#999 !important}\n.L759-skin-dark a,.L759-skin-dark .L759-link-style{color:#8dd !important}\n.L759-skin-dark .L759-title{border-bottom-color:#aaa !important}\n.L759-skin-dark .L759-close{background-color:#555 !important;color:#bbb !important}.L759-skin-dark .L759-close:hover{background-color:#777 !important;color:#e0e0e0 !important}\n.L759-skin-dark .L759-top-bar{border-bottom-color:#aaa !important}.L759-skin-dark .L759-top-bar .L759-toggle-info{color:#8dd !important}.L759-skin-dark .L759-top-bar .L759-toggle-info:hover,.L759-skin-dark .L759-top-bar .L759-toggle-info.L759-info-toggled{background-color:#000 !important;border-color:#aaa !important;border-bottom-color:#000 !important}\n.L759-skin-dark .L759-top-bar .L759-info{border-color:#aaa !important;background-color:#000 !important;background-image:url(\"https://robwu.nl/lyricshere/icons/32-dark.png\") !important}.L759-skin-dark .L759-top-bar .L759-info.L759-http{background-image:url(\"http://robwu.nl/lyricshere/icons/32-dark.png\") !important}\n.L759-skin-dark .L759-content .L759-lyrics-line.L759-highlight{background-color:#7b2d00}\n.L759-skin-dark .L759-line-finder{background-color:#000;border:1px solid #777;-webkit-box-shadow:0 0 3px #777;box-shadow:0 0 3px #777}.L759-skin-dark .L759-line-finder button{background-color:#474747 !important;color:#7a7a7a !important;border-color:#444 !important}.L759-skin-dark .L759-line-finder button:hover,.L759-skin-dark .L759-line-finder button:focus,.L759-skin-dark .L759-line-finder button:active{background-color:#777 !important;color:#cacaca !important}\n.L759-skin-dark .L759-line-finder button:active{background-color:#666 !important}\n.L759-skin-dark .L759-searchbox .L759-searchterms{border-color:#444 !important}.L759-skin-dark .L759-searchbox .L759-searchterms:-moz-placeholder{color:#cacaca !important}\n.L759-skin-dark .L759-searchbox .L759-searchterms::-moz-placeholder{color:#cacaca !important}\n.L759-skin-dark .L759-searchbox .L759-searchterms::-webkit-input-placeholder{color:#cacaca !important}\n.L759-skin-dark .L759-searchbox .L759-dosearch{background-color:#888 !important;color:#000 !important;border-color:#444 !important}.L759-skin-dark .L759-searchbox .L759-dosearch:hover,.L759-skin-dark .L759-searchbox .L759-dosearch:focus,.L759-skin-dark .L759-searchbox .L759-dosearch:active{background-color:#aaa !important;color:#000 !important}\n.L759-skin-dark .L759-searchbox .L759-dosearch:active{background-color:#777 !important}\n";
    }), r("text!templates/lyricsPanel.html", [], function() {
        return '<div class="L759-title"></div>\n<button class="L759-close L759-font-icon">&#10006;</button>\n<div class="L759-top-bar">\n  <div class="L759-link-container">\n    <span class="L759-switch-source L759-link-style">\n      &raquo; Different source (<span class="L759-sourceindex"></span> / <span class="L759-sourcecount"></span>)\n    </span>\n    <div class="L759-toggle-info">&raquo; Info</div>\n    <div class="L759-info-wrapper">\n      <div class="L759-info">\n        <div class="L759-song-info">\n        The lyrics for <span class="L759-song-title"></span> were retrieved from <a class="L759-link-to-found-source" target="_blank" rel="noreferrer"></a>.\n        </div>\n        <br>\n        &raquo; <a class="L759-settings-link" href="https://robwu.nl/lyricshere/#config" target="_blank">Settings for \'Lyrics Here\'</a>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="L759-content">\n  <div class="L759-fetching">\n    <div class="L759-buttons">\n      <button class="L759-b-abort">Abort</button>\n      <button class="L759-b-retry">Retry</button>\n      <button class="L759-b-next">Next</button>\n    </div>\n    <div class="L759-status">\n    Loading <a class="L759-link-to-fetched-source" target="_blank" rel="noreferrer">nothing</a>.\n    <br><br>\n    <div class="L759-chrome-permission-request"></div>\n    &raquo; <a class="L759-settings-link" href="https://robwu.nl/lyricshere/#config" target="_blank">Settings for \'Lyrics Here\'</a>\n    </div>\n  </div>\n  <div class="L759-done">\n    <div class="L759-result"></div>\n  </div>\n</div>\n<div class="L759-line-finder-wrapper">\n  <div class="L759-line-finder">\n    <input type="text" class="L759-finder-searchterms" placeholder=" search within lyrics" title="Search within lyrics">\n    <button class="L759-find-prev L759-font-icon" title="Find previous (Shift + Enter)">&#9650;</button>\n    <button class="L759-find-next L759-font-icon" title="Find next (Enter)">&#9660;</button>\n    <button class="L759-find-hide L759-font-icon" title="Hide (Esc)"><span>&times;</span><span>&#216;</span></button>\n  </div>\n</div>\n<div class="L759-searchbox">\n  <input type="text" class="L759-searchterms" placeholder=" artist - song">\n  <button class="L759-dosearch L759-font-icon">&#128269;</button>\n</div>\n<div class="L759-resizer"></div>\n';
    }), r("text!style/pageAction.css", [], function() {
        return ".LyricsHereByRobWPageActionIcon {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  position: fixed;\n  top: 50px;\n  right: 0;  \n  z-index: 2000000003;\n  display: inline-block;\n  height: 30px;\n  width: 30px;\n  margin: 0;\n  border: 1px solid #999;\n  padding: 0;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAMHAAADBwBtrwaCQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALgSURBVEjH7ZZJSJtBFMc9iiCINxHxIKIHD15cEFwOgriAy82DKHgVxJuCoriUFmyKVYrUtlGr1UKNrUutGqIGqVaDsRYNibWJSww1Rk0kLlX7L+/BN00EU7XYQu2DgW+GN/Obee/Nfz4v/GHzuj3Ao6PTay0wMrKC9XX71YAbGw4EBt6/FrCsTAm1evX3gSbTHo9Ltri4BYfjmNv4uAmDgwZsbx9gedmGnZ1DN7/eXh0MBhv3yZ98JyfXPAPb2z8iN/eV6AcE1MNmO0BaWicyMl6guHgIc3MW9lEodOxTXq5CcPADlJS8Q0PDNIzGXYSENPB4UdFbz0C7/YghJydnWFqyIjb2CY+npnZApTIKPwlIefT2ruV5krW1zSM9vROHhyeXy2FWVjeHQyabQnX1hEcgjUVHt7jNPz4+5dPSqWtqJn4NHBszcvji459xrjwBKecUEYKct60tJ0JDH3LuBdDHpw75+b2iUfLJaNcJCXIx+SIgGeU1JqYFpaVK1Naq0dOzxCekflCQjIvLSzo6nca1SZVXWPgGHR0LArCw8BW7uz+rkvJrtTpFnwqpq+sTNJpNPllfnx4DAwax3oVK09j4gSsyM7MLZ2ffb17aKMxSWP+L97WBSuUXjI6uuDlUVY2zPN0IkBavrBxzc/DzuwuLZf/vAOm6JCe3892bmlrnMb1+G9nZ3YiKesx3jqy/X4+kpFYUFLyGVmvxDExMlDNUaqSPBKSqJSEmwMyMmeWKjKQvJeU5ayi9HjqdFWFhjVhd3eMURUQ88gykeyeXa0UjBSIgfUdGNouNkIzR7gmYk/NSrFFf/x5xcU+FH0Vobc1+9ZA2N2tY5oaGlkUjJTkPrKtTc9hd/VyV6dJAelB9fe9wfpzObzCbHSKkrsDZWTP8/e/xrwc9S5ub+xeHtLV1nkPnavRa0MNLNjz8mXcfHt6EvDwFj01Pb6CiQuU2h0Sbiob8pIf3lirNPwn8AZ71KOgp+CxGAAAAAElFTkSuQmCC') center no-repeat !important;\n  cursor: pointer;\n}\n.LyricsHereByRobWPageActionIcon:hover {\n  border-color: #000;\n}\n/*YouTube*/\n#watch-headline-title .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  top: 1px;\n  right: 0;\n}\n/*Grooveshark*/\n#header-user-assets .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  left: -35px;\n  top: 11px;\n}\n/*Grooveshark Retro*/\n.GSRetroPageAction.LyricsHereByRobWPageActionIcon {\n  position: relative;\n  top: 3px;\n  right: 9px;\n  float: right;\n}\n#footer > #player .LyricsHereByRobWPageActionIcon ~ #player_controls_seeking {\n  margin-left: 220px; /* was 190px */\n}\n/*Grooveshark HTML5*/\n#page-header .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  top: 6px;\n  left: 50px;\n  right: auto;\n}\n\n/*Spotify Web client*/\n#wrapper > .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  top: 0;\n  right: 0;\n  opacity: 0.6;\n}\n#wrapper > .LyricsHereByRobWPageActionIcon:hover {\n  opacity: 1;\n}\n\n/*Deezer*/\nsection.topbar > .LyricsHereByRobWPageActionIcon {\n  position: static;\n  float: right;\n  margin-right: 8px;\n}\n\n/*8tracks*/\n#player_box > .LyricsHereByRobWPageActionIcon {\n  position: fixed;\n  top: auto;\n  bottom: 20px; /*center-align button (as of 8 feb 2014) */\n  right: 10px;\n  outline: 2px solid #222; /* only noticeable in small windows, used to make the button stand out */\n}\n\n/*Rdio*/\n.settings_button + .LyricsHereByRobWPageActionIcon {\n  position: static;\n}\n\n/*Xbox Music*/\n#footer > .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  top: auto;\n  right: 2px;\n  bottom: 2px;\n}\n\n/*Google Music*/\n#player-right-wrapper ~ .LyricsHereByRobWPageActionIcon {\n  position: absolute;\n  top: -32px;\n  right: 2px;\n}\n";
    }), r("eventBridge", [ "text!style/pageAction.css" ], function(e) {
        var t, r = {}, n = [], o = function(e, t) {
            var o = r[e] ? r[e].slice(0) : [];
            if (n.push({
                data: t,
                callbacks: o
            }), 1 === n.length) for (;n.length > 0; ) {
                t = n.shift(), o = t.callbacks, t = t.data;
                for (var i = 0; o.length > i; i++) o[i](t);
            }
        }, i = function(e, t) {
            if ("function" != typeof t) throw Error("Callback must be a function!");
            (r[e] || (r[e] = [])).push(t);
        }, s = function() {
            if (!t) {
                var r = document.createElement("style");
                r.appendChild(document.createTextNode(e)), (document.head || document.documentElement).appendChild(r), 
                t = document.createElement("div"), t.className = "LyricsHereByRobWPageActionIcon", 
                t.title = "Click to show the Lyrics panel.\nPress CTRL and click to hide this button.", 
                t.addEventListener("click", function(e) {
                    c(), e.ctrlKey || o("toggle");
                });
            }
            (document.body || document.documentElement).appendChild(t), o("iconinserted", t);
        }, c = function() {
            t && t.parentNode && t.parentNode.removeChild(t);
        }, a = function() {
            r = {}, n = [], c(), i("attached", c), i("detached", s);
        };
        return a(), {
            dispatchEvent: o,
            listenEvent: i,
            reset: a
        };
    }), r("touch2mouse", [], function() {
        function e(e) {
            return function(t) {
                var r = t.changedTouches;
                r && (r = r[0], t.preventDefault(), t = document.createEvent("MouseEvents"), t.initMouseEvent(e, !0, !0, document.defaultView, 1, r.screenX, r.screenY, r.clientX, r.clientY, r.ctrlKey, r.altKey, r.shiftKey, r.metaKey, 0, null), 
                r.target.dispatchEvent(t));
            };
        }
        var t = "ontouchend" in document, r = {}, n = {}, o = function(t, o) {
            r[o] = t, n[t] = e(o);
        };
        o("touchstart", "mousedown"), o("touchmove", "mousemove"), o("touchend", "mouseup");
        var i = {
            events: n,
            supportsTouch: t,
            addTouchListener: function(e, t) {
                if (i.supportsTouch) {
                    var o = r[t];
                    o && e.addEventListener(o, n[o], !1);
                }
            },
            removeTouchListener: function(e, t) {
                if (i.supportsTouch) {
                    var o = r[t];
                    o && e.removeEventListener(o, n[o], !1);
                }
            }
        };
        return i;
    }), r("isLeftMouseReleased", [], function() {
        function e(e) {
            return "buttons" in e && t ? !(1 | e.buttons) : r || n ? 0 === e.which : void 0;
        }
        var t = true, r = false, n = true;
        return e;
    }), r("LineFinder", [ "require", "exports", "module" ], function(e, t) {
        function r(e) {
            return this instanceof r ? (this.update(e), void 0) : new r(e);
        }
        function n(e) {
            return e.toLocaleLowerCase().replace(/[.,!?'"`:;\[\]()\/\-]/g, "").replace(/\s+/g, " ");
        }
        function o(e) {
            for (var t = [], r = "", o = 0; e.length > o; ++o) {
                var i = e[o], s = n(i.textContent), c = {
                    node: i,
                    start: r.length
                };
                r += s, c.end = r.length - 1, t.push(c);
            }
            return {
                allText: r,
                allTextLength: r.length,
                index: t,
                indexLength: t.length
            };
        }
        function i(e, t) {
            if (0 > t) return null;
            for (var r = null, n = 0; e.indexLength > n; ++n) {
                var o = e.index[n];
                if (o.start > t) break;
                r = o.node;
            }
            return r;
        }
        function s(e, t) {
            if (!t) return -1;
            for (var r = 0; e.indexLength > r; ++r) if (e.index[r].node === t) return r;
            return -1;
        }
        function c(e, t, r, n, o) {
            if (!e.indexLength) return null;
            var c = s(e, r), a = o ? c : n ? c - 1 : c + 1;
            a >= e.indexLength ? a = n || o ? e.indexLength - 1 : 0 : 0 > a && (a = !n || o ? 0 : e.indexLength - 1);
            var l = e.index[a][n ? "end" : "start"], u = e.allText[n ? "lastIndexOf" : "indexOf"](t, l);
            -1 === u && (u = n ? e.allText.lastIndexOf(t, e.allTextLength) : e.allText.indexOf(t));
            var d = i(e, u);
            return d;
        }
        r.prototype.update = function(e) {
            e || (e = []), this.searchIndex = o(e), this.lastKeyword = "", this.lastNode = null;
        }, r.prototype.findSmart = function(e) {
            return this.find(e, !1, !0);
        }, r.prototype.next = function(e) {
            return this.find(e, !1, !1);
        }, r.prototype.prev = function(e) {
            return this.find(e, !0, !1);
        }, r.prototype.find = function(e, t, r) {
            e = n(e);
            var o = c(this.searchIndex, e, this.lastNode, !!t, !!r);
            return this.lastKeyword = e, this.lastNode = o, o;
        }, t.LineFinder = r;
    }), r("LyricsPanel", [ "require", "exports", "module", "InfoProvider", "LyricsSource", "sources/lyrics", "SimpleTemplating", "text!style/lyricsPanel.css", "text!templates/lyricsPanel.html", "eventBridge", "config", "musicSites", "algorithms", "touch2mouse", "isLeftMouseReleased", "LineFinder" ], function(e, t) {
        var r = e("InfoProvider").InfoProvider, n = e("LyricsSource").LyricsSource, o = e("sources/lyrics").getLyricsSources, i = e("SimpleTemplating").SimpleTemplating, s = e("text!style/lyricsPanel.css"), c = e("text!templates/lyricsPanel.html"), a = e("eventBridge"), l = e("config"), u = e("musicSites"), d = e("algorithms"), p = e("touch2mouse"), h = e("isLeftMouseReleased"), m = e("LineFinder").LineFinder, f = "." + u.getIdentifier(location.href);
        "." === f && (f = ""), c = {
            className: "L759-container",
            tagName: "div",
            innerHTML: c
        };
        var g = Object.prototype.hasOwnProperty, y = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, v = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        }, b = function(e, t) {
            if (t) {
                for (var r in t) g.call(t, r) && (e[r] = t[r]);
                return e;
            }
        }, L = function(e) {
            return !(!e || !(document.documentElement.contains ? document === e || document.documentElement.contains(e) : 16 & document.compareDocumentPosition(e)));
        }, S = {}, w = {};
        w.panelElement = null, w.getCurrentStyle = function() {
            return document.defaultView.getComputedStyle(w.panelElement);
        }, w.infoProvider = null, w.runQueuedQuery = null, w.minWidth = 0, w.minHeight = 0, 
        w.boxsizingbug = !1, w.boxsizingcomputedstylebug = !1, w.runQuery = function(e, t) {
            e = b({}, e);
            var n = "";
            if (e.song && e.artist) n = "result"; else {
                if (e.searchTerms || (e.searchTerms = e.videotitle), !e.searchTerms) return;
                n = "search";
            }
            if (w.runQueuedQuery = function() {
                w.runQueuedQuery = null, w.infoProvider.query(n, e, w.queryCallback, t);
            }, w.infoProvider) w.runQueuedQuery(); else {
                if (0 === w.infoProvider) return;
                w.infoProvider = 0, o(function(e) {
                    S = e.stats, w.infoProvider = new r(e), w.runQueuedQuery();
                });
            }
        }, w.abortQuery = function() {
            w.runQueuedQuery && (x = w.runQueuedQuery, w.runQueuedQuery = null), w.infoProvider && w.infoProvider.abort();
        };
        var x;
        w.resumeQuery = function() {
            x && x();
        }, w.queryCallback = function(e) {
            switch (w.attachPanel(), x = null, e.type) {
              case "fetching":
                w.render.fetchingLyrics(e), x = e.retry;
                break;

              case "fail":
                e.next ? e.next() : w.render.notFound(e);
                break;

              case "found":
                if (e.restart) {
                    var t = {
                        type: "fail",
                        sourceIndex: e.sourceIndex,
                        sourceCount: e.sourceCount,
                        searchTerms: e.searchTerms,
                        query: e.query,
                        restart: e.restart
                    };
                    e.restart = function() {
                        w.queryCallback(t);
                    };
                }
                w.render.foundLyrics(e);
                break;

              case "message":
                w.render.showMessage(e);
                break;

              default:
                return v("YTL:queryCallback", "unknown_type", "Unknown type " + e.type + '. Expected one of "fetching", "fail" or "found"!'), 
                void 0;
            }
            w.panelHelpers.dimensions.adaptPanelToResult(), M.update();
        };
        var _ = {
            top: 0,
            right: 0,
            width: 0,
            height: 0
        };
        w.dispatchDimensionChangeIfNeeded = function() {
            var e, t, r, n;
            if (w.isVisible()) {
                var o = w.panelElement.style;
                e = parseFloat(o.top), t = parseFloat(o.right), r = parseFloat(o.width), n = parseFloat(o.height);
            } else e = t = r = n = 0;
            if (_.top !== e || _.right !== t || _.width !== r || _.height !== n) {
                var i = {
                    top: e,
                    right: t,
                    width: r,
                    height: n
                };
                _ = i, a.dispatchEvent("panelDimensions", i);
            }
        }, w.isVisible = function() {
            return L(w.panelElement);
        }, w.detachPanel = function() {
            w.abortQuery(), w.isVisible() && (w.render.unbindInitialEvents(), w.panelElement.parentNode.removeChild(w.panelElement)), 
            L(w.styleSheet) && w.styleSheet.parentNode.removeChild(w.styleSheet), clearInterval(A), 
            w.panelHelpers.mover.end(), w.panelHelpers.resizer.end(), w.panelHelpers.overlay.detach(), 
            y("YTL:detachPanel", "detached", "Removed Lyrics panel."), a.dispatchEvent("detached"), 
            w.dispatchDimensionChangeIfNeeded();
        }, w.attachPanel = function() {
            var e = !w.panelElement;
            w.styleSheet || (w.styleSheet = document.createElement("style"), w.styleSheet.appendChild(document.createTextNode(s))), 
            e && (w.panelElement = i(c).getElement(), w.panelElement.dir = "ltr", w.panelElement.style.top = w.savedOffsets.top + "px", 
            w.panelElement.style.right = w.savedOffsets.right + "px", w.panelElement.style.width = w.savedOffsets.width + "px"), 
            L(w.styleSheet) || (document.head || document.documentElement).appendChild(w.styleSheet), 
            w.isVisible() || (w.activateTheme(), (document.body || document.documentElement).appendChild(w.panelElement), 
            "fixed" != w.getCurrentStyle().position && w.pollPanelCSSActivation(), w.panelHelpers.dimensions.fixBoxSizing(), 
            w.render.bindInitialEvents(), M.initialize(), w.panelHelpers.dimensions.enforcePosition(), 
            e ? w.panelHelpers.dimensions.adaptPanelToResult() : w.panelHelpers.dimensions.enforceDimensions(), 
            w.panelHelpers.dimensions.enforcePosition() && w.panelHelpers.dimensions.enforceDimensions(), 
            w.resumeQuery(), a.dispatchEvent("attached"), w.dispatchDimensionChangeIfNeeded());
        };
        var A;
        w.pollPanelCSSActivation = function() {
            var e = Date.now(), t = setInterval(function() {
                "fixed" == w.getCurrentStyle().position ? (clearInterval(t), w.panelHelpers.dimensions.adaptPanelToResult()) : Date.now() - e > 2e4 && clearInterval(t);
            }, 50);
        }, w.activateTheme = function() {
            var e = function(e) {
                var t = w.panelElement || c;
                t.className = t.className.replace(/L759-skin-\S+/, "") + (e && "default" != e ? " L759-skin-" + e : "");
            }, t = function(e) {
                var t = e && document.defaultView.getComputedStyle(e);
                return t && /^rgba?\(\d{1,2},\s*\d{1,2},\s*\d{1,2}(,\s*(?!0)\d*)?\)$/.test(t.backgroundColor);
            };
            l.getItem("theme" + f, function(r) {
                "dark" == r || "default" == r ? e(r) : ".youtube" == f && t(document.body) || ".grooveshark" == f && t(document.getElementById("page-inner")) ? e("dark") : e("");
            }), l.getItem("fontSize" + f, function(e) {
                "string" == typeof e && w.panelElement && (w.panelElement.style.fontSize = e);
            });
        }, w.activateTheme();
        var k = "panelOffsets" + f;
        w.savedOffsets = {
            top: 2,
            right: 2,
            width: 275,
            maxHeight: 600
        };
        var E, T = 1, C = 2;
        w.saveOffsets = function(e) {
            if (!w.isVisible()) return y("LyricsPanel.saveOffsets", "not_rendered", "Lyric panel cannot be found within the document!"), 
            void 0;
            var t = w.savedOffsets, r = w.getCurrentStyle(), n = function(e, r) {
                r = parseFloat(r), !isNaN(r) && isFinite(r) && (t[e] = r);
            };
            e & T && (n("top", r.top), n("right", r.right)), e & C && (w.boxsizingcomputedstylebug ? (n("width", w.panelElement.style.width), 
            n("maxHeight", w.panelElement.style.height)) : (n("width", r.width), n("maxHeight", r.height))), 
            clearTimeout(E), E = setTimeout(function() {
                l.setItem(k, t, function(e) {
                    e ? y("LyricsPanel.saveOffsets", "", "Saved Lyric panel's position and dimensions!") : y("LyricsPanel.saveOffsets", "", "Failed to save the Lyric panel's position and dimensions!");
                });
            }, 200);
        };
        var R = 0, I = [];
        w.loadOffsets = function(e) {
            2 == R ? e(w.savedOffsets) : 1 == R ? I.push(e) : (R = 1, I.push(e), l.getItem(k, function(t) {
                if (t) {
                    var r = function(e) {
                        g.call(t, e) && (w.savedOffsets[e] = t[e]);
                    };
                    r("top"), r("right"), r("width"), r("maxHeight");
                }
                for (;e = I.shift(); ) e(w.savedOffsets);
                R = 2;
            }));
        }, w.panelHelpers = {}, w.panelHelpers.show = function(e) {
            e.style.display = "";
        }, w.panelHelpers.hide = function(e) {
            e.style.display = "none";
        }, w.panelHelpers.doSearch = function() {
            var e = w.panelElement.querySelector(".L759-searchterms").value, t = d.splitSongTitle(e);
            t ? w.runQuery({
                searchTerms: e,
                artist: t[0],
                song: t[1]
            }) : w.runQuery({
                searchTerms: e
            });
        }, w.panelHelpers.dimensions = {}, w.panelHelpers.dimensions.getViewportDimensions = function() {
            var e = w.panelHelpers.overlay.isAttached();
            w.panelHelpers.overlay.attach();
            var t = w.overlayElement.getBoundingClientRect(), r = t.right, n = t.bottom;
            return e || w.panelHelpers.overlay.detach(), {
                width: r,
                height: n
            };
        };
        var $;
        w.panelHelpers.dimensions.fixBoxSizing = function() {
            if (!$) {
                $ = 1;
                var e = document.createElement("div");
                e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;top:-999px;position:absolute;min-height:6px;padding:1px;border:0;", 
                document.documentElement.appendChild(e);
                var t = w.getCurrentStyle();
                w.minHeight = parseFloat(t.minHeight) || 25, w.minWidth = parseFloat(t.minWidth) || 25, 
                8 == e.scrollHeight && (w.boxsizingbug = !0, w.panelElement.className += " boxsizingbug"), 
                e.style.height = "8px", "8px" != window.getComputedStyle(e).height && (w.boxsizingcomputedstylebug = !0), 
                e.parentNode.removeChild(e), e = null;
            }
        }, w.panelHelpers.dimensions.enforceDimensions = function() {
            var e, t, r = w.getCurrentStyle(), n = w.panelElement.offsetWidth, o = w.panelElement.offsetHeight, i = parseFloat(r.top), s = parseFloat(r.right), c = w.minWidth, a = w.minHeight, l = w.panelHelpers.dimensions.getViewportDimensions(), u = l.width - s, d = l.height - i;
            n > u && (e = u), c > n && (e = c), o > d && (t = d), a > o && (t = a), e && (w.panelElement.style.width = e + "px"), 
            t && (w.panelElement.style.height = t + "px"), w.panelHelpers.dimensions.enforceContentHeight();
        }, w.panelHelpers.dimensions.enforcePosition = function() {
            var e = w.getCurrentStyle(), t = parseFloat(e.top) || 0, r = parseFloat(e.right) || 0, n = w.panelHelpers.dimensions.getViewportDimensions(), o = n.height, i = n.width;
            w.boxsizingcomputedstylebug ? (o -= parseFloat(w.panelElement.style.height) || w.minHeight, 
            i -= parseFloat(w.panelElement.style.width) || w.minWidth) : (o -= parseFloat(e.height) || w.minHeight, 
            i -= parseFloat(e.width) || w.minWidth);
            var s = !1;
            return t > o && (s = !0, w.panelElement.style.top = Math.max(0, o) + "px"), 0 > t && (s = !0, 
            w.panelElement.style.top = "0"), r > i && (s = !0, w.panelElement.style.right = Math.max(0, i) + "px"), 
            0 > r && (s = !0, w.panelElement.style.right = "0"), s;
        }, w.panelHelpers.dimensions.getFixedNonContentHeight = function() {
            var e = w.getCurrentStyle(), t = parseFloat(e.borderTopWidth) || 0, r = parseFloat(e.borderBottomWidth) || 0, n = parseFloat(e.paddingTop) || 0, o = parseFloat(e.paddingBottom) || 0, i = w.panelElement.querySelector(".L759-title").offsetHeight, s = w.panelElement.querySelector(".L759-top-bar").offsetHeight, c = w.panelElement.querySelector(".L759-searchbox").offsetHeight, a = t + r + n + o + s + i + c;
            return a;
        }, w.panelHelpers.dimensions.enforceContentHeight = function() {
            var e = Math.max(w.panelElement.offsetHeight, w.minHeight), t = w.panelHelpers.dimensions.getFixedNonContentHeight(), r = e - t;
            w.panelElement.querySelector(".L759-content").style.height = 0 > r ? 0 : r + "px";
        }, w.panelHelpers.dimensions.adaptPanelToResult = function() {
            var e = w.panelElement.querySelector(".L759-result"), t = w.panelElement.querySelector(".L759-content");
            t.style.overflow = "scroll";
            var r = e.scrollHeight;
            t.style.overflow = "", t = null, r || (r = w.panelElement.querySelector(".L759-fetching").scrollHeight), 
            r += 2;
            var n = w.panelHelpers.dimensions.getFixedNonContentHeight(), o = n + r, i = n;
            o > w.savedOffsets.maxHeight && (o = w.savedOffsets.maxHeight), i > o && (o = i), 
            w.panelElement.style.height = o + "px", w.panelHelpers.dimensions.enforceDimensions();
        };
        var H;
        w.panelHelpers.dimensions.togglePanelHeight = function() {
            var e = w.panelElement.offsetHeight, t = w.minHeight, r = 10;
            r > e - t ? (w.resumeQuery(), H ? (w.panelElement.style.height = H, w.panelHelpers.dimensions.enforceDimensions()) : w.panelHelpers.dimensions.adaptPanelToResult()) : (w.abortQuery(), 
            H = w.panelElement.style.height, w.panelElement.style.height = t + "px", w.panelHelpers.dimensions.enforceDimensions());
        }, w.panelHelpers.overlay = {}, w.panelHelpers.overlay.isAttached = function() {
            return !(!w.overlayElement || !L(w.overlayElement));
        }, w.panelHelpers.overlay.attach = function() {
            w.overlayElement || (w.overlayElement = document.createElement("div"), w.overlayElement.className = "L759-overlay"), 
            L(w.overlayElement) || ((document.body || document.documentElement).appendChild(w.overlayElement), 
            w.panelHelpers.dimensions.getViewportDimensions());
        }, w.panelHelpers.overlay.detach = function() {
            w.panelHelpers.overlay.isAttached() && w.overlayElement.parentNode.removeChild(w.overlayElement);
        }, w.panelHelpers.mover = {}, w.panelHelpers.mover.globalMouseMove = null, w.panelHelpers.mover.moverMouseDown = function(e) {
            if (1 === e.which && (e.stopPropagation(), e.preventDefault(), !w.panelHelpers.mover.globalMouseMove)) {
                var t = w.getCurrentStyle(), r = parseFloat(t.top) || 0, n = parseFloat(t.right) || 0, o = e.clientX, i = e.clientY, s = 0, c = 0, a = w.panelHelpers.dimensions.getViewportDimensions(), l = a.height - w.minHeight, u = a.width - w.minWidth;
                w.panelHelpers.mover.globalMouseMove = function(e) {
                    if (e.preventDefault(), !w.isVisible() || h(e)) return w.panelHelpers.mover.end(), 
                    void 0;
                    var t = r - i + e.clientY;
                    t > l && (t = l), s > t && (t = s);
                    var a = n + o - e.clientX;
                    a > u && (a = u), c > a && (a = c), w.panelElement.style.top = t + "px", w.panelElement.style.right = a + "px";
                }, w.panelHelpers.overlay.attach(), document.addEventListener("mousemove", w.panelHelpers.mover.globalMouseMove, !0), 
                document.addEventListener("mouseup", w.panelHelpers.mover.globalMouseUp, !0), p.addTouchListener(document, "mousemove"), 
                p.addTouchListener(document, "mouseup");
            }
        }, w.panelHelpers.mover.globalMouseUp = function(e) {
            e.preventDefault(), e.stopPropagation(), w.panelHelpers.dimensions.enforceDimensions(), 
            w.panelHelpers.mover.end(), w.dispatchDimensionChangeIfNeeded();
        }, w.panelHelpers.mover.end = function() {
            w.panelHelpers.mover.globalMouseMove && (document.removeEventListener("mousemove", w.panelHelpers.mover.globalMouseMove, !0), 
            p.removeTouchListener(document, "mousemove"), w.panelHelpers.mover.globalMouseMove = null, 
            document.removeEventListener("mouseup", w.panelHelpers.mover.globalMouseUp, !0), 
            p.removeTouchListener(document, "mouseup"), w.panelHelpers.overlay.detach(), w.saveOffsets(T));
        }, w.panelHelpers.resizer = {}, w.panelHelpers.resizer.globalMouseMove = null, w.panelHelpers.resizer.resizerMouseDown = function(e) {
            if (!w.panelHelpers.resizer.globalMouseMove && 1 === e.which) {
                e.preventDefault(), e.stopPropagation();
                var t = w.panelElement.offsetWidth, r = w.panelElement.offsetHeight, n = e.clientX, o = e.clientY, i = w.getCurrentStyle(), s = w.minWidth, c = w.panelHelpers.dimensions.getViewportDimensions(), a = c.width - (parseFloat(i.right) || 0), l = w.minHeight, u = c.height - (parseFloat(i.top) || 0);
                w.panelHelpers.resizer.globalMouseMove = function(e) {
                    if (e.preventDefault(), !w.isVisible() || h(e)) return w.panelHelpers.resizer.end(), 
                    void 0;
                    var i = t + n - e.clientX;
                    i > a && (i = a), s > i && (i = s);
                    var c = r - o + e.clientY;
                    c > u && (c = u), l > c && (c = l), w.panelElement.style.width = i + "px", w.panelElement.style.height = c + "px", 
                    w.panelHelpers.dimensions.enforceContentHeight();
                }, document.addEventListener("mousemove", w.panelHelpers.resizer.globalMouseMove, !0), 
                document.addEventListener("mouseup", w.panelHelpers.resizer.end, !0), p.addTouchListener(document, "mousemove"), 
                p.addTouchListener(document, "mouseup"), w.panelHelpers.overlay.attach();
            }
        }, w.panelHelpers.resizer.end = function() {
            w.panelHelpers.resizer.globalMouseMove && (document.removeEventListener("mousemove", w.panelHelpers.resizer.globalMouseMove, !0), 
            p.removeTouchListener(document, "mousemove"), w.panelHelpers.resizer.globalMouseMove = null, 
            document.removeEventListener("mouseup", w.panelHelpers.resizer.end, !0), p.removeTouchListener(document, "mouseup"), 
            w.panelHelpers.overlay.detach(), w.saveOffsets(C), w.dispatchDimensionChangeIfNeeded());
        }, w.panelHelpers.stayWithinViewport = function() {
            w.panelHelpers.dimensions.enforcePosition() && w.panelHelpers.dimensions.enforceDimensions();
        };
        var q, N = 0;
        w.panelHelpers.globalResize = function() {
            var e = 333, t = Date.now(), r = t - N;
            r > e ? (setTimeout(w.panelHelpers.stayWithinViewport, 4), N = t) : (N = t, clearTimeout(q), 
            q = setTimeout(w.panelHelpers.stayWithinViewport, e));
        }, w.panelHelpers.highlightLyricsLine = function(e, t) {
            var r = w.panelElement.querySelector(".L759-highlight");
            r && r.classList.remove("L759-highlight"), e && e.classList.contains("L759-lyrics-line") && (t && e === r || e.classList.add("L759-highlight"));
        };
        var M = {};
        M.lineFinder = new m(), M.hasLines = !1, M.initialize = function() {
            M.inputElement = w.panelElement.querySelector(".L759-finder-searchterms"), M.finderContainer = w.panelElement.querySelector(".L759-line-finder");
        }, M.update = function() {
            M.scrollableElement = w.panelElement.querySelector(".L759-content");
            var e = w.panelElement.querySelector(".L759-lyrics-line"), t = e ? e.parentNode.childNodes : [];
            M.hasLines = t.length > 0, M.lineFinder.update(t), M.lastKeyword = "", M.hasLines || M.hide();
        }, M.onInputChange = function() {
            var e = M.inputElement.value;
            if (M.lastKeyword !== e) {
                M.lastKeyword = e;
                var t = M.lineFinder.findSmart(e);
                M.highlight(t);
            }
        }, M.highlight = function(e) {
            if (w.panelHelpers.highlightLyricsLine(e), !e) return M.lastKeyword && M.finderContainer.classList.add("L759-line-notfound"), 
            void 0;
            M.finderContainer.classList.remove("L759-line-notfound");
            var t = e.getBoundingClientRect(), r = M.scrollableElement.getBoundingClientRect();
            if (t.bottom + 30 > r.bottom || t.top < r.top) {
                var n = t.height || t.bottom - t.top, o = r.height || r.bottom - r.top, i = t.top - r.top - (o - n) / 2;
                M.scrollableElement.scrollTop += i;
            }
        }, M.prev = function() {
            var e = M.lineFinder.prev(M.inputElement.value);
            M.highlight(e);
        }, M.next = function() {
            var e = M.lineFinder.next(M.inputElement.value);
            M.highlight(e);
        }, M.show = function() {
            M.hasLines && (M.finderContainer.classList.add("L759-visible"), M.inputElement.focus(), 
            window.addEventListener("keydown", M.onkeydown));
        }, M.hide = function() {
            M.finderContainer.classList.remove("L759-visible"), M.finderContainer.classList.remove("L759-line-notfound"), 
            window.removeEventListener("keydown", M.onkeydown);
        }, M.onkeydown = function(e) {
            27 === e.keyCode && M.hide();
        }, w.render = {}, w.render.bindInitialEvents = function() {
            i(w.panelElement).update({
                ".L759-resizer": {
                    onmousedown: w.panelHelpers.resizer.resizerMouseDown,
                    ontouchstart: p.events.touchstart
                },
                ".L759-title": {
                    onmousedown: w.panelHelpers.mover.moverMouseDown,
                    ontouchstart: p.events.touchstart,
                    ondblclick: w.panelHelpers.dimensions.togglePanelHeight
                },
                ".L759-close": {
                    onclick: w.detachPanel
                },
                ".L759-info": {
                    className: "L759-info " + ("https:" === location.protocol ? "" : "L759-http")
                },
                ".L759-toggle-info": {
                    onclick: function(e) {
                        e.preventDefault(), e.stopPropagation(), this.classList.toggle("L759-info-toggled");
                    }
                },
                ".L759-result": {
                    ondblclick: function(e) {
                        e.preventDefault(), e.stopPropagation(), M.show();
                    },
                    onmousedown: function(e) {
                        var t = e.target;
                        w.panelHelpers.highlightLyricsLine(t, !0), 1 === e.which && t.classList.contains("L759-lyrics-line") && (t.classList.add("L759-noselect"), 
                        setTimeout(function() {
                            t.classList.remove("L759-noselect");
                        }, 50));
                    }
                },
                ".L759-finder-searchterms": {
                    onkeydown: function(e) {
                        13 === e.keyCode || "Enter" === e.keyIdentifier ? (e.preventDefault(), e.stopPropagation(), 
                        e.shiftKey ? M.prev() : M.next()) : 27 === e.keyCode && M.hide();
                    },
                    oninput: M.onInputChange
                },
                ".L759-line-finder .L759-find-prev": {
                    onclick: M.prev
                },
                ".L759-line-finder .L759-find-next": {
                    onclick: M.next
                },
                ".L759-line-finder .L759-find-hide": {
                    onclick: M.hide
                },
                ".L759-searchbox .L759-searchterms": {
                    onkeydown: function(e) {
                        (13 === e.keyCode || "Enter" === e.keyIdentifier) && (e.preventDefault(), e.stopPropagation(), 
                        w.panelHelpers.doSearch());
                    }
                },
                ".L759-searchbox .L759-dosearch": {
                    onclick: w.panelHelpers.doSearch
                },
                "a.L759-settings-link": {
                    _post: function() {
                        ("robwu.nl" === location.host || "rob.lekensteyn.nl" === location.host || /^(chrome-extension|widget)/.test(location.protocol)) && (this.href = "#config", 
                        this.target = "");
                    }
                }
            });
            window.addEventListener("resize", w.panelHelpers.globalResize, !0);
        }, w.render.unbindInitialEvents = function() {
            i(w.panelElement).update({
                ".L759-resizer": {
                    onmousedown: null,
                    ontouchstart: null
                },
                ".L759-title": {
                    onmousedown: null,
                    ontouchstart: null,
                    ondblclick: null
                },
                ".L759-close": {
                    onclick: null
                },
                ".L759-toggle-info": {
                    onclick: null
                },
                ".L759-result": {
                    ondblclick: null,
                    onmousedown: null
                },
                ".L759-finder-searchterms": {
                    onkeydown: null,
                    oninput: null
                },
                ".L759-line-finder .L759-find-prev": {
                    onclick: M.prev
                },
                ".L759-line-finder .L759-find-next": {
                    onclick: M.next
                },
                ".L759-line-finder .L759-find-hide": {
                    onclick: M.hide
                },
                ".L759-searchbox .L759-searchterms": {
                    onkeydown: null
                },
                ".L759-searchbox .L759-dosearch": {
                    onclick: null
                }
            }), window.removeEventListener("resize", w.panelHelpers.globalResize, !0);
        }, w.render.showMessage = function(e) {
            var t = {
                dir: ""
            };
            t[e.html ? "innerHTML" : "textContent"] = e.message, i(w.panelElement).update({
                ".L759-title": {
                    textContent: e.title || "Lyrics Here",
                    title: ""
                },
                ".L759-fetching, .L759-top-bar, .L759-info .L759-song-info": {
                    _post: w.panelHelpers.hide
                },
                ".L759-result": t
            });
        }, w.render.fetchingLyrics = function(e) {
            var t = decodeURI(e.url);
            i(w.panelElement).update({
                ".L759-title": {
                    textContent: "Searching...",
                    title: ""
                },
                ".L759-fetching": {
                    _post: w.panelHelpers.show
                },
                ".L759-fetching .L759-buttons .L759-b-abort": {
                    onclick: e.abort,
                    _post: w.panelHelpers["function" == typeof e.abort ? "show" : "hide"]
                },
                ".L759-fetching .L759-buttons .L759-b-retry": {
                    onclick: e.retry,
                    _post: w.panelHelpers["function" == typeof e.retry ? "show" : "hide"]
                },
                ".L759-fetching .L759-buttons .L759-b-next": {
                    onclick: e.next,
                    _post: w.panelHelpers["function" == typeof e.next ? "show" : "hide"]
                },
                ".L759-done, .L759-top-bar": {
                    _post: w.panelHelpers.hide
                },
                ".L759-link-to-fetched-source": {
                    href: e.url,
                    title: t,
                    textContent: t.length > 200 ? t.substring(0, 200) + "..." : t
                },
                ".L759-result": {
                    textContent: ""
                }
            });
        }, w.render.notFound = function(e) {
            i(w.panelElement).update({
                ".L759-title": {
                    textContent: "Not found",
                    title: ""
                },
                ".L759-fetching": {
                    _post: w.panelHelpers.hide
                },
                ".L759-done, .L759-top-bar": {
                    _post: w.panelHelpers.show
                },
                ".L759-done .L759-result": {
                    dir: "ltr",
                    innerHTML: "Cannot find lyrics (" + (+e.sourceCount || 0) + "x) for:<br>" + '<span class="YTL-notFound"></span>' + '<br>&bull; <a class="YTL-notFound-search-link" target="_blank" rel="noreferrer"></a>' + '<br>&bull; <span title="Enable or disable lyric providers.\n ' + +S.Total + ' sources are available.">' + '<a href="https://robwu.nl/lyricshere/#config" target="_blank">Edit sources</a>' + (S.New ? " (" + +S.New + " new)" : "") + "</span><br>"
                },
                ".L759-info .L759-song-info": {
                    _post: w.panelHelpers.hide
                }
            });
            var t = n.prototype.$SEARCHTERMS(e.query, {
                keepAccents: !0
            });
            /\blyrics\b/i.test(t) || (t += " lyrics"), t = encodeURIComponent(t);
            var r = "https://encrypted.google.com/search?q=" + t;
            i(w.panelElement).update({
                ".YTL-notFound": {
                    textContent: e.searchTerms
                },
                ".YTL-notFound-search-link": {
                    href: r,
                    textContent: "Try Google (new window)"
                }
            }), w.render.updateSwitchSourceLink(e);
        }, w.render.foundLyrics = function(e) {
            var t = /^[^A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF]*[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/, r = t.test(e.lyrics[0]) ? "rtl" : "ltr";
            i(w.panelElement).update({
                ".L759-title": {
                    textContent: e.title,
                    title: e.title + "\n\nSource: " + e.sourceIdentifier
                },
                ".L759-fetching": {
                    _post: w.panelHelpers.hide
                },
                ".L759-done, .L759-top-bar": {
                    _post: w.panelHelpers.show
                },
                ".L759-info .L759-song-info": {
                    _post: w.panelHelpers.show
                },
                ".L759-info .L759-song-title": {
                    textContent: e.title,
                    title: e.title
                },
                ".L759-info .L759-link-to-found-source": {
                    href: e.url,
                    textContent: e.sourceIdentifier
                },
                ".L759-done .L759-result": {
                    dir: r,
                    textContent: ""
                }
            }), w.render.updateSwitchSourceLink(e);
            var n = document.createDocumentFragment(), o = document.createElement("div");
            o.className = "L759-lyrics-line";
            for (var s = 0; e.lyrics.length > s; s++) {
                var c = o.cloneNode(!1);
                c.textContent = e.lyrics[s], n.appendChild(c);
            }
            w.panelElement.querySelector(".L759-done .L759-result").appendChild(n);
        }, w.render.updateSwitchSourceLink = function(e) {
            i(w.panelElement).update({
                ".L759-switch-source": {
                    onclick: e.next || e.restart,
                    title: "Click to search for lyrics at a different source.\nCurrent query: " + e.searchTerms
                },
                ".L759-switch-source .L759-sourceindex": {
                    textContent: e.sourceCount && e.sourceIndex + 1
                },
                ".L759-switch-source .L759-sourcecount": {
                    textContent: e.sourceCount
                }
            });
        };
        var B = !1;
        w.reset = function() {
            w.detachPanel(), x = null, w.panelElement = null, a.reset(), B = !1;
        }, w.init = function() {
            B || (B = !0, a.listenEvent("toggle", function() {
                w.panelElement && (w.isVisible() ? w.detachPanel() : w.attachPanel());
            }));
        }, t.LyricsPanel = w, t.LyricLineFinder = M;
    }), r("BaseIntegratedLyrics", [ "require", "exports", "module", "LyricsPanel", "eventBridge", "config" ], function(e, t) {
        var r = e("LyricsPanel").LyricsPanel, n = e("eventBridge"), o = e("config"), i = function(e, t, r) {
            console && console.log(e + ": " + r);
        }, s = function(e, t, r) {
            var n = Error(e + ": " + r);
            throw n.type = t, n;
        }, c = t;
        c.shouldLoad = function() {
            return !0;
        }, c.LyricsPanel = r, c.getQuery = function() {
            var e = "", t = "";
            return {
                song: e,
                artist: t
            };
        }, c.watchNavigationChanges = function() {
            var e = this;
            clearInterval(e._poller), e._poller = setInterval(function() {
                e.checkContext();
            }, 200);
        }, c.unwatchNavigationChanges = function() {
            var e = this;
            clearInterval(e._poller);
        }, c.checkContext = function() {
            var e = this, t = e.getQuery();
            if (t.song || t.artist || t.videotitle) {
                var r = e._lastQuery;
                r && r.song === t.song && r.artist === t.artist && r.videotitle === t.videotitle || (e._lastQuery = t, 
                e.LyricsPanel.runQuery(t));
            }
        }, c.putTinyButton = function() {}, c.hasLaunchedPanel = !1, c.launchPanel = function() {
            var e = this;
            e.hasLaunchedPanel || (e.hasLaunchedPanel = !0, e.LyricsPanel.loadOffsets(function() {
                e.LyricsPanel.init(), e.launchPanelPlaceholder(), e.checkContext(), e.watchNavigationChanges();
            }));
        }, c.launchPanelPlaceholder = function() {
            var e = this;
            e.LyricsPanel.queryCallback({
                type: "message",
                html: !0,
                title: "Lyrics for " + e.siteFriendlyName,
                message: 'Play a song or use the search box to get lyrics.<br><br>Hit the close button to hide the panel.<br>&raquo; <a href="https://robwu.nl/lyricshere/#config" target="_blank">Preferences</a>'
            });
        }, c.reset = function() {
            var e = this;
            e._lastQuery = null, e.hasLaunchedPanel = !1, e.unwatchNavigationChanges(), e.LyricsPanel.reset();
        }, c.init = function() {
            var e = this;
            i("BIL:init", "init", "Initializing " + e.siteFriendlyName + " Lyrics."), n.listenEvent("attached", e.watchNavigationChanges.bind(e)), 
            n.listenEvent("detached", e.unwatchNavigationChanges.bind(e)), e.initLaunch();
        }, c.initLaunch = function() {
            var e = this;
            n.listenEvent("iconinserted", e.putTinyButton.bind(e)), o.getItem(e.siteIdentifier + "-autolaunch", function(t) {
                if (n.dispatchEvent("detached"), t !== !1) e.launchPanel(); else {
                    var r = !0;
                    n.listenEvent("toggle", function() {
                        r && (e.launchPanel(), r = !1);
                    });
                }
            });
        }, t.extend = function(e, t, r) {
            var n = this;
            e && t || s("BIL:extend", "invalid_args", "Site ID or friendly name not provided!"), 
            r || (r = {}), r.siteIdentifier = e, r.siteFriendlyName = t;
            for (var o in n) n.hasOwnProperty(o) && !r.hasOwnProperty(o) && (r[o] = n[o]);
            return r;
        };
    }), r("sites/youtube", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics"), n = function(e, t, r) {
            console && console.log(e + ": " + r);
        };
        r.extend("youtube", "YouTube", t), t.shouldLoad = function() {
            return !!document.title;
        }, t.getQuery = function() {
            var e, t = "", r = "", n = "";
            return (e = document.querySelector(".video-detail .title a")) ? n = e.title : document.getElementById("watch-headline-title") ? (e = document.querySelector('#content meta[itemprop="name"]'), 
            e && (n = e.getAttribute("content")), n || (e = document.title, e = e.replace(/^\u25b6/, ""), 
            e = e.replace(/\-\s*YouTube\s*$/, "").trim(), n = e), e = document.querySelector('a[href^="/artist/"]'), 
            e || (e = document.querySelector(".metadata-info-title+*")), e && (r = e.textContent.trim()), 
            e = document.querySelector('a[onmousedown*="metadata"]'), e = e && e.parentNode, 
            e = e && e.previousElementSibling, e = e && e.textContent.trim(), e && (e = e.match(/^[^"]*"([\S\s]+)"[^"]*$/) || e.match(/^[^„]*„([\S\s]+)”[^”]*$/) || e.match(/^[^„]*„([\S\s]+)“[^“]*$/) || e.match(/^[^«]*«([\S\s]+)»[^»]*$/) || e.match(/^[^']*'([\S\s]+)'[^']*$/) || e.match(/^[^“]*“([\S\s]+)”[^”]*$/) || e.match(/^[^»]*»([\S\s]+)«[^«]*$/) || e.match(/^Koupit skladbu ([\S\s]+) na$/) || e.match(/^K\xFApi\u0165 skladbu ([\S\s]+) v slu\u017Ebe$/) || e.match(/^Osta ([\S\s]+) myym\xE4l\xE4st\xE4$/) || e.match(/^K\xF6p ([\S\s]+) p\xE5:$/) || e.match(/^([\S\s]+) \u0B90 \u0B87\u0BA4\u0BBF\u0BB2\u0BCD \u0BB5\u0BBE\u0B99\u0BCD\u0B95\u0BC1\u0B95$/) || e.match(/^[^\u300A]*\u300A([\S\s]+)\u300B[^\u300B]*$/) || e.match(/^[^\u300C]*\u300C([\S\s]+)\u300D[^\u300D]*$/), 
            e && (t = e[1]))) : document.querySelector("h1#vt") && (n = document.title.replace(/^YouTube\s*-\s*$/, "").trim()), 
            {
                song: t,
                artist: r,
                videotitle: n
            };
        };
        var o = "onwebkittransitionend" in window ? "webkitTransitionEnd" : "transitionend";
        window.opera && "function" == typeof window.opera.version && 12.1 > parseFloat(window.opera.version()) && (o = "otransitionend");
        var i, s = function() {
            var e = t;
            i = e.getQuery().videotitle;
        }, c = function() {
            var e = t, r = e.getQuery().videotitle;
            i !== r && (i = r, e.reset(), e.init());
        };
        t.onNavigationEnd = function(e) {
            var r = t;
            "width" === e.propertyName && "progress" === e.target.id && (r.reset(), r.init());
        }, t.watchNavigationChanges = function() {
            var e = this;
            document.body.addEventListener(o, e.onNavigationEnd, !0), window.addEventListener("blur", s, !0), 
            window.addEventListener("focus", c, !0), s();
        }, t.unwatchNavigationChanges = function() {
            var e = this;
            document.body.removeEventListener(o, e.onNavigationEnd, !0), window.removeEventListener("blur", s, !0), 
            window.removeEventListener("focus", c, !0);
        }, t.putTinyButton = function(e) {
            var t = document.getElementById("watch-headline-title");
            t && e.parentNode !== t && t.appendChild(e);
        }, t.launchPanelPlaceholder = function() {}, t.init = function() {
            var e = this;
            n("YTL:init", "init", "Initializing YouTube Lyrics."), e.watchNavigationChanges();
            var t = e.getQuery();
            (t.song || t.artist || t.videotitle) && e.initLaunch();
        };
    }), r("sites/grooveshark", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("grooveshark", "Grooveshark", t), t.shouldLoad = function() {
            return !!document.querySelector("#now-playing-metadata,#playerDetails_nowPlaying,#little-queue");
        };
        var n = function() {
            var e, t = document.getElementById("little-queue"), r = "", n = "";
            return t && (e = t.querySelector(".little-queue-title"), e && (r = e.textContent), 
            e = t.querySelector(".little-queue-meta"), e && (n = e.textContent.split(" - ")[0])), 
            t = e = null, {
                song: r,
                artist: n
            };
        }, o = "now-playing-metadata";
        t.getQuery = function() {
            var e = this, t = document.getElementById(o);
            if (null === t) if (t = document.getElementById("playerDetails_nowPlaying")) o = "playerDetails_nowPlaying"; else if (document.getElementById("little-queue")) return e.getQuery = n, 
            n();
            var r, i = "", s = "";
            return t && (r = t.querySelector(".song"), r && (i = r.title), r = t.querySelector(".artist"), 
            r && (s = r.title)), t = r = null, {
                song: i,
                artist: s
            };
        }, t.putTinyButton = function(e) {
            var t = document.querySelector("#header-user-assets,#header_userOptions,#page-header");
            if (t) {
                var r;
                "header_userOptions" === t.id ? (t = t.parentNode, r = null, -1 === e.className.indexOf("GSRetroPageAction") && (e.className += " GSRetroPageAction")) : r = t.firstChild, 
                e.parentNode !== t && t.insertBefore(e, r);
            }
        }, t.launchPanel = function() {
            var e = this;
            e.launchPanel = function() {};
            var t = document.querySelector("#player-wrapper,#footer");
            t && (e.LyricsPanel.panelHelpers.dimensions.getViewportDimensions = function() {
                var e = t.getBoundingClientRect();
                return {
                    width: e.right,
                    height: e.top
                };
            }), r.launchPanel.call(e);
        };
    }), r("sites/spotify", [ "require", "exports", "module", "BaseIntegratedLyrics", "algorithms" ], function(e, t) {
        var r = e("BaseIntegratedLyrics"), n = e("algorithms");
        r.extend("spotify", "Spotify", t), t.shouldLoad = function() {
            return window.top === window;
        }, t.getQuery = function() {
            var e = "", t = "", r = document.title.replace(/\s*-?\s*Spotify\s*$/i, "").replace(/^[\u25b6\s]+/, ""), o = r.replace(/\([^)]*\)|\[[^\]]*\]/g, " ");
            return -1 == o.indexOf(" - ") && (o = r), o = o.split(" - "), 2 == o.length ? (e = o[0], 
            t = o[1]) : o.length > 2 && (t = o.pop(), e = .7 > n.getSimilarityCoefficient(t, o[0]) ? o[0] : o[1]), 
            {
                song: e,
                artist: t
            };
        }, t.putTinyButton = function(e) {
            var t = document.getElementById("wrapper");
            t && t.appendChild(e);
        };
    }), r("sites/jango", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("jango", "Jango", t), t.shouldLoad = function() {
            return "player" !== window.name && !document.querySelector("frameset");
        };
        var n = function(e) {
            return e && e.textContent.replace(/\([^)]*\)|\[[^\]]*\]/g, " ").trim() || "";
        };
        t.getQuery = function() {
            var e = n(document.getElementById("current-song")), t = n(document.querySelector("#player_current_artist a"));
            return {
                song: e,
                artist: t
            };
        };
    }), r("sites/accuradio", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("accuradio", "AccuRadio", t), t.shouldLoad = function() {
            return window.top === window;
        };
        var n = /^https?:\/\/www\.accuradio\.com\/(?!pop_player)/.test(location.href);
        t.getQuery = function() {
            var e, t;
            return n ? (e = document.getElementById("songtitle"), t = document.getElementById("songartist")) : (e = document.getElementById("span_information_title"), 
            t = document.getElementById("span_information_artist")), e = e ? e.textContent.trim() : "", 
            t = t ? t.textContent.trim() : "", (/^Loading .*\.\.\.$/.test(e) || 0 === t.lastIndexOf("(Not working", 0)) && (t = e = ""), 
            {
                song: e,
                artist: t
            };
        };
    }), r("sites/deezer", [ "require", "exports", "module", "BaseIntegratedLyrics", "eventBridge" ], function(e, t) {
        var r = e("BaseIntegratedLyrics"), n = e("eventBridge");
        r.extend("deezer", "Deezer", t), t.shouldLoad = function() {
            return window.top === window;
        }, t.getQuery = function() {
            var e = document.getElementById("player_track_title");
            e = e ? e.textContent : "";
            var t = document.getElementById("player_track_artist");
            return t = t ? t.textContent : "", {
                song: e,
                artist: t
            };
        }, t.putTinyButton = function(e) {
            var t = document.querySelector("section.topbar");
            t && t.appendChild(e);
        };
        var o = function(e) {
            var t = document.querySelector(".page-wrapper"), r = document.querySelector(".page-header"), n = document.getElementById("page_content");
            t && r && n && (e ? (t.style.width = "auto", t.style.left = "0", t.style.right = e + "px", 
            r.style.minWidth = "0", n.style.overflowX = "auto") : (t.style.width = "", t.style.left = "", 
            t.style.right = "", r.style.minWidth = "", n.style.overflowX = ""));
        };
        t.init = function() {
            r.init.call(this), n.listenEvent("panelDimensions", function(e) {
                var t = 0;
                30 > e.right && (t = e.width + e.right), o(t);
            });
        };
    }), r("sites/8tracks", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("8tracks", "8tracks", t), t.shouldLoad = function() {
            return window.top === window;
        }, t.getQuery = function() {
            var e = document.querySelector("#now_playing .title_artist .t");
            e = e ? e.textContent : "";
            var t = document.querySelector("#now_playing .title_artist .a");
            return t = t ? t.textContent : "", {
                song: e,
                artist: t
            };
        }, t.putTinyButton = function(e) {
            var t = document.getElementById("player_box");
            t && t.appendChild(e);
        };
        var n;
        t.init = function() {
            clearInterval(n), n = setInterval(function() {
                var e = document.getElementById("player_box");
                e && "none" !== e.style.display && (clearInterval(n), r.init.call(t));
            }, 200);
        };
    }), r("sites/rdio", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("rdio", "Rdio", t), t.shouldLoad = function() {
            return window.top === window;
        }, t.getQuery = function() {
            var e = document.querySelector(".text_metadata .song_title");
            e = e ? e.textContent : "";
            var t = document.querySelector(".text_metadata .artist_title");
            return t = t ? t.textContent : "", {
                song: e,
                artist: t
            };
        }, t.putTinyButton = function(e) {
            var t = document.querySelector(".settings_button");
            t && t.parentNode.insertBefore(e, t.nextSibling);
        };
        var n;
        t.init = function() {
            clearInterval(n), n = setInterval(function() {
                document.querySelector(".text_metadata") && (clearInterval(n), r.init.call(t));
            }, 200);
        };
    }), r("sites/xbox-music", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("xbox-music", "Xbox Music", t), t.shouldLoad = function() {
            return window.top === window;
        }, t.getQuery = function() {
            var e = document.querySelector("#player .playerNowPlayingMetadata .primaryMetadata a");
            e = e ? e.textContent : "";
            var t = document.querySelector("#player .playerNowPlayingMetadata .secondaryMetadata a");
            return t = t ? t.textContent : "", {
                song: e,
                artist: t
            };
        }, t.putTinyButton = function(e) {
            var t = document.getElementById("footer");
            t && t.appendChild(e);
        };
        var n;
        t.init = function() {
            clearInterval(n), n = setInterval(function() {
                document.getElementById("player") && (clearInterval(n), r.init.call(t));
            }, 200);
        };
    }), r("sites/google-music", [ "require", "exports", "module", "BaseIntegratedLyrics" ], function(e, t) {
        var r = e("BaseIntegratedLyrics");
        r.extend("google-music", "Google Music", t), t.shouldLoad = function() {
            return window.top === window && document.getElementById("player");
        }, t.getQuery = function() {
            var e = document.getElementById("playerSongTitle");
            e = e ? e.textContent : "";
            var t = document.getElementById("player-artist");
            return t = t ? t.textContent : "", {
                song: e,
                artist: t
            };
        }, t.putTinyButton = function(e) {
            var t = document.getElementById("player-right-wrapper");
            t && e.previousSibling !== t && t.parentNode.insertBefore(e, t.nextSibling);
        };
        var n;
        t.init = function() {
            clearInterval(n), n = setInterval(function() {
                document.getElementById("playerSongTitle") && (clearInterval(n), r.init.call(t));
            }, 200);
        };
    }), r("musicSites", [ "require", "exports", "module" ], function(e, t) {
        function r(t) {
            e([ "sites/" + t ], function(e) {
                e.shouldLoad() && e.init();
            });
        }
        function n(e) {
            for (var t = 0; o.length > t; ++t) {
                var r = o[t], n = r[0], i = r[1];
                if (i.test(e)) return n;
            }
            return "";
        }
        var o = [ [ "youtube", /^https?:\/\/www\.youtube\.com\/(?![ve]\/)(?!embed\/)(?!dev(\/|$))/ ], [ "grooveshark", /^https?:\/\/(|(retro|html5)\.)grooveshark\.com\// ], [ "spotify", /^https?:\/\/play\.spotify\.com\// ], [ "jango", /^https?:\/\/[a-z.]+\.jango\.com\// ], [ "accuradio", /^https?:\/\/(www|2012)\.accuradio\.com\// ], [ "deezer", /^https?:\/\/(www|orange)\.deezer\.com\// ], [ "8tracks", /^https?:\/\/8tracks\.com\// ], [ "rdio", /^https?:\/\/www\.rdio\.com\// ], [ "xbox-music", /^https?:\/\/music\.xbox\.com\// ], [ "google-music", /^https?:\/\/(play\.google\.com\/music\/|music\.google\.com\/)/ ] ], i = o.map(function(e) {
            return e[0];
        });
        t.loadIntegratedLyrics = r, t.identifiers = i, t.getIdentifier = n;
    }), r("setwmode", [], function() {
        function e(e) {
            if (!/^opaque$/i.test(e.getAttribute("wmode"))) {
                var t, r;
                t = e.parentNode, r = e.nextSibling, t.removeChild(e), e.setAttribute("wmode", "opaque"), 
                t.insertBefore(e, r);
            }
        }
        function t() {
            var t = !1;
            setTimeout(function() {
                t = !0;
            }, 6e4);
            var r = setInterval(function() {
                var n = document.getElementsByTagName("embed")[0];
                n ? (clearInterval(r), e(n)) : t && clearInterval(r);
            }, 50);
        }
        return function() {
            if (!(0 > Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") || /mac/i.test(navigator.platform))) {
                var r = document.getElementsByTagName("embed")[0];
                r ? e(r) : t();
            }
        };
    }), r("domready", [], function() {
        function e() {
            clearInterval(r);
            for (var e; e = n.shift(); ) e();
        }
        function t() {
            r = setInterval(function() {
                "complete" === document.readyState && e();
            }, 50), document.addEventListener("DOMContentLoaded", e, !0);
        }
        var r, n = [];
        return function(e) {
            e && ("complete" === document.readyState ? e() : (void 0 === r && t(), n.push(e)));
        };
    }), r("LyricsPanel-demo", [ "require", "exports", "module", "LyricsPanel" ], function(e, t) {
        function r() {
            n.init(), n.infoProvider = null, n.queryCallback({
                type: "message",
                html: !0,
                message: i
            });
        }
        var n = e("LyricsPanel").LyricsPanel, o = /^https?:\/\/rob(wu|\.lekensteyn)\.nl\/(lyricshere|youtubelyrics)/i.test(location.href) || /^(chrome-extension|widget):$/.test(location.protocol) ? "" : "https://robwu.nl/lyricshere/", i = 'Hi there,<br><br>Whenever you visit a <b>YouTube</b> video or play a song on <b>Grooveshark</b>, <b>Spotify</b>\'s Web Player, <b>Jango</b>, <b>AccuRadio</b>, <b>Deezer</b>, <b>8tracks</b>, <b>Rdio</b>, <b>Xbox Music</b>, <b>Google Music</b>, or any of the other supported music sites, lyrics will be displayed in this box. If you want to see other lyrics, click on "Different source", or use the search box below.<br><br>&raquo; <a href="' + o + '#quick-guide">More information</a><br><br>';
        t.init = r;
    }), r("dragndrop-nodes", [ "require", "exports", "module" ], function(e, t) {
        function r() {
            if (c) {
                c.style.display = i;
                var e = a.parentNode;
                e && e.removeChild(a), c = null, s = null, a = null;
            }
        }
        function n(e, t, r) {
            var n = e[l + t];
            n && (e.removeEventListener(t, n, !1), e[l + t] = null), r && (e.addEventListener(t, r, !1), 
            e[l + t] = r);
        }
        function o(e, t, o) {
            function l(e) {
                e.stopPropagation(), e.preventDefault();
            }
            if (t && !t.contains(e)) throw Error("The dragged node must be the moved node or a child of the moved node!");
            t = t || e;
            var u = function(e) {
                t.dragDrop(), l(e);
            };
            n(e, "mouseover", function() {
                "draggable" in t ? t.draggable = !0 : t.dragDrop && n(t, "selectstart", u);
            }), n(e, "mouseout", function() {
                t.draggable ? t.draggable = !1 : n(t, "selectstart");
            }), n(t, "dragstart", function(e) {
                c = t, s = c.previousSibling, a = document.createElement(c.tagName), a.draggable = !0, 
                a.className = "drag-drop-placeholder", a.style.height = c.offsetHeight + "px", n(a, "dragover", l), 
                n(a, "drop", function(e) {
                    l(e), a.parentNode.insertBefore(c, a), o && c.previousSibling !== s && o(), r();
                });
                try {
                    e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("text/plain", "");
                } catch (i) {}
            }), n(t, "dragenter", function(e) {
                if (c && e.target === t) {
                    var r = e.target;
                    if ("none" !== c.style.display) return c.parentNode.insertBefore(a, c), i = c.style.display, 
                    c.style.display = "none", void 0;
                    if (r !== a) {
                        var n = r.parentNode;
                        0 === (2 & a.compareDocumentPosition(r)) && (r = r.nextSibling), n.insertBefore(a, r);
                    }
                }
            }), n(t, "dragover", l), n(t, "drop", l), n(t, "dragend", r);
        }
        var i, s, c, a, l = "dndEvent" + Math.random();
        t.bindDnD = o;
    }), r("text!style/config.css", [], function() {
        return ".drag-drop-placeholder {\n    outline: 1px dashed #AAA;\n}\n.pref-sources, .pref-item {\n    width: 390px;\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n}\n.pref-sources {\n    position: relative;\n    margin: 5px 0 0;\n}\n.pref-sources *,\n.config-site-box {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n.pref-item {\n    height: 24px;\n    padding: 2px 0;\n    line-height: 20px;\n    font-size: 18px;\n}\n.pref-item.source-disabled {\n    opacity: 0.4;\n}\n.pref-item.source-disabled:hover {\n    opacity: 0.8;\n}\n.pref-item .anchor {\n    display: inline-block;\n    width: 30px;\n    text-align: center;\n    cursor: move;\n}\n.pref-item .description {\n    padding: 0 10px;\n}\n.pref-item input[type=checkbox] {\n    display: none;\n}\n.pref-item input[type=checkbox] + span {\n    display: inline-block;\n    width: 4ex;\n    height: 20px;\n    border: 1px solid #BBB;\n    background-color: #fff;\n    vertical-align: middle;\n    line-height: 1em;\n    font-size: 16px;\n    text-align: center;\n    cursor: default;\n}\n.pref-item input[type=checkbox] + span:hover {\n    border-color: #000;\n}\n.pref-item input[type=checkbox] + span:before {\n    content: 'Off';\n}\n.pref-item input[type=checkbox]:checked + span:before {\n    content: 'On';\n}\n\n/* Description of source */\n.pref-item.sd-highlight:hover,\n.source-item-description:hover ~ .pref-item.sd-highlight {\n    outline: 1px solid #888;\n}\n.source-item-description-sticky,\n.source-item-description {\n    position: absolute;\n    top: 0;\n    left: 400px;\n    display: none;\n    width: 300px;\n    height: 100%;\n    border-left: 3px solid #99C;\n    padding: 7px;\n    font-size: 16px;\n    background-color: #eef2f6; /* background-color of #main */\n}\n.source-item-description-sticky {\n    display: block;\n    pointer-events: none;\n}\n.source-item-description-sticky.need-sticky ~ .source-item-description {\n    position: fixed;\n    /*\n     * left:\n     * +400px (default left offset)\n     * +8px (margin-left without calc)\n     * +5px (#main's border-left-width)\n     * +20px (#main's padding-left)\n     * = 433px\n     */\n    left: 433px;\n    height: auto;\n    z-index: 1;\n}\n@media screen and (min-width: 1024px) {\n.source-item-description-sticky.need-sticky ~ .source-item-description {\n    /*\n     * left:\n     * +400px (default left offset)\n     * +50% - 512px (#main's margin-left with calc)\n     * +5px (#main's border-left-width)\n     * +20px (#main's padding-left)\n     * = 50% - 87px\n     */\n    left: -webkit-calc(50% - 87px);\n    left: -moz-calc(50% - 87px);\n    left: calc(50% - 87px);\n}\n}/*end of @media screen and (min-width: 1024px)*/\n\n.source-item-description.sd-visible {\n    display: block;\n}\n.sd-source-header {\n    font-weight: bold;\n    margin: 0 0 0.5em 0;\n}\n.sd-description {\n    white-space: pre-wrap;\n}\n\n\n.config-site-box {\n    display: inline-block;\n    border: 1px solid transparent;\n    width: 32%;\n    min-height: 2em;\n    padding: 0.5em;\n    background-color: #EEFAEE;\n    border-radius: 3px;\n    vertical-align: top;\n}\n.config-site-box:hover {\n    border-color: #CCF;\n}\n.config-site-box label:hover {\n    background-color: #FED;\n}\n.config-site-box.site-disabled {\n    background-color: #FAEEEE;\n}\n.config-site-box .config-site-items {\n    position: relative;\n}\n.config-site-box .btn-enable-site,\n.config-site-box.site-disabled:hover .btn-disable-site,\n.config-site-box .btn-disable-site {\n    display: none;\n}\n.config-site-box:hover .btn-disable-site,\n.config-site-box.site-disabled .btn-enable-site {\n    display: block;\n}\n.config-site-box .show-site-items .site-item-hidden-by-default {\n    visibility: visible;\n}\n.config-site-box.site-disabled .config-site-items > div,\n.config-site-box .site-item-hidden-by-default {\n    visibility: hidden;\n}\ninput[type=\"button\"].btn-disable-site {\n    position: absolute;\n    right: 0;\n    top: -2em;\n    height: 1.5em;\n    padding-top: 0;\n    opacity: 0.6;\n}\ninput[type=\"button\"].btn-disable-site:hover {\n    opacity: 1;\n}\ninput[type=\"button\"].btn-enable-site {\n    /* Big button */\n    width: 80%;\n    height: 2em;\n    max-height: 100%;\n\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n}\n";
    }), r("options", [ "require", "exports", "module", "LyricsPanel-demo", "sources/lyrics", "musicSites", "MultiLyricsSource", "config", "dragndrop-nodes", "text!style/config.css" ], function(e, t) {
        function r() {
            var e = document.createElement("style");
            e.appendChild(document.createTextNode(x)), (document.head || document.documentElement).appendChild(e);
        }
        function n(e, t) {
            "onmouseenter" in document.documentElement ? e.addEventListener("mouseenter", t) : e.addEventListener("mouseover", function(e) {
                return this === e.relatedTarget || this.contains(e.relatedTarget) ? void 0 : t.call(this, e);
            });
        }
        function o(e, t, r, n) {
            var o = document.createElement("option");
            return o.label = e, o.text = t, o.defaultSelected = !!r, o.selected = !!n, o;
        }
        function i() {
            function e(e, t) {
                var r = document.getElementsByClassName(t)[0];
                if (r) {
                    if (r === e) return;
                    r.classList.remove(t);
                }
                e.classList.add(t);
            }
            function t() {
                l || (l = document.createElement("li"), l.className = "pref-item", l.innerHTML = '<span class="anchor">::</span><label><input type="checkbox"><span></span></label><span class="description"></span>');
                var e = l.cloneNode(!0);
                return e.querySelector('input[type="checkbox"]').onchange = function() {
                    e.classList[this.checked ? "remove" : "add"]("source-disabled"), s();
                }, e;
            }
            function r(t) {
                u || (u = document.createElement("li"), u.className = "source-item-description", 
                u.innerHTML = '<h2 class="sd-source-header"><a class="sd-source-link" target="_blank" rel="noreferrer"></a></h2><div><p class="sd-description"></p>View statistics on <a class="sd-alexa-link" target="_blank" rel="noreferrer" title="Alexa provides public demographics about websites, such as the visitor\'s country. You can use this tool to find out if this source suits your needs.">Alexa</a>.</div>');
                var r = u.cloneNode(!0);
                return n(r, function() {
                    e(t, "sd-highlight");
                }), n(t, function() {
                    e(r, "sd-visible"), e(t, "sd-highlight");
                }), r;
            }
            function o() {
                var e = document.createElement("input");
                return e.type = "button", e.id = "restore-defaults", e.value = "Restore defaults", 
                e.onclick = function() {
                    confirm("Do you want to remove your current Lyrics Source preferences, and restore the defaults?\nWarning: This step cannot be undone!") && c();
                }, e;
            }
            function i() {
                function e() {
                    if (!document.body.contains(t)) return window.removeEventListener("scroll", e), 
                    window.removeEventListener("resize", e), void 0;
                    var n = t.getBoundingClientRect();
                    if (n.bottom >= 0 && 0 >= n.top) {
                        t.classList.add("need-sticky");
                        var o = t.parentNode.querySelector(".sd-visible");
                        o.style.top = "", r && r !== o && (r.style.top = "", r = null);
                        var i = n.bottom - o.getBoundingClientRect().bottom;
                        0 > i && (o.style.top = i + "px", r = o);
                    } else r && (r.style.top = "", r = null), t.classList.remove("need-sticky");
                }
                var t = document.createElement("li");
                t.className = "source-item-description-sticky", window.addEventListener("scroll", e), 
                window.addEventListener("resize", e);
                var r;
                return t;
            }
            var a = document.getElementById("config-source");
            a.textContent = "Loading...";
            var l, u, d = document.createDocumentFragment();
            v.getAllLyricsSources(function(e) {
                d.appendChild(i());
                var n = document.createElement("ol");
                n.className = "pref-sources", e.forEach(function(e) {
                    var o = t();
                    e.disabled && o.classList.add("source-disabled");
                    var i = e.identifier, c = o.querySelector('input[type="checkbox"]');
                    c.checked = !e.disabled, c.setAttribute("data-source-id", i);
                    var a = i;
                    e instanceof L && (a += " (search)"), o.querySelector(".description").textContent = a, 
                    w(o.querySelector(".anchor"), o, s), n.appendChild(o), o = r(o);
                    var l = o.querySelector(".sd-source-link");
                    l.textContent = i, l.href = e.homepage, l = o.querySelector(".sd-alexa-link"), l.href = "http://www.alexa.com/siteinfo/" + e.homepage;
                    var u = o.querySelector(".sd-description");
                    u.textContent = e.description || "(no description)", u.appendChild(document.createElement("br")), 
                    d.appendChild(o);
                }), a.innerHTML = 'Sources on top are used first. Enable a few lyrics sites and at least one search engine (marked "(search)") to get optimal results. Want to (de)activate lyrics for some website? Scroll down to <a href="#config-sites">site config</a>!', 
                n.insertBefore(d, n.firstChild);
                var c = document.createElement("li");
                c.className = "source-item-description sd-visible", c.innerHTML = '<h2 class="sd-source-header">Description</h2>Hover over an item at the left side for brief descriptions.<br><br>Found a source which is not listed here? Send a mail to <a href="mailto:gwnRob@gmail.com">gwnRob@gmail.com</a>!', 
                n.appendChild(c), a.appendChild(n), a.appendChild(o());
            });
        }
        function s() {
            for (var e = document.querySelectorAll('ol.pref-sources > li.pref-item input[type="checkbox"]'), t = [], r = [], n = [], o = 0; e.length > o; o++) {
                var i = e[o], s = i.getAttribute("data-source-id"), c = i.checked;
                t.push(s), (c ? n : r).push(s);
            }
            var a = {
                order: t,
                blacklist: r,
                whitelist: n
            };
            a.schemeVersion = v.schemeVersion, S.setItem("lyricsSourcePreferences", a, function(e) {
                e ? _("Successfully saved preferences.") : _("Failed to save all preferences.");
            });
        }
        function c() {
            S.removeItem("lyricsSourcePreferences", function(e) {
                _(e ? "Successfully removed prefs." : "Failed to remove all prefs."), i();
            });
        }
        function a(e) {
            function t() {
                S.getItem("setwmode", function(e) {
                    e = e !== !1, n.checked = e;
                });
            }
            if (!(0 > Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") || /mac/i.test(navigator.platform))) {
                var r = document.createElement("div");
                r.id = "config-wmode", r.innerHTML = '<label title="Set wmode=opaque. \nRequired if you want to drag the panel over the video. \nSearch suggestions will also start to work properly! \nEnabling this option might affect performance."><input type="checkbox"> Set wmode parameter</label>', 
                e.appendChild(r);
                var n = r.querySelector("input[type=checkbox]");
                n.checked = !0, n.onchange = function() {
                    S.setItem("setwmode", n.checked, function(e) {
                        _(e ? "Successfully saved wmode pref." : "Failed to save wmode pref."), t();
                    });
                }, t();
            }
        }
        function l() {
            var e = document.getElementById("launch-demo"), t = e.getAttribute("data-x");
            t = (t || "_") + "_", e.setAttribute("data-x", t), e.style.display = "block";
            var r = function() {
                t == e.getAttribute("data-x") ? y.init() : e.removeEventListener("click", r, !1);
            };
            e.addEventListener("click", r, !1);
        }
        function u(e, t) {
            function r() {
                S.getItem(i, function(e) {
                    e = e !== !1, n.classList[e ? "remove" : "add"]("site-disabled");
                });
            }
            var n = e.parentNode, o = n.querySelector("h2").textContent, i = "enabled." + t, s = function(e) {
                n.classList[e ? "remove" : "add"]("site-disabled"), S.setItem(i, e, function(e) {
                    _((e ? "Successfully saved " : "Failed to save ") + i + " pref.");
                });
            }, c = document.createElement("input");
            c.type = "button", c.value = "Enable", c.className = "btn-enable-site", c.title = "Active Lyrics for " + o, 
            c.onclick = function() {
                s(!0);
            };
            var a = document.createElement("input");
            a.type = "button", a.value = "Disable", a.className = "btn-disable-site", a.title = "Completely disable Lyrics for " + o, 
            a.onclick = function() {
                s(!1);
            }, e.appendChild(c), e.appendChild(a), r();
        }
        function d(e, t) {
            function r() {
                S.getItem(n, function(e) {
                    s.checked = e !== !1;
                });
            }
            var n = t + "-autolaunch", o = "The lyrics can be shown by clicking on the 'Lyrics Here' icon " + ("youtube" == t ? "after the video's title." : "grooveshark" == t ? "at the left side of the player controls." : "spotify" == t ? "at the upper-right corner of the player." : "at the upper-right corner of the video page."), i = document.createElement("div");
            i.id = "config-" + t + "-autolaunch", i.innerHTML = '<label title="If unchecked, lyrics will not be displayed. \n' + o + '"><input type="checkbox"> Automatically show Lyrics.</label>', 
            e.appendChild(i);
            var s = i.querySelector('input[type="checkbox"]');
            s.checked = !0, s.onchange = function() {
                S.setItem(n, s.checked, function(e) {
                    _((e ? "Successfully saved " : "Failed to save ") + n + " pref."), r();
                });
            }, r();
        }
        function p(e, t) {
            function r() {
                S.getItem(n, function(e) {
                    s.value = e, -1 == s.selectedIndex && (s.value = "auto");
                });
            }
            var n = "theme." + t, i = document.createElement("div");
            i.id = "config-" + t + "-theme", i.className = "site-item-hidden-by-default", i.innerHTML = '<label>Theme: <select class="pref-select-theme"></select></label>', 
            e.appendChild(i);
            var s = i.querySelector("select");
            s.add(new o("Auto-detect", "auto", !0)), s.add(new o("Default", "default")), s.add(new o("Dark", "dark")), 
            s.onchange = function() {
                S.setItem(n, this.value, function(e) {
                    _((e ? "Successfully saved " : "Failed to save ") + n + " pref.");
                });
            }, r();
        }
        function h(e, t) {
            function r() {
                S.getItem(n, function(e) {
                    "string" == typeof e ? (d = s.value = e, u(s.value != e && e)) : u();
                });
            }
            var n = "fontSize." + t, i = document.createElement("div");
            i.className = "site-item-hidden-by-default", i.innerHTML = '<label>Font size: <select class="pref-select-font-size"></select></label>', 
            e.appendChild(i);
            for (var s = i.querySelector("select"), c = "14px", a = 9; 21 > a; ++a) s.add(new o(a + " px", a + "px", !1, a + "px" == c));
            var l = s.options.length, u = function(e) {
                s.options.length = l, e && s.add(new o(e, e, !1, !0)), s.add(new o("Custom", "custom"));
            }, d = c;
            s.onchange = function() {
                var e = this.value;
                return "custom" != e || (e = prompt("Enter the desired font size (between 1 and 99)", parseFloat(d)), 
                e && (e = parseFloat(e), e = e > 0 && 100 > e ? Math.round(100 * e) / 100 + "px" : null), 
                e) ? (S.setItem(n, e, function(e) {
                    _((e ? "Successfully saved " : "Failed to save ") + n + " pref."), r();
                }), void 0) : (s.value = d, void 0);
            }, r();
        }
        function m() {
            var e = this, t = document.querySelector(".show-site-items");
            e !== t && (t && t.classList.remove("show-site-items"), e.classList.add("show-site-items"));
        }
        function f() {
            if (!document.getElementById("get-extension")) return _("Not an options page!"), 
            void 0;
            if (!document.documentElement.hasAttribute("YTLActivated")) {
                if (document.documentElement.hasAttribute("YTLDemoActivated")) {
                    for (var e = document.querySelectorAll("#just-a-demo-overlay,.L759-container,.L759-overlay,.LyricsHereByRobWPageActionIcon"), t = 0; e.length > t; ++t) e[t].parentNode.removeChild(e[t]);
                    e = null;
                }
                document.documentElement.setAttribute("YTLActivated", ""), _("Options page detected by Lyrics Here."), 
                g();
            }
        }
        function g() {
            r(), i(), l(), b.identifiers.some(function(e) {
                var t = document.querySelector("#config-" + e + " .config-site-items");
                return t ? (t.textContent = "", "youtube" == e && a(t), u(t, e), d(t, e), p(t, e), 
                h(t, e), n(t, m), void 0) : (_("Element #config-" + e + " .config-site-items not found!"), 
                void 0);
            });
        }
        var y = e("LyricsPanel-demo"), v = e("sources/lyrics"), b = e("musicSites"), L = e("MultiLyricsSource").MultiLyricsSource, S = e("config"), w = e("dragndrop-nodes").bindDnD, x = e("text!style/config.css"), _ = function(e) {
            console && console.log("Options: " + e);
        }, A, k, E;
        t.init = f;
    }), t([ "config", "musicSites", "setwmode", "domready", "options" ], function(e, t, r, n, o) {
        var i = t.getIdentifier(location.href);
        if (!i) return /^https?:\/\/rob(wu|\.lekensteyn)\.nl\/(lyricshere|youtubelyrics)/.test(location.href) && n(function() {
            o.init();
        }), void 0;
        var s = !1, c = 2, a = function() {
            0 === --c && s && t.loadIntegratedLyrics(i);
        };
        e.getItem("enabled." + i, function(e) {
            s = e !== !1, a();
        }), n(a), "youtube" === i && 0 > Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") && !/mac/i.test(navigator.platform) && e.getItem("setwmode", function(e) {
            e !== !1 && r();
        });
    });
})();