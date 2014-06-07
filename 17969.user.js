// ==UserScript==
// @name        Use tumblr to post illusts instead of fotolife
// @description Use tumblr to post illusts instead of fotolife
// @namespace   http://lowreal.net/
// @include     http://h.hatena.ne.jp/*
// ==/UserScript==

(function () { with (D()) {

	var mail = GM_getValue("tumblrmail") || GM_setValue("tumblrmail", prompt("Tumblr Email"));
	var pass = GM_getValue("tumblrpass") || GM_setValue("tumblrpass", prompt("Tumblr Password"));
	var your = GM_getValue("tumblrhome") || GM_setValue("tumblrhome", prompt("http://[you].tumblr.com", "http://[you].tumblr.com"));;

	unsafeWindow.Hatena.Haiku.EntryForm.postDrawing = function (uri) {
		log("Start post -> tumblr");
		var foto = uri;
		next(function () {
			var title = "Hatena Haiku";
			var e   = encodeURIComponent;
			var url = 'http://www.tumblr.com/api/write';
			var data = [
				'email='+e(mail),
				'password='+e(pass),
				'type=photo',
				'source='+e(foto),
				'caption=',
				'generator=GreaseMonkey'
			].join("&");
			log(url);
			return xhttp.post(url, data).next(function (data) {
				if (data.status == 201) {
					return data.responseText;
				} else {
					throw "Incorrect user/pass or error";
				}
			});
		}).
		next(function (id) {
			log("post done... getting uri for the photo...");
			return xhttp.get(your+"/api/read?id="+id).next(function (data) {
				data.responseXML = (new DOMParser).parseFromString(data.responseText, "text/xml");
				return $X("string(.//photo-url[@max-width='500'])", data.responseXML)
			});
		}).
		next(function (uri) {
			log("getting uri done... post to haiku and remove photo on fotolife");
			return parallel([
				next(function () {
					if (!uri) return;
					var form = unsafeWindow.Hatena.Haiku.EntryForm.currentForm;
					if (!form) return;
					form.textarea.value = uri;
					form.form.submit();
				}),
				next(function () {
					var id = foto.match(/\/(\d+)\.[^.]+$/)[1];
					log("fotolife id = "+id);
					xhttp({method:"delete",url:"http://f.hatena.ne.jp/rkatom/edit/"+id}).
					next(function (res) {
						log("done remove photo from fotolife");
					});
				})
			]);
		}).
		error(function (e) {
			alert(e);
		});
	};

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
	var map = { "&" : "&amp;", "<" : "&lt;" , ">" : "&gt;"};
	return str.replace(/[&<>]/g, function (m) {
		return map[m];
	});
};



function $N(name, attr, childs) {
	var ret = document.createElement(name);
	for (k in attr) {
		if (!attr.hasOwnProperty(k)) continue;
		v = attr[k];
		if (k == "class") {
			ret.className = v;
		} else {
			ret.setAttribute(k, v);
		}
	}
	switch (typeof childs) {
		case "string": {
			ret.appendChild(document.createTextNode(childs));
			break;
		}
		case "object": {
			for (var i = 0, len = childs.length; i < len; i++) {
				var child = childs[i];
				if (typeof child == "string") {
					ret.appendChild(document.createTextNode(child));
				} else {
					ret.appendChild(child);
				}
			}
			break;
		}
	}
	return ret;
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
		var o = document.createNSResolver(context)(prefix);
		if (o) return o;
		return (document.contentType == "application/xhtml+xml") ? "http://www.w3.org/1999/xhtml" : "";
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


// Usage:: var Deferred = D().define();
// JSDefeered (c) Copyright (c) 2007 cho45 ( www.lowreal.net )
// See http://coderepos.org/share/wiki/JSDeferred
function D () {


function Deferred () { return (this instanceof Deferred) ? this.init(this) : new Deferred() }
Deferred.prototype = {
	init : function () {
		this.callback = {
			ok: function (x) { return x },
			ng: function (x) { throw  x }
		};
		this._next    = null;
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
			var id = setTimeout(function () {
				clearTimeout(id);
				if (self._next) self._next._fire(next, value);
			}, 0);
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
	d.callback.ok = fun;
	d.canceller   = function () { try { clearTimeout(id) } catch (e) {} };
	return d;
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
}


})();
