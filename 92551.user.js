// ==UserScript==
// @name           have_read_it_already
// @namespace      http://seaoak.cocolog-nifty.com/
// @description    make the "Read It Later" web site into a web application
// @version        1.0.3.0
// @include        http://readitlaterlist.com/unread
// @include        http://readitlaterlist.com/unread/*
// @include        http://readitlaterlist.com/read
// @include        http://readitlaterlist.com/read/*
// ==/UserScript==

(function(e){e.text='(function(){var f='+(function(){ try {

	var isDebug = true;

	var _win = window;
	var _doc = document;
	var self = arguments.callee;

	if (! _doc.getElementsByClassName) throw 'this browser is not supported';

	// feature detection
	var hasFeature_DOMSubtreeModified;
	var hasFeature_DOMAttrModified;
	(function() {
		var elem = _doc.createElement('div');
		elem.addEventListener('DOMSubtreeModified', function() {
			hasFeature_DOMSubtreeModified = true;
		}, true);
		elem.addEventListener('DOMAttrModified', function() {
			hasFeature_DOMAttrModified = true;
		}, true);
		var elem2 = _doc.createElement('div');
		elem.appendChild(elem2);
		elem2.className = 'foobar';
	})();
	if ((! hasFeature_DOMSubtreeModified) && (! hasFeature_DOMAttrModified)) throw 'DOM Events are not supported';

	var api_url = 'http://api.seaoak.jp/url_query/1/?url=';
	var cache_tag_prefix = 'have_read_it_already_cache_';

	var global_status;
	if (arguments.length == 0) {
		// first time
		global_status = {};
		global_status.cache = {};
	} else {
		global_status = arguments[0];
	}
	var reload = function() {
		self(global_status);
	};

	//========================================================================
	
	function arrayEach(func, list) {
		for (var i=0; i<list.length; i++) {
			func(list[i]);
		}
	}

	function arrayMap(func, list) {
		var result = new Array(list.length);
		for (var i=0; i<list.length; i++) {
			result[i] = func(list[i]);
		}
		return result;
	}

	function toArray(list) {
		var result = new Array(list.length);
		for (var i=0; i<list.length; i++) {
			result[i] = list[i];
		}
		return result;
	}

	function myYield() {
		var args = toArray(arguments);
		var func = args.shift();
		setTimeout(function() {
			try {
				func.apply(null, args);
			} catch(e) {
				if (isDebug) alert('FATAL: ' + e);
			}
		}, 100);
	}

	function set_cache(key, value) {
		if (_win.localStorage && JSON) {
			var obj = {};
			obj.content = value;
			_win.localStorage[cache_tag_prefix + key] = JSON.stringify(obj);
		} else {
			global_status.cache[key] = value;
		}
	}

	function get_cache(key) {
		if (_win.localStorage && JSON) {
			var text = _win.localStorage[cache_tag_prefix + key];
			if (text) {
				var obj = JSON.parse(text);
				return obj.content;
			} else {
				return undefined;
			}
		} else {
			return global_status.cache[key];
		}
	}

	function loadJSONP(url, callback, onerror) {
		var base_url = url;
		if (get_cache(base_url)) {
			_win.setTimeout(function() {
				try {
					callback.apply(null, get_cache(base_url));
				} catch(e) {
					if (isDebug) alert('FATAL: ' + e);
				}
			}, 0);
			return;
		}

		var fname = (function(s){do{var x=Math.floor(Math.random()*0x1fffffffffffff)}while(window[s+x]);return s+x})('have_read_it_already_callback');

		window[fname] = function() {
			delete window[fname];
			try{
				set_cache(base_url, toArray(arguments));
				callback.apply(null, arguments);
			} catch(e) {
				if (isDebug) alert('FATAL: '+e);
			}
		};

		if (url.indexOf('?') == -1) {
			url += '?';
		}
		if (url.indexOf('=') != -1) {
			url += '&';
		}
		url += 'callback=' + fname;

		var elem = document.createElement('script');
		elem.setAttribute('type', 'text/javascript');
		elem.setAttribute('src', url);
		if (onerror) {
			elem.onerror = onerror;
		}
		document.body.appendChild(elem);
	}

	function loadUrl(url, onload, onerror) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onreadystatechange = function() {
			try {
				if (xhr.readyState != 4) return;
				if (xhr.status == 200) {
					if (onload) onload(xhr.responseText);
				} else {
					if (onerror) onerror(xhr.status);
				}
			} catch(e) {
				if (isDebug) alert('FATAL: ' + e);
			}
		};
		xhr.send(null);
	}

	function addStyle(cssText) {
		// add style
		var elem = document.createElement('style');
		document.getElementsByTagName('head')[0].appendChild(elem);
		document.styleSheets[document.styleSheets.length-1].insertRule(cssText);
	}

	function hasClassName(elem, className) {
		if (! elem) throw 'hasClassName(): elem is null.';
		if (! className) throw 'hasClassName(): className is null.';
		if (! elem.className) return false;
		var regexp = new RegExp('\\b' + className + '\\b');
		return regexp.test(elem.className);
	}

	function addClassName(elem, className) {
		if (! elem) throw 'addClassName(): elem is null.';
		if (! className) throw 'addClassName(): className is null.';
		if (hasClassName(elem, className)) return;
		if (elem.className) {
			elem.className = elem.className + ' ' + className;
		} else {
			elem.className = className;
		}
	}

	function removeClassName(elem, className) {
		if (! elem) throw 'removeClassName(): elem is null.';
		if (! className) throw 'removeClassName(): className is null.';
		if (! hasClassName(elem, className)) return;
		var regexp = new RegExp('\\b' + className + '\\b');
		elem.className.replace(regexp, '');
		if (elem.className.match(/^\s*$/)) {
			elem.className = '';
		} else {
			elem.className.replace(/\s+/g, ' ');
		}
	}

	//========================================================================

	var disableListItem;
	var enableListItem;
	(function() {
		var handler = function(event) {
			// disable click
			event.preventDefault();
			event.stopPropagation();
			return false;
		};

		disableListItem = function(listItem) {
			if (hasClassName(listItem, 'grayOut')) return; // already disabled
			addClassName(listItem, 'grayOut');
			listItem.addEventListener('click', handler, true);
		};

		enableListItem = function(listItem) {
			if (! hasClassName(listItem, 'grayOut')) return;
			removeClassName(listItem, 'grayOut');
			listItem.removeEventListener('click', handler);
		};
	})();

	function addDeleteButton(listItem) {
		if (listItem.getElementsByClassName('delete').length > 0) return;
		var id = listItem.id.slice(3);
		var brotherElem = listItem.getElementsByClassName('check')[0];
		if (! brotherElem) throw 'can not find brotherElem';
		brotherElem.parentNode.appendChild((function() {
			var elem = _doc.createElement('span');
			elem.innerHTML = ' | ';
			return elem;
		})());
		brotherElem.parentNode.appendChild((function() {
			var elem = _doc.createElement('a');
			elem.innerHTML = 'Delete';
			elem.id = 'delete' + id;
			elem.className = 'check delete';
			elem.href = '/x/mark/m/?d=' + id;
			elem.setAttribute('title', 'Delete');
			elem.style.right = '-30px';
			var handler = function(event) {
				elem.removeEventListener(handler);
				event.preventDefault();
				disableListItem(listItem);
				loadUrl(elem.href, function(responseText) {
					listItem.parentNode.removeChild(listItem);
				}, function(status) {
					alert('communication error');
					enableListItem(listItem);
					elem.addEventListener('click', handler, false);
				});
				return false;
			};
			elem.addEventListener('click', handler, false);
			return elem;
		})());
	}

	function overwriteInfo(listItem) {
		var id = listItem.id.slice(3);
		var linkElem = listItem.getElementsByClassName('item')[0];
		if (! linkElem) throw 'linkElem is not found';
		var href = encodeURIComponent(linkElem.href);
		loadJSONP(api_url + href, function(info) {
			if (! info) return;

			if (info.url) linkElem.href = info.url;
			if (info.title) linkElem.innerHTML = info.title;
			linkElem.style.color = '#663300';

			if (info.domain) {
				var domainElem = listItem.getElementsByClassName('domain')[0];
				if (! domainElem) throw 'domainElem is not found';
				domainElem.innerHTML = '<a href="http://' + info.domain + '/">' + info.domain + '</a>';
			}

			if (info.favicon) {
				var faviconElem = listItem.getElementsByClassName('favicon')[0];
				faviconElem.src = info.favicon;
				faviconElem.setAttribute('domain', info.domain);
			}

		}, null);
	}

	//========================================================================

	if (! _win.location.protocol.match(/^(shttp|https?):$/)) return;

	if (! _win.location.href.match(/^http:\/\/readitlaterlist.com\/(unread|read)(\/\d+)?$/)) return;

	var username = (function() {
		var result;
		arrayEach(function(elem) {
			if (elem.getAttribute('rel') != 'alternate') return;
			if (elem.getAttribute('type') != 'application/rss+xml') return;
			if (! elem.getAttribute('href')) return;
			var matching = elem.getAttribute('href').match(/^\/users\/([-a-zA-Z0-9_]+)\/feed\/$/);
			if (! matching) throw 'unexpected username';
			if (result) throw 'doubled username';
			result = matching[1];
		}, _doc.getElementsByTagName('link'));
		if (! result) throw 'username is not found';
		return result;
	})();

	addStyle('.grayOut { opacity: 0.5; }');

	arrayEach(function(listItem) {
		if (! listItem.id) return; // skip null element
		if (listItem.id == 'pt') return; // skip pointer (?)
		var id = listItem.id.slice(3);
		if (! id.match(/^\d+$/)) throw 'unexpected ID (' + id + ')';

		if (hasClassName(listItem, 'already')) return;
		addClassName(listItem, 'already');

		addDeleteButton(listItem);
		overwriteInfo(listItem);

	}, _doc.getElementById('list').childNodes);

	(function() {
		// truly I want to use "DOMAttrModified" event, but it is not supported yet by Chrome...
		var targetElem = _doc.getElementById('list');
		var timer;
		var prevValue;
		var handler = function(e) {
			var value = targetElem.className;
			if (timer) {
				_win.clearTimeout(timer);
			}
			if (timer || ((prevValue == 'loading') && (! value))) {
				timer = _win.setTimeout(function() {
					timer = undefined;
					if (hasFeature_DOMAttrModified) {
						targetElem.parentNode.removeEventListener('DOMAttrModified', handler, true);
					} else if (hasFeature_DOMSubtreeModified) {
						targetElem.parentNode.removeEventListener('DOMSubtreeModified', handler, true);
					} else {
						throw 'DOM Events are not supported';
					}
					reload();
				}, 200);
			}
			prevValue = value;
		};
		if (hasFeature_DOMAttrModified) {
			targetElem.parentNode.addEventListener('DOMAttrModified', handler, true);
		} else if (hasFeature_DOMSubtreeModified) {
			targetElem.parentNode.addEventListener('DOMSubtreeModified', handler, true);
		} else {
			throw 'DOM Events are not supported';
		}
	})();

} catch(e) {
	if (isDebug) alert('FATAL: ' + e);
}
}).toString()+';with(f){f()}})()';document.body.appendChild(e)})(document.createElement('script'));
