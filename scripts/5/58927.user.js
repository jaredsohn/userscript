// ==UserScript==
// @name           AOTR forum jAutoPagerize
// @namespace      aotrtools_jAutoPagerize
// @source         http://userscripts.org/scripts/show/58927
// @identifier     http://userscripts.org/scripts/source/58927.user.js
// @description    Concatena le pagine sul forum AOTR
// @version        0.3
// @date           2010-12-03
// @author         brucaliffo
// @email          brucaliffo@gmail.com
// @include        http://www.apriliaontheroad.com/forum2009/*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/* original script by cho45 @ http://userscripts.org/scripts/show/14666 */




(function (AutoPagerize) { with (D()) {
	$E = createElementFromString;
	$A = Enumerator;
	if (window != window.parent) return;
	if (document.contentType.indexOf("html") == -1) return;

	AutoPagerize = {};
	AutoPagerize.VERSION = "jAutoPagerize $Rev: 33889+? $";
	AutoPagerize.Config  = {
		  site_info_urls : [
			  { format : 'JSON', url : 'http://wedata.net/databases/AutoPagerize/items.json' }
			, { format : 'HTML', url : 'http://swdyh.infogami.com/autopagerize' }
		]
		, site_info : [
			//AOTR1
			  { url          : '^http://www.apriliaontheroad.com/forum2009/viewtopic.php.*'
			  , nextLink     : '//a[.="Prossimo"]'
			  , insertBefore : ''
			  , pageElement  : '//div[@id="pagecontent"]'
			  }
			//AOTR2
			, { url          : '^http://www.apriliaontheroad.com/forum2009/search.php.*'
			  , nextLink     : '//a[.="Prossimo"]'
			  , insertBefore : ''
			  , pageElement  : '//div[@id="wrapcentre"]/form/table[2]'
			  }
			
		]
		, microformats : [
			/* Rule of original AutoPagerize */
			  { url          : '^https?://.+'
			  , nextLink     : '//a[contains(concat(" ", normalize-space(@rel), " "), " next ")]'
			  , insertBefore : '//*[contains(concat(" ", @class, " "), " autopagerize_insert_before ")]'
			  , pageElement  : '//*[contains(concat(" ", @class, " "), " autopagerize_page_element ")]'
			  }
			/* Rule with microformats hAtom */
			, { url          : '^https?://.+'
			  , nextLink     : '//a[contains(concat(" ", normalize-space(@rel), " "), " next ")]'
			  , insertBefore : '//*[contains(concat(" ", @class, " "), " hfeed ")]/following-sibling::node()'
			  , pageElement  : '//*[contains(concat(" ", @class, " "), " hfeed ")]'
			  }
		]
		, color : {
			  on         : '#005784'
			, off        : '#cccccc'
			, loading    : '#00587f'
			, terminated : '#000000'
			, error      : '#990000'
		}
		, cache_expire  : duration("1 day")
		, remain_height : 300
		, autostart     : true
	};
	AutoPagerize.DEBUG = eval(GM_getValue("DEBUG", "false"));

	/**
	 * filter APIs
	 */
	AutoPagerize.filters = [
		// Hatena::Star
		function (pages) {
			if (unsafeWindow.Hatena &&
				unsafeWindow.Hatena.Star) {
				// If page have own 'HatenaStar' loader, it should be ignore the
				// loading. ex: http://b.hatena.ne.jp/xxxxxxx/favorite
				if (!unsafeWindow.Hatena.Star.EntryLoader.loadEntries) {
					pages.forEach(function (node) {
						unsafeWindow.Hatena.Star.EntryLoader.loadNewEntries(node);
					});
				}
			}
		}
	];
	AutoPagerize.addFilter = function (fun) {
		AutoPagerize.filters.push(fun);
	};

	// define export object;
	window.AutoPagerize = {
		VERSION   : AutoPagerize.VERSION,
		addFilter : AutoPagerize.addFilter
	};

	function getHTMLResource (uri) {
		var d = Deferred();
		var iframe = $E("<iframe name='foobar' src='#{url}' style='display: none'></iframe>", {
			parent: document.body,
			data : {
				url : absoluteURI(uri)
			}
		});
		iframe.contentWindow.addEventListener("DOMContentLoaded", function (e) {
			e.preventDefault();
			e.stopPropagation();
			iframe.contentWindow.removeEventListener("DOMContentLoaded", arguments.callee, true);
			d.call(iframe.contentDocument.wrappedJSObject);
			iframe.parentNode.removeChild(iframe);
		}, true);
		return d;
	}

	function getCachedResource (uri, convertfun, expire) {
		var d   = Deferred();
		var key = uri;
		var v   = {};
		try { v = eval(GM_getValue(key, "({})")) || {} } catch (e) { log("parse error: may be uneval bug"); v = {}; }
		d.clear = function () {
			GM_setValue(key, "");
			return this;
		};
		if (v.time && v.time > (new Date).getTime() - expire) {
			log("Cache Hitted: " + key);
			setTimeout(function () { d.call(v.body); }, 10);
		} else {
			log("Cache expired; getting... " + key);
			GM_xmlhttpRequest({
				method  : "GET",
				url     : uri,
				headers : {
					"User-Agent": navigator.userAgent + " Greasemonkey (" + AutoPagerize.VERSION + ")"
				},
				onload  : function (req) { try {
					var res = convertfun(req.responseText);
					GM_setValue(key, uneval({time:(new Date).getTime(), body:res}));
					log(key, uneval({time:(new Date).getTime(), body:res}));
					log("Cached: " + key);
					d.call(res);
				} catch (e) { d.fail(e) } },
				onerror : function (e) {
					d.fail("HTTPError:"+e);
				}
			});
		}
		return d;
	};

	/**
	 * jAutoPagerize
	 */

	AutoPagerize.onscroll = function (e) {
		if (AutoPagerize.enable) {
			var height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
			var remain = height - window.innerHeight - window.scrollY;
			if (remain < AutoPagerize.Config.remain_height + window.innerHeight) {
				AutoPagerize.loadNext();
			}
		}
	};

	AutoPagerize.toggle = function () {
		AutoPagerize.enable = !AutoPagerize.enable;
		AutoPagerize.updateStatus();
		return AutoPagerize.enable;
	};

	AutoPagerize.loadNext = function () {
		if ( AutoPagerize._loading) return null;
		if (!AutoPagerize._nextURI) {
			AutoPagerize._terminate = true;
			AutoPagerize.updateStatus();
			return null;
		}

		AutoPagerize._loading = true;
		AutoPagerize.updateStatus();

		if (AutoPagerize._nextURI == "!click") {
			var e = document.createEvent("MouseEvents");
			with ({
				type      : 'click',
				canBubble : true,
				canCancel : true,
				view      : window,
				detail    : 1,
				screenX   : 0,
				screenY   : 0,
				clientX   : 0,
				clientY   : 0,
				ctrl      : false,
				alt       : false,
				shift     : false,
				meta      : false,
				button    : 0,
				related   : null
			}) e.initMouseEvent(type, canBubble, canCancel, view, detail, screenX, screenY, clientX, clientY, ctrl, alt, shift, meta, button, related);
			var target = $X(AutoPagerize._pageinfo.nextLink)[0];
			var height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
			target.dispatchEvent(e);
			return next(function w () {
				// ?????????????????????????
				if (height < Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)) {
					AutoPagerize._loading = false;
					AutoPagerize._currentPage++;
					AutoPagerize.updateStatus();
					return null;
				} else {
					return wait(0.5).next(w);
				}
			});
		}

		return getHTMLResource(AutoPagerize._nextURI).next(function (r) {
			AutoPagerize.log("request completed");

			var ib  = AutoPagerize._insertBefore;
			var pib = ib.parentNode;
			var sep = $E([
				// "<div class='_autopagerize'><p>",
					// "<a href='#{bookmark}'>-- \u2702 --</a>",
					// "AutoPagerized: <a href='#{next}' target='_blank'>#{next}</a>",
					// "<a href='#{bookmark}'>-- \u2702 --</a>",
				// "</p></div>"
				"<div class='_autopagerize'><p>Aprilia On The Road - Pagina " + (AutoPagerize._currentPage + 1) + "</p></div>"
				].join(" "),
				{
					data : {
						next : absoluteURI(AutoPagerize._nextURI),
						bookmark: "#_autopagerize_page" + (AutoPagerize._currentPage + 1)
					}
				}
			);
			pib.insertBefore(sep, ib);

			sep.style.display = "none";

			var timers = [];
			var pages = $X(AutoPagerize._pageinfo.pageElement, r, Array).map(function (i) {
				i = document.importNode(i, true);
				if (i.nodeType == 1 /* ELEMENT_NODE */) {
					// delayed_draw
					var style = i.style;
					var orig_display = style.display;
					style.display = "none";

					timers.push( wait(img ? 2 : 0.1).next(function () {
						sep.style.display = "block";
						style.display = orig_display
					}) );

					// Cache
					var elements = $X(".//img[@src]", i, Array);
					var img;
					for (var j = 0, len = elements.length; j < len; j++) {
						img = new Image();
						img.src = elements[j].src;
					}

					// Open pagerized links in new tab/window.
					var elements = $X(".//a[@href]", i, Array);
					for (var j = 0, len = elements.length; j < len; j++) {
						elements[j].target = "";
					}
				}

				pib.insertBefore(i, ib);

				var ev = document.createEvent("MutationEvent");
				ev.initMutationEvent("AutoPagerize_DOMNodeInserted", true, false, pib, null, absoluteURI(AutoPagerize._nextURI), null, null);
				i.dispatchEvent(ev);
				return i.wrappedJSObject || i;
			});
			AutoPagerize.filters.forEach(function (f) { try { f(pages) } catch (e) { log(e) } });
			AutoPagerize._nextURI = ($X(AutoPagerize._pageinfo.nextLink, r)[0] || {}).href;
			log($X(AutoPagerize._pageinfo.nextLink, r))

			var ev = document.createEvent("Event");
			ev.initEvent("GM_AutoPagerizeNextPageLoaded", true, true);
			document.dispatchEvent(ev);

			return parallel(timers).next(function () {
				AutoPagerize._loading = false;
				AutoPagerize._currentPage++;
				AutoPagerize.updateStatus();
			});
		}).error(AutoPagerize.errorHandler);
	};

	AutoPagerize.updateStatus = function () {
		var i = AutoPagerize.icon;

		if (AutoPagerize._error) {
			i.innerHTML = AutoPagerize._error;
			i.className = "error";
		} else
		if (AutoPagerize._terminate) {
			i.innerHTML = AutoPagerize._currentPage;
			i.className = "terminated";
		} else
		if (AutoPagerize._loading) {
			i.innerHTML = "loading...";
			i.className = "loading";
		} else {
			i.innerHTML = AutoPagerize._currentPage;
			i.className = AutoPagerize.enable ? "on" : "off";
		}
	};

	AutoPagerize.clearCache = function () {
		AutoPagerize.Config.site_info_urls.forEach(function (url_info) {
			getCachedResource(url_info.url).clear().cancel();
		});
		AutoPagerize.log('cleared cache');
	};

	AutoPagerize.log = function (str) {
		AutoPagerize.icon.innerHTML = str;
		wait(2).next(function () {
			AutoPagerize.updateStatus();
		});
	};

	AutoPagerize.applyStyle = function () {
		$E([
			"<style type='text/css'>",
				"._autopagerize {",
					"border      : 2px solid #ccc !important;",
					"color       : #fff !important;",
					"background  : #222 !important;",
					"clear       : both !important;",
					"padding     : 0.5em 1em !important;",
					"margin      : 2.0em 0 !important;",
					"font-size   : 10px !important;",
					"font-weight : bold !important;",
					"line-height : 1.33 !important;",
					"text-align  : center !important;",
					"-moz-border-radius: 1em !important;",
				"}",
				"._autopagerize p {",
					"width       : 100%;",
				"}",
				"._autopagerize a:link,",
				"._autopagerize a:visited,",
				"._autopagerize a:hover,",
				"._autopagerize * {",
					"text-decoration: none !important;",
					"color       : #fff !important;",
					"background  : #222 !important;",
					"padding     : 0 !important;",
					"margin      : 0 !important;",
					"border      : none !important;",
				"}",
				"._autopagerize_hidden_element {",
					"border      : 2px solid #ccc !important;",
					"color       : #fff !important;",
					"background  : #222 !important;",
					"clear       : both !important;",
					"padding     : 0.5em 1em !important;",
					"margin      : 1em 0 !important;",
					"font-size   : 10px !important;",
					"font-weight : bold !important;",
					"line-height : 1.33 !important;",
					"text-align  : left !important;",
					"-moz-border-radius: 1em !important;",
					"opacity     : 0.5",
				"}",
				"#autopagerize_icon {",
					"font-size   : 0.8em;",
					"position    : fixed;",
					"top         : 0;",
					"right       : 0;",
					"margin      : 0.3em;",
					"padding     : 0 1em;",
					"color       : #fff;",
					"z-index     : 9999;",
					"font-weight : bold;",
					"line-height : 1.33;",
					"cursor      : default;",
				"}",
				"#autopagerize_icon.on {",
					"background  : " + AutoPagerize.Config.color.on + " !important;",
				"}",
				"#autopagerize_icon.off {",
					"background  : " + AutoPagerize.Config.color.off + " !important;",
				"}",
				"#autopagerize_icon.loading {",
					"background  : " + AutoPagerize.Config.color.loading + " !important;",
				"}",
				"#autopagerize_icon.terminated {",
					"background  : " + AutoPagerize.Config.color.terminated + " !important;",
				"}",
				"#autopagerize_icon.error {",
					"background  : " + AutoPagerize.Config.color.error + " !important;",
				"}",
			"</style>"
			].join("\n"),
			{
				parent: document.getElementsByTagName("head")[0]
			}
		);
	};

	AutoPagerize.considerInsertOffset = function () {
		// insertBefore offset
		var ibe = document.createElement("div");
		AutoPagerize._insertBefore.parentNode.insertBefore(ibe, AutoPagerize._insertBefore);

		var offset = 0, ele = ibe;
		do {
			offset += ele.offsetTop || 0;
		} while (ele = ele.parentNode && !/html|body/i.test(ele));
		offset = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - offset;
		AutoPagerize.Config.remain_height += offset;

		ibe.parentNode.removeChild(ibe);
	};


	AutoPagerize.init = function (opts) {
		// init/define all state variables
		AutoPagerize.enable        = AutoPagerize.Config.autostart;
		AutoPagerize._opts         = opts;
		AutoPagerize._loading      = false;
		AutoPagerize._terminate    = false;
		AutoPagerize._error        = null;
		AutoPagerize._pageinfo     = {};
		AutoPagerize._nextURI      = null;
		AutoPagerize._insertBefore = null;
		AutoPagerize._currentPage  = 1;

		// get siteinfo
		parallel(
			AutoPagerize.Config.site_info_urls.map(function (url_info) {
				function parseSiteInfo (data) {
					var siteinfo = [];
					try {
						switch (url_info.format.toUpperCase()) {
							case 'JSON':
								siteinfo = eval(data).map(function(i) { return i.data });
								break;
							case 'HTML':
							default:
								var d = createDocumentFromString(data);
								$X(".//*[@class='autopagerize_data']", d).forEach(function (e) {
									// using replace as scan and folding key/value to i
									var i = {}; e.value.replace(/^\s*([^:\s]+)\s*:\s*(.*)$/gm, function (m, key, value) {
										i[key] = value;
									});
									siteinfo.push(i);
								});
								break;
						}
					} catch (e) {
						alert(e);
					}
					return siteinfo;
				}

				var cr = getCachedResource(url_info.url, parseSiteInfo, AutoPagerize.Config.cache_expire);
				if (location.href == url_info.url) cr.clear();
				return cr;
			})
		).
		next(function (r) {
			r.unshift(AutoPagerize.Config.site_info);
			r.push(AutoPagerize.Config.microformats);
			r = r.reduce(function (r, i) { return r.concat(i) });

			var initialize_time = new Date();

			var autopagerizeEnabled;
			for (var i = 0, len = r.length; i < len; i++) {
				var info = r[i];
				try {
					if (info.url && info.nextLink && info.pageElement && location.href.match(info.url) && !!$X(info.nextLink)[0]) {
						AutoPagerize._pageinfo = info;
						AutoPagerize._nextURI  = (info.pageElement == "!click") ? "!click" : ($X(info.nextLink)[0] || {}).href;
						if (!info.insertBefore) {
							var lastPageElement = $X(AutoPagerize._pageinfo.pageElement).pop();
							if (lastPageElement) AutoPagerize._insertBefore =
								lastPageElement.nextSibling || lastPageElement.parentNode.appendChild(document.createTextNode(' '));
						} else {
							AutoPagerize._insertBefore = $X(AutoPagerize._pageinfo.insertBefore)[0];
						}
						if (AutoPagerize._insertBefore) {
							autopagerizeEnabled = true;
							break;
						}
					}
				} catch (e) {
					log(e);
				} // ignore invalid regexp or xpath in siteinfo
			}

			if (!autopagerizeEnabled) return null;
			var initialize_time = (new Date()).getTime() - initialize_time.getTime();

			AutoPagerize.icon = $E("<div id='autopagerize_icon'/>", { parent: document.body });
			AutoPagerize.applyStyle();
			AutoPagerize.considerInsertOffset();

			AutoPagerize.icon.title = [
				"SiteInfo: [", AutoPagerize._pageinfo.url, "] / ",
				"Size: ", r.length, " / ",
				"Initialized: ", initialize_time / 1000, "sec"
			].join("");

			AutoPagerize.updateStatus();

			window.addEventListener("scroll",   AutoPagerize.onscroll, false);
			window.addEventListener("dblclick", AutoPagerize.toggle,   false);

			// append space to show scrollbar surely.
			var pageHeight = document.body.offsetHeight;
			if (window.innerHeight > pageHeight) {
				$E("<div style='height:" + (window.innerHeight - pageHeight + 50) + "px'/>", { parent : document.body });
			}

			if (location.hash.match(/#_autopagerize_page(\d+)/)) {
				scroll(0, 0);
				var page = +RegExp.$1 - 1;
				alert("load " + page + "pages");
				return loop(page, function (i) {
					return AutoPagerize.loadNext();
				}).
				next(function () {
					// scroll();
				});
			}

			return null;
		}).error(AutoPagerize.errorHandler);
	};

	AutoPagerize.errorHandler = function (e, f) {
		alert(String(e) + "///" + String(f));
		if (unsafeWindow.console) unsafeWindow.console.log([e, f]);
	};

	// Set error handler to all functions
	for (var i in AutoPagerize) if (AutoPagerize.hasOwnProperty(i)) {
		if ( (typeof(AutoPagerize[i]) == "function") && (i != "errorHandler") ) {
			AutoPagerize[i] = (function (f, i) {
				return function () { try {
					return f.apply(AutoPagerize, arguments);
				} catch (e) { return AutoPagerize.errorHandler(e, i) } };
			})(AutoPagerize[i], i);
		}
	}



	var XPathGenerator = {
		open : function () {
			XPathGenerator._prev = [];
			XPathGenerator._container = h("<textarea cols='40' rows='5'></textarea><br/>");
			XPathGenerator._inspect   = h("<button>Inspect</button>").firstChild;
			XPathGenerator._timer = setInterval(XPathGenerator.change, 1000);
			XPathGenerator._container.appendChild(XPathGenerator._inspect);
			with (XPathGenerator._container.style) {
				position = "fixed";
				right    = "0";
				top      = "2em";
				opacity  = "0.9";
			}
			document.body.appendChild(XPathGenerator._container);

			XPathGenerator._inspect.addEventListener("click", function () {
				document.body.addEventListener("mouseover", XPathGenerator.mouseover, true);
				document.body.addEventListener("mousedown", XPathGenerator.mousedown, true);
				document.body.addEventListener("mouseout",  XPathGenerator.mouseout,  true);
			}, false);
		},

		close : function () {
			XPathGenerator._container.parentNode.removeChild(XPathGenerator._container);
			clearInterval(XPathGenerator._timer);
		},

		mouseover : function (e) {
			e.target.style.outline = "2px solid red";
			XPathGenerator._container.firstChild.value = XPathGenerator.getXPathByElement(e.target);
		},

		mousedown : function (e) {
			e.target.style.outline = "";
			document.body.removeEventListener("mouseover", XPathGenerator.mouseover, true);
			document.body.removeEventListener("mousedown", XPathGenerator.mousedown, true);
			document.body.removeEventListener("mouseout",  XPathGenerator.mouseout,  true);
		},

		mouseout : function (e) {
			e.target.style.outline = "";
		},

		change : function (e) {
			var path = XPathGenerator._container.firstChild.value;
			if (XPathGenerator._prev.value != path) {
				while (XPathGenerator._prev[0]) XPathGenerator._prev.pop().style.outline = "";
				try {
					XPathGenerator._prev = $X(path).map(function (i) {
						i.style.outline = "2px solid red";
						return i;
					});
				} catch (e) {}
				XPathGenerator._prev.value = path;
			}
		},

		toggle : function () {
			if (XPathGenerator._opened) {
				this.close();
				XPathGenerator._opened = false;
			} else {
				XPathGenerator._opened = true;
				this.open();
			}
		},

		getXPathByElement : function (target) {
			function indexOf (node) {
				for (var i = 0, r = 1, c = node.parentNode.childNodes, len = c.length; i < len; i++) {
					if (c[i].nodeName == node.nodeName &&
						c[i].nodeType == node.nodeType) {
						if (c[i] == node) return r;
						r++;
					}
				}
				return -1;
			}

			var pathElement = "";
			var node = target;
			if (node.nodeType == 9 /*DOCUMENT_NODE=9*/) {
				return ""
			} else {
				var tagName = node.tagName.toLowerCase();
				if (node.hasAttribute("id")) {
					pathElement = 'id("'+node.getAttribute("id")+'")';
				} else {
					pathElement = arguments.callee(node.parentNode) + '/' + tagName;
					if (node.hasAttribute("class")) {
						pathElement += '[@class="'+node.getAttribute("class")+'"]';
					} else {
						pathElement += '['+indexOf(node)+']';
					}
				}
			}
			return pathElement;
		}
	};

	// Run!
	AutoPagerize.init({
		onIconClick : function () {
			XPathGenerator.toggle();
		}
	});

	var ev = document.createEvent('Events');
	ev.initEvent('GM_AutoPagerizeLoaded', false, true);
	window.dispatchEvent(ev);

	// register menu for clearing cache
	GM_registerMenuCommand('jAutoPagerize - clear cache', AutoPagerize.clearCache);
	GM_registerMenuCommand('jAutoPagerize - toggle debug mode', function () {
		try {
			AutoPagerize.DEBUG = !AutoPagerize.DEBUG;
			GM_setValue("DEBUG", uneval(AutoPagerize.DEBUG));
			alert("Debug Mode: " + AutoPagerize.DEBUG);
		} catch (e) { alert(e) }
	});

	} // end with
	
	
	
	
	function BeCompatible () {
		unsafeWindow = unsafeWindow || window;

		if (!Array.prototype.reduce) {
			Array.prototype.reduce = function (fun /*, initial*/) {
				var len = this.length;
				if (typeof fun != "function") throw new TypeError();

				// no value to return if no initial value and an empty array
				if (len == 0 && arguments.length == 1) throw new TypeError();

				var i = 0;
				if (arguments.length >= 2) {
					var rv = arguments[1];
				} else {
					do {
						if (i in this) {
							rv = this[i++];
							break;
						}

						// if array contains no values, no initial value to return
						if (++i >= len) throw new TypeError();
					} while (true);
				}

				for (; i < len; i++) {
					if (i in this) rv = fun.call(null, rv, this[i], i, this);
				}

				return rv;
			};
		}

		if (typeof uneval != "function") {
			uneval = function (o) {
				switch (typeof o) {
					case "undefined" : return "(void 0)";
					case "boolean"   : return String(o);
					case "number"    : return String(o);
					case "string"    : return '"' + o.replace(/"/g, '\\"') + '"';
					case "function"  : return "(" + o.toString() + ")";
					case "object"    :
						if (o == null) return "null";
						var type = Object.prototype.toString.call(o).match(/\[object (.+)\]/);
						if (!type) throw TypeError("unknown type:"+o);
						switch (type[1]) {
							case "Array":
								var ret = [];
								for (var i = 0, l = o.length; i < l; ret.push(arguments.callee(o[i++])));
								return "[" + ret.join(", ") + "]";
							case "Object":
								var ret = [];
								for (var i in o) if (o.hasOwnProperty(i)) {
									ret.push(arguments.callee(i) + ":" + arguments.callee(o[i]));
								}
								return "({" + ret.join(", ") + "})";
							case "Number":
								return "(new Number(" + o + "))";
							case "String":
								return "(new String(" + arguments.callee(o) + "))";
							case "Date":
								return "(new Date(" + o.getTime() + "))";
							default:
								if (o.toSource) return o.toSource();
								throw TypeError("unknown type:"+o);
						}
				}
				return "";
			}
		}
	}


	function absoluteURI (uri) {
		if (uri.indexOf("http://") != 0) {
			// resolve relative path; for Safari
			var i = new Image();
			i.src = uri;
			uri = i.src;
			i.src = "#";
		}
		return uri;
	}

	function log (m) {
		if (!AutoPagerize.DEBUG) return;
		var o = Array.prototype.concat.apply([], arguments);
		if (unsafeWindow.console) {
			unsafeWindow.console.log(o.join(", "));
		}
	}

	function getResource (uri, convertfun) {
		var d = Deferred();
		if (!convertfun) convertfun = function (i) { return i };
		log("Getting Resource: "+uri);
		GM_xmlhttpRequest({
			method  : "GET",
			url     : absoluteURI(uri),
			overrideMimeType: 'text/html; charset=' + document.characterSet,
			headers: {
				"User-Agent": navigator.userAgent + " Greasemonkey (" + AutoPagerize.VERSION + ")"
			},
			onload  : function (req) { try {
				var res = convertfun(req.responseText);
				d.call(res);
			} catch (e) { d.fail(e) } },
			onerror : function (e) {
				d.fail(e);
			}
		});
		return d;
	}

	function createDocumentFromString (s) {
		s = String(s).replace(/<script[ \t\r\n<>][\S\s]*?<\/script(?:[ \t\r\n]*>|[ \t\r\n]+)|<(?:i?frame|html|object|script)(?:[ \t\r\n][^<>]*(?:>|(?=<))|[ \t\r\n]*>)|<\/(?:i?frame|html|object|script)(?:[ \t\r\n]*>|[ \t\r\n]+)/gi, "");
		var d = createHTMLDocument();
		var child, root = d.documentElement;
		while ((child = root.firstChild)) root.removeChild(child);
		var r = d.createRange();
		r.selectNodeContents(root);
		root.appendChild(r.createContextualFragment(s));
		return d;
	}


	function h (s) {
		var d = document.createElement("div");
		d.innerHTML = s;
		return d;
	}
	
	
	/***************************************************************************************************************/
	//https://gist.github.com/3238.txt#$X
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
		exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
			var o = document.createNSResolver(context)(prefix);
			if (o) return o;
			return (document.contentType == "application/xhtml+xml") ? "http://www.w3.org/1999/xhtml" : "";
		});

		switch (type) {
			case String:  return exp.evaluate(context, XPathResult.STRING_TYPE, null).stringValue;
			case Number:  return exp.evaluate(context, XPathResult.NUMBER_TYPE, null).numberValue;
			case Boolean: return exp.evaluate(context, XPathResult.BOOLEAN_TYPE, null).booleanValue;
			case Array:
				var result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var ret = [], i = 0, len = result.snapshotLength; i < len; i++) {
					ret.push(result.snapshotItem(i));
				}
				return ret;
			case undefined:
				var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
				switch (result.resultType) {
					case XPathResult.STRING_TYPE : return result.stringValue;
					case XPathResult.NUMBER_TYPE : return result.numberValue;
					case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
					case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
						// not ensure the order.
						var ret = [], i = null;
						while ((i = result.iterateNext())) ret.push(i);
						return ret;
				}
				return null;
			default: throw(TypeError("$X: specified type is not valid type."));
		}
	}

	//http://gist.github.com/3239.txt#createElementFromString
	function createElementFromString (str, opts) {
		if (!opts) opts = { data: {} };
		if (!opts.data) opts.data = { };

		var t, cur = opts.parent || document.createDocumentFragment(), root, stack = [cur];
		while (str.length) {
			if (str.indexOf("<") == 0) {
				if ((t = str.match(/^\s*<(\/?[^\s>\/]+)([^>]+?)?(\/)?>/))) {
					var tag = t[1], attrs = t[2], isempty = !!t[3];
					if (tag.indexOf("/") == -1) {
						child = document.createElement(tag);
						if (attrs) attrs.replace(/([a-z]+)=(?:'([^']+)'|"([^"]+)")/gi,
							function (m, name, v1, v2) {
								var v = text(v1 || v2);
								if (name == "class") root && (root[v] = child), child.className = v;
								child.setAttribute(name, v);
							}
						);
						cur.appendChild(root ? child : (root = child));
						if (!isempty) {
							stack.push(cur);
							cur = child;
						}
					} else cur = stack.pop();
				} else throw("Parse Error: " + str);
			} else {
				if ((t = str.match(/^([^<]+)/))) cur.appendChild(document.createTextNode(text(t[0])));
			}
			str = str.substring(t[0].length);
		}

		function text (str) {
			return str
				.replace(/&(#(x)?)?([^;]+);/g, function (_, isNumRef, isHex, ref) {
					return isNumRef ? String.fromCharCode(parseInt(ref, isHex ? 16 : 10)):
									  {"lt":"<","gt":"<","amp":"&"}[ref];
				})
				.replace(/#\{([^}]+)\}/g, function (_, name) {
					return (typeof(opts.data[name]) == "undefined") ? _ : opts.data[name];
				});
		}

		return root;
	}
	
	//https://gist.github.com/46391.txt#duration
	function duration (str) {
		var ret = 0, map = {
			sec : 1, min : 60, hour : 3600, day : 86400, week : 604800, month : 2592000, year : 31536000
		};
		str.replace(/(\d+)\s*(msec|sec|min|hour|day|week|month|year)s?/g, function (_, num, unit) {
			ret += +num * map[unit];
		});
		return ret * 1000;
	}

	//http://gist.github.com/49453.txt#createHTMLDocument
	function createHTMLDocument (title) {
		// Firefox doesn't have createHTMLDocument
		if (!document.implementation.createHTMLDocument) {
			// Maybe this is the best way to create HTMLDocument, but not worked in any browser...
			// var html4dt = document.implementation.createDocumentType("HTML", "-//W3C//DTD HTML 4.01//EN", "http://www.w3.org/TR/html4/strict.dtd");
			// var d = document.implementation.createDocument("", "HTML", html4dt);
			// return d;

			// In Firefox
			// Try to create HTMLDocument from XSLT with <xsl:output method='html'/>
			if (typeof XSLTProcessor != "undefined") {
				// Using createContextualFragment to avoid https://bugzilla.mozilla.org/show_bug.cgi?id=212362
				// (problem of URI of document created by DOMParser and XSLT URI)
				var x = new XSLTProcessor();
				var t = [
					"<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>",
						"<xsl:output method='html'/>",
						"<xsl:template match='/'>",
							"<html><head><title>", title, "</title></head><body/></html>",
						"</xsl:template>",
					"</xsl:stylesheet>",
				].join("");
				var d = document.implementation.createDocument("", "nice-boat", null);
				var r = d.createRange();
				r.selectNodeContents(d.documentElement);
				try {
					d.documentElement.appendChild(r.createContextualFragment(t));
				} catch(e) {
					// TODO: Firefox 2.0.0.10 does not work on this part.
					return null;
				}
				x.importStylesheet(d.documentElement.firstChild);
				var ret = x.transformToDocument(d);
				// if the returned value is not HTMLDocument, this function returns null.
				return ret.body ? ret : null;
			} else {
				return null;
			}
		} else {
			return document.implementation.createHTMLDocument(title);
		}
	}
	/***************************************************************************************************************/		
	
	//http://svn.coderepos.org/share/lang/javascript/jsdeferred/trunk/jsdeferred.userscript.js
	// Usage:: with (D()) { your code }
	// JSDeferred 0.2.2 Copyright (c) 2007 cho45 ( www.lowreal.net )
	// See http://coderepos.org/share/wiki/JSDeferred
	function D () {


	function Deferred () { return (this instanceof Deferred) ? this.init() : new Deferred() }
	Deferred.ok = function (x) { return x };
	Deferred.ng = function (x) { throw  x };
	Deferred.prototype = {
		init : function () {
			this._next    = null;
			this.callback = {
				ok: Deferred.ok,
				ng: Deferred.ng
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
			var next = "ok";
			try {
				value = this.callback[okng].call(this, value);
			} catch (e) {
				next  = "ng";
				value = e;
			}
			if (value instanceof Deferred) {
				value._next = this._next;
			} else {
				if (this._next) this._next._fire(next, value);
			}
			return this;
		}
	};

	Deferred.next_default = function (fun) {
		var d = new Deferred();
		var id = setTimeout(function () { d.call() }, 0);
		d.canceller = function () { clearTimeout(id) };
		if (fun) d.callback.ok = fun;
		return d;
	};
	Deferred.next_faster_way_readystatechange = (!window.opera && /\bMSIE\b/.test(navigator.userAgent)) && function (fun) {
		var d = new Deferred();
		var t = new Date().getTime();
		if (t - arguments.callee._prev_timeout_called < 150) {
			var cancel = false;
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src  = "javascript:";
			script.onreadystatechange = function () {
				if (!cancel) {
					d.canceller();
					d.call();
				}
			};
			d.canceller = function () {
				if (!cancel) {
					cancel = true;
					script.onreadystatechange = null;
					document.body.removeChild(script);
				}
			};
			document.body.appendChild(script);
		} else {
			arguments.callee._prev_timeout_called = t;
			var id = setTimeout(function () { d.call() }, 0);
			d.canceller = function () { clearTimeout(id) };
		}
		if (fun) d.callback.ok = fun;
		return d;
	};
	Deferred.next_faster_way_Image = ((typeof(Image) != "undefined") && document.addEventListener) && function (fun) {
		var d = new Deferred();
		var img = new Image();
		var handler = function () {
			d.canceller();
			d.call();
		};
		img.addEventListener("load", handler, false);
		img.addEventListener("error", handler, false);
		d.canceller = function () {
			img.removeEventListener("load", handler, false);
			img.removeEventListener("error", handler, false);
		};
		img.src = "data:,/ _ / X";
		if (fun) d.callback.ok = fun;
		return d;
	};
	Deferred.next = Deferred.next_faster_way_readystatechange ||
					Deferred.next_faster_way_Image ||
					Deferred.next_default;

	Deferred.wait = function (n) {
		var d = new Deferred(), t = new Date();
		var id = setTimeout(function () {
			d.call((new Date).getTime() - t.getTime());
		}, n * 1000);
		d.canceller = function () { clearTimeout(id) };
		return d;
	};

	Deferred.call = function (f ) {
		var args = Array.prototype.slice.call(arguments, 1);
		return Deferred.next(function () {
			return f.apply(this, args);
		});
	};

	Deferred.parallel = function (dl) {
		var ret = new Deferred(), values = {}, num = 0;
		for (var i in dl) if (dl.hasOwnProperty(i)) (function (d, i) {
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

		if (!num) Deferred.next(function () { ret.call() });
		ret.canceller = function () {
			for (var i in dl) if (dl.hasOwnProperty(i)) {
				dl[i].cancel();
			}
		};
		return ret;
	};


	Deferred.loop = function (n, fun) {
		var o = {
			begin : n.begin || 0,
			end   : (typeof n.end == "number") ? n.end : n - 1,
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
			return (o.begin <= o.end) ? Deferred.call(_loop, o.begin) : null;
		});
	};

	Deferred.register = function (name, fun) {
		this.prototype[name] = function () {
			var a = arguments;
			return this.next(function () {
				return fun.apply(this, a);
			});
		};
	};

	Deferred.register("loop", Deferred.loop);
	Deferred.register("wait", Deferred.wait);

	Deferred.define = function (obj, list) {
		if (!list) list = ["parallel", "wait", "next", "call", "loop"];
		if (!obj)  obj  = (function getGlobal () { return this })();
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
		setTimeout(function () {
			GM_xmlhttpRequest(opts);
		}, 0);
		return d;
	}
	xhttp.get  = function (url)       { return xhttp({method:"get",  url:url}) };
	xhttp.post = function (url, data) { return xhttp({method:"post", url:url, data:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}) };


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
		d.xhr = req;
		return d;
	}
	http.get   = function (url)       { return http({method:"get",  url:url}) };
	http.post  = function (url, data) { return http({method:"post", url:url, data:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}) };
	http.jsonp = function (url, params) {
		if (!params) params = {};

		var Global = (function () { return this })();
		var d = Deferred();
		var cbname = params["callback"];
		if (!cbname) do {
			cbname = "callback" + String(Math.random()).slice(2);
		} while (typeof(Global[cbname]) != "undefined");

		params["callback"] = cbname;

		url += (url.indexOf("?") == -1) ? "?" : "&";

		for (var name in params) if (params.hasOwnProperty(name)) {
			url = url + encodeURIComponent(name) + "=" + encodeURIComponent(params[name]) + "&";
		}

		var script = document.createElement('script');
		script.type    = "text/javascript";
		script.charset = "utf-8";
		script.src     = url;
		document.body.appendChild(script);

		Global[cbname] = function callback (data) {
			delete Global[cbname];
			document.body.removeChild(script);
			d.call(data);
		};
		return d;
	};

	Deferred.Deferred = Deferred;
	Deferred.http     = http;
	Deferred.xhttp    = xhttp;
	return Deferred;
	}// End of JSDeferred

	//http://svn.coderepos.org/share/lang/javascript/jsenumerator/trunk/jsenumerator.nodoc.js
	// JSEnumerator 0.0.0 Copyright (c) 2008 KAYAC Inc. ( http://www.kayac.com/ )
	// http://coderepos.org/share/wiki/JSEnumerator
	function Enumerator (a) {
		return (arguments.length > 1)       ? new Enumerator().initWithArray(arguments) :
			   (this instanceof Enumerator) ? this.init(a) : new Enumerator(a);
	}
	Enumerator.prototype = {
		init : function () {
			if (arguments.length == 0) {
				return this.initWithArray([]);
			} else {
				if (arguments[0] && arguments[0].length) {
					return this.initWithArray(arguments[0]);
				} else
				if (typeof arguments[0] == "function") {
					return this.initWithFunction(arguments[0]);
				} else
				if (typeof arguments[0] == "object") {
					if (arguments[0] instanceof Enumerator) {
						return arguments[0];
					} else {
						return this.initWithHash(arguments[0]);
					}
				} else {
					return this.initWithArray([arguments[0]]);
				}
			}
		},

		initWithFunction : function (fun) {
			this.next = fun;
			return this;
		},

		initWithArray : function (array) {
			this.array = array;
			this.pos   = 0;
			this.initWithFunction(function () {
				if (this.pos < array.length) {
					return array[this.pos++];
				} else {
					throw Enumerator.StopIteration;
				}
			});
			return this;
		},

		initWithHash : function (hash) {
			var arr = [];
			for (var k in hash) if (hash.hasOwnProperty(k)) {
				arr.push([k, hash[k]]);
			}
			this.initWithArray(arr);
			return this;
		},

		
		toArray : function () {
			return this.map(function (x) { return x });
		},

		
		cycle : function () {
			var self  = this, cache = [];
			return Enumerator(function () {
				try {
					var i = self.next();
					cache.push(i);
					return i;
				} catch (e) {
					if (e != Enumerator.StopIteration) throw e;
					var i = -1;
					this.next = function () { return cache[++i % cache.length] };
					return this.next();
				}
			});
		},

		
		map : function (fun) {
			var ret = [];
			try {
				if (this.array) {
					var a = this.array, c = this.pos, len = a.length - c, i = len % 8, type = (fun.length > 1) ? "apply" : "call";
					if (i > 0) do {
						ret.push(fun[type](this, a[c++]));
					} while (--i);
					i = parseInt(len >> 3);
					if (i > 0) do {
						ret.push(
							fun[type](this, a[c++]), fun[type](this, a[c++]),
							fun[type](this, a[c++]), fun[type](this, a[c++]),
							fun[type](this, a[c++]), fun[type](this, a[c++]),
							fun[type](this, a[c++]), fun[type](this, a[c++])
						);
					} while (--i);
					this.pos = c;
				} else {
					while (1) ret.push(fun[fun.length > 1 ? "apply" : "call"](this, this.next()));
				}
			} catch (e) {
				if (e != Enumerator.StopIteration) throw e;
			}
			return ret;
		},

		
		imap : function (fun) {
			var self = this;
			return Enumerator(function () {
				return fun[fun.length > 1 ? "apply" : "call"](this, self.next());
			});
		},

		
		izip : function () {
			var eles = [this];
			eles.push.apply(eles, Enumerator(arguments).map(function (i) {
				return Enumerator(i);
			}));
			return Enumerator(function () {
				var args = [];
				for (var i = 0; i < eles.length; i++) args.push(eles[i].next());
				return args;
			});
		},

		
		iselect : function (fun) {
			var self = this;
			return Enumerator(function () {
				do {
					var val = self.next();
				} while (!fun[fun.length > 1 ? "apply" : "call"](this, val));
				return val;
			});
		},

		
		find : function (fun) {
			do {
				var ret = this.next();
			} while (!fun[fun.length > 1 ? "apply" : "call"](this, ret));
			return ret;
		},

		
		reduce : function (fun, init) {
			var self = this;
			var rval = (typeof init == "undefined") ? self.next() : init;
			this.each(function (i) { rval = fun.call(this, rval, i) });
			return rval;
		},

		
		max : function (fun) {
			if (!fun) fun = function (a, b) { return a - b };
			var t =  this.toArray().sort(fun)
			return t[t.length-1];
		},

		
		min : function (fun) {
			if (!fun) fun = function (a, b) { return a - b };
			var t =  this.toArray().sort(fun)
			return t[0];
		},

		
		chain : function (enums) {
			var f = this, a = Enumerator(arguments).imap(function (i) {
				return Enumerator(i);
			});
			return Enumerator(function () {
				try {
					return f.next();
				} catch (e) {
					if (e != Enumerator.StopIteration) throw e;
					f = a.next();
					return f.next();
				}
			});
		},

		
		itake : function (a) {
			var self = this;
			if (typeof(a) == "number") {
				var i = 0;
				return Enumerator(function () {
					if (i++ < a)
						return self.next();
					else
						throw Enumerator.StopIteration;
				});
			} else
			if (typeof(a) == "function") {
				return Enumerator(function () {
					var ret = self.next();
					if (a[a.length > 1 ? "apply" : "call"](this, ret))
						return ret;
					else
						throw Enumerator.StopIteration;
				});
			}
			throw ArgumentErrro("expect number or function");
		},


		
		take : function (a) {
			return this.itake(a).toArray();
		},

		
		idrop : function (a) {
			var self = this, i;
			if (typeof(a) == "number") {
				for (i = 0; i < a; i++) this.next();
				return this;
			} else
			if (typeof(a) == "function") {
				while (a[a.length > 1 ? "apply" : "call"](this, i = this.next())) {};
				return Enumerator(function () {
					this.next = self.next;
					return i;
				});
			}
			throw ArgumentErrro("expect number or function");
		},

		
		drop : function (a) {
			return this.idrop(a).toArray();
		},

		
		every : function (fun) {
			try {
				while (!(fun[fun.length > 1 ? "apply" : "call"](this, this.next()) === false)) {};
				return false;
			} catch (e) {
				if (e != Enumerator.StopIteration) throw e;
				return true;
			}
		},

		
		some : function (fun) {
			try {
				while (!(fun[fun.length > 1 ? "apply" : "call"](this, this.next()) === true)) {};
				return true;
			} catch (e) {
				if (e != Enumerator.StopIteration) throw e;
				return false;
			}
		},

		
		withIndex : function (start) {
			return this.izip(E(start || 0).countup());
		},

		
		countup : function () {
			var start = this.next() || 0;
			return Enumerator(function () { return start++ });
		},

		
		stop : function () {
			throw Enumerator.StopIteration;
		}
	};

	Enumerator.prototype.to_a    = Enumerator.prototype.toArray;
	Enumerator.prototype.each    = Enumerator.prototype.map;
	Enumerator.prototype.inject  = Enumerator.prototype.reduce;
	Enumerator.prototype.ifilter = Enumerator.prototype.iselect;
	Enumerator.StopIteration     = new Error("StopIteration");

	/***************************************************************************************************************/		
	
})();
