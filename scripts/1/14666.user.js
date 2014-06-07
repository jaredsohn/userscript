// ==UserScript==
// @name        jAutoPagerize
// @description Just Another AutoPagerize
// @namespace   http://lowreal.net/
// @include     http://*
// @include     https://*
// @exclude     http://b.hatena.ne.jp/*
// @exclude     http://f.hatena.ne.jp/*/20*
// @require     http://svn.coderepos.org/share/lang/javascript/jsdeferred/trunk/jsdeferred.userscript.js
// @require     http://svn.coderepos.org/share/lang/javascript/jsenumerator/trunk/jsenumerator.nodoc.js
// @require     http://gist.github.com/3238.txt#$X
// @require     http://gist.github.com/3239.txt#createElementFromString
// @require     http://gist.github.com/46391.txt#duration
// @require     http://gist.github.com/49453.txt#createHTMLDocument
// ==/UserScript==
// This script uses JavaScript 1.6 and 1.8 functions:
//    Array.prototype.{filter,forEach,map,reduce} etc...
//
(function (AutoPagerize) { with (D()) {
// Latest::  http://svn.coderepos.org/share/lang/javascript/userscripts/jautopagerize.user.js
// License:: CCPL ( http://creativecommons.org/licenses/by/3.0/ )
//
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
		//, { format : 'HTML', url : 'http://userjs.oh.land.to/pagerization/convert.php?file=siteinfo.v5' }
	]
	, site_info : [
		/**
		 * Because of a problem for section 'google' in official
		 * SITEINFO.  This shold be define own SITEINFO. The
		 * second page which is autopagerized include the link to
		 * 'Goooooooooogle'.
		 */
		  { url          : '^http://(?:[^.]+\\.)*google\\.(?:[^.]+\\.)?[^/]+/(?:search|custom)'
		  , nextLink     : '//div[@id="navbar"]/table/tbody/tr/td[last()]/a'
		  , insertBefore : 'id("res")/div[last()]'
		  , pageElement  : '//div[@id="res"]/div[div]'
		  }
		, { url          : '^https?://(?:www\\.)?twitter\\.com/'
		  , nextLink     : 'id("more")'
		  , insertBefore : 'id("more")'
		  , pageElement  : '!click'
		  }
		, { url          : '^http://h\\.hatena\\.ne\\.jp/'
		  , nextLink     : '//a[@rel="next"]'
		  , insertBefore : '//div[@class="pager"]'
		  , pageElement  : '!click'
		  }
		, { url          : '^http://images\\.google\\.(?:co\\.jp|com)/images\\?'
		  , nextLink     : '(//td[@class="b"]/a)[last()]'
		  , insertBefore : ''
		  , pageElement  : 'id("ImgContent")'
		  }
		/* Template
		, { url          : '^http://'
		  , nextLink     : ''
		  , insertBefore : ''
		  , pageElement  : ''
		  }
		*/
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
		  on         : '#22a06d'
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
		//log([remain, height, window.innerHeight, window.scrollY]);
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
			// ロード前のページ高より増えたらロードされたとみなす
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
			"<div class='_autopagerize'><p>",
				"<a href='#{bookmark}'>-- \u2702 --</a>",
				"AutoPagerized: <a href='#{next}' target='_blank'>#{next}</a>",
				"<a href='#{bookmark}'>-- \u2702 --</a>",
			"</p></div>"
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
					// img.addEventListener("load", function () { alert(1) }, false);
					img.src = elements[j].src;
				}

				// Open pagerized links in new tab/window.
				var elements = $X(".//a[@href]", i, Array);
				for (var j = 0, len = elements.length; j < len; j++) {
					elements[j].target = "_blank";
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
				"margin      : 3em 0 !important;",
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
				"font-size   : 0.7em;",
				"position    : fixed;",
				"top         : 0;",
				"right       : 0;",
				"margin      : 0.3em;",
				"padding     : 0 1em;",
				"color       : #fff;",
				"z-index     : 9999;",
				"font-weight : bold;",
				"line-height : 1.33;",
				"cursor      : pointer;",
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
		AutoPagerize.icon.addEventListener("click", opts.onIconClick || function () {}, false);
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
				// pathElement = tagName + '[@id="'+node.getAttribute("id")+'"]';
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

	// Memo::
	// Safari 3 has JS 1.6 functions but 1.8 and uneval/toSource.

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
//		var c = unsafeWindow.console;
//		if (c) c.log.apply(c, arguments);
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

})();
