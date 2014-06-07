// ==UserScript==
// @name           whyyoufollow
// @namespace      http://seaoak.cocolog-nifty.com/
// @description    enable to edit private comments for your following users on Twitter
// @version        1.1.0.5
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function(e){e.text='(function(){var f='+(function(){ try {


	var isDebug = false;

	var _win = window;
	var _doc = document;
	var self = arguments.callee;

	if (! _doc.getElementsByClassName) throw 'this browser is not supported';

	var myColor = '#996633';
	var myClassName = 'inserted-by-whyyoufollow';

	var isNewDesign2010a = window.twttr.currentUserScreenName ? true : false;

	var global_status;
	if (arguments.length == 0) {
		// 初回の呼び出し
		global_status = {};
		window.addEventListener('hashchange', function() {
			self(global_status);
		}, false);
	} else {
		global_status = arguments[0];
	}
	if (global_status.is_processing_now) return;
	global_status.is_processing_now = true;

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

	function encode(text) {
		text = text.replace(/&/g, '&amp;');
		text = text.replace(/>/g, '&gt;');
		text = text.replace(/</g, '&lt;');
		return text;
	}

	function decode(text) {
		text = text.replace(/&lt;/g, '<');
		text = text.replace(/&gt;/g, '>');
		text = text.replace(/&amp;/g, '&');
		return text;
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

	function loadUrl(url, callback, onerror) {
		var fname = (function(s){do{var x=Math.floor(Math.random()*0x1fffffffffffff)}while(window[s+x]);return s+x})('whyyoufollow_callback');

		window[fname] = function() {
			delete window[fname];
			try{
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

	//------------------------------------------------------------------------

	function getMetaInfo(key) {
		if (isNewDesign2010a) {
			if (key == 'session-loggedin') {
				return twttr.currentUserScreenName ? 'y' : null;
			}
			if (key == 'page-user-screen_name') {
				var matching = _doc.body.className.match(/\buser-style-([-0-9a-zA-Z_]+)\b/);
				return matching ? matching[1] : null;
			}
			if (key == 'session-userid') {
				var list = _doc.getElementsByTagName('link');
				for (var i=0; i<list.length; i++) {
					var matching = list[i].getAttribute('href').match(/^https?:\/\/twitter\.com\/favorites\/(\d+)\.rss$/);
					if (matching) return matching[1];
				}
				return null;
			}
			if (key == 'session-user-screen_name') {
				return twttr.currentUserScreenName;
			}
			return null;
		}
		var list = _doc.getElementsByTagName('meta');
		for (var i=0; i<list.length; i++) {
			if (list[i].getAttribute('name') == key) {
				return list[i].getAttribute('content');
			}
		}
		return null;
	}

	function getElemByClassName(candidates, className) {
		var list = candidates;
		var regexp = new RegExp('\\b' + className + '\\b', '');
		for (var i=0; i<list.length; i++) {
			if (regexp.exec(list[i].className)) {
				return list[i];
			}
		}
		return null;
	}
	
	//------------------------------------------------------------------------

	function cleanup() {
		while (true) {
			var list = _doc.getElementsByClassName(myClassName);
			for (var i=0; i<list.length; i++) {
				list[i].parentNode.removeChild(list[i]);
			}
			if (list.length == 0) break;
		}
	}

	function decode_response(response) {
		var result = {};

		for (var name in response) {
			var text = response[name];

			text = text.replace(/[+]/g, ' ');
			text = decodeURIComponent(text);

			text = encode(text);
			
			result[name] = text;
		}

		return result;
	}

	//========================================================================

	if (getMetaInfo('session-loggedin') != 'y') {
		throw 'not logged-in';
	}
	
	var myId = getMetaInfo('session-userid');
	if (! myId) {
		throw 'can not find session userid';
	}

	var myScreenName = getMetaInfo('session-user-screen_name');

	//========================================================================

	var myWindow = _doc.createElement('div');
	myWindow.innerHTML =
	  '<span id="whyyoufollow_closing">×</span>' + 
		'<form>' + 
		  '<textarea cols="60" rows="7" id="whyyoufollow_editarea"></textarea>' +
			'<input type="button" id="whyyoufollow_ok" value="OK" />' + 
			  '</form>';
	myWindow.className = myClassName;
	myWindow.style.position = 'absolute';
	myWindow.style.zIndex = '99';
	myWindow.style.backgroundImage = 'url(http://homepage2.nifty.com/seaoak/whyyoufollow/img/balloon100.png)';
	myWindow.style.backgroundRepeat = 'no-repeat';
	myWindow.style.backgroundposition = 'top left';
	myWindow.style.height = '250px';
	myWindow.style.width  = '600px';

	(function() {
		var elem = myWindow.childNodes[1].childNodes[0];	// textarea
		elem.style.position = 'absolute';
		elem.style.top      = '50px';
		elem.style.left     = '15px';
		elem.style.backgroundColor = 'transparent';
		elem.style.border   = '1px dotted #37291b';
	})();

	(function() {
		var elem = myWindow.childNodes[1].childNodes[1];	// "OK" button
		elem.style.position = 'absolute';
		elem.style.top      = '210px';
		elem.style.left     = '530px';
		elem.style.color    = '#ffffff';
		elem.style.border   = '1px dotted #37291b';
		elem.style.backgroundColor = '#37291b';
		elem.style.fontFamily = 'monospace';
		elem.addEventListener('click', function(e){
			try {
				handler_to_submit(getMetaInfo('page-user-screen_name'));
			} catch(e) {
				if (isDebug) alert('FATAL: ' + e);
			}
		}, false);
	})();
	
	(function() {
		var closeButton = myWindow.firstChild;	// "close" button
		closeButton.style.color = '#ffffff';
		closeButton.style.backgroundColor = '#993333';
		closeButton.style.border = '1px solid #cccccc';
		closeButton.style.padding = '0';
		closeButton.style.cursor = 'pointer';
		closeButton.style.position = 'absolute';
		closeButton.style.top      = '34px';
		closeButton.style.left     = '550px';
		closeButton.addEventListener('click', function(e){
			try {
				toggleMyWindow();
			}catch (e) {
				if (isDebug) alert('FATAL: ' + e);
			}
		}, false);
	})();

	(function() {
		// disable shortcut keys
		myWindow.addEventListener('keypress', function(e) {
			e.stopPropagation();
		}, false);
		myWindow.addEventListener('keydown', function(e) {
			e.stopPropagation();
		}, false);
		myWindow.addEventListener('keyup', function(e) {
			e.stopPropagation();
		}, false);
	})();

	//------------------------------------------------------------------------
	
	var toggleMyWindow = function() {
		if (myWindow.parentNode) {
			myWindow.parentNode.removeChild(myWindow);
		} else {
			var baseElem = _doc.getElementById('whyyoufollow_icon');
			
			myWindow.style.left = '50px';
			myWindow.style.top  = ((isNewDesign2010a ? 0 : 52) + (baseElem.offsetTop + baseElem.offsetHeight)) + 'px';

			baseElem.parentNode.appendChild(myWindow);

			_doc.getElementById('whyyoufollow_editarea').defaultValue =
			  decode(_doc.getElementById('whyyoufollow_text').innerHTML);

			_doc.getElementById('whyyoufollow_editarea').focus();
		}
	};

	//========================================================================
	
	function handler_to_submit(screen_name) {
		var text = _doc.getElementById('whyyoufollow_editarea').value;
		
		var handler_onload = function(res) {
			try {
				_doc.getElementById('whyyoufollow_text').innerHTML = encode(text);
				toggleMyWindow();
			} catch (e) {
				if (isDebug) alert('FATAL: ' + e);
			}
		};
		var handler_onerror = function(status) {
			if (isDebug) alert('[なぜふぉろ] すみません‥‥‥CGI との通信に失敗してしまいました。(STATUS:' + status + ')');
		};

		var screen_name = getMetaInfo('page-user-screen_name');
		var url = 'http://hpcgi2.nifty.com/seaoak/whyyoufollow/api1.cgi?user_id=' + myId + '&target_screen_name=' + screen_name + '&text=' + encodeURIComponent(text);
		loadUrl(url, handler_onload, handler_onerror);
	}

	//------------------------------------------------------------------------
	
	function handler_for_profile_page(response) {
		if (isNewDesign2010a) {
			if (twttr.loggedIn &&
				(_doc.getElementsByClassName('screen-name-and-location').length > 0) &&
				(_doc.getElementsByClassName('profile-actions').length > 0)) {
				// OK
			} else {
				// まだロード中なのでリトライ
				myYield(arguments.callee, response);
				return;
			}
			cleanup();
		}

		var table = decode_response(response);
		var screen_name = getMetaInfo('page-user-screen_name');
		var text = table[screen_name] || '';

		(function() {
			var block = _doc.createElement('div');
			block.className = myClassName;

			var p = _doc.createElement('pre');
			p.innerHTML = '\n<span id="whyyoufollow_text">' + text + '</span>\n';
			p.style.color = myColor;
			p.style.textAlign = 'left';

			var img = _doc.createElement('img');
			img.src = 'http://homepage2.nifty.com/seaoak/whyyoufollow/img/icon204_60x16.png';
			img.setAttribute('alt', 'なぜふぉろ');
			img.setAttribute('title', text ? 'コメントを修正' : 'コメントを書く');
			img.style.display = 'block';
			img.style.height = '16px';
			img.style.width = '60px';
			img.style.marginTop = 0;	//'-23px';
			img.style.marginLeft = isNewDesign2010a ? '303px' : '430px';
			img.style.cursor = 'pointer';
			img.setAttribute('id', 'whyyoufollow_icon');

			block.appendChild(p);
			block.appendChild(img);

			var parentNode = (function() {
				var className = isNewDesign2010a ? 'profile-details' : 'profile-controls';
				var list = _doc.getElementsByClassName(className);
				if (list.length != 1) throw 'unexpected ' + className;
				return list[0];
			})();
			parentNode.appendChild(block);

		})();

		_doc.getElementById('whyyoufollow_icon').addEventListener('click', function(e) {
			try {
				toggleMyWindow();
			} catch(e) {
				alert('FATAL: ' + e);
			}
		}, false);

		global_status.is_processing_now = false;
	}

	//------------------------------------------------------------------------

	function handler_for_following_page(response) {
		if (isNewDesign2010a) {
			if (twttr.loggedIn && ((_doc.getElementsByClassName('stream-end').length > 0) ||
								   (_doc.getElementsByClassName('stream-item').length > 0))) {
				// OK
			} else {
				// まだロード中なのでリトライ
				myYield(arguments.callee, response);
				return;
			}
			cleanup();
		}

		(function() {
			if (isNewDesign2010a) return;
			var formElem = _doc.createElement('form');
			formElem.setAttribute('id', 'whyyoufollow_search_form');
			formElem.appendChild((function() {
				var elem = _doc.createElement('label');
				elem.innerHTML = 'なぜふぉろ検索：';
				elem.appendChild((function() {
					var elem = _doc.createElement('input');
//					elem.setAttribute('id', 'whyyoufollow_search_field');
					elem.setAttribute('type', 'text');
					elem.style.width = '380px';
					return elem;
				})());
				elem.style.color = myColor;
				return elem;
			})());
			formElem.appendChild((function() {
				var elem = _doc.createElement('input');
				elem.setAttribute('id', 'whyyoufollow_search_button');
				elem.setAttribute('type', 'button');
				elem.setAttribute('value', '検索');
				elem.style.color = '#999999';
				elem.style.margin = '0 3px';
				elem.style.padding = '1px';
				return elem;
			})());
			formElem.style.margin = '0 auto 4px 11px';

			var brotherElem = (function() {
				if (isNewDesign2010a) throw 'not supported yet.';
				var className = 'ctrlbar';
				var list = _doc.getElementsByClassName(className);
				if (list.length != 1) throw 'unexpected ' + className;
				return list[0];
			})();

			brotherElem.parentNode.insertBefore(formElem, brotherElem);
		})();

		var table = decode_response(response);
		var targetList = (function() {
			if (isNewDesign2010a) {
				return arrayMap(function(elem) {
					var screen_name = (function() {
						var childElem = elem.firstChild;
						if (childElem.nodeName.toLowerCase() != 'div') childElem = childElem.nextSibling;
						if (childElem.nodeName.toLowerCase() != 'div') throw 'unexpected childElem';
						return childElem.getAttribute('data-screen-name');
					})();
					var list = elem.getElementsByClassName('user-description');
					if (list.length != 1) throw 'unexpected user-description';
					return [screen_name, list[0]];
				}, _doc.getElementsByClassName('stream-item'));
			} else {
				var trList = toArray(_doc.getElementById('follow_grid').getElementsByTagName('tr'));
				trList.shift();	// 先頭要素はタイトル行なのでスキップ
				return arrayMap(function(trElem) {
					var screen_name = toArray(trElem.getElementsByTagName('a'))[0].getAttribute('href').substring(19);
					var brotherElem = getElemByClassName(trElem.getElementsByTagName('span'), 'user-body').firstChild.nextSibling;
					return [screen_name, brotherElem];
				}, trList);
			}
		})();
		arrayEach(function(target) {
			var screen_name = target[0];
			var brotherElem = target[1];
			if (table[screen_name]) {
				var elem = _doc.createElement('pre');
				elem.className = myClassName;
				elem.innerHTML = table[screen_name];
				elem.style.color = myColor;
				brotherElem.parentNode.insertBefore(elem, brotherElem);
			}
		}, targetList);
		global_status.is_processing_now = false;
	}

	//========================================================================

	var regexp_following_page = new RegExp('^https?:\\/\\/twitter\\.com(\\/#!)?(\\/' + myScreenName + ')?\\/following(\\?page=\\d+)?\\/?$');
	var regexp_self_page      = new RegExp('^https?:\\/\\/twitter\\.com(\\/#!)?\\/' + myScreenName + '\\/?$');
	var regexp_profile_page   = new RegExp('^https?:\\/\\/twitter\\.com(\\/#!)?\\/[-0-9a-zA-Z_]+\\/?$');

	var handler;

	if (! location.protocol.match(/^https?:$/)) {
		// なにもしない
	} else if (location.hostname != 'twitter.com') {
		// なにもしない
	} else if (regexp_following_page.test(location)) {
		handler = handler_for_following_page;
	} else if (regexp_self_page.test(location)) {
		// なにもしない
	} else if (regexp_profile_page.test(location)) {
		handler = handler_for_profile_page;
	} else {
		// なにもしない
	}

	//========================================================================

	if (handler) {
		var url = 'http://hpcgi2.nifty.com/seaoak/whyyoufollow/api1.cgi?user_id=' + myId;
		loadUrl(url, handler);
	} else {
		global_status.is_processing_now = false;
	}

} catch(e) {
	if (isDebug) alert('FATAL: ' + e);
}
}).toString()+';with(f){f()}})()';document.body.appendChild(e)})(document.createElement('script'));
