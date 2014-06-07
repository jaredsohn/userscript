// ==UserScript==
// @name        Generation 1986: Integrated Account Information
// @namespace   http://lowreal.net/
// @include     http://generation1986.g.hatena.ne.jp/keyword/%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E4%B8%80%E8%A6%A7
// ==/UserScript==

(function () { with (D()) {
	var genParser= function (parser) {
		if (!parser) parser = function (x) { return document.createTextNode(x) };
		return function (req) {
			var ret = {};
			$X(".//li[contains(., '->')]", h(req.responseText)).forEach(function (e) {
				var m = $X("string(.)", e).match(/(\S+)\s*->\s*(\S+)/);
				var hatenaId = m[1], serviceId = m[2];
				ret[hatenaId] = parser(serviceId);
			});
			return ret;
		};
	};

	var services = {
		Twitter :
			xhttp.get("http://generation1986.g.hatena.ne.jp/keyword/Twitter").next(genParser(function (t) {
				t = t.replace("@", "");
				return $N("<a href='http://twitter.com/"+t+"'>@"+t+"</a>");
			})),
		Skype :
			xhttp.get("http://generation1986.g.hatena.ne.jp/keyword/Skype").next(genParser(function (t) {
				return $N("<a href='skype:"+t+"?add'>"+t+"</a>");
			}))
	};

	var table = $X("//div[@class='section']/table")[0];
	var htr   = $X(".//tr[th]", table)[0];
	var users = $X(".//tr[contains(td, 'id:')]");

	parallel(services).next(function (r) {
		console.log(r);
		for (var service in services) if (services.hasOwnProperty(service)) {
			htr.appendChild($N("<th>"+service+"</th>"));

			users.forEach(function (tr) {
				var id = $X("string(./td[contains(., 'id:')])", tr).match(/id:(\S+)/)[1];

				tr.appendChild($N("<td/>", [
					r[service][id] || "---"
				]));
			});
		}
	}).
	error(function (e) {
		alert(e);
	});

} // end with

/* template functions  */
function h (s) {
	var d = document.createElement("div");
	d.innerHTML = s;
	return d;
}

function $N (str, childs) {
	if (str.nodeType) return str;
	var t, cur, stack = [cur = document.createDocumentFragment()];
	while (str.length) {
		if (str.indexOf("<") == 0) {
			if (t = str.match(/^\s*<(\/?[^\s>\/]+)([^>]+?)?(\/)?>/)) {
				var tag = t[1], attrs = t[2], isempty = !!t[3];
				if (tag.indexOf("/") == -1) {
					child = document.createElement(tag);
					if (attrs) attrs.replace(/([a-z]+)=(?:'([^']+)'|"([^"]+)")/gi,
						function (m, name, v1, v2) {
							child.setAttribute(name, v1 || v2);
						}
					);
					cur.appendChild(child);
					if (!isempty) {
						stack.push(cur);
						cur = child;
					}
				} else cur = stack.pop();
			} else throw("Parse Error: " + str);
		} else {
			if (t = str.match(/^([^<]+)/)) cur.appendChild(document.createTextNode(t[0]));
		}
		str = str.substring(t[0].length);
	}
	var ret = stack.pop();
	if (ret.childNodes.length == 1) ret = ret.firstChild;
	if (childs) for (var i = 0; i < childs.length; i++) {
		ret.appendChild(arguments.callee(childs[i]));
	}
	return ret;
}


function log (m) {
	m = String(m);
//		var c = unsafeWindow.console;
//		if (c) c.log.apply(c, arguments);
	var o = Array.prototype.concat.apply([], arguments);
	if (window.console) {
		window.console.log(o.join(", "));
	} else
	if (GM_log) {
		GM_log(o);
	} else {
		location.href = "javascript:(function () { if (window.console) console.log.apply(console.log, "+o.toSource()+") })();";
	}
}


// extend version of $X
// $X(exp);
// $X(exp, context);
// $X(exp, type);
// $X(exp, context, type);
function $X (exp, context, type /* want type */) {
	if (typeof context == "function") {
		type    = context;
		context = null;
	}
	if (!context) context = document;
	var exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
		var ns = { "atom" : "http://purl.org/atom/ns#" };
		return document.createNSResolver((context.ownerDocument == null ? context
		                                                                : context.ownerDocument).documentElement)
		               .lookupNamespaceURI(prefix) || ns[prefix] || document.documentElement.namespaceURI;
	});

	switch (type) {
		case String:
			return exp.evaluate(
				context,
				XPathResult.STRING_TYPE,
				null
			).stringValue;
		case Number:
			return exp.evaluate(
				context,
				XPathResult.NUMBER_TYPE,
				null
			).numberValue;
		case Boolean:
			return exp.evaluate(
				context,
				XPathResult.BOOLEAN_TYPE,
				null
			).booleanValue;
		case Array:
			var result = exp.evaluate(
				context,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null
			);
			var ret = [];
			for (var i = 0, len = result.snapshotLength; i < len; i++) {
				ret.push(result.snapshotItem(i));
			}
			return ret;
		case undefined:
			var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
			switch (result.resultType) {
				case XPathResult.STRING_TYPE : return result.stringValue;
				case XPathResult.NUMBER_TYPE : return result.numberValue;
				case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
				case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
					// not ensure the order.
					var ret = [];
					var i = null;
					while (i = result.iterateNext()) {
						ret.push(i);
					}
					return ret;
				}
			}
			return null;
		default:
			throw(TypeError("$X: specified type is not valid type."));
	}
}


// Usage:: with (D()) { your code }
// JSDefeered 0.2.0 (c) Copyright (c) 2007 cho45 ( www.lowreal.net )
// See http://coderepos.org/share/wiki/JSDeferred
function D () {


function Deferred () { return (this instanceof Deferred) ? this.init(this) : new Deferred() }
Deferred.prototype = {
	init : function () {
		this._next    = null;
		this.callback = {
			ok: function (x) { return x },
			ng: function (x) { throw  x }
		};
		return this;
	},

	next  : function (fun) { return this._post("ok", fun) },
	error : function (fun) { return this._post("ng", fun) },
	call  : function (val) { return this._fire("ok", val) },
	fail  : function (err) { return this._fire("ng", err) },

	cancel : function () {
		(this.canceller || function () {})();
		return this.init();
	},

	_post : function (okng, fun) {
		this._next =  new Deferred();
		this._next.callback[okng] = fun;
		return this._next;
	},

	_fire : function (okng, value) {
		var self = this, next = "ok";
		try {
			value = self.callback[okng].call(self, value);
		} catch (e) {
			next  = "ng";
			value = e;
		}
		if (value instanceof Deferred) {
			value._next = self._next;
		} else {
			if (self._next) self._next._fire(next, value);
		}
		return this;
	}
};

Deferred.parallel = function (dl) {
	var ret = new Deferred(), values = {}, num = 0;
	for (var i in dl) {
		if (!dl.hasOwnProperty(i)) continue;
		(function (d, i) {
			d.next(function (v) {
				values[i] = v;
				if (--num <= 0) {
					if (dl instanceof Array) {
						values.length = dl.length;
						values = Array.prototype.slice.call(values, 0);
					}
					ret.call(values);
				}
			}).error(function (e) {
				ret.fail(e);
			});
			num++;
		})(dl[i], i)
	}
	return ret;
};

Deferred.wait = function (n) {
	var d = new Deferred(), t = new Date();
	var id = setTimeout(function () {
		clearTimeout(id);
		d.call((new Date).getTime() - t.getTime());
	}, n * 1000)
	d.canceller   = function () { try { clearTimeout(id) } catch (e) {} };
	return d;
};

Deferred.next = function (fun) {
	var d = new Deferred();
	var id = setTimeout(function () { clearTimeout(id); d.call() }, 0);
	if (fun) d.callback.ok = fun;
	d.canceller   = function () { try { clearTimeout(id) } catch (e) {} };
	return d;
};

Deferred.call = function (f, args) {
	args = Array.prototype.slice.call(arguments);
	f    = args.shift();
	return Deferred.next(function () {
		return f.apply(this, args);
	});
};

Deferred.loop = function (n, fun) {
	var o = {
		begin : n.begin || 0,
		end   : n.end   || (n - 1),
		step  : n.step  || 1,
		last  : false,
		prev  : null
	};
	var ret, step = o.step;
	return Deferred.next(function () {
		function _loop (i) {
			if (i <= o.end) {
				if ((i + step) > o.end) {
					o.last = true;
					o.step = o.end - i + 1;
				}
				o.prev = ret;
				ret = fun.call(this, i, o);
				if (ret instanceof Deferred) {
					return ret.next(function (r) {
						ret = r;
						return Deferred.call(_loop, i + step);
					});
				} else {
					return Deferred.call(_loop, i + step);
				}
			} else {
				return ret;
			}
		}
		return Deferred.call(_loop, o.begin);
	});
};

Deferred.register = function (name, fun) {
	this.prototype[name] = function () {
		return this.next(Deferred.wrap(fun).apply(null, arguments));
	};
};

Deferred.wrap = function (dfun) {
	return function () {
		var a = arguments;
		return function () {
			return dfun.apply(null, a);
		};
	};
};

Deferred.register("loop", Deferred.loop);
Deferred.register("wait", Deferred.wait);

Deferred.define = function (obj, list) {
	if (!list) list = ["parallel", "wait", "next", "call", "loop"];
	if (!obj)  obj  = (function () { return this })();
	for (var i = 0; i < list.length; i++) {
		var n = list[i];
		obj[n] = Deferred[n];
	}
	return Deferred;
};



function xhttp (opts) {
	var d = Deferred();
	if (opts.onload)  d = d.next(opts.onload);
	if (opts.onerror) d = d.error(opts.onerror);
	opts.onload = function (res) {
		d.call(res);
	};
	opts.onerror = function (res) {
		d.fail(res);
	};
	GM_xmlhttpRequest(opts);
	return d;
}
xhttp.get  = function (url)       { return xhttp({method:"get", url:url}) }
xhttp.post = function (url, data) { return xhttp({method:"post", url:url, data:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}) }


function http (opts) {
	var d = Deferred();
	var req = new XMLHttpRequest();
	req.open(opts.method, opts.url, true);
	if (opts.headers) {
		for (var k in opts.headers) if (opts.headers.hasOwnProperty(k)) {
			req.setRequestHeader(k, opts.headers[k]);
		}
	}
	req.onreadystatechange = function () {
		if (req.readyState == 4) d.call(req);
	};
	req.send(opts.data || null);
	return d;
}
http.get  = function (url)       { return http({method:"get", url:url}) }
http.post = function (url, data) { return http({method:"post", url:url, data:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}) }

Deferred.Deferred = Deferred;
Deferred.http     = http;
Deferred.xhttp    = xhttp;
return Deferred;
}
//end


})();
