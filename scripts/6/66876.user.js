// ==UserScript==
// @name           AddFooterIntoTweet
// @namespace      http://seaoak.cocolog-nifty.com/
// @description    add specified footer into message box on Twitter homepage.
// @version        1.0.3.1
// @include        http://twitter.com
// @include        http://twitter.com/
// @include        http://twitter.com/#
// @include        https://twitter.com
// @include        https://twitter.com/
// @include        https://twitter.com/#
// ==/UserScript==

(function(e){e.text='(function(){var f='+(function(){ try {

	var isDebug = false;

	var self = arguments.callee;

	var isNewDesign2010a = (window.twttr && window.twttr.currentUserScreenName) ? true : false;

	//========================================================================
	var key = 'AddFooterIntoTweet';
	var dummyText = '(not specified)';

	function getData() {
		return localStorage.getItem(key);
	}

	function setData(value) {
		localStorage.setItem(key, value);
		return value;
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

	//------------------------------------------------------------------------

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
		}, 1000);
	}

	function getMetaInfo(key) {
		var list = document.getElementsByTagName('meta');
		for (var i=0; i<list.length; i++) {
			if (list[i].getAttribute('name') == key) {
				return list[i].getAttribute('content');
			}
		}
		return null;
	}

	//========================================================================
	if (! location.href.match(/^https?:\/\/twitter\.com(\/#?)?$/)) return;

	var isLoggedIn = isNewDesign2010a ? twttr.currentUserScreenName : (getMetaInfo('session-loggedin') == 'y');
	if (! isLoggedIn) return;

	if (isNewDesign2010a && (document.getElementsByClassName('twitter-anywhere-tweet-box-editor').length == 0)) {
		// ページのロードがまだ終わってないので、リトライ
		myYield(self);
		return;
	}

	var msgbox = (function() {
		if (isNewDesign2010a) {
			var list = document.getElementsByClassName('twitter-anywhere-tweet-box-editor');
			if (list.length != 1) throw 'unexpected twitter-anywhere-tweet-box-editor';
			return list[0];
		} else {
			var elem = document.getElementById('status');
			if (! elem) throw 'msgbox is not found.';
			return elem;
		}
	})();
	var form = (function() {
		if (isNewDesign2010a) {
			var list = document.getElementsByClassName('tweet-box');
			if (list.length != 1) throw 'unexpected tweet-box';
			return list[0];
		} else {
			var elem = document.getElementById('status_update_form');
			if (! elem) throw 'form is not found.';
			return elem;
		}
	})();

	(function() {
		var elem = document.createElement('p');
		elem.innerHTML = 'Footer: <span id="TextOfAddFooterIntoTweet">' +
		  encode(getData() || dummyText) +
		  '</span>' +
		  '<a id="changeOfAddFooterIntoTweet" style="margin-left:1em; color:blue" href="javascript: return false">[change]</span>' +
		  '<a id="addOfAddFooterIntoTweet" style="margin-left:1em; color:blue" href="javascript: return false">[add]</span>';
		form.appendChild(elem);
	})();

	var textElem = document.getElementById('TextOfAddFooterIntoTweet');
	var changeElem = document.getElementById('changeOfAddFooterIntoTweet');
	var addElem = document.getElementById('addOfAddFooterIntoTweet');

	changeElem.addEventListener('click', function(e) {
		var ans = prompt('Please input new footer text:', getData() || '');
		var text = (ans === null) ? getData() : ans;
		setData(text);
		textElem.innerHTML = encode(text || dummyText);
	}, true);

	addElem.addEventListener('click', function(e) {
		if (getData()) {
			msgbox.value += ' ' + getData();
		}
	}, true);

} catch(e) {
	if (isDebug) alert('FATAL: ' + e);
}
}).toString()+';with(f){f()}})()';document.body.appendChild(e)})(document.createElement('script'));
