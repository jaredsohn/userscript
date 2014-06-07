// ==UserScript==
// @name           Pagerization
// @namespace      http://userjs.0fk.org
// @include        *
// @version        0.2.2a
// ==/UserScript==
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
// Thank you for
//  ma.la    ( http://userscripts.org/scripts/show/1392 )
//  FaziBear ( http://userscripts.org/scripts/show/6985 )
//  swdyh    ( http://d.hatena.ne.jp/swdyh/20070414/1176508836 )
// Last update
//  Wed, 12 Mar 2008 06:00:13 UTC

/*-----------------------------------------------------------------------------
 * TOC:
 *   Options
 *   Pagerization
 *   AutoPagerization
 *   StatusBalloon
 *   Cache
 *   Initialize
 *     Update Language
 *     Matching Siteinfo
 *     Update Data
 *     window
 *   Functions
 *-------------------------------------------------------------------------- */

/*-----------------------------------------------------------------------------
 * Options
 *-------------------------------------------------------------------------- */

// Auto starting
var ENABLE = true;

// Cache limited (unit: day)
var EXPIRE = 1;

// View langage
var LANGUAGE = navigator.language;

// Auto siteinfo search
var DISABLE_AUTO_SEARCH = true;

// Remain height base value
var BASE_REMAIN_HEIGHT = 400;

// List of download site
// It's given priority above URL.
var SITEINFO_URL = [
	'http://k75.s321.xrea.com/pagerization/siteinfo#function', // Official release data
	'http://swdyh.infogami.com/autopagerize', // Autopagerize Wiki data. Xpath ONLY!!
];

// List of langage download site
// It's given priority above URL.
var LANGUAGE_URL = [
	'http://k75.s321.xrea.com/pagerization/language', // Official release data
];

// personal rules
// Let's write only your original data referring to http://k75.s321.xrea.com/pagerization/siteinfo .
// You can use special functions.
// $X(exp, context, type) - wrapper of document.evaluate.
//   'type' is Array, return DOM Array.
//   'type' is 0, return first node.
//   'type' is -1, return last node. But not suppert other number;
// $N(name, attr, childs) - wrapper of document.createElement.
// Sample
/*
var PERSONAL_RULES = <><![CDATA[
[ Google ]
url:    http://(.*).google.+/(search).+
filter: function (elms) {
	for (var i = 0, elm; elm = elms[i]; ++i) {
		$X('.//div[@class="g"]', elm, Array).forEach(function (node) {
			var a = $X('.//a', node, 0);
			if (!a)
				return;
			var nobr = $X('.//nobr', node, -1);
			if (nobr) {
				nobr.appendChild($N('span', {}, ' - '));
				nobr.appendChild($N('a', {
					'href': 'http://web.archive.org/web/*' + '/' + a.href,
					'class': 'fl'
				}, 'History'));
			}
		});
	}
}
]]></>;
//*/


// micro format
var MICROFORMAT = {
	nextLink:     '//a[@rel="next"]|//link[@rel="next"]',
	insertBefore: '//*[contains(@class,"autopagerize_insert_before")]',
	appendChild:  '//*[contains(@class,"autopagerize_append_child")]',
	pageElement:  '//*[contains(@class,"autopagerize_page_element")]',
};

// default language package
var DEFAULT_MESSAGE = {
	standing:  'Standing',
	loading:   'Loading',
	terminate: 'Terminate',
	supported: 'Supported',
	error:     'Error',
	update:    'Cache Update',
	updateEnd: 'Cache Update complete',
};

// balloon color
var BALLOON_COLOR = {
	standing:  '#00681c',
	loading:   '#790619',
	terminate: '#0075be',
	supported: '#ffc514',
	error    : '#6f0080',
};


/*-----------------------------------------------------------------------------
 * Pagerization
 *-------------------------------------------------------------------------- */

var Pagerization = function (info) {
	this.$X = $X;
	this.$N = $N;
	this.message = message;
	this.nextLink = info.nextLink;
	this.pageElement = info.pageElement;
	this.requestUrl = location.href.replace(/#.*$/, '');
	this.requested = {};
	this.requested[this.requestUrl] = true;

	this.requestUrl = this.getNextLink.call(this, document, Pagerization.HTML, this);
	switch (typeof info.setPoint) {
	case 'function':
		this.setPoint = info.setPoint(document, Pagerization.HTML, this);
		break;
	case 'string':
		this.setPoint = $X(info.setPoint, document, 0);
		break;
	default:
		if (typeof info.pageElement == 'string') {
			var elm = $X(info.pageElement, document, -1);
			if (elm) {
				this.setPoint = elm.nextSibling || elm.parentNode.appendChild(document.createTextNode(' '));
			}
		}
		break;
	}
	if (!this.setPoint || !this.requestUrl) {
		return;
	}

	/*
	 * Initialize
	 */
	this.page = 1;
	this.state = !!ENABLE;
	this.running = false;
	this.mineType = 'text/html; charset=' + document.characterSet;
	this.scrollElement = (document.documentElement.scrollHeight < document.body.scrollHeight) ? document.body : document.documentElement;
	var scrollHeight = this.scrollElement.scrollHeight;
	var bottom = (info.setPoint == info.appendChild ? getElementBottom(this.setPoint) : getElementPosition(this.insertPoint).top);
	if (!bottom) {
		if (typeof info.pageElement == 'string') {
			var elm = $X(info.pageElement, document, -1);
			if (elm) {
				bottom = getElementBottom(elm);
			}
		}
		if (!bottom) {
			bottom = Math.round(scrollHeight * 0.8);
		}
	}
	this.remainHeight = scrollHeight - bottom + BASE_REMAIN_HEIGHT;

	// Balloon
	this.balloon = new StatusBalloon();
	if (this.state) {
		this.enable();
	}
	else {
		this.balloon.change(message.supported, BALLOON_COLOR.supported);
		this.balloon.show();
	}
	if (info.filter) {
		listener.addEventListener('firstPage', info.filter);
		listener.addEventListener('addPage', info.filter);
	}
	if (listener.isEventListener('firstPage')) {
		var elm = this.getPageElements.call(this, document, Pagerization.HTML);
		listener.callEventListener('firstPage', [
			elm.length ? elm : document.documentElement
		]);
	}

	// add event
	var self = this;
	this.bindScroll = function () {
		var remain = self.scrollElement.scrollHeight - window.innerHeight - window.scrollY;
		var result = (self.state && remain < self.remainHeight) ? self.request() : true;
		if (!result) {
			self.balloon.change(message.terminate, BALLOON_COLOR.terminate);
			self.remove();
			return;
		}
	};
	window.addEventListener('scroll', this.bindScroll, false);

	this.bindToggle = function (e) {
		if (e.shiftKey || e.ctrlKey || e.altKey || /input|textarea/i.test(e.target.tagName)) {
			return;
		}
		if (self.state) {
			self.disable();
		}
		else {
			self.enable();
			self.bindScroll();
		}
	};
	document.body.addEventListener('dblclick', this.bindToggle, false);

	this.bindScroll();
};

Pagerization.prototype = {
	enable: function () {
		this.state = true;
		this.balloon.change(message.standing, BALLOON_COLOR.standing);
		this.balloon.show();
	},
	disable: function () {
		this.state = false;
		this.balloon.hide();
	},
	remove: function () {
		document.body.removeEventListener('dblclick', this.bindToggle, false);
		window.removeEventListener('scroll', this.bindScroll, false);
		this.balloon.remove();
	},
	request: function () {
		if (!this.requestUrl || this.lastRequestUrl == this.requestUrl) {
			return this.requestUrl;
		}
		if (this.requested[this.requestUrl]) {
			return false;
		}
		this.lastRequestUrl = this.requestUrl;
		this.requested[this.requestUrl] = true;
		this.balloon.change(message.loading, BALLOON_COLOR.loading);
		if (!this.nodesCache) {
			this.nodesCache = {
				hr: $N('hr', {}),
				p: $N('p', {}, '<a href="" style="border:0;text-decoration:none"><\/a>')
			};
		}
		var self = this;

		GM_xmlhttpRequest({
			method: 'GET',
			url: self.requestUrl,
			overrideMimeType: self.mineType,
			onload: function (req) {
				if (req.status < 200 || req.status > 300) {
					self.balloon.change(message.error + ' ' + req.status, BALLOON_COLOR.error);
					self.remove();
					return;
				}
				// DOM
				var responseHTML = parseHTML(req.responseText);
				var p = self.nodesCache.p.cloneNode(true);
				    p.firstChild.href = self.requestUrl;
				    p.firstChild.textContent = 'page: ' + (++self.page);
				self.setElements([self.nodesCache.hr.cloneNode(false), p]);
				var url = self.getNextLink.call(self, responseHTML, req.responseText, self);
				var elm = self.getPageElements.call(self, responseHTML, req.responseText, self);
				elm = self.setElements(elm);
				if (elm) {
					listener.callEventListener('addPage', [elm]);
				}
				self.requestUrl = elm && url ? url.replace(/#.*$/, '') : false;
				// terminate
				self.balloon.change(message.standing, BALLOON_COLOR.standing);
				self.bindScroll();
			},
			onerror: function () {
				self.balloon.change(message.error, BALLOON_COLOR.error);
				self.remove();
			}
		});
		return true;
	}
};

Pagerization.getInstance = function (rules, attaches) {
	if (!Pagerization.HTML) {
		Pagerization.HTML = document.documentElement.innerHTML;
	}
	function attachRule(rule) {
		for (var i = 0, j = attaches.length; i < j; ++i) {
			var attach = attaches[i];
			if (
				(attach.name && attach.name == rule.name) ||
				(attach.url  && attach.url  == rule.url)  ||
				(attach.tag  && attach.tag  == rule.tag)
			) {
				for (var k in attach) {
					rule[k] = attach[k];
				}
			}
		}
	}
	for (var i = 0, j = rules.length, url = location.href; i < j; ++i) {
		var rule = rules[i], flag = false;
		if (rule.url && url.match(rule.url)) {
			attaches && attachRule(rule);
			flag = true;
		}
		if (rule.tag) {
			attaches && attachRule(rule);
			try {
				switch (rule.tag.constructor) {
				case Function:
					flag = !!rule.tag(document, Pagerization.HTML);
					break;
				case RegExp:
					flag = !!rule.tag.test(Pagerization.HTML);
					break;
				default:
					flag = !!getFirstElementByXPath(rule.tag);
					break;
				}
			}
			catch (e) {}
		}
		if (flag && rule.nextLink && rule.pageElement) {
			var P = Pagerization.prototype;
			switch (rule.nextLink.constructor) {
			case Function:
				P.getNextLink = rule.nextLink;
				break;
			case RegExp:
				P.getNextLink = function (node, text) {
					var base = $X('//base', node, 0);
					if (this.nextLink.test(text)) {
						var href = (base && base.href) || this.requestUrl;
						return parseRelativeURL(href, RegExp.$1);
					}
					return null;
				};
				break;
			default:
				P.getNextLink = function (node, text) {
					var next = $X(this.nextLink, node, 0);
					if (next) {
						var href = next.getAttribute('href') || next.getAttribute('action') || next.getAttribute('value');
						if (!href) {
							return null;
						}
						var base = $X('//base', node, 0);
						return parseRelativeURL((base && base.href) ? base.href : this.requestUrl, href);
					}
					return null;
				};
				break;
			}
			switch (rule.pageElement.constructor) {
			case Function:
				P.getPageElements = rule.pageElement;
				break;
			case RegExp:
				P.getPageElements = function (node, text) {
					var m = text.match(this.pageElement), res = [];
					if (m) {
						for (var i = 1, j = m.length; i < j; ++i) {
							res[res.length] = $N('div', {}, m[i]);
						}
					}
					return res;
				};
				break;
			default:
				P.getPageElements = function (node, text) {
					return $X(this.pageElement, node, Array);
				};
				break;
			}
			rule.setPoint = rule.appendChild || rule.insertBefore;
			P.setElements = (
				rule.appendChild ? function (nodes) {
					if (nodes.length > 0) {
						var point = this.setPoint;
						for (var i = 0, j = nodes.length; i < j; ++i) {
							nodes[i] = document.importNode(nodes[i], true);
							point.appendChild(nodes[i]);
						}
						return nodes;
					}
					return false;
				} : function (nodes) {
					if (nodes.length > 0) {
						var point = this.setPoint;
						for (var i = 0, j = nodes.length; i < j; ++i) {
							nodes[i] = document.importNode(nodes[i], true);
							point.parentNode.insertBefore(nodes[i], point);
						}
						return nodes;
					}
					return false;
				}
			);
			var res = new Pagerization(rule);
			if (res.setPoint && res.requestUrl) {
				return res;
			}
		}
	}
	return null;
};


/*-----------------------------------------------------------------------------
 * AutoPagerization
 *-------------------------------------------------------------------------- */

function AutoPagerization() {
	this.siteinfo = {
		url: '.*',
		nextLink: null,
		pageElement: null,
	};
	this.requestUrl = location.href.replace(/#.*$/, '');
	this.nextUrlPattern = [
		function () {
			var m = this.requestUrl.match(/^([a-z]+:\/\/[^\/]+)(.*)$/);
			if (m) {
				var t = m[2].replace(/(id|page|item)=([0-9]+)/, function ($0, $1, $2) {
					return $1 + '=' + zeropad(parseInt($2, 10) + 1, $2.length);
				});
				if (t != m[2]) {
					return m[1] + t;
				}
			}
			return null;
		},
		function () {
			var m = this.requestUrl.match(/^([a-z]+:\/\/[^\/]+)(.*)$/);
			if (m) {
				var t = m[2].replace(/([^0-9])([0-9]{4})([^0-9]*)([0-9]{2})([^0-9]|$)/, function ($0, $1, $2, $3, $4, $5) {
					var y = parseInt($2, 10), m = parseInt($4, 10);
					if (m >= 12) {
						++y;
						m = '01';
					}
					else {
						m = ('0' + (m + 1)).slice(-2);
					}
					return $1 + y + $3 + m + $5;
				});
				if (t != m[2]) {
					return m[1] + t;
				}
			}
			return null;
		},
		function () {
			var m = this.requestUrl.match(/^([a-z]+:\/\/[^\/]+)(.*)$/);
			if (m) {
				var t = m[2].replace(/([0-9]+)($|\..*$|\/.*?$)/, function ($0, $1, $2) {
					return zeropad(parseInt($1, 10) + 1, $1.length) + $2;
				});
				if (t != m[2]) {
					return m[1] + t;
				}
			}
			return null;
		}
	];
	this.urlPosition = {};
	var i = 1, base = location.protocol + '//' + location.host, path = location.pathname.replace(/\?.*$/, '').replace(/\/$/, '');
	for (; path; ++i) {
		this.urlPosition[base + path] = i;
		path = path.replace(/\/[^\/]*$/, '');
	}
	this.urlPosition[base] = i;
};

AutoPagerization.prototype = {
	testNextLink: function (exp, func, pat) {
		var node = $X(exp);
		var j = node.length;
		if (!j) {
			return false;
		}
		if (func) {
			var cnt = 0, list = [];
			for (var i = 0; i < j; ++i) {
				var href = func(node[i]);
				if (!href || href.indexOf('#') != -1) {
					continue;
				}
				var h = href;
				while (!this.urlPosition[h]) {
					var t = h.replace(/\/[^\/]*$/, '');
					if (t == h) {
						break;
					}
					else {
						h = t;
					}
				}
				var p = this.urlPosition[h];
				if (p) {
					--p;
					if (!list[p]) {
						list[p] = { 'length': 0 };
					}
					if (typeof list[p][href] == 'undefined') {
						list[p][href] = i;
						++list[p].length;
					}
				}
			}
			var get = function (node, link, d) {
				function g(path, sep) {
					var l = path.length - 1;
					if (path[l] == 'a') {
						path[l] = link;
					}
					var res = path.join(sep);
					var tmp = $X(res, Array);
					if (tmp) {
						var url = {}, cnt = 0;
						for (var i = 0, j = tmp.length; i < j; ++i) {
							var href = tmp[i].href || tmp[i].action || tmp[i].value;
							if (!url[href]) {
								url[href] = true;
								++cnt;
							}
						}
						if (cnt == 1) {
							return res;
						}
					}
					return null;
				}
				var xpath = getXPathByElement(node, {
					result: true,
					number: true
				});
				return g(xpath.simple, '//') || g(xpath.full, '/');
			};
			var a = exp.slice(2);
			exp = null;
			for (var i = 0, j = list.length; i < j && !exp; ++i) {
				if (!list[i]) {
					continue;
				}
				switch (list[i].length) {
				case 0:
					continue;
				case 1:
					for (var url in list[i]) {
						if (url != 'length' && url != this.requestUrl) {
							exp = get(node[list[i][url]], a, true);
						}
					}
					break;
				default:
					for (var url in list[i]) {
						if (url != 'length' && url != this.requestUrl && /=[0-9]+&|[0-9]+(\/|\..*)?$/.test(url)) {
							exp = get(node[list[i][url]], a);
							if (exp) {
								break;
							}
						}
					}
					break;
				}
			}
			if (!exp) {
				return false;
			}
		}
		this.siteinfo.nextLink = pat ? pat(exp) : exp;
		this.getPageElement();
		return true;
	},
	testNextLinkByXPath: function (exp, flag) {
		return this.testNextLink(exp, flag ? false : function (node) {
			return node ? node.href : null;
		});
	},
	testNextLinkByFrom: function (exp) {
		return this.testNextLink(exp, function (node) {
			return node && node.form ? node.form.action : null;
		}, function (exp) {
			return function (node, text) {
				var next = $X(exp, node, 0).form;
				if (next) {
					var href = next.getAttribute('action');
					if (!href) {
						return null;
					}
					var base = $X('//base', node, 0);
					return parseRelativeURL((base && base.href) ? base.href : this.requestUrl, href);
				}
				return null;
			};
		});
	},
	testNextLinkByUrl: function (num) {
		num = num || 0;
		if (this.nextUrlPattern.length <= num) {
			return false;
		}
		var nextUrl = this.nextUrlPattern[num].call(this);
		if (nextUrl) {
			this.siteinfo.nextLink = this.nextUrlPattern[num];
			this.getPageElement();
			return true;
		}
		else {
			return this.testNextLinkByUrl(num + 1);
		}
	},
	getNextLink: function () {
		if (this.testNextLinkByXPath('//*[@rel="Next" or @rel="next" or @rel="NEXT"]', true)) {
			return true;
		}
		if (this.testNextLinkByXPath('//*[@rel="Prev" or @rel="prev" or @rel="PREV" or @rel="Previous" or @rel="previous" or @rel="PREVIOUS"]', true)) {
			return true;
		}
		var base = location.protocol + '//' + location.host, path = location.pathname;
		if (!location.search) {
			var t = path.replace(/[^\/0-9]*[0-9]+.*$/, '');
			path = (t != path) ? t : '';
		}
		var link = '//a[starts-with(@href, "' + path + '") or starts-with(@href, "' + base + path + '") or (not(starts-with(@href, "../")) and not(starts-with(@href, "http://")) and not(starts-with(@href, "https://")) and not(starts-with(@href, "ftp://")))]';
		var patnext = 'contains(_, "Next") or contains(_, "next") or contains(_, "NEXT") or contains(_, "Tugi") or contains(_, "tugi") or contains(_, "TUGI")';
		var patprev = '(contains(_, "Prev") or contains(_, "prev") or contains(_, "PREV") or contains(_, "Back") or contains(_, "back") or contains(_, "BACK")) and not(contains(_, "TrackBack") or contains(_, "trackback") or contains(_, "TRACKBACK"))';
		var patnextstr = 'contains(_, "\u6B21") or contains(_, ">") or contains(_, "\u00BB") or contains(_, "\uFF1E") or contains(_, "\u2192")';
		var patprevstr = 'contains(_, "\u524D") or contains(_, "<") or contains(_, "\u00AB") or contains(_, "\uFF1C") or contains(_, "\u2190")';

		var next = '[' + patnext.replace(/_/g, 'concat(@id, " ", @class)') + ']';
		if (this.testNextLinkByXPath(link + next)) {
			return true;
		}
		if (this.testNextLinkByXPath('//*' + next + link)) {
			return true;
		}
		if (this.testNextLinkByXPath(link + '[child::img[' + patnext.replace(/_/g, 'concat(@src, " ", @alt)') + ' or ' + patnextstr.replace(/_/g, '@alt') + ']]')) {
			return true;
		}
		var prev = '[' + patprev.replace(/_/g, 'concat(@id, " ", @class)') + ']';
		if (this.testNextLinkByXPath(link + prev)) {
			return true;
		}
		if (this.testNextLinkByXPath('//*' + next + prev)) {
			return true;
		}
		if (this.testNextLinkByXPath(link + '[child::img[' + patprev.replace(/_/g, 'concat(@src, " ", @alt)') + ' or ' + patprevstr.replace(/_/g, '@alt') + ']]')) {
			return true;
		}
		var next = '[' + patnext.replace(/_/g, 'text()') + ' or ' + patnextstr.replace(/_/g, 'text()') + ']';
		if (this.testNextLinkByXPath(link + '[descendant-or-self::*' + next + ']')) {
			return true;
		}
		var prev = '[' + patprev.replace(/_/g, 'text()') + ' or ' + patprevstr.replace(/_/g, 'text()') + ']';
		if (this.testNextLinkByXPath(link + '[descendant-or-self::*' + prev + ']')) {
			return true;
		}
		// form
		var next = '[' + patnext.replace(/_/g, '@value') + ' or ' + patnextstr.replace(/_/g, '@value') + ']';
		var prev = '[' + patprev.replace(/_/g, '@value') + ' or ' + patprevstr.replace(/_/g, '@value') + ']';

		var button = '//input[@type="submit" or @type="button"]';
		if (this.testNextLinkByFrom(button + next)) {
			return true;
		}
		if (this.testNextLinkByFrom(button + prev)) {
			return true;
		}
		var button = '//button';
		if (this.testNextLinkByFrom(button + next)) {
			return true;
		}
		if (this.testNextLinkByFrom(button + prev)) {
			return true;
		}

		// search
		return this.testNextLinkByUrl();
	},
	getPageElementAll: function () {
		this.siteinfo.pageElement = function (node, text) {
			var res = $X('./*', node, Array);
			if (res.length) {
				return res;
			}
			var str = text.replace(/^([\n\r]|.)*?<body([\n\r]|.)*?>|<\/body([\n\r]|.)*?>([\n\r]|.)*$/ig, '')
				          .replace(/<script([\n\r]|.)*?src=.*?(ad)[^>]*>(([\n\r]|.)*?<\/script([\n\r]|.)*?>)?/ig, '');
			return [$N('div', {}, str)];
		};
		this.siteinfo.appendChild = '//body';
		this.callback(this.siteinfo);
	},
	searchPageElement: function (primary, secondary) {
		//prompt('', this.siteinfo.nextLink);
		var diff = (new Diff(primary, secondary)).run();
		if (diff.length) {
			//debug(diff.toSource());
			var group = [], max = { length: 0 };
			for (var i = 0, j = diff.length; i < j; ++i) {
				var type = diff[i].type;
				if (type == 0) {
					continue;
				}
				var set = {
					nominate: {},
					keywords: [],
					first: null,
					last: null,
					length: 0,
					size: 0
				};
				if (type == -1) {
					for (; i < j; ++i) {
						if (diff[i].type != -1) {
							for (; i < j; ++i) {
								if (diff[i].type != 1) {
									--i;
									break;
								}
								set.length++;
								set.size += diff[i].item.length;
							}
							break;
						}
						var item = diff[i].item;
						var key = item.replace(/[ \t\n\r0-9]+/g, '');
						if (set.nominate[key]) {
							++set.nominate[key];
						}
						else {
							set.nominate[key] = 1;
						}
						set.keywords[set.keywords.length] = item;
						set.size += item.length;
					}
				}
				else {
					for (; i < j; ++i) {
						if (diff[i].type != 1) {
							if (diff[i].type == -1) {
								for (; i < j && diff[i].type == -1; ++i) {
									var item = diff[i].item;
									var key = item.replace(/[ \t\n\r0-9]+/g, '');
									if (set.nominate[key]) {
										++set.nominate[key];
									}
									else {
										set.nominate[key] = 1;
									}
									set.keywords[set.keywords.length] = item;
									set.size += item.length;
								}
								if (i != j) {
									--i;
								}
							}
							break;
						}
						++set.length;
					}
				}
				set.length = set.keywords.length;
				for (var k = 0, l = set.length; k < l; ++k) {
					var key = set.keywords[k];
					if (set.nominate[key.replace(/[ \t\n\r0-9]+/g, '')] == 1) {
						set.first = key;
						break;
					}
				}
				for (var k = set.length - 1; k >= 0; --k) {
					var key = set.keywords[k];
					if (set.nominate[key.replace(/[ \t\n\r0-9]+/g, '')] == 1) {
						set.last = key;
						break;
					}
				}
				delete set.nominate;
				delete set.keywords;
				if (set.first == null || set.last == null || set.length <= 1) {
					continue;
				}
				if (set.length > max.length || (set.length == max.length && set.size > max.size)) {
					max = set;
				}
				group[group.length] = set;
			}
			if (group.length && max.length > 10) {
				var set = [];
				for (var i = 0, j = group.length; i < j; ++i) {
					if (group[i].length > 10 || group[i].size > 1000) {
						set[set.length] = group[i];
					}
				}
				group = set;
			}
			else if (!group.length && max.length) {
				group[0] = max;
			}
			if (group.length) {
				//debug(group.toSource());
				var xpath = [], l = Number.MAX_VALUE;
				for (var i = 0, j = group.length; i < j; ++i) {
					var first = $X('.//*[contains(text(), "' + group[i].first + '")]', document.body, 0),
					    last  = $X('.//*[contains(text(), "' + group[i].last + '")]', document.body, -1);
					if (!first || !last) {
						continue;
					}
					var tmp = getXPathByElement(first, {
						result: true,
						skipId: true,
					}).full;
					if (l > tmp.length) {
						l = tmp.length;
					}
					xpath[xpath.length] = tmp;
					var tmp = getXPathByElement(last, {
						result: true,
						skipId: true,
					}).full;
					if (l > tmp.length) {
						l = tmp.length;
					}
					xpath[xpath.length] = tmp;
				}
				if (xpath.length) {
					var res = [], sfn = false;
					for (var k = 0, flag = true; k < l; ++k) {
						var tmp = xpath[0][k];
						for (var i = 1, j = xpath.length; i < j; ++i) {
							if (tmp != xpath[i][k]) {
								flag = false;
								break;
							}
						}
						if (!flag) {
							var tag = tmp.split('[')[0];
							if (!/h[1-6]|p/.test(tag)) {
								var non = tmp.replace(/\[([0-9]+|last\(\))\]$/, '');
								if (non != tmp) {
									sfn = true;
									for (var i = 1, j = xpath.length; i < j; ++i) {
										if (xpath[i][k].indexOf(non) != 0) {
											sfn = false;
											break;
										}
									}
									if (sfn) {
										res[res.length] = non;
									}
								}
								else if (/^([a-z]+\[@id=")([^0-9]*)[0-9]+"/.test(tmp)) {
									sfn = true;
									var tmp = RegExp.$1 + RegExp.$2;
									for (var i = 1, j = xpath.length; i < j; ++i) {
										if (xpath[i][k].indexOf(tmp) != 0) {
											sfn = false;
											break;
										}
									}
									if (sfn) {
										res[res.length] = tag + '[starts-with(@id, "' + RegExp.$2 + '")]';
									}
								}
							}
							break;
						}
						res[res.length] = tmp;
					}
					if (res.length > 1) {
						var res = getXPathByElement($X(res.join('/'), 0), {
							skipFirstNumber: sfn,
							skipIdNumber: true,
							skipChild: true
						});
						var tmp = $X(res, 0);
						if (tmp) {
							if (tmp == document.body) {
								this.siteinfo.pageElement = './*';
								this.siteinfo.appendChild = '//body';
							}
							else {
								this.siteinfo.pageElement = res;
							}
							this.callback(this.siteinfo);
							return true;
						}
					}
				}
			}
		}
		return false;
	},
	getPageElement: function () {
		function getLines(str) {
			var tmp = str.replace(/^([\n\r]|.)*?<body([\n\r]|.)*?>|<\/body([\n\r]|.)*?>([\n\r]|.)*$/ig, '').replace(/\r\n?/g, '\n').replace(/<!--([\n\r]|.)*?-->/ig, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&'), reg = /<([0-9a-z]+)[^>]*>([^<\n]*)/gi, res = [], m;
			while (m = reg.exec(tmp)) {
				switch (m[1]) {
				case 'br': case 'base': case 'img': case 'script': case 'style': case 'wbr':
					break;
				default:
					var s = '', a = trim(m[2]).replace(/^(&(.*?);)+\s*/g, '').split(/[&"]/);
					for (var i = 0, j = a.length; i < j; ++i) {
						if (a[i].length > s.length) {
							s = a[i];
						}
					}
					if (s.length > 9 && !/^[0-9]+$/.test(s) && !/[0-9]+\s*\-\s*[0-9]+/.test(s)) {
						res[res.length] = s;
					}
					break;
				}
			}
			return res;
		}
		var nextUrl = null, getNextLink = this.siteinfo.nextLink;
		if (typeof getNextLink == 'string') {
			var next = $X(getNextLink, 0);
			if (next) {
				var href = next.getAttribute('href') || next.getAttribute('action') || next.getAttribute('value');
				if (href) {
					var base = $X('//base', 0);
					nextUrl = parseRelativeURL((base && base.href) ? base.href : this.requestUrl, href);
				}
			}
		}
		else {
			nextUrl = getNextLink.call(this, document, document.documentElement.innerHTML);
		}
		if (!nextUrl) {
			return;
		}
		var self = this, mineType = 'text/html; charset=' + document.characterSet;
		GM_xmlhttpRequest({
			method: 'GET',
			url: self.requestUrl,
			overrideMimeType: mineType,
			onload: function (req) {
				if (200 <= req.status && req.status <= 300) {
					var primary = getLines(req.responseText);
					GM_xmlhttpRequest({
						method: 'GET',
						url: nextUrl,
						overrideMimeType: mineType,
						onload: function (req) {
							if (200 <= req.status && req.status <= 300) {
								var secondary = getLines(req.responseText);
								if (!self.searchPageElement(primary, secondary)) {
									self.getPageElementAll();
								}
								return;
							}
							self.callback();
						},
						onerror: function () {
							self.callback();
						}
					});
				}
				else {
					self.callback();
				}
			},
			onerror: function () {
				self.callback();
			}
		});
	},
	search: function (callback) {
		this.callback = callback;
		if (!this.getNextLink()) {
			this.callback();
		}
	}
};


function Diff(a, b) {
	if (a.length <= b.length) {
		this.a = a;
		this.b = b;
		this.del = -1;
		this.ins = 1;
	}
	else {
		this.a = b;
		this.b = a;
		this.del = 1;
		this.ins = -1;
	}
	this.m = this.a.length;
	this.n = this.b.length;
	this.fp = [];
	this.ls = [];
	this.path = [];
	for(var i = - this.m - 1, j = this.n + 1; i <= j; ++i) {
		this.fp[i] = -1;
		this.ls[i] = -1;
	}
}

Diff.prototype = {
	run: function () {
		var delta = this.n - this.m;
		for(var i = 0, j = this.m; i <= j; ++i) {
			for (var k = -i; k < delta; ++k) {
				this.snake(k);
			}
			for(var k = delta + i; k >= delta; --k) {
				this.snake(k);
			}
			if (this.fp[delta] >= this.n) {
				var k = this.ls[delta], list = [];
				while (k >= 0) {
					var buf = this.path[k];
					list[list.length] = [buf[1], buf[2]];
					k = buf[0];
				}
				var x0 = 0, y0 = 0, res = [];
				for (var i = list.length - 1; i >= 0; --i) {
					var x1 = list[i][0], y1 = list[i][1];
					while (x0 < x1 || y0 < y1) {
						if (y1 - x1 > y0 - x0) {
							res[res.length] = {
								item: this.b[y0++],
								type: this.ins
							};
						}
						else if (y1 - x1 < y0 - x0) {
							res[res.length] = {
								item: this.a[x0++],
								type: this.del
							};
						}
						else {
							res[res.length] = {
								item: this.a[x0++],
								type: 0
							};
							y0++;
						}
					}
				}
				return res;
			}
		}
		return {};
	},
	snake: function (k) {
		var y = this.fp[k - 1] + 1, p;
		if (y > this.fp[k + 1]) {
			p = this.ls[k - 1];
		}
		else {
			y = this.fp[k + 1];
			p = this.ls[k + 1];
		}
		var x = y - k;
		while (x < this.m && y < this.n && this.a[x] == this.b[y]) {
			++x;
			++y;
		}
		this.fp[k] = y;
		var l = this.path.length;
		this.ls[k] = l;
		this.path[l] = [p, x, y];
	}
};



/*-----------------------------------------------------------------------------
 * StatusBalloon
 *-------------------------------------------------------------------------- */

var StatusBalloon = function () {
	var div = $N('div', {
		style: [
			'margin:0;',
			'padding:0.2em;',
			'border:0;',
			'position:fixed;',
			'right:1px;',
			'bottom:1px;',
			'z-index:999999;',
			'visibility:hidden;',
			'color:#fff;',
			'line-height:1.2em;',
			'font-weight:bold;',
			'font-size:12px;'
		].join('')
	});
	document.body.appendChild(div);
	this.element = div;
	this.status = false;
};

StatusBalloon.prototype = {
	show: function () {
		var self = this, elm = this.element, cnt = 0;
		this.status = true;
		elm.style.opacity = 0;
		elm.style.visibility = 'visible';
		new function () {
			if (self.status) {
				if (cnt >= 25) {
					elm.style.opacity = null;
					return;
				}
				elm.style.opacity = Math.sin(Math.PI * ++cnt / 50);
				setTimeout(arguments.callee, 20);
			}
		};
	},
	hide: function () {
		var self = this, elm = this.element, cnt = 0;
		this.status = false;
		new function () {
			if (!self.status) {
				if (cnt >= 25) {
					elm.style.visibility = 'hidden';
					elm.style.opacity = null;
					return;
				}
				elm.style.opacity = Math.cos(Math.PI * ++cnt / 50);
				setTimeout(arguments.callee, 10);
			}
		};
	},
	remove: function () {
		var elm = this.element, cnt = 0;
		setTimeout(function () {
			new function () {
				if (cnt >= 25) {
					elm.style.visibility = 'hidden';
					elm.style.opacity = null;
					elm.parentNode.removeChild(elm);
					return;
				}
				elm.style.opacity = Math.cos(Math.PI * ++cnt / 50);
				setTimeout(arguments.callee, 10);
			};
		}, 1500);
	},
	change: function (text, color) {
		this.element.textContent = text;
		this.element.style.background = color;
	}
};


/*-----------------------------------------------------------------------------
 * Cache
 *-------------------------------------------------------------------------- */

var Cache = function (url) {
	this.url = url;
	this.cache = GM_getObject('cache', null);
	if (this.cache == null) {
		this.cache = {};
		this.isEmpty = true;
	}
	else {
		this.isEmpty = false;
	}
	this.isUpdate = false;
};

Cache.prototype = {
	get: function (key) {
		var result = this.cache[key];
		return result && result.data ? result.data : [];
	},
	save: function () {
		if (this.isUpdate) {
			GM_setObject('cache', this.cache);
		}
		this.isUpdate = false;
	},
	update: function (clear) {
		var self = this;
		var now = (new Date).getTime();
		var expire = now + EXPIRE * 24 * 60 * 60 * 1000;
		var nextUpdate = function (i) {
			if (self.url.length == i) {
				self.save();
				clear && clear();
				return;
			}
			var url = self.url[i];
			var data = self.cache[url];
			if (data && data.expire > now) {
				nextUpdate(i + 1);
			}
			else {
				self.isUpdate = true;
				if (!self.cache[url]) {
					self.cache[url] = {};
				}
				GM_xmlhttpRequest({
					method: 'GET',
					url: url.replace(/#.*$/, '') + '?' + now,
					overrideMimeType: 'text/plain; charset=UTF-8',
					onload: function (req) {
						if (req.status == 200) {
							self.cache[url].data = parseOption(
								req.responseText,
								/#.*?function/.test(url)
							);
						}
						self.cache[url].expire = expire;
						nextUpdate(i + 1);
					},
					onerror: function () {
						self.cache[url].expire = expire;
						nextUpdate(i + 1);
					}
				});
			}
		};
		if (clear) {
			this.cache = {};
		}
		nextUpdate(0);
	}
};


/*-----------------------------------------------------------------------------
 * Listener
 *-------------------------------------------------------------------------- */

var Listener = function () {
	this.functions = {};
};

Listener.prototype = {
	addEventListener: function (prop, func) {
		if (!this.functions[prop])
			this.functions[prop] = [];
		this.functions[prop].push(func);
	},
	isEventListener: function (prop) {
		var f = this.functions[prop];
		return f && f.length;
	},
	callEventListener: function (prop, args) {
		var f = this.functions[prop];
		if (f && f.length) {
			var self = autopage || { $X: $X, $N: $N, message: message };
			for (var i = 0, j = f.length; i < j; ++i) {
				f[i].apply(self, args);
			}
		}
	}
};


/*-----------------------------------------------------------------------------
 * Initialize
 *-------------------------------------------------------------------------- */

var autopage = null;
var database = new Cache(SITEINFO_URL.concat(LANGUAGE_URL));
var listener = new Listener();

/*
 * Update Language
 */

function getMessage() {
	var message = GM_getObject('cache.message', null);
	if (!message || message.expire <= (new Date).getTime()) {
		var data = [], lang = LANGUAGE.toLowerCase();
		for (var i = 0, j = LANGUAGE_URL.length; i < j; ++i) {
			data.push.apply(data, database.get(LANGUAGE_URL[i]));
		}
		while (true) {
			var res = DEFAULT_MESSAGE, flag = false;
			for (var i = 0, j = data.length; i < j; ++i) {
				var mes = data[i];
				if (mes.name == lang) {
					for (var k in mes) {
						res[k] = mes[k];
					}
					flag = true;
					break;
				}
			}
			if (flag) {
				message = res;
				res.expire = (new Date).getTime() + EXPIRE * 24 * 60 * 60 * 1000;
				GM_setObject('cache.message', res);
				break;
			}
			if (lang.indexOf('-') == -1) {
				message = res;
				break;
			}
			lang = lang.replace(/\-[^\-]*$/, '');
		}
	}
	return message;
}

var message = getMessage();


/*
 * Matching Siteinfo
 */

if (typeof PERSONAL_RULES == 'undefined') {
	var PERSONAL_RULES = [];
}
else if (typeof PERSONAL_RULES != 'object') {
	PERSONAL_RULES = parseOption(PERSONAL_RULES, true);
}

autopage = Pagerization.getInstance(PERSONAL_RULES);

if (!autopage) {
	for (var i = 0, j = SITEINFO_URL.length; !autopage && i < j; ++i) {
		autopage = Pagerization.getInstance(database.get(SITEINFO_URL[i]), PERSONAL_RULES);
	}
	if (!autopage) {
		MICROFORMAT.url = '.*';
		if ($X(MICROFORMAT.appendChild, document, 0)) {
			var rule = MICROFORMAT;
			delete rule.insertBefore;
			autopage = Pagerization.getInstance([rule]);
		}
		if (!autopage && $X(MICROFORMAT.insertBefore, document, 0)) {
			var rule = MICROFORMAT;
			delete rule.appendChild;
			autopage = Pagerization.getInstance([rule]);
		}
	}
}

if (autopage) {
	listener.callEventListener('enable');
}
else {
	listener.callEventListener('disable', Pagerization.getInstance);
}


/*
 * Update Data
 */

var runAutoPage = DISABLE_AUTO_SEARCH === true ? function (func) {
	func && func();
} : function (func) {
	if (window != window.parent) {
		func && func();
		return;
	}
	if (DISABLE_AUTO_SEARCH) {
		for (var i = 0, j = DISABLE_AUTO_SEARCH.length, url = location.href; i < j; ++i) {
			if (url.match(DISABLE_AUTO_SEARCH[i])) {
				func && func();
				return;
			}
		}
	}
	var auto = new AutoPagerization();
	var START = (new Date);
	auto.search(function (rule) {
		if (!rule) {
			func && func();
			return;
		}
		//document.title += ' / ' + ((new Date) - START);
		autopage = Pagerization.getInstance([rule]);
		if (autopage) {
			GM_registerMenuCommand('Pagerization - Generate SITEINFO', function () {
				for (var i in {
					nextLink: true, pageElement: true, insertBefore: true, appendChild: true
				}) {
					if (rule[i] && prompt(i, rule[i]) == null) {
						break;
					}
				}
			});
		}
	});
};

if (!autopage) {
	if (database.isEmpty) {
		database.update(function () {
			message = getMessage();
			for (var i = 0, j = SITEINFO_URL.length; !autopage && i < j; ++i) {
				autopage = Pagerization.getInstance(database.get(SITEINFO_URL[i]), PERSONAL_RULES);
			}
			if (!autopage) {
				runAutoPage();
			}
		});
	}
	else {
		runAutoPage(function () {
			database.update();
		});
	}

}

GM_registerMenuCommand('Pagerization - ' + message.update, function () {
	database.update(function () {
		alert(message.updateEnd);
	});
});


/*
 * window
 */

if (typeof window.Pagerization == 'undefined') {
	window.Pagerization = {
		addEventListener: function (prop, func) {
			listener.addEventListener(prop, func);
		},
		$X: $X,
		$N: $N
	};
}

if (typeof window.AutoPagerize == 'undefined') {
	window.AutoPagerize = {
		addFilter: function (func) {
			listener.addEventListener('addPage', func);
		}
	};
}


/*-----------------------------------------------------------------------------
 * Functions
 *-------------------------------------------------------------------------- */

function GM_getObject(key, defaultValue) {
	return (new Function('', 'return (' + GM_getValue(key, 'void 0') + ')'))() || defaultValue;
}

function GM_setObject(key, value) {
	GM_setValue(key, value.toSource());
}

function debug(tmp) {
	var textarea = $N('textarea', {}), body = document.body;
	textarea.value = tmp;
	body.insertBefore(textarea, body.firstChild);
}

function zeropad(n, c) {
	if (n < 0) {
		return '-' + zeropad(n * -1, c);
	}
	var j = ('' + n).length;
	if (j >= c) {
		return '' + n;
	}
	var z = '';
	for (var i = 0, j = c - j; i < j; ++i) {
		z += '0';
	}
	return z + n;
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g, '');
}

function unescapeHTML(str) {
	return str.replace(/&lt;/g,   '<')
	          .replace(/&gt;/g,   '>')
	          .replace(/&quot;/g, '"')
	          .replace(/&amp;/g,  '&');
}

function parseRelativeURL(aurl, rurl) {
	if (rurl.match(/^(ht|f)tps?:\/\//)) {
		return rurl;
	}
	if (rurl.charAt(0) == '?') {
		return aurl.replace(/\?.*$/, '') + rurl;
	}
	aurl = aurl.replace(/\/[^\/]*$/, '');
	rurl = rurl.replace(/\/\//g, '/');
	if (rurl.charAt(0) == '/') {
		return aurl.match(/^(ht|f)tps?:\/\/[^\/]*/)[0] + rurl;
	}
	while (rurl.charAt(0) == '.') {
		if (rurl.substring(0, 3) == '../') {
			aurl = aurl.replace(/\/[^\/]*$/, '');
		}
		rurl = rurl.replace(/^\.*\//, '');
	}
	return aurl + '/' + rurl;
}

function parseHTML(str) {
	var res = document.implementation.createDocument(null, 'html', null)
	var range = document.createRange();
	    range.setStartAfter(document.body);
	res.documentElement.appendChild(
		res.importNode(range.createContextualFragment(
			str.replace(/^([\n\r]|.)*?<html([\n\r]|.)*?>|<\/html([\n\r]|.)*?>([\n\r]|.)*$/ig, '')
		), true)
	);
	return res;
}

function parseOption(str, opt) {
	str = trim('' + str).replace(/\r\n?/g, '\n');
	var res = [];
	if (str.charAt(0) == '[') {
		var rules = str.split(/\n{2,}/);
		for (var i = 0, j = rules.length; i < j; ++i) {
			var rule = rules[i].split(/\s*\n\s*([a-zA-Z0-9]+)\s*:\s*/),
			    info = {};
			if (/\[\s*(.+?)\s*\]/.test(rule.shift())) {
				info.name = escape(RegExp.$1);
			}
			for (var k = 0, l = rule.length; k < l; k += 2) {
				info[trim(rule[k])] = toObject(trim(rule[k + 1]), opt);
			}
			res[res.length] = info;
		}
	}
	else {
		var elms = $X('//*[@class="autopagerize_data"]', parseHTML(str), Array);
		for (var i = 0, j = elms.length; i < j; ++i) {
			var header = elms[i], info = {};
			while (!/h[1-6]/i.test(header.tagName)) {
				if (header != header.parentNode.firstChild) {
					header = header.previousSibling;
				}
				else if (header.parentNode != document) {
					header = header.parentNode;
				}
				else {
					header = {};
					break;
				}
			}
			if (header.textContent) {
				info.name = header.textContent;
			}
			var lines = elms[i].value.split('\n');
			for (var k = 0, l = lines.length; k < l; ++k) {
				if (/^\s*([^:]*?)\s*:(.*)$/.test(lines[k])) {
					info[RegExp.$1] = trim(RegExp.$2);
				}
			}
			res[res.length] = info;
		}
	}
	return res;
}

function toObject(val, opt) {
	var m;
	if (val.match(/^[0-9]+$/)) {
		return parseInt(val, 10);
	}
	if (m = val.match(/^\/(.+?)\/$/)) {
		return new RegExp(m[1], 'i');
	}
	if (m = val.match(/^function\s*\(((?:[\n\r]|.)*?)\)\s*{((?:[\n\r]|.)*?)}(?:\|(.*))?$/)) {
		return opt ? new Function(m[1], 'var $X=this.$X,$N=this.$N,message=this.message;' + m[2]) :
		      m[3] ? toObject(m[3], false) : '';
	}
	return val;
}

function getElementPosition(elm) {
	var left = 0, top = 0;
	while (elm) {
		left += elm.offsetLeft || 0;
		top  += elm.offsetTop  || 0;
		elm   = elm.offsetParent;
	}
	return {left: left, top: top};
}

function getElementBottom(elm) {
	var top = getElementPosition(elm).top, height = 0;
	if (top) {
		var cs = document.defaultView.getComputedStyle(elm, '');
		var props = ['height',  'borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom', 'marginTop', 'marginBottom'];
		for (var i = 0, j = props.length; i < j; ++i) {
			var h = parseInt(cs[props[i]]);
			if (typeof h == 'number') {
				height += h;
			}
		}
	}
	return top + height;
}

function getXPathByElement(element, option) {
	option = option || {};
	var full = [], simple = [], elm = element, attribute = [ 'class', 'src', 'accesskey', 'type', 'name', 'method' ];
	if (!option.skipIdNumber) {
		attribute[attribute.length] = 'id';
	}
	do {
		if (!option.skipId && elm.hasAttribute('id')) {
			var id = elm.getAttribute('id');
			if (!option.skipIdNumber || !/[0-9]+$/.test(id)) {
				full.unshift('id("' + id + '")');
				simple.unshift('id("' + id + '")');
				break;
			}
		}
		var expr = elm.tagName.toLowerCase(), flag = false;
		if (expr == 'html') {
			elm = document;
			break;
		}
		if (option.skipChild && /^body|div|center|form|table$/.test(expr)) {
			option.skipChild = false;
		}
		var attr = '';
		for (var i = 0, j = attribute.length; i < j; ++i) {
			var name = attribute[i];
			if (elm.hasAttribute(name)) {
				attr += '[@' + name + '="' + elm.getAttribute(name) + '"]';
			}
		}
		if (attr) {
			option.skipChild = false;
		}
		expr += attr;
		if (attr || elm.hasAttribute('href') || elm.hasAttribute('action')) {
			simple.unshift(expr);
		}
		if (!option.skipChild) {
			var elms = $X('./' + expr, elm.parentNode, Array);
			if (option.skipFirstNumber) {
				option.skipFirstNumber = false;
			}
			else {
				for (var i = 0, j = elms.length; i < j; ++i) {
					if (elm == elms[i]) {
						if (j == 1) {}
						else if (i + 1 == j) {
							expr += '[last()]';
						}
						else if (option.number) {
							if (i == 0) {
								expr += '[0]';
							}
						}
						else {
							expr += '[' + (i + 1) + ']';
						}
						break;
					}
				}
			}
			full.unshift(expr);
		}
		else {
			option.skipFirstNumber = false;
		}
		elm = elm.parentNode;
	} while (elm != document && elm.tagName);
	if (elm == document) {
		simple.unshift('');
		if (full.length > 1 && full[0] == 'body') {
			full[0] = '/';
		}
		else {
			full.unshift('/');
		}
	}
	return (option.result ? {
		full: full,
		simple: simple
	} : full.join('/'));
}

function $N(name, attr, childs) {
	var result = document.createElement(name);
	for (var i in attr) {
		result.setAttribute(i, attr[i]);
	}
	if (childs) {
		if (typeof childs == 'string') {
			result.innerHTML = childs;
		}
		else {
			for (var i = 0, j = childs.length; i < j; ++i) {
				var child = childs[i];
				result.appendChild(typeof child == 'string' ? document.createTextNode(child) : child);
			}
		}
	}
	return result;
}

function $X(exp, context, type) {
	if (typeof context == 'function' || typeof context == 'number') {
		type = context;
		context = document;
	}
	else {
		context = context || document;
	}
	var doc = context.ownerDocument || context;
	exp = doc.createExpression(exp, function (prefix) {
		return document.createNSResolver(doc).lookupNamespaceURI(prefix) || document.documentElement.namespaceURI;
	});
	if (typeof type == 'number') {
		if (type == 0) {
			return exp.evaluate(context, 9, null).singleNodeValue;
		}
		var result = exp.evaluate(context, 7, null);
		var length = result.snapshotLength;
		if (type < 0) {
			type += length;
		}
		return 0 <= type && type < length ? result.snapshotItem(type) : null;
	}
	switch (type) {
	case Number:
		return exp.evaluate(context, 1, null).numberValue;
	case String:
		return exp.evaluate(context, 2, null).stringValue;
	case Boolean:
		return exp.evaluate(context, 3, null).booleanValue;
	case Array:
		var result = exp.evaluate(context, 7, null), res = [];
		for (var i = 0, j = result.snapshotLength; i < j; ++i) {
			res[res.length] = result.snapshotItem(i);
		}
		return res;
	default:
		var result = exp.evaluate(context, 0, null);
		switch (result.resultType) {
		case 1:
			return result.numberValue;
		case 2:
			return result.stringValue;
		case 3:
			return result.booleanValue;
		case 4:
			var res = [], i = null;
			while (i = result.iterateNext()) {
				res[res.length] = i;
			}
			return res;
		}
		return null;
	}
}
