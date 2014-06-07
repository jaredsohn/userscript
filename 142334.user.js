// ==UserScript==
// @name           Baidu & Google Button
// @description    Fast Switch Baidu & Google Search Engine
// @author         waisir
// @include        http://www.baidu.com/s*
// @include        http://www.baidu.com/baidu*
// @include        https://www.google.com.hk/search*
// @include        http://www.google.com.hk/search*
// @include        https://www.google.com/search*
// @include        http://www.google.com/search*
// @include        http://www.google.com/webhp*
// @include        https://www.google.com/webhp*
// @include        http://www.google.com.hk/webhp*
// @include        https://www.google.com.hk/webhp*
// @version        1.3
// @grant       none
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

;
(function(factory) {
	if (typeof define === 'function' && define.amd) {
// AMD available; use anonymous module
		if (typeof jQuery !== 'undefined') {
			define(['jquery'], factory);
		} else {
			define([], factory);
		}
	} else {
// No AMD available; mutate global vars
		if (typeof jQuery !== 'undefined') {
			factory(jQuery);
		} else {
			factory();
		}
	}
})(function($, undefined) {

	var tag2attr = {
			a: 'href',
			img: 'src',
			form: 'action',
			base: 'href',
			script: 'src',
			iframe: 'src',
			link: 'href'
		},

		key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query

		aliases = { 'anchor': 'fragment' }, // aliases for backwards compatability

		parser = {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, //less intuitive, more accurate to the specs
			loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
		},

		toString = Object.prototype.toString,

		isint = /^[0-9]+$/;

	function parseUri(url, strictMode) {
		var str = decodeURI(url),
			res = parser[ strictMode || false ? 'strict' : 'loose' ].exec(str),
			uri = { attr: {}, param: {}, seg: {} },
			i = 14;

		while (i--) {
			uri.attr[ key[i] ] = res[i] || '';
		}

// build query and fragment parameters
		uri.param['query'] = parseString(uri.attr['query']);
		uri.param['fragment'] = parseString(uri.attr['fragment']);

// split path and fragement into segments
		uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g, '').split('/');
		uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g, '').split('/');

// compile a 'base' domain attribute
		uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ? uri.attr.protocol + '://' + uri.attr.host : uri.attr.host) + (uri.attr.port ? ':' + uri.attr.port : '') : '';

		return uri;
	};

	function getAttrName(elm) {
		var tn = elm.tagName;
		if (typeof tn !== 'undefined') return tag2attr[tn.toLowerCase()];
		return tn;
	}

	function promote(parent, key) {
		if (parent[key].length == 0) return parent[key] = {};
		var t = {};
		for (var i in parent[key]) t[i] = parent[key][i];
		parent[key] = t;
		return t;
	}

	function parse(parts, parent, key, val) {
		var part = parts.shift();
		if (!part) {
			if (isArray(parent[key])) {
				parent[key].push(val);
			} else if ('object' == typeof parent[key]) {
				parent[key] = val;
			} else if ('undefined' == typeof parent[key]) {
				parent[key] = val;
			} else {
				parent[key] = [parent[key], val];
			}
		} else {
			var obj = parent[key] = parent[key] || [];
			if (']' == part) {
				if (isArray(obj)) {
					if ('' != val) obj.push(val);
				} else if ('object' == typeof obj) {
					obj[keys(obj).length] = val;
				} else {
					obj = parent[key] = [parent[key], val];
				}
			} else if (~part.indexOf(']')) {
				part = part.substr(0, part.length - 1);
				if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
				parse(parts, obj, part, val);
// key
			} else {
				if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
				parse(parts, obj, part, val);
			}
		}
	}

	function merge(parent, key, val) {
		if (~key.indexOf(']')) {
			var parts = key.split('['),
				len = parts.length,
				last = len - 1;
			parse(parts, parent, 'base', val);
		} else {
			if (!isint.test(key) && isArray(parent.base)) {
				var t = {};
				for (var k in parent.base) t[k] = parent.base[k];
				parent.base = t;
			}
			set(parent.base, key, val);
		}
		return parent;
	}

	function parseString(str) {
		return reduce(String(str).split(/&|;/),function(ret, pair) {
			try {
				pair = decodeURIComponent(pair.replace(/\+/g, ' '));
			} catch (e) {
// ignore
			}
			var eql = pair.indexOf('='),
				brace = lastBraceInKey(pair),
				key = pair.substr(0, brace || eql),
				val = pair.substr(brace || eql, pair.length),
				val = val.substr(val.indexOf('=') + 1, val.length);

			if ('' == key) key = pair, val = '';

			return merge(ret, key, val);
		}, { base: {} }).base;
	}

	function set(obj, key, val) {
		var v = obj[key];
		if (undefined === v) {
			obj[key] = val;
		} else if (isArray(v)) {
			v.push(val);
		} else {
			obj[key] = [v, val];
		}
	}

	function lastBraceInKey(str) {
		var len = str.length,
			brace, c;
		for (var i = 0; i < len; ++i) {
			c = str[i];
			if (']' == c) brace = false;
			if ('[' == c) brace = true;
			if ('=' == c && !brace) return i;
		}
	}

	function reduce(obj, accumulator) {
		var i = 0,
			l = obj.length >> 0,
			curr = arguments[2];
		while (i < l) {
			if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
			++i;
		}
		return curr;
	}

	function isArray(vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	}

	function keys(obj) {
		var keys = [];
		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) keys.push(prop);
		}
		return keys;
	}

	function purl(url, strictMode) {
		if (arguments.length === 1 && url === true) {
			strictMode = true;
			url = undefined;
		}
		strictMode = strictMode || false;
		url = url || window.location.toString();

		return {

			data: parseUri(url, strictMode),

// get various attributes from the URI
			attr: function(attr) {
				attr = aliases[attr] || attr;
				return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
			},

// return query string parameters
			param: function(param) {
				return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
			},

// return fragment parameters
			fparam: function(param) {
				return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
			},

// return path segments
			segment: function(seg) {
				if (typeof seg === 'undefined') {
					return this.data.seg.path;
				} else {
					seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
					return this.data.seg.path[seg];
				}
			},

// return fragment segments
			fsegment: function(seg) {
				if (typeof seg === 'undefined') {
					return this.data.seg.fragment;
				} else {
					seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
					return this.data.seg.fragment[seg];
				}
			}

		};

	};

	if (typeof $ !== 'undefined') {

		$.fn.url = function(strictMode) {
			var url = '';
			if (this.length) {
				url = $(this).attr(getAttrName(this[0])) || '';
			}
			return purl(url, strictMode);
		};

		$.url = purl;

	} else {
		window.purl = purl;
	}

});


$(document).ready(function() {


	var kw = $('#kw').val(),
		ggprefix = 'https://www.google.com.hk/search?q=',
		bdprefix = 'http://www.baidu.com/s?wd=';

	$('.s_btn_wr').after('<div class="s_btn_wr bg" style="display:inline-block"><input type="button" id="ggyx" value="Google" class="bg s_btn" ></div>');

	$('#ggyx').on({click: function() {
		location.href = ggprefix + kw;
	}});

	var url = new $.url();


	function attachBaiduBtn() {

		$('#sblsbb').after('<div id="sblsbb_bd" class="lsbb kpbb" style="position: absolute; left: 80px;top:0px;height:27px"><button id="bdyx" class="lsb" style="background: none repeat scroll 0 0 rgba(0, 0, 0, 0);color: white;font-size: 13px;overflow: hidden;position: relative;width: 100%;cursor:pointer">百度</button></div>');

		$('#bdyx').off('click').on({click: function() {
			var kwg = url.param('q');

			location.href = bdprefix + kwg;
			return false;
		}});
	}

	$('.lsb').on({click: function() {
		setTimeout(attachBaiduBtn, 2000);
	}});

	attachBaiduBtn();

});

