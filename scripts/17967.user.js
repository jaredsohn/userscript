// ==UserScript==
// @name        Expand replies tree
// @namespace   http://lowreal.net/
// @include     http://h.hatena.ne.jp/*
// @include     http://h.hatena.com/*
// ==/UserScript==

(function (unsafeWindow) { with (D()) {
	const WAIT = 1;
	const ICON = [
		"data:image/png;base64,",
		"iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAD1BMVEX45u/y",
		"zt////+za4X///8WHaQkAAAABXRSTlP/////APu2DlMAAAAZdEVYdFNvZnR3",
		"YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAARElEQVQI103OORIAQAgCQWD4",
		"/5s3cC+yLgtV5aVVyckmkW0PG8YBNK3IDj0k+vlNX3fzbkb8d++q+WrYVLZd",
		"1JaeDF8WzSMCBiKqHq0AAAAASUVORK5CYII="
	].join("");


	GM_addStyle([
		"div.info .expand a {",
			"background: transparent url('",ICON,"') no-repeat scroll 0 65%;",
			"padding: 6px 0 2px 16px;",
			"margin: 0 0 0 3px",
		"}",
	].join(""));

	function applyJavaScript (entry) {
		entry = entry.parentNode.removeChild(entry);
		// remove event handlers
		entry.innerHTML = entry.innerHTML;
		// append to temporary element
		var t = h();
		t.appendChild(entry);
		// remove duplicated star elements
		$X("../*/div/*[@class='title']/span[@class='hatena-star-comment-container' or @class='hatena-star-star-container']", entry).forEach(function (e) {
			e.parentNode.removeChild(e);
		});

		unsafeWindow.Hatena.Haiku.Pager.dispatchEvent('loadedEntries', entry.parentNode.wrappedJSObject || entry.parentNode);
		return entry;
	}

	function expandChildReplies (entry) {
		var body = $X("./div[@class='list-body']", entry)[0];
		return parallel(
			$X("./div[@class='info']/span[@class='replies']/a[@href]", body).map(function (a) {
				a.style.opacity = "0.6";
				// don't show if this was showed entry
				var raw_href = $X("string(@href)", a);
				if ($X("boolean(.//span[@class='timestamp']/a[@href = '"+raw_href+"'])", entry)) {
					a.style.opacity = "0.2";
					return next();
				}
				// don't load already showed entry
				var es = $X("//div[@class='entry' and .//span[@class='timestamp']/a[@href = '"+raw_href+"']]");
				if (es.length) return appendAndLoadNext(es[0]);
				log(a.href);
				return xhttp.get(a.href).next(function (data) {
					// remove unnecessary tags
					var t = h(data.responseText.replace(/<\/?(?:script|i?frame)[^>]*>/g, ""));
					return parallel($X(".//div[@class='entries']/div[@class='entry']", t).map(appendAndLoadNext));
				});

				function appendAndLoadNext (e) {
					a.style.opacity = "0.2";
					$X("./div[@class='list-body']/div/a[img[@src='/images/icon-replieslink.gif']]", e)[0].style.opacity = "0.2";
					body.appendChild(applyJavaScript(e));
					return wait(WAIT).next(function () {
						return call(expandChildReplies, e);
					});
				}
			})
		);//.next(function () {
//			// sort by timestamp
//			$X("li[@class='entry']", body).map(function (i) {
//				return {
//					time: $X("string(div/div/span[@class='timestamp']/a/@href)", i).match(/\d+$/)[0],
//					elem: i
//				};
//			}).sort(function (a, b) {
//				return b.time - a.time;
//			}).forEach(function (i) {
//				body.appendChild(i.elem);
//			});
//		});
	}

	function expandReplies (entry) {
		var a    = $X("./div[@class='list-body']/div/a[img[@src='/images/icon-replieslink.gif']]", entry)[0];
		var raw_href = $X("string(@href)", a);
		var es = $X("//div[@class='entry' and .//span[@class='timestamp']/a[@href = '"+raw_href+"']]");
		if (a) a.style.opacity = "0.6";

		$X(".//span[@class='expand']", entry).forEach(function (e) {
			e.innerHTML = "Loading...";
		});
		return parallel([
			expandChildReplies(entry),
			!a ? next() : es.length ? appendAndLoadNext(es[0]) : xhttp.get(a.href).next(function (data) {
				var t = h(data.responseText.replace(/<\/?(?:script|i?frame)[^>]*>/g, ""));
				return parallel($X(".//div[@class='entries']/div[@class='entry']", t).map(appendAndLoadNext));
			}),
		]).
		next(function () {
			$X(".//span[@class='expand']", entry).forEach(function (e) {
				e.parentNode.removeChild(e);
			});
		});

		function appendAndLoadNext (e) {
			if (a) a.style.opacity = "0.2";
			e = applyJavaScript(e);
			var body = $X("./div[@class='list-body']", e)[0];
			entry.parentNode.insertBefore(e, entry);
			body.appendChild(entry);
			return wait(WAIT).next(function () {
				return call(expandReplies, e);
			});
		}
	}

	// observe pagerize
	var num = 0;
	next(function () {
		var n = $X("count(//div[@class='entries']/div[@class='entry'])");
		if (num < n) {
			var entries = $X("//div[@class='entries']/div[@class='entry'][.//img[starts-with(@src, '/images/icon-repl')]]");
			loop(entries.length, function (n) {
				var e = entries[n].wrappedJSObject || entries[n];
				if (e._gm_expandreplies_applied) return;
				e._gm_expandreplies_applied = true;
				var handler = function () {
					if (window.getSelection().toString()) return;
					if (e._loading) return;
					e._loading = true;
					log("Loading...");
					expandReplies(e).next(function () {
						if (log.element) {
							log.element.parentNode.removeChild(log.element);
							log.element = null;
						}
					}).error(function (e) {
						alert("Error"+e);
					});
				};
				// $X("div/div[@class='body']", e)[0].addEventListener("click", handler, false);

				var info = $X("./div/div[@class='info']", e)[0];
				info.appendChild(h("<span class='expand'><a href='javascript:void(156)'>Expand</a></span>").firstChild);
				info.addEventListener("click", handler, false);
			});

			num = n;
		}
		return wait(WAIT).next(arguments.callee);
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

function log (m) {
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

	if (!arguments.callee.element) {
		arguments.callee.element = h("<div style='position:fixed;top:0;left:0;background:#000;color:#fff;padding:0 0.5em;'/>").firstChild;
		document.body.appendChild(arguments.callee.element);
	}
	arguments.callee.element.innerHTML = escapeHTML(m);
}

function escapeHTML (str) {
	var str = String(str);
	var map = { "&" : "&amp;", "<" : "&lt;" , ">" : "&gt;"};
	return str.replace(/[&<>]/g, function (m) {
		return map[m];
	});
};

// extend version of $X
// $X(exp);
// $X(exp, context);
// $X(exp, type);
// $X(exp, context, type);
function $X (exp, context, type /* want type */) {
	// console.log(String(exp));
	if (typeof context == "function") {
		type    = context;
		context = null;
	}
	if (!context) context = document;
	var exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
		var ns = { "atom" : "http://purl.org/atom/ns#", "hatena" : "http://www.hatena.ne.jp/info/xmlns#" };
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
			for (var i = 0, len = result.snapshotLength; i < len; ret.push(result.snapshotItem(i++)));
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
			alert(e);
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
		})(dl[i], i);
	}
	if (!num) Deferred.next(function () { ret.call() });
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
	req.onreadystatechange = function () {
		if (req.readyState == 4) d.call(req);
	};
	req.send(opts.data || null);
	return d;
}
http.get  = function (url)       { return http({method:"get", url:url}) }
http.post = function (url, data) { return http({method:"post", url:url, data:data}) }

Deferred.Deferred = Deferred;
Deferred.http     = http;
Deferred.xhttp    = xhttp;
return Deferred;
}// End of JSDeferred

})(this.unsafeWindow || this);


