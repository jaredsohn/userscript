// ==UserScript==
// @name        s
// @namespace   hello
// @version     1.1
// @grant       none
// @include     http://www.guokr.com/*
// ==/UserScript==

// Well, I might as well use this script.
// Version 0.17 (c)2013. Only for test.

(function (that) {
    var Wrap = (function () {
        "use strict";
        // Useful RegExps.
        var idre = /^#(\w+)$/, tnre = /^(\w+)$/, reg = /\s+/g;
        var suppQuery = !!document.querySelector;

        // ListenEvent and UnlistenEvent methods
        function ListenEvent(e, ev, f) {
            if (!e) return;
            if (e.addEventListener) {
                e.addEventListener(ev, f, false);
            } else if (e.attachEvent) {
                e.attachEvent("on" + ev, f);
            } else if (typeof e["on" + ev] != "undefined") {
                e["on" + ev] = f;
            }
        }
        function UnlistenEvent(e, ev, f) {
            if (!e) return;
            if (e.removeEventListener) {
                e.removeEventListener(ev, f, false);
            } else if (e.detachEvent) {
                e.detachEvent("on" + ev, f);
            } else {
                e["on" + ev] = null;
            }
        }

        // the PreventDefault function.
        function PreventDefault(v) {
            v = v || window.event;
            if (v.preventDefault) {
                v.preventDefault();
                v.stopPropagation();
            } else {
                v.returnValue = false;
                v.cancelBubble = true;
            }
        }

        // Whether x is like an array.
        function IsArrayLike(x) {
            return x && typeof x.length == "number" && (!x.length || typeof x[0] != "undefined");
        }

        // ToArray() function, which makes an array-like object an array.
        function ToArray(x) {
            var arr = [];
            try {
                arr = Array.prototype.slice.call(x);
            } catch (e) {
                console.log(e);
                if (IsArrayLike(x)) {
                    var len = x.length;
                    for (var i = 0; i < len; i++) {
                        arr.push(x[i]);
                    }
                } else {
                    console.log("Invalid arguments.");
                }
            }
            return arr;
        }

        // Wrapper starts.

        var WrapList = [];

        function Wrapper(el) {
            this.el = el;
            this.EventArrs = {};
            WrapList.push(this);
        }

        // Expose the Wrap to the scope...
        var Wrap = function (x) {
            if (typeof x == "function") {
                return Wrap(document).ready(x);
            }
            if (typeof x == "string") {
                if (idre.test(x)) {
                    // Add a "#" if you want an id to be parsed.
                    return Wrap(document.getElementById(RegExp.$1));
                } else if (tnre.test(x)) {
                    // Only wrap the first.
                    return Wrap(document.getElementsByTagName(x)[0]);
                }
                // Only supports IE 8 or above.
                if (!suppQuery) return Wrap();
                return Wrap(document.querySelector(x));
            } else {
                if (x instanceof Wrapper) {
                    return x;
                } else {
                    var len = WrapList.length;
                    for (var i = 0; i < len; i++) {
                        if (WrapList[i].el === x) {
                            // 3 equal signs is important to prevent old IEs from misinterpreting the els :(
                            return WrapList[i];
                        }
                    }
                    return new Wrapper(x);
                    // Important to new...
                }
            }
        };

        Wrap.fn = Wrapper.prototype;

        // bind(), unbind(), and unbindAll() are methods defined below that assign event handlers to Wrapper objects.
        // They should be written again in the version 0.2 (Not done yet.)

        Wrap.fn.bind = function (ev, f) {
            if (!ev || typeof ev != "string") {
                return this;
            }
            if (!this.EventArrs[ev]) {
                var that = this; // this or this.el?
                this.EventArrs[ev] = [];
                this.EventArrs[ev].handler = function (e) {
                    e = e || window.event;
                    var len = that.EventArrs[ev].length;
                    for (var i = 0; i < len; i++) {
                        if (that.EventArrs[ev][i].call(that.el, e) === !1) {
                            // there may not be an e, for it might be triggered.
                            e && PreventDefault(e);
                        }
                    }
                };
                ListenEvent(this.el, ev, that.EventArrs[ev].handler);
            }
            if (!reg.test(ev)) {
                this.EventArrs[ev].push(f);
            } else {
                var es = ev.split(reg), len = es.length;
                for (var i = 0; i < len; i++) {
                    this.bind(es[i], f);
                }
            }
            // return this is an important statement
            return this;
        };

        // unbind() and unbindAll() methods.
        Wrap.fn.unbind = function (ev, x) {
            if (!ev || typeof ev != "string" || !this.EventArrs[ev]) {
                return this;
            }
            // unbind functions, if bound.
            if (typeof x == "function") {
                var len = this.EventArrs[ev].length;
                for (var i = 0; i < len; i++) {
                    if (this.EventArrs[ev][i] == x) {
                        return this.unbind(ev, i);
                    }
                }
                return this;
            }
            // unbind the number of the handler.
            if (!reg.test(ev)) {
                var temp = this.EventArrs[ev];
                temp.splice(x, 1);
            } else {
                var es = ev.split(reg);
                this.unbind((es[0] || es[1]), x);
                // only the beginning eventtype could be unbound.
            }
            return this;
        };

        Wrap.fn.unbindAll = function (ev) {
            if (!ev || typeof ev != "string") {
                return this;
            }
            if (!reg.test(ev)) {
                var temp = this.EventArrs[ev];
                while (temp.length) {
                    this.unbind(ev, 0);
                }
                UnlistenEvent(this.el, ev, this.EventArrs[ev].handler);
                delete this.EventArrs[ev].handler;
                delete this.EventArrs[ev];
            } else {
                var es = ev.split(reg), len = es.length;
                for (var i = 0; i < len; i++) {
                    this.unbindAll(es[i], x);
                }
            }
            return this;
        };

        // trigger() method.
        Wrap.fn.trigger = function (ev) {
            var t = this.EventArrs[ev];
            t && t.handler.call(this.el);
            return this;
        };

        // For common events, such as click, ready, etc, there had better be methods as shortcut. (Some not defined yet.)

        Wrap.fn.click = function (f) {
            return this.bind("click", f);
        };

        Wrap.fn.scroll = function (f) {
            return this.bind("scroll", f);
        };

        Wrap.fn.mouseenter = function (f) {
            return this.bind("mouseenter", f);
        };

        Wrap.fn.mouseleave = function (f) {
            return this.bind("mouseleave", f);
        };

        // ready() function.
        Wrap.fn.ready = function (f) {
            var that = this;
            if (document.addEventListener) {
                return this.bind("DOMContentLoaded", function () {
                    f.call(that, Wrap);
                });
            }
            if (document.readyState) {
                ListenEvent(document, "readystatechange", function g() {
                    if (/interactive|loaded|complete/.test(document.readyState)) {
                        UnlistenEvent(document, "readystatechange", g);
                        f.call(that, Wrap);
                    }
                });
                return this;
            }
            return Wrap(window).bind("load", f);
        };

        // Below are functions that operate on the classes of a Wrapper object. (toggleClass not defined yet.)
        Wrap.fn.addClass = function (cl) {
            var e = this.el;

            if (typeof e.className == "undefined" || new RegExp("\\b" + cl + "\\b").test(e.className)) {
                return this;
            }
            e.className += " " + cl;
            return this;
        };

        Wrap.fn.removeClass = function (cl) {
            var e = this.el, tmp = new RegExp("\\b" + cl + "\\b"), str = e.className;
            if (typeof str == "undefined" || !tmp.test(str)) {
                return this;
            }
            e.className = str.replace(tmp, "");
            return this;
        };

        Wrap.fn.toggleClass = function (cl) {
            var e = this.el, tmp = new RegExp("\\b" + cl + "\\b");
            if (typeof e.className == "undefined") {
                return this;
            }
            if (tmp.test(e.className)) {
                return this.removeClass(cl);
            }
            return this.addClass(cl);
        };

        // Operate on attributes.
        Wrap.fn.attr = function (x, y) {
            var e = this.el;
            if (!e) return this;
            if (typeof e.getAttribute == "undefined") {
                return this;
            }
            if (typeof y == "undefined") {
                return e.getAttribute(x);
            }
            if (y === false) {
                e.removeAttribute(x);
            } else {
                e.setAttribute(x, y);
            }
            return this;
        };

        // Operate on styles.
        Wrap.fn.css = function (x, y) {
            var e = this.el;
            if (!e) {
                return this;
            }
            var s = e.style;
            if (typeof s == "undefined") {
                return this;
            }
            if (typeof y != "undefined") {
                s[x] = y;
                return this;
            }
            if (typeof x == "object") {
                for (var i in x) {
                    this.css(i, x[i]);
                }
                return this;
            }
            var t, dv = document.defaultView;
            if (dv && dv.getComputedStyle) {
                t = dv.getComputedStyle(e)[x];
            } else if (e.currentStyle) {
                t = e.currentStyle[x];
            } else {
                t = s[x];
            }
            return t || "";
        };

        // Operate on innerHTML...
        Wrap.fn.html = function (x) {
            var e = this.el;
            if (!e) {
                return this;
            }
            if (typeof x == "undefined") {
                return e.innerHTML || "";
            }
            if (typeof e.innerHTML != "undefined") {
                e.innerHTML = x;
            }
            return this;
        };

        Wrap.fn.text = function (x) {
            var e = this.el;
            if (!e) {
                return this;
            }
            if (!arguments.length) {
                return e.textContent || e.innerText || "";
            }
            if ("textContent" in e) {
                e.textContent = x;
            } else if ("innerText" in e) {
                e.innerText = x;
            }
            return this;
        };

        // Get the value of a form element.
        Wrap.fn.val = function (x) {
            var e = this.el;
            if (!e) {
                return this;
            }
            if (typeof x == "undefined") {
                return e.value || "";
            }
            if (typeof e.value != "undefined") {
                e.value = x;
            }
            return this;
        };

        // Make a Wrap version of setTimeout
        Wrap.fn.sleep = function (f, t) {
            var that = this;
            setTimeout(function () {
                f.call(that);
            }, t);
            return this;
        };

        // append() and appendTo() functions.
        Wrap.fn.append = function (x) {
            var t = Wrap(x).el;
            t && this.el.appendChild(t);
            return this;
        };

        Wrap.fn.appendTo = function (x) {
            var t = Wrap(x).el;
            t && t.appendChild(this.el);
            return this;
        };

        // find() function, which returns an array of elements. By default it returns the direct children.
        Wrap.fn.find = function (x) {
            var es = [], t, r = /\s*,\s*/, i;
            if (!this.el) {
                return es;
            }
            if (!x) {
                es = this.el.children;
            } else if (idre.test(x)) {
                es = [this.el.getElementById(RegExp.$1)];
            } else if (tnre.test(x)) {
                es = this.el.getElementsByTagName(x);
            } else if (r.test(x)) {
                t = x.split(r);
                for (i = 0; i < t.length; i++) {
                    es = es.concat(this.find(t[i]));
                }
                return es;
            } else if (suppQuery) {
                es = this.el.querySelectorAll(x);
            }
            return ToArray(es);
        }

        // Select multiple elements (only supports IE 8 and above; not done yet!!!!!)
        Wrap.multi = function (x, f) {
            if (!x) {
                return;
            }
            var es, arr = [];
            if (IsArrayLike(x) || typeof x == "string") {
                if (typeof x != "string") {
                    arr = ToArray(x);
                } else {
                    arr = Wrap(document).find(x);
                }
                for (var i = 0; i < arr.length; i++) {
                    f && arr[i] && f.call(arr[i], i);
                }
            }
            return arr;
        };

        Wrap.makeArray = ToArray;

        // Creating an element, and of course Wrap it.
        Wrap.create = function (x) {
            if (typeof x != "string") return;
            return new Wrapper(document.createElement(x));
        }

        // Version of Wrap.
        Wrap.version = .17;

        return Wrap;
    })();

    // TODO
    var ParseBB = (function () {
        var ColorReg = /\[color=([^\]]+)\]/i, EndReg = /\[\/color\]/gi;
        return function (/* string */ sig) {
            var str = sig.replace(EndReg, "<\/span>");
            while (ColorReg.test(str)) {
                str = str.replace(ColorReg, "<span style=\"color:" + RegExp.$1 + "\">");
            }
            return str;
        };
    })();

    (function (f) {
        var rs = document.readyState, signature = localStorage.getItem("signature") || "Join [url=/group/264/]Eye and Vision[/url] group~", state = 0;
        f("#guokr").click(function () {
            alert(rs || 1);
        });
        f(".view body").bind("dblclick", function () {
            f(this).append(f.create("blockquote").html(ParseBB(signature)));
        });
        f.multi("textarea", function () {
            f(this).bind("dblclick", function () {
                f(this).val(f(this).val() + "[blockquote]" + signature + "[/blockquote]");
            });
        });
        if (/\/settings\/profile/.test(that.location)) {
            f.create("form")
                .append(f.create("p").html("Auto signature:"))
                .append(f.create("textarea").attr("id", "signature").val(signature||"").css("width","180px"))
                .append(f.create("input").attr("type", "submit").val("OK").css({"padding":"0 5px","margin":"0 10px"}))
                .css({ "border": "2px solid #ccc", "padding": "8px", "position": "fixed", "zIndex": 1, "top": "120px", "right": 0, "width": "300px", "background": "#fff" })
                .bind("submit", function () {
                    localStorage.setItem("signature", f("#signature").val());
                    alert("Saved!");
                    return false;
                }).appendTo("body");
        }
    })(Wrap);
})(this);