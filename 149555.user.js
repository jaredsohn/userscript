// ==UserScript==
// @name        Reddit JavaScript
// @description Inserts a cartoon image of Patrick Klepek or Alex Navarro for their respective reviews depending on the score
// ==/UserScript==

var JSON;

JSON || (JSON = {});
(function () {
	function a(a) {
		return a < 10 ? "0" + a : a
	}

	function b(a) {
		j.lastIndex = 0;
		return j.test(a) ? '"' + a.replace(j, function (a) {
			var b = m[a];
			return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0)
				.toString(16))
				.slice(-4)
		}) + '"' : '"' + a + '"'
	}

	function c(a, e) {
		var j, p, m, t, y = k,
			u, o = e[a];
		o && typeof o === "object" && typeof o.toJSON === "function" && (o = o.toJSON(a));
		typeof n === "function" && (o = n.call(e, a, o));
		switch (typeof o) {
		case "string":
			return b(o);
		case "number":
			return isFinite(o) ? String(o) : "null";
		case "boolean":
		case "null":
			return String(o);
		case "object":
			if (!o) return "null";
			k += g;
			u = [];
			if (Object.prototype.toString.apply(o) === "[object Array]") {
				t = o.length;
				for (j = 0; j < t; j += 1) u[j] = c(j, o) || "null";
				m = u.length === 0 ? "[]" : k ? "[\n" + k + u.join(",\n" + k) + "\n" + y + "]" : "[" + u.join(",") + "]";
				k = y;
				return m
			}
			if (n && typeof n === "object") {
				t = n.length;
				for (j = 0; j < t; j += 1) typeof n[j] === "string" && (p = n[j], (m = c(p, o)) && u.push(b(p) + (k ? ": " : ":") + m))
			} else for (p in o) Object.prototype.hasOwnProperty.call(o, p) && (m = c(p, o)) && u.push(b(p) + (k ? ": " : ":") + m);
			m = u.length === 0 ? "{}" : k ? "{\n" + k + u.join(",\n" + k) + "\n" + y + "}" : "{" + u.join(",") + "}";
			k = y;
			return m
		}
	}
	if (typeof Date.prototype.toJSON !== "function") Date.prototype.toJSON = function () {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
		return this.valueOf()
	};
	var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		j = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		k, g, m = {
			"\u0008": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\u000c": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		}, n;
	if (typeof JSON.stringify !== "function") JSON.stringify = function (a, b, e) {
		var j;
		g = k = "";
		if (typeof e === "number") for (j = 0; j < e; j += 1) g += " ";
		else typeof e === "string" && (g = e);
		if ((n = b) && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number")) throw Error("JSON.stringify");
		return c("", {
			"": a
		})
	};
	if (typeof JSON.parse !== "function") JSON.parse = function (a, b) {
		function c(a, g) {
			var e, j, m = a[g];
			if (m && typeof m === "object") for (e in m) Object.prototype.hasOwnProperty.call(m, e) && (j = c(m, e), j !== void 0 ? m[e] = j : delete m[e]);
			return b.call(a, g, m)
		}
		var g, a = String(a);
		e.lastIndex = 0;
		e.test(a) && (a = a.replace(e, function (a) {
			return "\\u" + ("0000" + a.charCodeAt(0)
				.toString(16))
				.slice(-4)
		}));
		if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
			.replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return g = eval("(" + a + ")"), typeof b === "function" ? c({
			"": g
		}, "") : g;
		throw new SyntaxError("JSON.parse");
	}
})();
(function () {
	function a(l, b, c) {
		if (l === b) return l !== 0 || 1 / l == 1 / b;
		if (l == null || b == null) return l === b;
		if (l._chain) l = l._wrapped;
		if (b._chain) b = b._wrapped;
		if (l.isEqual && h.isFunction(l.isEqual)) return l.isEqual(b);
		if (b.isEqual && h.isFunction(b.isEqual)) return b.isEqual(l);
		var g = n.call(l);
		if (g != n.call(b)) return !1;
		switch (g) {
		case "[object String]":
			return l == String(b);
		case "[object Number]":
			return l != +l ? b != +b : l == 0 ? 1 / l == 1 / b : l == +b;
		case "[object Date]":
		case "[object Boolean]":
			return +l == +b;
		case "[object RegExp]":
			return l.source == b.source && l.global == b.global && l.multiline == b.multiline && l.ignoreCase == b.ignoreCase
		}
		if (typeof l != "object" || typeof b != "object") return !1;
		for (var e = c.length; e--;) if (c[e] == l) return !0;
		c.push(l);
		var e = 0,
			j = !0;
		if (g == "[object Array]") {
			if (e = l.length, j = e == b.length) for (; e--;) if (!(j = e in l == e in b && a(l[e], b[e], c))) break
		} else {
			if ("constructor" in l != "constructor" in b || l.constructor != b.constructor) return !1;
			for (var m in l) if (h.has(l, m) && (e++, !(j = h.has(b, m) && a(l[m], b[m], c)))) break;
			if (j) {
				for (m in b) if (h.has(b, m) && !e--) break;
				j = !e
			}
		}
		c.pop();
		return j
	}
	var b = this,
		c = b._,
		e = {}, j = Array.prototype,
		k = Object.prototype,
		g = j.slice,
		m = j.unshift,
		n = k.toString,
		w = k.hasOwnProperty,
		x = j.forEach,
		v = j.map,
		p = j.reduce,
		q = j.reduceRight,
		t = j.filter,
		y = j.every,
		u = j.some,
		o = j.indexOf,
		G = j.lastIndexOf,
		k = Array.isArray,
		J = Object.keys,
		B = Function.prototype.bind,
		h = function (a) {
			return new z(a)
		};
	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) exports = module.exports = h;
		exports._ = h
	} else b._ = h;
	h.VERSION = "1.3.3";
	var s = h.each = h.forEach = function (a, b, c) {
		if (a != null) if (x && a.forEach === x) a.forEach(b, c);
		else if (a.length === +a.length) for (var g = 0, j = a.length; g < j; g++) {
			if (g in a && b.call(c, a[g], g, a) === e) break
		} else for (g in a) if (h.has(a, g) && b.call(c, a[g], g, a) === e) break
	};
	h.map = h.collect = function (a, b, c) {
		var g = [];
		if (a == null) return g;
		if (v && a.map === v) return a.map(b, c);
		s(a, function (a, l, e) {
			g[g.length] = b.call(c, a, l, e)
		});
		if (a.length === +a.length) g.length = a.length;
		return g
	};
	h.reduce = h.foldl = h.inject = function (a, b, c, g) {
		var e = arguments.length > 2;
		a == null && (a = []);
		if (p && a.reduce === p) return g && (b = h.bind(b, g)), e ? a.reduce(b, c) : a.reduce(b);
		s(a, function (a, l, h) {
			e ? c = b.call(g, c, a, l, h) : (c = a, e = !0)
		});
		if (!e) throw new TypeError("Reduce of empty array with no initial value");
		return c
	};
	h.reduceRight = h.foldr = function (a, b, c, g) {
		var e = arguments.length > 2;
		a == null && (a = []);
		if (q && a.reduceRight === q) return g && (b = h.bind(b, g)), e ? a.reduceRight(b, c) : a.reduceRight(b);
		var j = h.toArray(a)
			.reverse();
		g && !e && (b = h.bind(b, g));
		return e ? h.reduce(j, b, c, g) : h.reduce(j, b)
	};
	h.find = h.detect = function (a, b, c) {
		var g;
		H(a, function (a, l, e) {
			if (b.call(c, a, l, e)) return g = a, !0
		});
		return g
	};
	h.filter = h.select = function (a, b, c) {
		var g = [];
		if (a == null) return g;
		if (t && a.filter === t) return a.filter(b, c);
		s(a, function (a, l, e) {
			b.call(c, a, l, e) && (g[g.length] = a)
		});
		return g
	};
	h.reject = function (a, b, c) {
		var g = [];
		if (a == null) return g;
		s(a, function (a, l, e) {
			b.call(c, a, l, e) || (g[g.length] = a)
		});
		return g
	};
	h.every = h.all = function (a, b, c) {
		var g = !0;
		if (a == null) return g;
		if (y && a.every === y) return a.every(b, c);
		s(a, function (a, l, h) {
			if (!(g = g && b.call(c, a, l, h))) return e
		});
		return !!g
	};
	var H = h.some = h.any = function (a, b, c) {
		b || (b = h.identity);
		var g = !1;
		if (a == null) return g;
		if (u && a.some === u) return a.some(b, c);
		s(a, function (a, l, h) {
			if (g || (g = b.call(c, a, l, h))) return e
		});
		return !!g
	};
	h.include = h.contains = function (a, b) {
		var c = !1;
		if (a == null) return c;
		if (o && a.indexOf === o) return a.indexOf(b) != -1;
		return c = H(a, function (a) {
			return a === b
		})
	};
	h.invoke = function (a, b) {
		var c = g.call(arguments, 2);
		return h.map(a, function (a) {
			return (h.isFunction(b) ? b || a : a[b])
				.apply(a, c)
		})
	};
	h.pluck = function (a, b) {
		return h.map(a,

		function (a) {
			return a[b]
		})
	};
	h.max = function (a, b, c) {
		if (!b && h.isArray(a) && a[0] === +a[0]) return Math.max.apply(Math, a);
		if (!b && h.isEmpty(a)) return -Infinity;
		var g = {
			computed: -Infinity
		};
		s(a, function (a, l, e) {
			l = b ? b.call(c, a, l, e) : a;
			l >= g.computed && (g = {
				value: a,
				computed: l
			})
		});
		return g.value
	};
	h.min = function (a, b, c) {
		if (!b && h.isArray(a) && a[0] === +a[0]) return Math.min.apply(Math, a);
		if (!b && h.isEmpty(a)) return Infinity;
		var g = {
			computed: Infinity
		};
		s(a, function (a, l, e) {
			l = b ? b.call(c, a, l, e) : a;
			l < g.computed && (g = {
				value: a,
				computed: l
			})
		});
		return g.value
	};
	h.shuffle = function (a) {
		var b = [],
			c;
		s(a, function (a, l) {
			c = Math.floor(Math.random() * (l + 1));
			b[l] = b[c];
			b[c] = a
		});
		return b
	};
	h.sortBy = function (a, b, c) {
		var g = h.isFunction(b) ? b : function (a) {
				return a[b]
			};
		return h.pluck(h.map(a, function (a, b, l) {
			return {
				value: a,
				criteria: g.call(c, a, b, l)
			}
		})
			.sort(function (a, b) {
			var l = a.criteria,
				c = b.criteria;
			if (l === void 0) return 1;
			if (c === void 0) return -1;
			return l < c ? -1 : l > c ? 1 : 0
		}), "value")
	};
	h.groupBy = function (a, b) {
		var c = {}, g = h.isFunction(b) ? b : function (a) {
				return a[b]
			};
		s(a, function (a,
		b) {
			var l = g(a, b);
			(c[l] || (c[l] = []))
				.push(a)
		});
		return c
	};
	h.sortedIndex = function (a, b, c) {
		c || (c = h.identity);
		for (var g = 0, e = a.length; g < e;) {
			var j = g + e >> 1;
			c(a[j]) < c(b) ? g = j + 1 : e = j
		}
		return g
	};
	h.toArray = function (a) {
		if (!a) return [];
		if (h.isArray(a)) return g.call(a);
		if (h.isArguments(a)) return g.call(a);
		if (a.toArray && h.isFunction(a.toArray)) return a.toArray();
		return h.values(a)
	};
	h.size = function (a) {
		return h.isArray(a) ? a.length : h.keys(a)
			.length
	};
	h.first = h.head = h.take = function (a, b, c) {
		return b != null && !c ? g.call(a, 0, b) : a[0]
	};
	h.initial = function (a, b, c) {
		return g.call(a, 0, a.length - (b == null || c ? 1 : b))
	};
	h.last = function (a, b, c) {
		return b != null && !c ? g.call(a, Math.max(a.length - b, 0)) : a[a.length - 1]
	};
	h.rest = h.tail = function (a, b, c) {
		return g.call(a, b == null || c ? 1 : b)
	};
	h.compact = function (a) {
		return h.filter(a, function (a) {
			return !!a
		})
	};
	h.flatten = function (a, b) {
		return h.reduce(a, function (a, c) {
			if (h.isArray(c)) return a.concat(b ? c : h.flatten(c));
			a[a.length] = c;
			return a
		}, [])
	};
	h.without = function (a) {
		return h.difference(a, g.call(arguments, 1))
	};
	h.uniq = h.unique = function (a, b, c) {
		var c = c ? h.map(a, c) : a,
			g = [];
		a.length < 3 && (b = !0);
		h.reduce(c, function (c, e, j) {
			if (b ? h.last(c) !== e || !c.length : !h.include(c, e)) c.push(e), g.push(a[j]);
			return c
		}, []);
		return g
	};
	h.union = function () {
		return h.uniq(h.flatten(arguments, !0))
	};
	h.intersection = h.intersect = function (a) {
		var b = g.call(arguments, 1);
		return h.filter(h.uniq(a), function (a) {
			return h.every(b, function (b) {
				return h.indexOf(b, a) >= 0
			})
		})
	};
	h.difference = function (a) {
		var b = h.flatten(g.call(arguments, 1), !0);
		return h.filter(a, function (a) {
			return !h.include(b,
			a)
		})
	};
	h.zip = function () {
		for (var a = g.call(arguments), b = h.max(h.pluck(a, "length")), c = Array(b), e = 0; e < b; e++) c[e] = h.pluck(a, "" + e);
		return c
	};
	h.indexOf = function (a, b, c) {
		if (a == null) return -1;
		var g;
		if (c) return c = h.sortedIndex(a, b), a[c] === b ? c : -1;
		if (o && a.indexOf === o) return a.indexOf(b);
		c = 0;
		for (g = a.length; c < g; c++) if (c in a && a[c] === b) return c;
		return -1
	};
	h.lastIndexOf = function (a, b) {
		if (a == null) return -1;
		if (G && a.lastIndexOf === G) return a.lastIndexOf(b);
		for (var c = a.length; c--;) if (c in a && a[c] === b) return c;
		return -1
	};
	h.range = function (a, b, c) {
		arguments.length <= 1 && (b = a || 0, a = 0);
		for (var c = arguments[2] || 1, g = Math.max(Math.ceil((b - a) / c), 0), e = 0, h = Array(g); e < g;) h[e++] = a, a += c;
		return h
	};
	var I = function () {};
	h.bind = function (a, b) {
		var c, e;
		if (a.bind === B && B) return B.apply(a, g.call(arguments, 1));
		if (!h.isFunction(a)) throw new TypeError;
		e = g.call(arguments, 2);
		return c = function () {
			if (!(this instanceof c)) return a.apply(b, e.concat(g.call(arguments)));
			I.prototype = a.prototype;
			var h = new I,
				j = a.apply(h, e.concat(g.call(arguments)));
			if (Object(j) === j) return j;
			return h
		}
	};
	h.bindAll = function (a) {
		var b = g.call(arguments, 1);
		b.length == 0 && (b = h.functions(a));
		s(b, function (b) {
			a[b] = h.bind(a[b], a)
		});
		return a
	};
	h.memoize = function (a, b) {
		var c = {};
		b || (b = h.identity);
		return function () {
			var g = b.apply(this, arguments);
			return h.has(c, g) ? c[g] : c[g] = a.apply(this, arguments)
		}
	};
	h.delay = function (a, b) {
		var c = g.call(arguments, 2);
		return setTimeout(function () {
			return a.apply(null, c)
		}, b)
	};
	h.defer = function (a) {
		return h.delay.apply(h, [a, 1].concat(g.call(arguments, 1)))
	};
	h.throttle = function (a, b) {
		var c,
		g, e, j, m, n, p = h.debounce(function () {
			m = j = !1
		}, b);
		return function () {
			c = this;
			g = arguments;
			var h;
			e || (e = setTimeout(function () {
				e = null;
				m && a.apply(c, g);
				p()
			}, b));
			j ? m = !0 : n = a.apply(c, g);
			p();
			j = !0;
			return n
		}
	};
	h.debounce = function (a, b, c) {
		var g;
		return function () {
			var e = this,
				h = arguments;
			c && !g && a.apply(e, h);
			clearTimeout(g);
			g = setTimeout(function () {
				g = null;
				c || a.apply(e, h)
			}, b)
		}
	};
	h.once = function (a) {
		var b = !1,
			c;
		return function () {
			if (b) return c;
			b = !0;
			return c = a.apply(this, arguments)
		}
	};
	h.wrap = function (a, b) {
		return function () {
			var c = [a].concat(g.call(arguments,
			0));
			return b.apply(this, c)
		}
	};
	h.compose = function () {
		var a = arguments;
		return function () {
			for (var b = arguments, c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
			return b[0]
		}
	};
	h.after = function (a, b) {
		if (a <= 0) return b();
		return function () {
			if (--a < 1) return b.apply(this, arguments)
		}
	};
	h.keys = J || function (a) {
		if (a !== Object(a)) throw new TypeError("Invalid object");
		var b = [],
			c;
		for (c in a) h.has(a, c) && (b[b.length] = c);
		return b
	};
	h.values = function (a) {
		return h.map(a, h.identity)
	};
	h.functions = h.methods = function (a) {
		var b = [],
			c;
		for (c in a) h.isFunction(a[c]) && b.push(c);
		return b.sort()
	};
	h.extend = function (a) {
		s(g.call(arguments, 1), function (b) {
			for (var c in b) a[c] = b[c]
		});
		return a
	};
	h.pick = function (a) {
		var b = {};
		s(h.flatten(g.call(arguments, 1)), function (c) {
			c in a && (b[c] = a[c])
		});
		return b
	};
	h.defaults = function (a) {
		s(g.call(arguments, 1), function (b) {
			for (var c in b) a[c] == null && (a[c] = b[c])
		});
		return a
	};
	h.clone = function (a) {
		if (!h.isObject(a)) return a;
		return h.isArray(a) ? a.slice() : h.extend({}, a)
	};
	h.tap = function (a, b) {
		b(a);
		return a
	};
	h.isEqual = function (b, c) {
		return a(b, c, [])
	};
	h.isEmpty = function (a) {
		if (a == null) return !0;
		if (h.isArray(a) || h.isString(a)) return a.length === 0;
		for (var b in a) if (h.has(a, b)) return !1;
		return !0
	};
	h.isElement = function (a) {
		return !!(a && a.nodeType == 1)
	};
	h.isArray = k || function (a) {
		return n.call(a) == "[object Array]"
	};
	h.isObject = function (a) {
		return a === Object(a)
	};
	h.isArguments = function (a) {
		return n.call(a) == "[object Arguments]"
	};
	if (!h.isArguments(arguments)) h.isArguments = function (a) {
		return !(!a || !h.has(a, "callee"))
	};
	h.isFunction = function (a) {
		return n.call(a) == "[object Function]"
	};
	h.isString = function (a) {
		return n.call(a) == "[object String]"
	};
	h.isNumber = function (a) {
		return n.call(a) == "[object Number]"
	};
	h.isFinite = function (a) {
		return h.isNumber(a) && isFinite(a)
	};
	h.isNaN = function (a) {
		return a !== a
	};
	h.isBoolean = function (a) {
		return a === !0 || a === !1 || n.call(a) == "[object Boolean]"
	};
	h.isDate = function (a) {
		return n.call(a) == "[object Date]"
	};
	h.isRegExp = function (a) {
		return n.call(a) == "[object RegExp]"
	};
	h.isNull = function (a) {
		return a === null
	};
	h.isUndefined = function (a) {
		return a === void 0
	};
	h.has = function (a,
	b) {
		return w.call(a, b)
	};
	h.noConflict = function () {
		b._ = c;
		return this
	};
	h.identity = function (a) {
		return a
	};
	h.times = function (a, b, c) {
		for (var g = 0; g < a; g++) b.call(c, g)
	};
	h.escape = function (a) {
		return ("" + a)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#x27;")
			.replace(/\//g, "&#x2F;")
	};
	h.result = function (a, b) {
		if (a == null) return null;
		var c = a[b];
		return h.isFunction(c) ? c.call(a) : c
	};
	h.mixin = function (a) {
		s(h.functions(a), function (b) {
			K(b, h[b] = a[b])
		})
	};
	var L = 0;
	h.uniqueId = function (a) {
		var b = L++;
		return a ? a + b : b
	};
	h.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var C = /.^/,
		A = {
			"\\": "\\",
			"'": "'",
			r: "\r",
			n: "\n",
			t: "\t",
			u2028: "\u2028",
			u2029: "\u2029"
		}, D;
	for (D in A) A[A[D]] = D;
	var M = /\\|'|\r|\n|\t|\u2028|\u2029/g,
		N = /\\(\\|'|r|n|t|u2028|u2029)/g,
		E = function (a) {
			return a.replace(N, function (a, b) {
				return A[b]
			})
		};
	h.template = function (a, b, c) {
		c = h.defaults(c || {}, h.templateSettings);
		a = "__p+='" + a.replace(M, function (a) {
			return "\\" + A[a]
		})
			.replace(c.escape || C, function (a, b) {
			return "'+\n_.escape(" + E(b) + ")+\n'"
		})
			.replace(c.interpolate || C, function (a, b) {
			return "'+\n(" + E(b) + ")+\n'"
		})
			.replace(c.evaluate || C, function (a, b) {
			return "';\n" + E(b) + "\n;__p+='"
		}) + "';\n";
		c.variable || (a = "with(obj||{}){\n" + a + "}\n");
		var a = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + a + "return __p;\n",
			g = new Function(c.variable || "obj", "_", a);
		if (b) return g(b, h);
		b = function (a) {
			return g.call(this, a, h)
		};
		b.source = "function(" + (c.variable || "obj") + "){\n" + a + "}";
		return b
	};
	h.chain = function (a) {
		return h(a)
			.chain()
	};
	var z = function (a) {
		this._wrapped = a
	};
	h.prototype = z.prototype;
	var F = function (a, b) {
		return b ? h(a)
			.chain() : a
	}, K = function (a, b) {
		z.prototype[a] = function () {
			var a = g.call(arguments);
			m.call(a, this._wrapped);
			return F(b.apply(h, a), this._chain)
		}
	};
	h.mixin(h);
	s(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (a) {
		var b = j[a];
		z.prototype[a] = function () {
			var c = this._wrapped;
			b.apply(c, arguments);
			var g = c.length;
			(a == "shift" || a == "splice") && g === 0 && delete c[0];
			return F(c,
			this._chain)
		}
	});
	s(["concat", "join", "slice"], function (a) {
		var b = j[a];
		z.prototype[a] = function () {
			return F(b.apply(this._wrapped, arguments), this._chain)
		}
	});
	z.prototype.chain = function () {
		this._chain = !0;
		return this
	};
	z.prototype.value = function () {
		return this._wrapped
	}
})
	.call(this);
(function () {
	var a = {}, b = window,
		c = b.document,
		e;
	a.disabled = !1;
	a.set = function () {};
	a.get = function () {};
	a.remove = function () {};
	a.clear = function () {};
	a.transact = function (b, c, g) {
		var e = a.get(b);
		g == null && (g = c, c = null);
		typeof e == "undefined" && (e = c || {});
		g(e);
		a.set(b, e)
	};
	a.getAll = function () {};
	a.serialize = function (a) {
		return JSON.stringify(a)
	};
	a.deserialize = function (a) {
		if (typeof a == "string") return JSON.parse(a)
	};
	var j;
	try {
		j = "localStorage" in b && b.localStorage
	} catch (k) {
		j = !1
	}
	if (j) e = b.localStorage, a.set = function (b, c) {
		if (c === void 0) return a.remove(b);
		e.setItem(b, a.serialize(c))
	}, a.get = function (b) {
		return a.deserialize(e.getItem(b))
	}, a.remove = function (a) {
		e.removeItem(a)
	}, a.clear = function () {
		e.clear()
	}, a.getAll = function () {
		for (var b = {}, c = 0; c < e.length; ++c) {
			var g = e.key(c);
			b[g] = a.get(g)
		}
		return b
	};
	else {
		var g;
		try {
			g = "globalStorage" in b && b.globalStorage && b.globalStorage[b.location.hostname]
		} catch (m) {
			g = !1
		}
		if (g) e = b.globalStorage[b.location.hostname], a.set = function (b, c) {
			if (c === void 0) return a.remove(b);
			e[b] = a.serialize(c)
		}, a.get = function (b) {
			return a.deserialize(e[b] && e[b].value)
		}, a.remove = function (a) {
			delete e[a]
		}, a.clear = function () {
			for (var a in e) delete e[a]
		}, a.getAll = function () {
			for (var b = {}, c = 0; c < e.length; ++c) {
				var g = e.key(c);
				b[g] = a.get(g)
			}
			return b
		};
		else if (c.documentElement.addBehavior) {
			var n, w;
			try {
				w = new ActiveXObject("htmlfile"), w.open(), w.write('<script>document.w=window<\/script><iframe src="/favicon.ico"></frame>'), w.close(), n = w.w.frames[0].document, e = n.createElement("div")
			} catch (x) {
				e = c.createElement("div"), n = c.body
			}
			b = function (b) {
				return function () {
					var c = Array.prototype.slice.call(arguments, 0);
					c.unshift(e);
					n.appendChild(e);
					e.addBehavior("#default#userData");
					e.load("localStorage");
					c = b.apply(a, c);
					n.removeChild(e);
					return c
				}
			};
			a.set = b(function (b, c, g) {
				c = "_" + c;
				if (g === void 0) return a.remove(c);
				b.setAttribute(c, a.serialize(g));
				b.save("localStorage")
			});
			a.get = b(function (b, c) {
				return a.deserialize(b.getAttribute("_" + c))
			});
			a.remove = b(function (a, b) {
				a.removeAttribute("_" + b);
				a.save("localStorage")
			});
			a.clear = b(function (a) {
				var b = a.XMLDocument.documentElement.attributes;
				a.load("localStorage");
				for (var c = 0, g; g = b[c]; c++) a.removeAttribute(g.name);
				a.save("localStorage")
			});
			a.getAll = b(function (b) {
				var c = b.XMLDocument.documentElement.attributes;
				b.load("localStorage");
				for (var b = {}, g = 0, e; e = c[g]; ++g) b[e] = a.get(e);
				return b
			})
		}
	}
	try {
		a.set("__storejs__", "__storejs__");
		if (a.get("__storejs__") != "__storejs__") a.disabled = !0;
		a.remove("__storejs__")
	} catch (v) {
		a.disabled = !0
	}
	typeof module != "undefined" && typeof module != "function" ? module.exports = a : typeof define === "function" && define.amd ? define(a) : this.store = a
})();
jQuery.cookie = function (a, b, c) {
	if (arguments.length > 1 && String(b) !== "[object Object]") {
		c = jQuery.extend({}, c);
		if (b === null || b === void 0) c.expires = -1;
		if (typeof c.expires === "number") {
			var e = c.expires,
				j = c.expires = new Date;
			j.setDate(j.getDate() + e)
		}
		b = String(b);
		return document.cookie = [encodeURIComponent(a), "=", c.raw ? b : encodeURIComponent(b), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("")
	}
	c = b || {};
	j = c.raw ? function (a) {
		return a
	} : decodeURIComponent;
	return (e = RegExp("(?:^|; )" + encodeURIComponent(a) + "=([^;]*)")
		.exec(document.cookie)) ? j(e[1]) : null
};
(function (a, b) {
	function c(a, b) {
		for (var c = decodeURI(a), c = m[b ? "strict" : "loose"].exec(c), g = {
			attr: {},
			param: {},
			seg: {}
		}, e = 14; e--;) g.attr[k[e]] = c[e] || "";
		g.param.query = {};
		g.param.fragment = {};
		g.attr.query.replace(n, function (a, b, c) {
			b && (g.param.query[b] = c)
		});
		g.attr.fragment.replace(w, function (a, b, c) {
			b && (g.param.fragment[b] = c)
		});
		g.seg.path = g.attr.path.replace(/^\/+|\/+$/g, "")
			.split("/");
		g.seg.fragment = g.attr.fragment.replace(/^\/+|\/+$/g, "")
			.split("/");
		g.attr.base = g.attr.host ? g.attr.protocol + "://" + g.attr.host + (g.attr.port ? ":" + g.attr.port : "") : "";
		return g
	}

	function e(a) {
		a = a.tagName;
		if (a !== b) return j[a.toLowerCase()];
		return a
	}
	var j = {
		a: "href",
		img: "src",
		form: "action",
		base: "href",
		script: "src",
		iframe: "src",
		link: "href"
	}, k = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
		g = {
			anchor: "fragment"
		}, m = {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}, n = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g,
		w = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g;
	a.fn.url = function (b) {
		var c = "";
		this.length && (c = a(this)
			.attr(e(this[0])) || "");
		return a.url(c, b)
	};
	a.url = function (a, e) {
		arguments.length === 1 && a === !0 && (e = !0, a = b);
		a = a || window.location.toString();
		return {
			data: c(a, e || !1),
			attr: function (a) {
				a = g[a] || a;
				return a !== b ? this.data.attr[a] : this.data.attr
			},
			param: function (a) {
				return a !== b ? this.data.param.query[a] : this.data.param.query
			},
			fparam: function (a) {
				return a !== b ? this.data.param.fragment[a] : this.data.param.fragment
			},
			segment: function (a) {
				return a === b ? this.data.seg.path : (a = a < 0 ? this.data.seg.path.length + a : a - 1, this.data.seg.path[a])
			},
			fsegment: function (a) {
				return a === b ? this.data.seg.fragment : (a = a < 0 ? this.data.seg.fragment.length + a : a - 1, this.data.seg.fragment[a])
			}
		}
	}
})(jQuery);
(function (a) {
	function b() {
		return function (b) {
			if (b.jquery) {
				var c = {};
				c[0] = jQuery;
				a.map(b.jquery, function (b) {
					var g = b[0],
						e = b[1],
						j = b[2],
						b = b[3];
					if (typeof b == "string") b = a.unsafe(b);
					else for (var k = 0; b.length && k < b.length; k++) b[k] = a.unsafe(b[k]);
					j == "call" ? c[e] = c[g].apply(c[g]._obj, b) : j == "attr" ? (c[e] = c[g][b], c[e] ? c[e]._obj = c[g] : a.debug("unrecognized")) : j == "refresh" ? a.refresh() : a.debug("unrecognized")
				})
			}
		}
	}
	a.log = function (a) {
		window.console ? window.console.debug ? window.console.debug(a) : window.console.log && window.console.log(a) : alert(a)
	};
	a.debug = function (b) {
		if (a.with_default(reddit.debug, !1)) return a.log(b)
	};
	a.fn.debug = function () {
		a.debug(a(this));
		return a(this)
	};
	a.redirect = function (a) {
		window.location = a
	};
	a.fn.redirect = function (b) {
		a(this)
			.filter("form")
			.find(".status")
			.show()
			.html("redirecting...");
		if (a(this)
			.attr("target") == "_top") {
			for (var c = window; c != c.parent;) c = c.parent;
			c.location = b
		} else a.redirect(b);
		return a(this)
	};
	a.refresh = function () {
		window.location.reload(!0)
	};
	a.defined = function (a) {
		return typeof a != "undefined"
	};
	a.with_default = function (b, c) {
		return a.defined(b) ? b : c
	};
	a.websafe = function (a) {
		typeof a == "string" && (a = a.replace(/&/g, "&amp;")
			.replace(/"/g, "&quot;")
			.replace(/>/g, "&gt;")
			.replace(/</g, "&lt;"));
		return a || ""
	};
	a.unsafe = function (a) {
		typeof a == "string" && (a = a.replace(/&quot;/g, '"')
			.replace(/&gt;/g, ">")
			.replace(/&lt;/g, "<")
			.replace(/&amp;/g, "&"));
		return a || ""
	};
	a.uniq = function (a, b) {
		for (var c = [], e = {}, j = b ? b : a.length, k = 0; k < a.length && c.length < j; k++) e[a[k]] || (e[a[k]] = !0, c.push(a[k]));
		return c
	};
	(function (b, c) {
		a.fn.show = function (c,
		e) {
			a(this)
				.trigger("onshow");
			return b.call(this, c, e)
		};
		a.fn.hide = function (b, g) {
			a(this)
				.trigger("onhide");
			return c.call(this, b, g)
		}
	})(a.fn.show, a.fn.hide);
	var c = {};
	a.handleResponse = b;
	a.request = function (g, e, j, k, x, v, p) {
		var q = g,
			t = j;
		if (!(rate_limit(g) || window != window.top && !reddit.cnameframe && !reddit.external_frame)) {
			if (!(t = !a.with_default(k, !1))) t = c[q] ? !1 : c[q] = !0;
			k = t;
			e = a.with_default(e, {});
			j = a.with_default(j, b(q));
			x = a.with_default(x, "json");
			typeof j != "function" && (j = b(q));
			t = function (a) {
				delete c[q];
				return j(a)
			};
			errorhandler_in = a.with_default(p, function () {});
			p = function (a) {
				delete c[q];
				return errorhandler_in(a)
			};
			v = a.with_default(v, !1);
			if (reddit.post_site) e.r = reddit.post_site;
			if (reddit.cnameframe) e.cnameframe = 1;
			if (reddit.logged) e.uh = reddit.modhash;
			e.renderstyle = reddit.renderstyle;
			k && a.ajax({
				type: v ? "GET" : "POST",
				url: "/api/" + g,
				data: e,
				success: t,
				error: p,
				dataType: x
			})
		}
	};
	rate_limit = function () {
		var b = {
			vote: 333,
			comment: 5E3,
			ignore: 0,
			ban: 0,
			unban: 0,
			assignad: 0
		}, c = {}, e = a.defined,
			j = a.with_default,
			k = Date;
		return function (a) {
			var p = new k,
				q = c[a],
				t = j(b[a], 333);
			c[a] = p;
			return e(q) && p - q < t
		}
	}();
	a.fn.vote = function (b, c, e, j) {
		if (reddit.logged && a(this)
			.hasClass("arrow")) {
			var k = a(this)
				.hasClass("up") ? 1 : a(this)
				.hasClass("down") ? -1 : 0,
				v = a(this)
					.all_things_by_id(),
				p = v.children()
					.not(".child")
					.find(".arrow"),
				q = k == 1 ? "up" : "upmod";
			p.filter("." + q)
				.removeClass(q)
				.addClass(k == 1 ? "upmod" : "up");
			q = k == -1 ? "down" : "downmod";
			p.filter("." + q)
				.removeClass(q)
				.addClass(k == -1 ? "downmod" : "down");
			reddit.logged && (v.each(function () {
				var b = a(this)
					.find(".entry:first, .midcol:first");
				k > 0 ? b.addClass("likes")
					.removeClass("dislikes unvoted") : k < 0 ? b.addClass("dislikes")
					.removeClass("likes unvoted") : b.addClass("unvoted")
					.removeClass("likes dislikes")
			}), a.defined(j) || (j = v.filter(":first")
				.thing_id(), b += e ? "" : "-" + j, a.request("vote", {
				id: j,
				dir: k,
				vh: b
			})));
			c && c(v, k)
		}
	};
	a.fn.show_unvotable_message = function () {
		a(this)
			.thing()
			.find(".entry:first .unvotable-message")
			.css("display", "inline-block")
	};
	a.fn.thing = function () {
		return this.parents(".thing:first")
	};
	a.fn.all_things_by_id = function () {
		return this.thing()
			.add(a.things(this.thing_id()))
	};
	a.fn.thing_id = function (b) {
		var b = a.with_default(b, "thing"),
			c = this.hasClass("thing") ? this : this.thing();
		b != "thing" && (c = c.find("." + b + ":first"));
		if (c.length) return b = a.grep(c.get(0)
			.className.match(/\S+/g), function (a) {
			return a.match(/^id-/)
		}), b.length ? b[0].slice(3, b[0].length) : "";
		return ""
	};
	a.things = function () {
		var b = a.map(arguments, function (a) {
			return ".thing.id-" + a
		})
			.join(", ");
		return a(b)
	};
	a.fn.same_author = function () {
		var b = a(this)
			.thing_id("author"),
			c = [];
		a(".author.id-" + b)
			.each(function () {
			c.push(".thing.id-" + a(this)
				.thing_id())
		});
		return a(c.join(", "))
	};
	a.fn.things = function () {
		return this.find(a.map(arguments, function (a) {
			return ".thing.id-" + a
		})
			.join(", "))
	};
	a.listing = function (b) {
		b = b || "";
		if (b.slice(0, 1) == "#" || b.slice(0, 1) == ".") b = b.slice(1, b.length);
		var c = b;
		b.slice(0, 9) != "siteTable" ? c = "siteTable" + (b ? "_" + b : "") : b = b.slice(10, b.length);
		var e = a("#" + c)
			.filter(":first");
		e.length == 0 && (e = a.things(b)
			.find(".child")
			.append(document.createElement("div"))
			.children(":last")
			.addClass("sitetable")
			.attr("id", c));
		return e
	};
	var e = function () {};
	a.fn.set_thing_init = function (b) {
		e = b;
		a(this)
			.find(".thing:not(.stub)")
			.each(function () {
			b(this)
		})
	};
	a.fn.new_thing_child = function (b, c) {
		var e = this.thing_id(),
			j = c ? a.listing(e) : this.thing()
				.find(".child:first");
		return (typeof b == "string" ? j.prepend(b)
			.children(":first") : b.hide()
			.prependTo(j)
			.show()
			.find('input[name="parent"]')
			.val(e)
			.end())
			.randomize_ids()
	};
	a.fn.randomize_ids = function () {
		var b = (Math.random() + "")
			.split(".")[1];
		a(this)
			.find("*[id]")
			.each(function () {
			a(this)
				.attr("id", a(this)
				.attr("id") + b)
		})
			.end()
			.find("label")
			.each(function () {
			a(this)
				.attr("for", a(this)
				.attr("for") + b)
		});
		return a(this)
	};
	a.fn.replace_things = function (b, c, j, k) {
		var x = this;
		return a.map(b, function (b) {
			var g = b.data,
				b = a(x)
					.things(g.id);
			k && (b = b.filter(".stub"));
			if (b.length == 0) {
				var q = a.things(g.parent);
				q.length && (b = a("<div></div>"), q.find(".child:first")
					.append(b))
			}
			b.after(a.unsafe(g.content));
			g = b.next();
			c && (g.show()
				.children(".midcol, .entry")
				.hide()
				.end()
				.children(".child:first")
				.html(b.children(".child:first")
				.remove()
				.html())
				.end(),
			j && (b.hide(), g.children(".midcol, .entry")
				.show()), g.find(".rank:first")
				.html(b.find(".rank:first")
				.html()));
			j ? (b.hide(), c ? g.children(".midcol, .entry")
				.show() : g.show()) : g.hide();
			b.remove();
			e(g);
			return g
		})
	};
	a.insert_things = function (b, c) {
		return a.map(b, function (b) {
			var b = b.data,
				g = a.listing(b.parent),
				g = c ? g.append(a.unsafe(b.content))
					.children(".thing:last") : g.prepend(a.unsafe(b.content))
					.children(".thing:first");
			e(g.hide()
				.show());
			return g
		})
	};
	a.fn.delete_table_row = function (b) {
		var c = this.parents("tr:first")
			.get(0),
			e = this.parents("table")
				.get(0);
		c ? a(c)
			.fadeOut(function () {
			e.deleteRow(c.rowIndex);
			b && b()
		}) : b && b()
	};
	a.fn.insert_table_rows = function (b, c) {
		var e = this.is("table") ? this.filter("table") : this.parents("table:first");
		a.map(e.get(), function (e) {
			a.map(b, function (b) {
				var g = c;
				g < 0 && (g = Math.max(e.rows.length + g + 1, 0));
				var g = Math.min(g, e.rows.length),
					j = e.insertRow(g);
				a(j)
					.hide()
					.attr("id", b.id)
					.addClass(b.css_class);
				a.map(b.cells, function (b) {
					a(j.insertCell(j.cells.length))
						.html(a.unsafe(b))
				});
				a(j)
					.fadeIn()
			})
		});
		return this
	};
	a.fn.captcha = function (a) {
		var b = this.find(".capimage");
		a && b.attr("src", "/captcha/" + a + ".png")
			.parents("form")
			.find('input[name="iden"]')
			.val(a);
		return b
	};
	a.fn.insertAtCursor = function (b) {
		return a(this)
			.filter("textarea")
			.each(function () {
			var c = a(this)
				.get(0),
				e = c.scrollTop;
			if (document.selection) c.focus(), document.selection.createRange()
				.text = b;
			else if (c.selectionStart) {
				var j = c.selectionStart;
				c.value = c.value.substring(0, c.selectionStart) + b + c.value.substring(c.selectionEnd, c.value.length);
				j += b.length;
				c.setSelectionRange(j,
				j)
			} else c.value += b;
			if (c.scrollHeight) c.scrollTop = e;
			a(this)
				.focus()
		})
			.end()
	};
	a.fn.select_line = function (b) {
		return a(this)
			.filter("textarea")
			.each(function () {
			var c = "\n",
				e = 1,
				j = 0;
			a.browser.msie && (c = "\r", e = 0, j = 1);
			for (var c = a(this)
				.val()
				.split(c), k = 0; k < b - 1; k++) j += c[k].length + e;
			k = j;
			b <= c.length && (k += c[b - 1].length + e);
			a(this)
				.focus();
			this.createTextRange ? (e = this.createTextRange(), e.move("character", j), j = this.createTextRange(), j.move("character", k), e.setEndPoint("StartToEnd", j), e.select()) : this.selectionStart && this.setSelectionRange(j, k);
			if (this.scrollHeight) this.scrollTop = (b - 2) * (this.scrollHeight / c.length)
		})
	};
	a.apply_stylesheet = function (b) {
		var c = a("head")
			.children("link[title], style[title]")
			.filter(":first")
			.attr("title") || "preferred stylesheet";
		if (document.styleSheets[0].cssText) for (var e = document.styleSheets, j = 0; j < e.length; j++) {
			if (e[j].title == c) {
				e[j].cssText = b;
				break
			}
		} else a("head")
			.children('*[title="' + c + '"]')
			.remove(), a('<style type="text/css" media="screen"></style>')
			.attr("title", c)
			.text(b)
			.appendTo("head")
	};
	a.rehighlight_new_comments = function () {
		checked = a(".comment-visits-box input:checked");
		checked.length > 0 && highlight_new_comments(checked[0].value)
	};
	var j;
	a.default_cookie_domain = function (a) {
		a && (j = a)
	};
	var k = "_";
	a.cookie_name_prefix = function (a) {
		a && (k = a + "_")
	};
	a.cookie_write = function (b) {
		if (b.name) {
			var c = {};
			c.expires = b.expires;
			c.domain = b.domain || j;
			c.path = b.path || "/";
			var e = k + b.name,
				b = b.data;
			b === null || b == "" ? b = null : typeof b != "string" && (b = JSON.stringify(b));
			a.cookie(e, b, c)
		}
	};
	a.cookie_read = function (b, c) {
		var e = a.cookie((c || k) + b);
		try {
			e = JSON.parse(e)
		} catch (j) {}
		return {
			name: b,
			data: e
		}
	}
})(jQuery);
r = window.r || {};
r.setup = function (a) {
	reddit = r.config = a;
	r.config.currentOrigin = location.protocol + "//" + location.host;
	r.analytics.breadcrumbs.init()
};
$(function () {
	r.login.ui.init();
	r.analytics.init();
	r.ui.HelpBubble.init();
	r.interestbar.init();
	r.apps.init();
	r.wiki.init()
});
r.utils = {
	staticURL: function (a) {
		return r.config.static_root + "/" + a
	},
	querySelectorFromEl: function (a, b) {
		return $(a)
			.parents()
			.andSelf()
			.filter(b || "*")
			.map(function (a, b) {
			var j = [],
				k = $(b),
				g = k.data("fullname"),
				m = k.attr("id"),
				k = k.attr("class");
			j.push(b.nodeName.toLowerCase());
			g ? j.push('[data-fullname="' + g + '"]') : m ? j.push("#" + m) : k && j.push("." + _.compact(k.split(/\s+/))
				.join("."));
			return j.join("")
		})
			.toArray()
			.join(" ")
	}
};
r.ui = {};
r.ui.Base = function (a) {
	this.$el = $(a)
};
r.ui.collapsibleSideBox = function (a) {
	var b = $("#" + a);
	return new r.ui.Collapse(b.find(".title"), b.find(".content"), a)
};
r.ui.Collapse = function (a, b, c) {
	r.ui.Base.call(this, a);
	this.target = b;
	this.key = "ui.collapse." + c;
	this.isCollapsed = store.get(this.key) == !0;
	this.$el.click($.proxy(this, "toggle", null, !1));
	this.toggle(this.isCollapsed, !0)
};
r.ui.Collapse.prototype = {
	animDuration: 200,
	toggle: function (a, b) {
		a == null && (a = !this.isCollapsed);
		var c = b ? 0 : this.animDuration;
		a ? $(this.target)
			.slideUp(c) : $(this.target)
			.slideDown(c);
		this.isCollapsed = a;
		store.set(this.key, a);
		this.update()
	},
	update: function () {
		this.$el.find(".collapse-button")
			.text(this.isCollapsed ? "+" : "-")
	}
};
r.ui.Form = function (a) {
	r.ui.Base.call(this, a);
	this.$el.submit($.proxy(function (a) {
		a.preventDefault();
		this.submit(a)
	}, this))
};
r.ui.Form.prototype = $.extend(new r.ui.Base, {
	workingDelay: 200,
	setWorking: function (a) {
		if (a) {
			if (!this.$el.hasClass("working") && !this._workingTimer) this._workingTimer = setTimeout($.proxy(function () {
				this.$el.addClass("working")
			}, this), this.workingDelay)
		} else this._workingTimer && (clearTimeout(this._workingTimer), delete this._workingTimer), this.$el.removeClass("working")
	},
	showStatus: function (a, b) {
		this.$el.find(".status")
			.show()
			.toggleClass("error", !! b)
			.text(a)
	},
	showErrors: function (a) {
		statusMsgs = [];
		$.each(a,
		$.proxy(function (a, c) {
			var e = c[1],
				j = c[2],
				j = this.$el.find(".error." + c[0] + (j ? ".field-" + j : ""));
			j.length ? j.show()
				.text(e) : statusMsgs.push(e)
		}, this));
		statusMsgs.length && this.showStatus(statusMsgs.join(", "), !0)
	},
	resetErrors: function () {
		this.$el.find(".error")
			.hide()
	},
	checkCaptcha: function (a) {
		this.$el.has('input[name="captcha"]')
			.length && $.grep(a, function (a) {
			return a[0] == "badCaptcha"
		}) && $.request("new_captcha", {
			id: this.$el.attr("id")
		})
	},
	serialize: function () {
		return this.$el.serializeArray()
	},
	submit: function () {
		this.resetErrors();
		this.setWorking(!0);
		this._submit()
	},
	_submit: function () {},
	handleResult: function (a, b, c) {
		a ? (this.checkCaptcha(a.json.errors), this._handleResult(a)) : (this.setWorking(!1), this._handleNetError(a, b, c))
	},
	_handleResult: function (a) {
		this.showErrors(a.json.errors);
		this.setWorking(!1)
	},
	_handleNetError: function (a, b, c) {
		this.showStatus(r.strings.an_error_occurred + " (" + c.status + ")", !0)
	}
});
r.ui.HelpBubble = function (a) {
	r.ui.Base.call(this, a);
	this.$el.hover($.proxy(this, "queueShow"), $.proxy(this, "queueHide"));
	this.$parent = this.$el.parent();
	this.$parent.hover($.proxy(this, "queueShow"), $.proxy(this, "queueHide"));
	this.$parent.click($.proxy(this, "queueShow"))
};
r.ui.HelpBubble.init = function () {
	$(".help-bubble")
		.each(function (a, b) {
		$(b)
			.data("HelpBubble", new r.ui.HelpBubble(b))
	})
};
r.ui.HelpBubble.prototype = $.extend(new r.ui.Base, {
	showDelay: 150,
	hideDelay: 750,
	show: function () {
		this.cancelTimeout();
		$("body")
			.append(this.$el);
		var a = this.$parent.offset();
		this.$el.show()
			.offset({
			left: a.left + this.$parent.outerWidth(!0) - this.$el.outerWidth(!0),
			top: a.top + this.$parent.outerHeight(!0) + 5
		})
	},
	hide: function (a) {
		this.$el.fadeOut(150, $.proxy(function () {
			this.$el.hide();
			this.$parent.append(this.$el);
			a && a()
		}, this))
	},
	cancelTimeout: function () {
		if (this.timeout) clearTimeout(this.timeout), this.timeout = null
	},
	queueShow: function () {
		this.cancelTimeout();
		this.timeout = setTimeout($.proxy(this, "show"), this.showDelay)
	},
	queueHide: function () {
		this.cancelTimeout();
		this.timeout = setTimeout($.proxy(this, "hide"), this.hideDelay)
	}
});
r.login = {
	post: function (a, b, c) {
		if (r.config.cnameframe && !r.config.https_endpoint) a.$el.unbind(), a.$el.submit();
		else {
			var e = $('input[name="user"]', a.$el)
				.val(),
				j = r.config.https_endpoint || "http://" + r.config.ajax_domain,
				e = j + "/api/" + b + "/" + e;
			if (r.config.currentOrigin == j || $.support.cors) b = a.serialize(), b.push({
				name: "api_type",
				value: "json"
			}), $.ajax({
				url: e,
				type: "POST",
				dataType: "json",
				data: b,
				success: c,
				error: function (a, b) {
					c(!1, b, a)
				},
				xhrFields: {
					withCredentials: !0
				}
			});
			else {
				var k = $("<iframe>"),
					g = a.$el.clone(!0),
					a = ("resp" + Math.random())
						.replace(".", "");
				k.css("display", "none")
					.attr("name", a)
					.appendTo("body");
				k[0].contentWindow.name = a;
				g.unbind()
					.css("display", "none")
					.attr("action", e)
					.attr("target", a)
					.appendTo("body");
				$("<input>")
					.attr({
					type: "hidden",
					name: "api_type",
					value: "json"
				})
					.appendTo(g);
				$("<input>")
					.attr({
					type: "hidden",
					name: "hoist",
					value: r.login.hoist.type
				})
					.appendTo(g);
				r.login.hoist.watch(b, function (a) {
					r.config.debug || (k.remove(), g.remove());
					c(a)
				});
				g.submit()
			}
		}
	}
};
r.login.hoist = {
	type: "cookie",
	watch: function (a, b) {
		var c = "hoist_" + a,
			e = setInterval(function () {
				if (data = $.cookie(c)) {
					try {
						data = JSON.parse(data)
					} catch (a) {
						data = null
					}
					$.cookie(c, null, {
						domain: r.config.cur_domain,
						path: "/"
					});
					clearInterval(e);
					b(data)
				}
			}, 100)
	}
};
r.login.ui = {
	init: function () {
		if (!r.config.logged) $(".content form.login-form, .side form.login-form")
			.each(function (a, b) {
			new r.ui.LoginForm(b)
		}), $(".content form.register-form")
			.each(function (a, b) {
			new r.ui.RegisterForm(b)
		}), this.popup = new r.ui.LoginPopup($(".login-popup")[0]), $(document)
			.delegate(".login-required", "click", $.proxy(this, "loginRequiredAction"))
	},
	loginRequiredAction: function (a) {
		if (r.config.logged) return !0;
		else {
			var a = $(a.target),
				b = a.attr("href"),
				c;
			b && b != "#" ? c = b : (a = a.thing(), a.length && (c = a.find(".comments")
				.attr("href")));
			this.popup.showLogin(!0, c && function () {
				window.location = c
			});
			return !1
		}
	}
};
r.ui.LoginForm = function () {
	r.ui.Form.apply(this, arguments)
};
r.ui.LoginForm.prototype = $.extend(new r.ui.Form, {
	showErrors: function (a) {
		r.ui.Form.prototype.showErrors.call(this, a);
		a.length && this.$el.find(".recover-password")
			.addClass("attention")
	},
	showStatus: function () {
		this.$el.find(".error")
			.css("opacity", 1);
		r.ui.Form.prototype.showStatus.apply(this, arguments)
	},
	resetErrors: function () {
		if (this.$el.hasClass("login-form-side")) {
			var a = this.$el.find(".error");
			a.is(":visible") && a.fadeTo(100, 0.35)
		} else r.ui.Form.prototype.resetErrors.apply(this, arguments)
	},
	_submit: function () {
		r.login.post(this, "login", $.proxy(this, "handleResult"))
	},
	_handleResult: function (a) {
		if (a.json.errors.length) r.ui.Form.prototype._handleResult.call(this, a);
		else if (this.successCallback) this.successCallback(a);
		else {
			var a = r.config.extension ? "/." + r.config.extension : "/",
				a = /\/login\/?$/.test($.url()
					.attr("path")) ? a : window.location,
				b = this.$el.find('input[name="dest"]')
					.val();
			window.location = b || a
		}
	},
	_handleNetError: function (a, b, c) {
		r.ui.Form.prototype._handleNetError.apply(this, arguments);
		c.status == 0 && r.config.currentOrigin != r.config.https_endpoint && $("<p>")
			.append($("<a>")
			.text(r.strings.login_fallback_msg)
			.attr("href", r.config.https_endpoint + "/login"))
			.appendTo(this.$el.find(".status"))
	},
	focus: function () {
		this.$el.find('input[name="user"]')
			.focus()
	}
});
r.ui.RegisterForm = function () {
	r.ui.Form.apply(this, arguments);
	this.checkUsernameDebounced = _.debounce($.proxy(this, "checkUsername"), 500);
	this.$user = this.$el.find('[name="user"]');
	this.$user.on("keyup", $.proxy(this, "usernameChanged"));
	this.$submit = this.$el.find(".submit button")
};
r.ui.RegisterForm.prototype = $.extend(new r.ui.Form, {
	usernameChanged: function () {
		var a = this.$user.val();
		if (a != this._priorName) this._priorName = a, this.$el.find(".error.field-user")
			.hide(), this.$submit.attr("disabled", !1), this.$el.removeClass("name-available name-taken"), this.checkUsernameDebounced(a), this.$el.toggleClass("name-checking", !! a)
	},
	checkUsername: function (a) {
		a && $.ajax({
			url: "/api/username_available.json",
			data: {
				user: a
			},
			success: $.proxy(this, "displayUsernameStatus"),
			complete: $.proxy(function () {
				this.$el.removeClass("name-checking")
			},
			this)
		})
	},
	displayUsernameStatus: function (a) {
		a.json && a.json.errors ? (this.showErrors(a.json.errors), this.$submit.attr("disabled", !0)) : (this.$el.removeClass("name-available name-taken")
			.addClass(a ? "name-available" : "name-taken"), this.$submit.attr("disabled", a == !1))
	},
	_submit: function () {
		r.login.post(this, "register", $.proxy(this, "handleResult"))
	},
	_handleResult: r.ui.LoginForm.prototype._handleResult,
	focus: r.ui.LoginForm.prototype.focus
});
r.ui.LoginPopup = function (a) {
	r.ui.Base.call(this, a);
	this.loginForm = new r.ui.LoginForm(this.$el.find("form.login-form:first"));
	this.registerForm = new r.ui.RegisterForm(this.$el.find("form.register-form:first"))
};
r.ui.LoginPopup.prototype = $.extend(new r.ui.Base, {
	show: function (a, b) {
		this.loginForm.successCallback = b;
		this.registerForm.successCallback = b;
		$.request("new_captcha", {
			id: this.$el.attr("id")
		});
		this.$el.find(".cover-msg")
			.toggle( !! a)
			.end()
			.show()
	},
	showLogin: function () {
		this.show.apply(this, arguments);
		this.loginForm.focus()
	},
	showRegister: function () {
		this.show.apply(this, arguments);
		this.registerForm.focus()
	}
});
r.analytics = {
	trackers: {},
	init: function () {
		$(document)
			.delegate(".promotedlink.promoted, .sponsorshipbox", "onshow", $.proxy(this, "fetchTrackersOrFirePixel"));
		$(".promotedlink.promoted:visible, .sponsorshipbox:visible")
			.trigger("onshow")
	},
	fetchTrackingHashes: function (a) {
		var b = [];
		$(".promotedlink.promoted, .sponsorshipbox")
			.each(function () {
			var a = $(this),
				e = a.data("fullname"),
				j = a.data("sponsorship"),
				k = a.data("cid");
			j && (e += "_" + j);
			e += "-" + (k || "");
			r.config.is_fake || (e += "-" + r.config.post_site);
			a.data("trackingName",
			e);
			e in r.analytics.trackers || b.push(e)
		});
		$.ajax({
			url: "http://" + r.config.tracking_domain + "/fetch-trackers",
			type: "get",
			dataType: "jsonp",
			data: {
				ids: b
			},
			success: function (b) {
				$.extend(r.analytics.trackers, b);
				a()
			}
		})
	},
	fetchTrackersOrFirePixel: function (a) {
		a = $(a.target);
		a.data("fullname") in this.trackers ? this.fireTrackingPixel(a) : this.fetchTrackingHashes($.proxy(this, "fireTrackingPixel", a))
	},
	fireTrackingPixel: function (a) {
		if (!a.data("trackerFired")) {
			var b = a.data("trackingName"),
				c = this.trackers[b];
			(new Image)
				.src = r.config.adtracker_url + "?" + $.param({
				id: b,
				hash: c,
				r: Math.round(Math.random() * 2147483647)
			});
			var e = a.find("a.title"),
				j = e.html(),
				k = e.attr("href"),
				b = r.config.clicktracker_url + "?" + $.param({
					id: b,
					hash: c,
					url: k
				});
			save_href(e);
			e.attr("href", b);
			e.html() != j && e.html(j);
			e = a.find("a.thumbnail");
			save_href(e);
			e.attr("href", b);
			a.data("trackerFired", !0)
		}
	},
	fireUITrackingPixel: function (a, b) {
		(new Image)
			.src = r.config.uitracker_url + "?" + $.param(_.extend({
			act: a,
			sr: b,
			r: Math.round(Math.random() * 2147483647)
		}, r.analytics.breadcrumbs.toParams()))
	}
};
r.analytics.breadcrumbs = {
	selector: ".thing, .side, .sr-list, .srdrop, .tagline, .md, .organic-listing, .gadget, .sr-interest-bar, a, button, input",
	init: function () {
		this.hasSessionStorage = this._checkSessionStorage();
		this.data = this._load();
		this.data[0] && this.data[0].url == window.location || this._storeBreadcrumb();
		$(document)
			.delegate("a, button", "click", $.proxy(function (a) {
			this.storeLastClick($(a.target))
		}, this))
	},
	_checkSessionStorage: function () {
		try {
			return sessionStorage.setItem("__test__", "test"), sessionStorage.removeItem("__test__"), !0
		} catch (a) {
			return !1
		}
	},
	_load: function () {
		if (!this.hasSessionStorage) return [{
			stored: !1
		}];
		var a;
		try {
			a = JSON.parse(sessionStorage.breadcrumbs)
		} catch (b) {
			a = []
		}
		_.isArray(a) || (a = []);
		return a
	},
	store: function () {
		this.hasSessionStorage && (sessionStorage.breadcrumbs = JSON.stringify(this.data))
	},
	_storeBreadcrumb: function () {
		var a = {
			url: location.toString()
		};
		if ("referrer" in document) {
			var b = !document.referrer.match("^" + r.config.currentOrigin),
				c = this.data[0] && document.referrer != this.data[0].url;
			if (b || c) a.ref = document.referrer
		}
		this.data.unshift(a);
		this.data = this.data.slice(0, 2);
		this.store()
	},
	storeLastClick: function (a) {
		try {
			this.data[0].click = r.utils.querySelectorFromEl(a, this.selector), this.store()
		} catch (b) {}
	},
	toParams: function () {
		params = [];
		for (var a = 0; a < this.data.length; a++) _.each(this.data[a], function (b, c) {
			params["c" + a + "_" + c] = b
		});
		return params
	}
};
$(function () {
	function a(a) {
		$(a)
			.parent()
			.parent()
			.addClass("edited");
		$(a)
			.parent()
			.parent()
			.find(".status")
			.empty()
	}

	function b() {
		$(this)
			.data("saved") != $(this)
			.val() && a(this)
	}

	function c(a) {
		return function () {
			return post_form(this.parentNode, a)
		}
	}

	function e(a) {
		return function () {
			$(this)
				.removeClass("edited");
			return post_form(this, a)
		}
	}

	function j() {
		$(".flairselector li")
			.removeClass("selected");
		$(this)
			.addClass("selected");
		var a = $(this)
			.parent()
			.parent()
			.siblings("form")[0];
		$(a)
			.children('input[name="flair_template_id"]')
			.val(this.id);
		var a = $(a)
			.children(".customizer"),
			b = a.children("input");
		$(this)
			.hasClass("texteditable") ? (a.addClass("texteditable"), b.removeAttr("disabled"), b.css("display", "block"), b.val($.trim($(this)
			.children(".flair")
			.text()))
			.select(), b.keyup(function () {
			$(".flairselection .flair")
				.text($(b)
				.val())
		})) : (a.removeClass("texteditable"), b.attr("disabled", "disabled")
			.hide());
		a = $(".flairselector .flairremove")
			.detach();
		$(".flairselection")
			.html($(this)
			.first()
			.children()
			.clone())
			.append(a);
		$(".flairselector .flairremove")
			.css("display", "inline-block");
		return !1
	}

	function k() {
		var a = $(this)
			.parent()
			.parent();
		$(a)
			.children('input[name="flair_template_id"]')
			.val("");
		$(a)
			.children(".customizer")
			.hide();
		a = $(".flairselector .flairremove")
			.detach();
		$(a)
			.hide();
		$(".flairselector li")
			.removeClass("selected");
		$(".flairselection")
			.empty()
			.append(a)
	}

	function g() {
		$(this)
			.parent()
			.parent()
			.siblings("input")
			.val(this.id);
		post_form(this.parentNode.parentNode.parentNode, "selectflair");
		return !1
	}

	function m(a) {
		function b(a) {
			var c = $(a)
				.children()
				.length,
				e = Math.max(1, Math.min(3, Math.ceil(c / 10))),
				g = Math.ceil(c / e),
				j = Math.max(150, $(a)
					.width());
			$(a)
				.width(j);
			if (e > 1) {
				$(a)
					.css("float", "left");
				for (var k = e * g - c, m = 1; m < e; m++) {
					var n = g;
					m <= k && n--;
					var h = c - n;
					c -= n;
					n = $(a)
						.children()
						.slice(h)
						.remove();
					$(n)
						.width(j);
					$(a)
						.after($("<ul>")
						.css("float", "left")
						.append(n))
				}
			}
			return e * (j + 5) + 50
		}
		close_menus(a);
		var c = this,
			e = $(c)
				.siblings(".flairselector")[0];
		$(e)
			.html('<img class="flairthrobber" src="' + r.utils.staticURL("throbber.gif") + '" />')
			.addClass("active")
			.height(18)
			.width(18)
			.css("padding-left",
		4)
			.css("padding-top", 4)
			.css("padding-bottom", 4)
			.css("padding-right", 4)
			.css("left", $(c)
			.position()
			.left + $(c)
			.width() - 18 + "px")
			.css("top", $(c)
			.position()
			.top + "px");
		var m = {};
		$(e)
			.siblings("form")
			.find("input")
			.each(function (a, b) {
			m[b.name] = b.value
		});
		$.request("flairselector", m, function (a) {
			$(e)
				.html(a);
			var a = $(".flairselector ul"),
				a = Math.max(200, a.length ? b(a) : $(".error")
					.width() + 20),
				m = Math.max(100, $(c)
					.position()
					.left + $(c)
					.width() - a);
			$(e)
				.height("auto")
				.width(a)
				.css("left", m + "px")
				.click(!1)
				.find(".flairselection")
				.click(!1)
				.end()
				.find("form")
				.click(function (a) {
				a.stopPropagation()
			})
				.submit(g)
				.end()
				.find(".customizer input")
				.attr("disabled", "disabled")
				.end()
				.find("li.selected")
				.each(j)
				.end()
				.find("li:not(.error)")
				.click(j)
				.end()
				.find(".flairremove")
				.click(k)
				.end()
		}, !0, "html");
		return !1
	}
	$(".flairlist")
		.delegate(".flairtemplate form", "submit", e("flairtemplate"))
		.delegate("form.clearflairtemplates", "submit", e("clearflairtemplates"))
		.delegate(".flairgrant .usertable form", "submit", e("flair"))
		.delegate(".flaircell input", "focus", function () {
		a(this)
	})
		.delegate(".flaircell input", "keyup", b)
		.delegate(".flaircell input", "change", b)
		.delegate(".flairtemplate .flairdeletebtn", "click", c("deleteflairtemplate"))
		.delegate(".flairgrant .flairdeletebtn", "click", c("deleteflair"));
	$(".flairtoggle")
		.submit(function () {
		return post_form(this, "setflairenabled")
	});
	$(".flairtoggle input")
		.change(function () {
		$(this)
			.parent()
			.submit()
	});
	$(".tagline")
		.delegate(".flairselectbtn", "click", m);
	$(".thing")
		.delegate(".flairselectbtn", "click", m);
	$(".flairselector .dropdown")
		.click(function () {
		open_menu(this);
		$(this)
			.addClass("active");
		return !1
	})
});
r.interestbar = {
	init: function () {
		new r.ui.InterestBar($(".sr-interest-bar"))
	}
};
r.ui.InterestBar = function () {
	r.ui.Base.apply(this, arguments);
	this.$query = this.$el.find(".query");
	this.queryChangedDebounced = _.debounce($.proxy(this, "queryChanged"), 500);
	this.$query.on("keyup", $.proxy(this, "keyPressed"));
	this.$query.on("focus", $.proxy(function () {
		this.$el.addClass("focus")
	}, this))
		.on("blur", $.proxy(function () {
		this.$el.removeClass("focus")
	}, this))
};
r.ui.InterestBar.prototype = {
	keyPressed: function () {
		var a = this.$query.val(),
			a = $.trim(a);
		if (a != this._lastQuery) this._lastQuery = a, this.queryChangedDebounced(a), a && a.length > 1 ? this.$el.addClass("working") : (this.hideResults(), this.$el.removeClass("working error"))
	},
	queryChanged: function (a) {
		a && a.length > 1 && $.ajax({
			url: "/api/subreddits_by_topic.json",
			data: {
				query: a
			},
			success: $.proxy(this, "displayResults"),
			error: $.proxy(this, "displayError")
		})
	},
	displayResults: function (a) {
		this.$el.removeClass("working error");
		var b = this.$el.find(".results li:first"),
			c = this.$el.find(".results li:last"),
			e = _.template('<li><a href="/r/<%= name %>" target="_blank">/r/<%= name %></a></li>');
		this.$el.find(".results")
			.empty()
			.append(b)
			.append(_.map(a, e)
			.join(""))
			.append(c)
			.slideDown(150)
	},
	hideResults: function () {
		this.$el.find(".results")
			.slideUp(150)
	},
	displayError: function (a) {
		this.$el.removeClass("working")
			.addClass("error")
			.find(".error-caption")
			.text(r.strings.an_error_occurred_friendly + " (" + a.status + ")");
		this.hideResults()
	}
};
r.wiki = {
	baseUrl: function () {
		base_url = "/wiki";
		r.config.is_fake || (base_url = "/r/" + r.config.post_site + base_url);
		return base_url
	},
	init: function () {
		$("body")
			.delegate(".wiki-page .revision_hide", "click", this.toggleHide)
	},
	toggleHide: function (a) {
		a.preventDefault();
		var a = $(this),
			b = r.wiki.baseUrl() + "/api/hide/" + a.data("revision") + "/" + a.data("page"),
			c = a.parents(".revision");
		c.toggleClass("hidden");
		$.ajax({
			url: b,
			type: "POST",
			dataType: "json",
			error: function () {
				c.toggleClass("hidden")
			},
			success: function (a) {
				a.status ? c.addClass("hidden") : c.removeClass("hidden")
			}
		})
	},
	addUser: function (a) {
		a.preventDefault();
		$("#usereditallowerror")
			.hide();
		a = $(a.target);
		a = r.wiki.baseUrl() + "/api/alloweditor/add/" + a.find('[name="username"]')
			.val() + "/" + a.data("page");
		$.ajax({
			url: a,
			type: "POST",
			dataType: "json",
			error: function () {
				$("#usereditallowerror")
					.show()
			},
			success: function () {
				location.reload()
			}
		})
	},
	submitEdit: function (a) {
		a.preventDefault();
		var b = $(a.target),
			a = r.wiki.baseUrl() + "/api/edit/" + b.data("page"),
			c = $("#wiki_edit_conflict"),
			e = $("#wiki_special_error");
		c.hide();
		e.hide();
		$.ajax({
			url: a,
			type: "POST",
			dataType: "json",
			data: b.serialize(),
			success: function () {
				window.location = r.wiki.baseUrl() + "/" + b.data("page")
			},
			statusCode: {
				409: function (a) {
					var a = JSON.parse(a.responseText),
						e = b.children("#content");
					c.children("#youredit")
						.val(e.val());
					c.children("#yourdiff")
						.html(a.diffcontent);
					b.children("#previous")
						.val(a.newrevision);
					e.val(a.newcontent);
					c.fadeIn("slow")
				},
				415: function (a) {
					var a = JSON.parse(a.responseText)
						.special_errors,
						b = e.children("#specials");
					b.empty();
					for (i in a) b.append(a[i] + "<br/>");
					e.fadeIn("slow")
				},
				429: function (a) {
					var a = JSON.parse(a.responseText)
						.message,
						b = e.children("#specials");
					b.empty();
					b.text(a);
					e.fadeIn("slow")
				}
			}
		})
	},
	goCompare: function (a, b) {
		v1 = $("input:radio[name=v1]:checked")
			.val();
		v2 = $("input:radio[name=v2]:checked")
			.val();
		url = b + "/" + a + "?v=" + v1;
		v2 != v1 && (url += "&v2=" + v2);
		window.location = url
	}
};

function open_menu(a) {
	$(a)
		.siblings(".drop-choices")
		.not(".inuse")
		.css("top", a.offsetHeight + "px")
		.each(function () {
		$(this)
			.css("left", $(a)
			.position()
			.left + "px")
			.css("top", $(a)
			.height() + $(a)
			.position()
			.top + "px")
	})
		.addClass("active inuse")
}

function close_menus(a) {
	$(".drop-choices.inuse")
		.not(".active")
		.removeClass("inuse");
	$(".drop-choices.active")
		.removeClass("active");
	$(".flairselector")
		.empty();
	$(a.target)
		.closest("#search")
		.length == 0 && ($("#moresearchinfo")
		.slideUp(), $("#searchexpando")
		.length == 1 ? $("#searchexpando")
		.slideUp(function () {
		$("#search_showmore")
			.parent()
			.show()
	}) : $("#search_showmore")
		.parent()
		.show())
}

function hover_open_menu() {}

function select_tab_menu(a, b) {
	var c = "tabbedpane-" + b,
		e = $(a)
			.parent()
			.parent()
			.parent();
	e.find(".tabmenu li")
		.removeClass("selected");
	$(a)
		.parent()
		.addClass("selected");
	e.find(".tabbedpane")
		.each(function () {
		this.style.display = this.id == c ? "block" : "none"
	})
}

function update_user(a) {
	try {
		var b = $(a)
			.find('input[name="user"]')
			.val();
		a.action += "/" + b
	} catch (c) {}
	return !0
}

function post_user(a, b) {
	var c = $(a)
		.find('input[name="user"]')
		.val();
	return c == null ? post_form(a, b) : post_form(a, b + "/" + c)
}

function post_form(a, b, c, e, j) {
	try {
		return c == null && (c = function () {
			return reddit.status_msg.submitting
		}), $(a)
			.find(".error")
			.not(".status")
			.hide(), $(a)
			.find(".status")
			.html(c(a))
			.show(), simple_post_form(a, b, {}, j)
	} catch (k) {
		return !1
	}
}

function get_form_fields(a, b, c) {
	b = b || {};
	c || (c = function () {
		return !0
	});
	$(a)
		.find("select, input, textarea")
		.not(".gray, :disabled")
		.each(function () {
		var a = $(this)
			.attr("type");
		if (c(this) && (a != "radio" && a != "checkbox" || $(this)
			.is(":checked"))) b[$(this)
			.attr("name")] = $(this)
			.val()
	});
	if (b.id == null) b.id = $(a)
		.attr("id") ? "#" + $(a)
		.attr("id") : "";
	return b
}

function form_error(a) {
	return function (b) {
		$(a)
			.find(".status")
			.html("an error occurred while posting (status: " + b.status + ")")
			.end()
	}
}

function simple_post_form(a, b, c, e, j) {
	$.request(b, get_form_fields(a, c), j, e, "json", !1, form_error(a));
	return !1
}

function post_pseudo_form(a, b, c) {
	$(a)
		.find(".error")
		.not(".status")
		.hide();
	$(a)
		.find(".status")
		.html(reddit.status_msg.submitting)
		.show();
	$.request(b, get_form_fields(a, {}, function (b) {
		b = $(b)
			.parents("form:first");
		return b.length == 0 || b.get(0) == $(a)
			.get(0)
	}), null, c, "json", !1, form_error(a));
	return !1
}

function post_multipart_form(a) {
	$(a)
		.find(".error")
		.not(".status")
		.hide();
	$(a)
		.find(".status")
		.html(reddit.status_msg.submitting)
		.show();
	return !0
}

function emptyInput(a, b) {
	!$(a)
		.val() || $(a)
		.val() == b ? $(a)
		.addClass("gray")
		.val(b)
		.attr("rows", 3) : $(a)
		.focus(function () {})
}

function showlang() {
	$(".lang-popup:first")
		.show();
	return !1
}

function hidecover(a) {
	$(a)
		.parents(".cover-overlay")
		.hide();
	return !1
}

function deleteRow(a) {
	$(a)
		.delete_table_row()
}

function change_state(a, b, c, e, j) {
	var k = $(a)
		.parents("form")
		.first(),
		g = k.find('input[name="id"]'),
		g = g.length ? g.val() : $(a)
			.thing_id();
	simple_post_form(k, b, {
		id: g
	}, void 0, j);
	c && c(k.length ? k : a, b);
	$.defined(e) || k.html(k.find('[name="executed"]')
		.val());
	return !1
}

function unread_thing(a) {
	a = $(a);
	a.hasClass("thing") || (a = a.thing());
	$(a)
		.addClass("new unread")
}

function read_thing(a) {
	a = $(a);
	a.hasClass("thing") || (a = a.thing());
	$(a)
		.hasClass("new") ? $(a)
		.removeClass("new") : $(a)
		.removeClass("unread");
	$.request("read_message", {
		id: $(a)
			.thing_id()
	})
}

function save_thing(a) {
	$(a)
		.thing()
		.addClass("saved")
}

function unsave_thing(a) {
	$(a)
		.thing()
		.removeClass("saved")
}

function click_thing(a) {
	var b = $(a);
	b.hasClass("thing") || (b = b.thing());
	b.hasClass("message") && b.hasClass("recipient") && (b.hasClass("unread") ? b.removeClass("unread") : b.hasClass("new") && read_thing(a))
}

function hide_thing(a) {
	$(a)
		.thing()
		.fadeOut(function () {
		$(this)
			.toggleClass("hidden");
		unexpando_child(a)
	})
}

function toggle_label(a, b, c) {
	$(a)
		.parent()
		.find(".option")
		.toggle();
	$(a)[0].onclick = function () {
		return toggle_label(a, c, b)
	};
	b && b(a)
}

function toggle(a, b, c) {
	r.analytics.breadcrumbs.storeLastClick(a);
	var e = $(a)
		.parent()
		.andSelf()
		.filter(".option")
		.removeClass("active")
		.siblings()
		.addClass("active")
		.get(0);
	if (c && !e.onclick) e.onclick = function () {
		return toggle(e, c, b)
	};
	b && b(a);
	return !1
}

function cancelToggleForm(a, b, c, e) {
	c && $(a)
		.filter("button")
		.length && (c = $(a)
		.thing()
		.find(c)
		.children(":visible")
		.filter(":first"), toggle(c));
	$(a)
		.thing()
		.find(b)
		.each(function () {
		e && e($(this));
		$(this)
			.hide()
			.remove()
	});
	return !1
}

function get_organic(a, b) {
	var c = $(a)
		.parents(".organic-listing"),
		e = c.find(".thing:visible");
	if (c.find(":animated")
		.length) return !1;
	var j;
	b ? (j = e.nextAll(".thing:not(.stub)")
		.filter(":first"), j.length == 0 && (j = e.siblings(".thing:not(.stub)")
		.filter(":first"))) : (j = e.prevAll(".thing:not(.stub)")
		.filter(":first"), j.length == 0 && (j = e.siblings(".thing:not(.stub)")
		.filter(":last")));
	organic_help(c, j);
	e.fadeOut("fast", function () {
		j.length && j.fadeIn("fast", function () {
			for (var a = e, g = [], j = 0; j < 10; j++) if (a = b ? a.nextAll(".thing:first") : a.prevAll(".thing:first"), a.length == 0 && (a = a.end()
				.parent()
				.children(b ? ".thing:first" : ".thing:last")), a.filter(".stub")
				.length && g.push(a.thing_id()), j >= 5 && g.length == 0) break;
			g.length && $.request("fetch_links", {
				links: g.join(","),
				listing: c.attr("id")
			})
		})
	})
}

function organic_help(a, b) {
	var a = a || $(".organic-listing"),
		b = b || a.find(".thing:visible"),
		c = $("#spotlight-help");
	c.length && c.data("HelpBubble")
		.hide(function () {
		c.find(".help-section")
			.hide();
		b.hasClass("promoted") ? c.find(".help-promoted")
			.show() : b.hasClass("interestbar") ? c.find(".help-interestbar")
			.show() : c.find(".help-organic")
			.show()
	})
}

function linkstatus() {
	return reddit.status_msg.submitting
}

function subscribe(a) {
	return function () {
		reddit.logged && (reddit.cur_site == a && $("body")
			.addClass("subscriber"), $.things(a)
			.find(".entry")
			.addClass("likes"), $.request("subscribe", {
			sr: a,
			action: "sub"
		}), r.analytics.fireUITrackingPixel("sub", a))
	}
}

function unsubscribe(a) {
	return function () {
		reddit.logged && (reddit.cur_site == a && $("body")
			.removeClass("subscriber"), $.things(a)
			.find(".entry")
			.removeClass("likes"), $.request("subscribe", {
			sr: a,
			action: "unsub"
		}), r.analytics.fireUITrackingPixel("unsub", a))
	}
}

function friend(a, b, c) {
	return function () {
		reddit.logged && (encoded = encodeURIComponent(document.referrer), $.request("friend?note=" + encoded, {
			name: a,
			container: b,
			type: c
		}))
	}
}

function unfriend(a, b, c) {
	return function () {
		$.request("unfriend", {
			name: a,
			container: b,
			type: c
		})
	}
}

function share(a) {
	$.request("new_captcha");
	$(a)
		.new_thing_child($(".sharelink:first")
		.clone(!0)
		.attr("id", "sharelink_" + $(a)
		.thing_id()), !1);
	$.request("new_captcha")
}

function cancelShare(a) {
	return cancelToggleForm(a, ".sharelink", ".share-button")
}

function reject_promo(a) {
	$(a)
		.thing()
		.find(".rejection-form")
		.show()
		.find("textare")
		.focus()
}

function cancel_reject_promo(a) {
	$(a)
		.thing()
		.find(".rejection-form")
		.hide()
}

function complete_reject_promo(a) {
	$(a)
		.thing()
		.removeClass("accepted")
		.addClass("rejected")
		.find(".reject_promo")
		.remove()
}

function helpon(a) {
	$(a)
		.parents(".usertext-edit:first")
		.children(".markhelp:first")
		.show()
}

function helpoff(a) {
	$(a)
		.parents(".usertext-edit:first")
		.children(".markhelp:first")
		.hide()
}

function show_all_messages(a) {
	var b = [];
	$(a)
		.parents(".message")
		.find(".entry .collapsed")
		.hide()
		.end()
		.find(".noncollapsed, .midcol:first")
		.filter(":hidden")
		.each(function () {
		var a = $(this)
			.show()
			.thing_id();
		b.indexOf(a) == -1 && b.push(a)
	});
	b.length && $.request("uncollapse_message", {
		id: b.join(",")
	});
	return !1
}

function hide_all_messages(a) {
	var b = [];
	$(a)
		.parents(".message")
		.find(".entry .collapsed")
		.show()
		.end()
		.find(".noncollapsed, .midcol:first")
		.filter(":visible")
		.each(function () {
		var a = $(this)
			.hide()
			.thing_id();
		b.indexOf(a) == -1 && b.push(a)
	});
	b.length && $.request("collapse_message", {
		id: b.join(",")
	});
	return !1
}

function hidecomment(a) {
	a = $(a)
		.thing();
	a.hide()
		.find(".noncollapsed:first, .midcol:first")
		.hide()
		.end()
		.show()
		.find(".entry:first .collapsed")
		.show();
	a.hasClass("message") ? $.request("collapse_message", {
		id: $(a)
			.thing_id()
	}) : a.find(".child:first")
		.hide();
	return !1
}

function showcomment(a) {
	a = $(a)
		.thing();
	a.find(".entry:first .collapsed")
		.hide()
		.end()
		.find(".noncollapsed:first, .midcol:first")
		.show()
		.end()
		.show();
	a.hasClass("message") ? $.request("uncollapse_message", {
		id: $(a)
			.thing_id()
	}) : a.find(".child:first")
		.show();
	return !1
}

function morechildren(a, b, c, e, j) {
	$(a)
		.html(reddit.status_msg.loading)
		.css("color", "red");
	a = $(a)
		.parents(".thing.morechildren:first")
		.thing_id();
	$.request("morechildren", {
		link_id: b,
		children: c,
		depth: e,
		id: a,
		pv_hex: j
	});
	return !1
}

function moremessages(a) {
	$(a)
		.html(reddit.status_msg.loading)
		.css("color", "red");
	$.request("moremessages", {
		parent_id: $(a)
			.thing_id()
	});
	return !1
}

function add_thing_to_cookie(a, b) {
	var c = $(a)
		.thing_id();
	if (c && c.length) return add_thing_id_to_cookie(c, b)
}

function add_thing_id_to_cookie(a, b) {
	var c = $.cookie_read(b);
	if (!c.data) c.data = "";
	if (c.data.substring(0, a.length) != a) {
		c.data = a + "," + c.data;
		var e = c.data.split(",");
		if (e.length > 5) e = $.uniq(e, 5), c.data = e.join(",");
		$.cookie_write(c)
	}
}

function clicked_items() {
	var a = $.cookie_read("recentclicks2");
	if (a && a.data) {
		for (var a = a.data.split(","), b = a.length - 1; b >= 0; b--)(!a[b] || !a[b].length) && a.splice(b, 1);
		return a
	} else return []
}

function clear_clicked_items() {
	var a = $.cookie_read("recentclicks2");
	a.data = "";
	$.cookie_write(a);
	$(".gadget")
		.remove()
}

function updateEventHandlers(a) {
	var a = $(a),
		b = a.parent();
	$(a)
		.filter(".link")
		.find("a.title, a.comments")
		.mousedown(function () {
		$(this)
			.addClass("click");
		add_thing_to_cookie(this, "recentclicks2");
		var b = $(this)
			.parents(".organic-listing")
			.length > 0;
		last_click(a, b)
	});
	b.filter(".organic-listing")
		.length && (a.find(".hide-button a, .del-button a.yes, .report-button a.yes")
		.each(function () {
		$(this)
			.get(0)
			.onclick = null
	}), a.find(".hide-button a")
		.click(function () {
		var a = $(this)
			.get(0);
		change_state(a, "hide", function () {
			get_organic(a,
			1)
		})
	}), a.find(".del-button a.yes")
		.click(function () {
		var a = $(this)
			.get(0);
		change_state(a, "del", function () {
			get_organic(a, 1)
		})
	}), a.find(".report-button a.yes")
		.click(function () {
		var a = $(this)
			.get(0);
		change_state(a, "report", function () {
			get_organic(a, 1)
		})
	}))
}

function last_click(a, b) {
	if (a) {
		var c = {
			href: window.location.href,
			what: $(a)
				.thing_id(),
			organic: b
		};
		$.cookie_write({
			name: "last_thing",
			data: c
		})
	} else if ((c = $.cookie_read("last_thing")
		.data) && c.href == window.location.href) {
		var e = $(".organic-listing");
		c.organic && e.length == 1 && e.find(".thing:visible")
			.thing_id() != c.what && (a = e.things(c.what), a.length > 0 && !a.hasClass("stub") ? (e.find(".thing:visible")
			.hide(), a.show()) : (a.remove(), e.find(".thing:visible")
			.before('<div class="thing id-' + c.what + ' stub" style="display: none"></div'),
		$.request("fetch_links", {
			links: c.what,
			show: c.what,
			listing: e.attr("id")
		})));
		$.things(c.what)
			.addClass("last-clicked");
		$.cookie_write({
			name: "last_thing",
			data: ""
		})
	}
}

function login() {
	if (cnameframe) return !0;
	return post_user(this, "login")
}

function register() {
	if (cnameframe) return !0;
	return post_user(this, "register")
}

function fetch_title() {
	var a = $("#url-field"),
		b = a.find(".NO_URL"),
		a = a.find(".title-status"),
		c = $("#url")
			.val();
	c ? (a.show()
		.text(reddit.status_msg.loading), b.hide(), $.request("fetch_title", {
		url: c
	})) : (a.hide(), b.show()
		.text("a url is required"))
}

function sr_cache() {
	if (!$.defined(reddit.sr_cache)) reddit.sr_cache = [];
	return reddit.sr_cache
}

function highlight_reddit(a) {
	$("#sr-drop-down")
		.children(".sr-selected")
		.removeClass("sr-selected");
	a && $(a)
		.addClass("sr-selected")
}

function update_dropdown(a) {
	var b = $("#sr-drop-down");
	if (a.length) {
		var c = b.children(":first");
		c.removeClass("sr-selected");
		b.children()
			.remove();
		$.each(a, function (e) {
			if (!(e > 10)) {
				var e = a[e],
					k = c.clone();
				k.text(e);
				b.append(k)
			}
		});
		var e = $("#sr-autocomplete")
			.outerHeight();
		b.css("top", e);
		b.show()
	} else b.hide()
}

function sr_search(a) {
	var a = a.toLowerCase(),
		b = sr_cache();
	b[a] ? update_dropdown(b[a]) : $.request("search_reddit_names.json", {
		query: a
	}, function (c) {
		b[a] = c.names;
		update_dropdown(c.names)
	})
}

function sr_name_up(a) {
	var b = $("#sr-autocomplete")
		.val(),
		c = window.old_sr_name || "";
	window.old_sr_name = b;
	if (b == "") hide_sr_name_list();
	else if (!(a.keyCode == 38 || a.keyCode == 40 || a.keyCode == 9)) if (a.keyCode == 27 && reddit.orig_sr) $("#sr-autocomplete")
		.val(reddit.orig_sr), hide_sr_name_list();
	else if (b != c) reddit.orig_sr = b, sr_search($("#sr-autocomplete")
		.val())
}

function sr_name_down(a) {
	var b = $("#sr-autocomplete");
	if (a.keyCode == 38 || a.keyCode == 40) {
		var a = a.keyCode == 38 && "up" || "down",
			c = $("#sr-drop-down .sr-selected:first"),
			e = $("#sr-drop-down .sr-name-row:first"),
			j = $("#sr-drop-down .sr-name-row:last"),
			k = null,
			k = a == "down" ? c.length ? c.get(0) == j.get(0) ? null : c.next(":first") : e : c.length ? c.get(0) == e.get(0) ? null : c.prev(":first") : j;
		highlight_reddit(k);
		k ? b.val($.trim(k.text())) : b.val(reddit.orig_sr);
		return !1
	} else if (a.keyCode == 13) return hide_sr_name_list(), b.parents("form")
		.submit(), !1
}

function hide_sr_name_list() {
	$("#sr-drop-down")
		.hide()
}

function sr_dropdown_mdown(a) {
	reddit.sr_mouse_row = a;
	return !1
}

function sr_dropdown_mup(a) {
	reddit.sr_mouse_row == a && (a = $(a)
		.text(), $("#sr-autocomplete")
		.val(a), $("#sr-drop-down")
		.hide())
}

function set_sr_name(a) {
	a = $(a)
		.text();
	$("#sr-autocomplete")
		.trigger("focus")
		.val(a)
}

function select_form_tab(a, b, c) {
	a = $(a)
		.parent();
	a.addClass("selected")
		.siblings()
		.removeClass("selected");
	a = a.parent("ul")
		.next(".formtabs-content");
	a.find(b)
		.show()
		.find(":input")
		.removeAttr("disabled")
		.end();
	a.find(c)
		.hide()
		.find(":input")
		.attr("disabled", !0)
}

function expando_cache() {
	if (!$.defined(reddit.thing_child_cache)) reddit.thing_child_cache = [];
	return reddit.thing_child_cache
}

function expando_child(a) {
	var b = expando_cache(),
		c = $(a)
			.thing();
	c.find(".expando-button")
		.addClass("expanded")
		.removeClass("collapsed")
		.get(0)
		.onclick = function () {
		unexpando_child(a)
	};
	var e = c.find(".expando"),
		j = c.thing_id() + "_cache";
	b[j] ? e.html($.unsafe(b[j])) : $.request("expando", {
		link_id: c.thing_id()
	}, function (a) {
		b[j] = a;
		e.html($.unsafe(a))
	}, !1, "html");
	e.show();
	return !1
}

function unexpando_child(a) {
	var b = $(a)
		.thing();
	b.find(".expando-button")
		.addClass("collapsed")
		.removeClass("expanded")
		.get(0)
		.onclick = function () {
		expando_child(a)
	};
	b.find(".expando")
		.hide()
		.empty()
}

function show_edit_usertext(a) {
	var b = a.find(".usertext-edit"),
		c = a.find(".usertext-body"),
		e = b.find("div > textarea"),
		j = Math.max(c.children(".md")
			.width(), 500),
		k = Math.max(c.children(".md")
			.height(), 100);
	c.hide();
	b.show();
	e.css("width", "");
	e.css("height", "");
	e.get(0)
		.scrollHeight > e.height() && (c = Math.max(j - 5, e.width()), e.width(c), b.width(c), b = Math.max(k, e.height()), e.height(b));
	a.find(".cancel, .save")
		.show()
		.end()
		.find(".help-toggle")
		.show()
		.end();
	e.focus()
}

function hide_edit_usertext(a) {
	a.find(".usertext-edit")
		.hide()
		.end()
		.find(".usertext-body")
		.show()
		.end()
		.find(".cancel, .save")
		.hide()
		.end()
		.find(".help-toggle")
		.hide()
		.end()
		.find(".markhelp")
		.hide()
		.end()
}

function comment_reply_for_elem(a) {
	var a = $(a),
		b = a.thing(),
		c = a.thing_id(),
		e = b.find(".child .usertext:first");
	if (!e.length || e.parent()
		.thing_id() != b.thing_id()) e = $(".usertext.cloneable:first")
		.clone(!0), a.new_thing_child(e), e.prop("thing_id")
		.value = c, e.attr("id", "commentreply_" + c), e.find(".error")
		.hide();
	return e
}

function edit_usertext(a) {
	a = $(a)
		.thing();
	a.find(".edit-usertext:first")
		.parent("li")
		.andSelf()
		.hide();
	show_edit_usertext(a.find(".usertext:first"))
}

function cancel_usertext(a) {
	a = $(a);
	a.thing()
		.find(".edit-usertext:first")
		.parent("li")
		.andSelf()
		.show();
	hide_edit_usertext(a.closest(".usertext"))
}

function save_usertext(a) {
	$(a)
		.thing()
		.find(".edit-usertext:first")
		.parent("li")
		.andSelf()
		.show()
}

function reply(a) {
	var b = comment_reply_for_elem(a);
	show_edit_usertext(b);
	b.show();
	b.find(".cancel")
		.get(0)
		.onclick = function () {
		b.hide()
	};
	return !1
}

function toggle_distinguish_span(a) {
	a = $(a)
		.parents("form")[0];
	$(a)
		.children()
		.toggle()
}

function set_distinguish(a, b) {
	change_state(a, "distinguish/" + b);
	$(a)
		.children()
		.toggle()
}

function populate_click_gadget() {
	if ($(".click-gadget")
		.length) {
		var a = clicked_items();
		a && a.length && (a = $.uniq(a, 5), a.sort(), $.request("gadget/click/" + a.join(","), void 0, void 0, void 0, "json", !0))
	}
}
var toolbar_p = function (a, b) {
	this.toggle_linktitle = function (a) {
		$(".title, .submit, .url, .linkicon")
			.toggle();
		$(a)
			.is(".pushed-button") ? $(a)
			.parents(".middle-side")
			.removeClass("clickable") : ($(a)
			.parents(".middle-side")
			.addClass("clickable"), $(".url")
			.children("form")
			.children("input")
			.focus()
			.select());
		return this.toggle_pushed(a)
	};
	this.toggle_pushed = function (a) {
		a = $(a);
		a.is(".pushed-button") ? a.removeClass("pushed-button")
			.addClass("popped-button") : a.removeClass("popped-button")
			.addClass("pushed-button");
		return !1
	};
	this.push_button = function (a) {
		$(a)
			.removeClass("popped-button")
			.addClass("pushed-button")
	};
	this.pop_button = function (a) {
		$(a)
			.removeClass("pushed-button")
			.addClass("popped-button")
	};
	this.serendipity = function () {
		this.push_button(".serendipity");
		return !0
	};
	this.show_panel = function () {
		parent.inner_toolbar.document.body.cols = a
	};
	this.hide_panel = function () {
		parent.inner_toolbar.document.body.cols = b
	};
	this.resize_toolbar = function () {
		var a = $("body")
			.height();
		parent.document.body.rows = a + "px, 100%"
	};
	this.login_msg = function () {
		$(".toolbar-status-bar")
			.show();
		$(".login-arrow")
			.show();
		this.resize_toolbar();
		return !1
	};
	this.top_window = function () {
		for (var a = window; a != a.parent;) a = a.parent;
		return a.parent
	};
	var c = null;
	this.panel_loadurl = function (a) {
		try {
			return window.parent.inner_toolbar.reddit_panel.location == a ? !1 : (c != null && (this.pop_button(c), c = null), !0)
		} catch (b) {
			return !0
		}
	};
	var e = 0;
	this.comments_pushed = function (a) {
		(e = !e) ? (this.push_button(a), this.show_panel()) : (this.pop_button(a), this.hide_panel())
	};
	this.gourl = function (a,
	b) {
		var c = $(a)
			.find('input[type="text"]')
			.val(),
			c = b + escape(c);
		this.top_window()
			.location.href = c;
		return !1
	};
	this.pref_commentspanel_hide = function () {
		$.request("tb_commentspanel_hide")
	};
	this.pref_commentspanel_show = function () {
		$.request("tb_commentspanel_show")
	}
};

function clear_all_langs(a) {
	$(a)
		.parents("td")
		.find('input[type="checkbox"]')
		.prop("checked", !1)
}

function check_some_langs(a) {
	$(a)
		.parents("td")
		.find("#some-langs")
		.prop("checked", !0)
}

function fetch_parent(a, b, c) {
	$(a)
		.css("color", "red")
		.html(reddit.status_msg.loading);
	var e = $(a)
		.thing();
	if (e.find(".uncollapsed .parent")
		.length == 0) {
		var j = "";
		$.getJSON(b, function (b) {
			$.each(b, function () {
				this && this.data.children && $.each(this.data.children, function () {
					if (this.data.name == c) j = this.data.body_html
				})
			});
			j && e.find(".noncollapsed .md")
				.first()
				.before('<div class="parent rounded">' + $.unsafe(j) + "</div>");
			$(a)
				.parent("li")
				.andSelf()
				.remove()
		})
	}
	return !1
}

function big_mod_action(a, b) {
	if (!a.hasClass("pressed")) a.addClass("pressed"), d = {
		id: a.thing_id()
	}, a.siblings(".status-msg")
		.hide(), b == -1 ? (d.spam = !1, $.request("remove", d, null, !0), a.siblings(".removed")
		.show()) : b == -2 ? ($.request("remove", d, null, !0), a.siblings(".spammed")
		.show()) : b == 1 && ($.request("approve", d, null, !0), a.siblings(".approved")
		.show());
	a.siblings(".pretty-button")
		.removeClass("pressed");
	return !1
}

function juryvote(a, b) {
	var c = a.thing_id();
	a.hasClass("pressed") && (b = 0);
	a.toggleClass("pressed");
	a.siblings(".pretty-button")
		.removeClass("pressed");
	d = {
		id: c,
		dir: b
	};
	$.request("juryvote", d, null, !0);
	a.siblings(".thanks-for-voting")
		.show();
	return !1
}
$(function () {
	function a() {
		return toggle(this)
	}
	$("body")
		.click(close_menus);
	$("body")
		.set_thing_init(updateEventHandlers);
	"placeholder" in document.createElement("input") || $("textarea[placeholder], input[placeholder]")
		.addClass("gray")
		.each(function () {
		var a = $(this),
			c = a.attr("placeholder");
		a.val() == "" && a.val(c)
	});
	$("textarea.gray, input.gray")
		.focus(function () {
		$(this)
			.attr("rows", 7)
			.filter(".gray")
			.removeClass("gray")
			.val("")
	});
	reddit.logged && $.cookie_name_prefix(reddit.logged);
	$.default_cookie_domain(reddit.cur_domain.split(":")[0]);
	last_click();
	$('#search input[name="q"]')
		.focus(function () {
		$("#searchexpando")
			.slideDown()
	});
	$("#search_showmore")
		.click(function (a) {
		$("#search_showmore")
			.parent()
			.hide();
		$("#moresearchinfo")
			.slideDown();
		a.preventDefault()
	});
	$("#moresearchinfo")
		.prepend('<a href="#" id="search_hidemore">[-]</a>');
	$("#search_hidemore")
		.click(function (a) {
		$("#search_showmore")
			.parent()
			.show();
		$("#moresearchinfo")
			.slideUp();
		a.preventDefault()
	});
	$("#shortlink-text")
		.click(function () {
		$(this)
			.select()
	});
	organic_help();
	$("body")
		.delegate(".ajax-yn-button", "submit", function () {
		var a = $(this)
			.find('input[name="_op"]')
			.val();
		post_form(this, a);
		return !1
	})
		.delegate(".ajax-yn-button .togglebutton", "click", a)
		.delegate(".ajax-yn-button .no", "click", a)
		.delegate(".ajax-yn-button .yes", "click", function () {
		$(this)
			.closest("form")
			.submit()
	})
});

function show_friend(a) {
	$("div.content .author.id-" + a)
		.addClass("friend")
		.next(".userattrs")
		.each(function () {
		$(this)
			.html() ? $(this)
			.find(".friend")
			.length == 0 && $(this)
			.find("a:first")
			.debug()
			.before('<a class="friend" title="friend" href="/prefs/friends">F</a>,') : $(this)
			.html(' [<a class="friend" title="friend" href="/prefs/friends">F</a>]')
	})
}

function show_unfriend(a) {
	$(".author.id-" + a)
		.removeClass("friend")
		.next(".userattrs")
		.each(function () {
		$(this)
			.find("a.friend")
			.remove();
		$(this)
			.find("a")
			.length == 0 && $(this)
			.html("")
	})
}

function search_feedback(a, b) {
	f = $("form#search");
	var c = f.find('input[name="q"]')
		.val(),
		e = f.find('input[name="sort"]')
			.val(),
		j = f.find('input[name="t"]')
			.val();
	$.request("searchfeedback", {
		q: c,
		sort: e,
		t: j,
		approval: b
	}, null, !0);
	a.siblings(".pretty-button")
		.removeClass("pressed");
	a.siblings(".thanks")
		.show();
	a.addClass("pressed");
	return !1
}

function highlight_new_comments(a) {
	var b;
	for (b = 0; b <= 9; b++) items = $(".comment-period-" + b), a >= 0 && b >= a ? items.addClass("new-comment") : items.removeClass("new-comment")
}

function save_href(a) {
	a.attr("srcurl") || a.attr("srcurl", a.attr("href"));
	return a
}

function pure_domain(a) {
	(a = a.match(/:\/\/([^/]+)/)) && (a = a[1].replace(/^www\./, ""));
	return a
}

function parse_domain(a) {
	var b = pure_domain(a);
	b || (a = a.match(/\/r\/([^/]+)/)) && (b = "self." + a[1].toLowerCase());
	return b
}
r.apps = {
	init: function () {
		$(".authorized-app")
			.delegate(".app-permissions li", "mouseover mouseout", function (a) {
			a.type == "mouseover" ? $(this)
				.find(".app-scope")
				.show() : $(this)
				.find(".app-scope")
				.hide()
		});
		$("#developed-apps")
			.delegate(".edit-app-button", "click", function () {
			$(this)
				.toggleClass("collapsed")
				.closest(".developed-app")
				.removeClass("collapsed")
				.find(".app-developers")
				.remove()
				.end()
				.find(".edit-app")
				.slideToggle()
				.removeClass("collapsed")
				.end()
		})
			.delegate(".edit-app-icon-button", "click", function () {
			$(this)
				.toggleClass("collapsed")
				.closest(".developed-app")
				.find(".ajax-upload-form")
				.show()
		});
		$("#create-app-button")
			.click(function () {
			$(this)
				.hide();
			$("#create-app")
				.fadeIn()
		})
	},
	revoked: function (a) {
		$(a)
			.closest(".authorized-app")
			.fadeOut()
	},
	deleted: function (a) {
		$(a)
			.closest(".developed-app")
			.fadeOut()
	}
};
r.strings = {
	"login_fallback_msg": "try using our secure login form.",
	"an_error_occurred_friendly": "an error occurred. please try again later!",
	"an_error_occurred": "an error occurred"
}