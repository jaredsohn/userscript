// ==UserScript==
// @name           whenyoufollow
// @namespace      http://seaoak.cocolog-nifty.com/
// @description    Add timestamp into "following" page on Twitter
// @version        1.1.0.0
// @include        http://twitter.com
// @include        https://twitter.com
// @include        http://twitter.com/#!/
// @include        https://twitter.com/#!/
// @include        http://twitter.com/#!/*
// @include        https://twitter.com/#!/*
// ==/UserScript==
//
//                                                 copyright Seaoak, 2010-2012
//                                                            http://seaoak.jp
//
//  - This program is provided under the MIT License (the X11 License)
//
(function(e){e.text='(function(){var f='+(function(){ function whenyoufollowMain(myFlags) { try {

	var _win = window;
	var _doc = document;

	var myColor = '#999933';
	var myClassName = 'inserted-by-whenyoufollow';

	//========================================================================

	if (! window.location.protocol.match(/^https?:$/)) throw 'ERROR: unexpected execution';
	if (window.location.host !== 'twitter.com') throw 'ERROR: unexpected execution';

	if (! window.twttr) {
		if (myFlags) window.location.reload(true);	// reset
		myYield();
		return;
	}

	if (! window.twttr.loggedIn) {
		if (myFlags) window.location.reload(true);	// reset
		// myYield() is not necessary bacause the "loggedIn" property is already determined.
		return;
	}

	if (! window.twttr.currentUser) {
		if (myFlags) window.location.reload(true);	// reset
		myYield();
		return;
	}

	if (! window.twttr.currentUser.id) throw 'ERROR: window.twttr.currentUser.id is not found';
	if (! window.twttr.currentUser.screenName) throw 'ERROR: window.twttr.currentUser.screenName is not found';

	if (! myFlags) {
		// first call
		myFlags = {
			userId:			window.twttr.currentUser.id,
			screenName:		window.twttr.currentUser.screenName,
		};
		window.addEventListener('hashchange', function() {
			myYield();
		}, false);
	}

	if (myFlags.fatal) return;
	if (window.twttr.currentUser.id !== myFlags.userId) window.location.reload(true);	// reset

//	if (myFlags.isCalling) console.log('DEBUG5: myYield() ignored: ' + myFlags.isCalling);
	delete myFlags.isCalling;

	//========================================================================
	
	function arrayEach(func, list) {
		if (! func) throw 'arrayEach(): invalid argument';
		if (! list) throw 'arrayEach(): invalid argument';
		if (list.length === undefined) throw 'arrayEach(): invalid argument';

		var targets = toArray(list);
		for (var i=0; i<targets.length; i++) {
			func(targets[i]);
		}
	}

	function arrayMap(func, list) {
		if (! func) throw 'arrayMap(): invalid argument';
		if (! list) throw 'arrayMap(): invalid argument';
		if (list.length === undefined) throw 'arrayMap(): invalid argument';

		var targets = toArray(list);
		var result = [];
		for (var i=0; i<targets.length; i++) {
			result.push(func(targets[i]));
		}
		return result;
	}

	function toArray(list) {
		if (! list) throw 'toArray(): invalid argument';
		if (list.length === undefined) throw 'toArray(): invalid argument';

		var length = list.length;	// cache
		var result = [];
		for (var i=0; i<length; i++) {
			result.push(list[i]);
		}
		return result;
	}

	function myYield() {
		var args = [myFlags];
		var func = whenyoufollowMain;
		if (myFlags) {
			if (myFlags.isCalling) {
				myFlags.isCalling++;
				return;
			}
			myFlags.isCalling = 1;
		}
		setTimeout(function() {
			func.apply(null, args);
		}, 100);
	}

	function loadUrl(url, callback) {
		var fname = (function(s){do{var x=Math.floor(Math.random()*0x1fffffffffffff)}while(window[s+x]);return s+x})('whenyoufollow_callback');

		if (url.indexOf('?') == -1) {
			url += '?';
		}
		if (url.indexOf('=') != -1) {
			url += '&';
		}
		url += 'callback=' + fname;

		var elem = document.createElement('script');
		elem.setAttribute('id', fname);
		elem.setAttribute('type', 'text/javascript');
		elem.setAttribute('src', url);

		function loadUrlHandler(response) {
			delete window[fname];
			elem.parentNode.removeChild(elem);
			callback(response);
		}

		window[fname] = loadUrlHandler;

		document.body.appendChild(elem);

		return fname;
	}

	//------------------------------------------------------------------------

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
	
	//========================================================================

	function cleanup() {
		while (true) {
			var list = _doc.getElementsByClassName(myClassName);
			for (var i=0; i<list.length; i++) {
				list[i].parentNode.removeChild(list[i]);
			}
			if (list.length == 0) break;
		}
	}

	//------------------------------------------------------------------------

	function handler_for_following_page(table) {
		if (true) {
			if (twttr.loggedIn && ((_doc.getElementsByClassName('stream-end').length > 0) ||
								   (_doc.getElementsByClassName('stream-item').length > 0))) {
				// OK
			} else {
				// now loading, retry
				myYield();
				return;
			}
			cleanup();
			var targets = _doc.getElementsByClassName('stream-item');
			for (var i=0; i<targets.length; i++) {
				if (targets[i].getAttribute('data-item-type') != 'user') continue;
				var target = targets[i].firstChild;
				if (target.nodeName.toLowerCase() != 'div') target = target.nextSibling
				if (! target) throw 'unexpected DOM structure (001)';
				if (target.nodeName.toLowerCase() != 'div') throw 'unexpected DOM structure (002)';
				var id = target.getAttribute('data-user-id');
				if (! id) throw 'unexpected DOM structure (003)';
				if (! id.match(/^\d+$/)) throw 'unexpected user_id';
				if (table[id]) {
					var newElem = _doc.createElement('pre');
					newElem.innerHTML = 'You have followed since ' + table[id].slice(0, 10) + '.';
					newElem.className = myClassName;
					newElem.style.color = myColor;
					var brotherElem = getElemByClassName(target.getElementsByTagName('div'), 'user-description');
					if (! brotherElem) throw 'unexpected HTML structure';
					brotherElem.parentNode.insertBefore(newElem, brotherElem);
				}
			}
			return;
		}
	}

	//------------------------------------------------------------------------

	function handler_for_profile_page(table) {
		if (true) {
			if (twttr.loggedIn &&
				(_doc.getElementsByClassName('screen-name-and-location').length > 0) &&
				(_doc.getElementsByClassName('profile-actions').length > 0)) {
				// OK
			} else {
				// now loading, retry
				myYield();
				return;
			}
			cleanup();
			var id = (function() {
				var list = _doc.getElementsByClassName('profile-actions');
				if (list.length != 1) throw 'unexpected profile-actions';
				var str = list[0].className;
				var matching = str.match(/\bprofile-actions-(\d+)\b/);
				if (! matching) throw 'unexpected id';
				return matching[1];
			})();
			if (table[id]) {
				var parentNode = (function() {
					var list = _doc.getElementsByClassName('profile-details');
					if (list.length != 1) throw 'unexpected profile-details';
					return list[0];
				})();
				var newElem = _doc.createElement('pre');
				newElem.innerHTML = 'You have followed since ' + table[id].slice(0, 10) + '.';
				newElem.className = myClassName;
				newElem.style.color = myColor;
				parentNode.appendChild(newElem);
			}
			return;
		}
	}

	//========================================================================

	function insertTimestamp(target) {
		if (target.getElementsByClassName(myClassName).length > 0) return;

		var userId = target.getAttribute('data-user-id');
		if (! userId) throw 'ERROR: can not get data-user-id';

		var screenName = target.getAttribute('data-screen-name');
		if (! screenName) throw 'ERROR: can not get data-screen-name';

		var timestamp = myFlags.response[userId];
//		console.log('DEBUG1: ' + userId + ' ' + screenName + (timestamp ? (' ' + timestamp) : ''));
		if (! timestamp) return;

		var elem = target.ownerDocument.createElement('p');
		elem.innerHTML = 'You have followed since ' + timestamp.slice(0, 10) + '.';
		elem.className = myClassName;
		elem.style.color = myColor;

		var brotherCandidates = target.getElementsByClassName('bio');
		if (brotherCandidates.length !== 1) throw 'ERROR: unexpected DOM structure';

		brotherCandidates[0].parentNode.appendChild(elem);
	}

	function processAccount(target) {
//		console.log('DEBUG2: ' + target.className);
		insertTimestamp(target);
	}

	function processProfileCard(target) {
//		console.log('DEBUG3: ' + target.className);
		insertTimestamp(target);
	}

	//========================================================================

	function whenyoufollowHandler(response) {
		if (! response) throw 'ERROR: invalid response';
		if (document.getElementById(myFlags.callbackId)) throw 'ERROR: callbackId should not exist';
		myFlags.response = response;
		myYield();
	}

	//========================================================================

	if (! myFlags.callbackId) {
		var url = 'http://seaoak.la.coocan.jp/whenyoufollow/get_json.cgi?user_id=' + myFlags.userId;
		myFlags.callbackId = loadUrl(url, whenyoufollowHandler);
		return;
	}

	if (! myFlags.response) {
		// myYield() is not necessary because the callback of loadUrl() will be called.
		return;
	}

	(function(targets) {
		arrayEach(processAccount, targets);
	})(document.getElementsByClassName('account'));

	(function(targets) {
		if (targets.length > 1) throw 'ERROR: multiple profile-card';
		arrayEach(processProfileCard, targets);
	})(document.getElementsByClassName('profile-card-inner'));

	(function(parentCandidates) {
		if (myFlags.handlerForSubtreeModified) return;

		if (parentCandidates.length === 0) return;
		if (parentCandidates.length > 1) throw 'ERROR: unexpected DOM structure';
		var parent = parentCandidates[0];

		function handlerForSubtreeModified(event) {
//			console.log('DEBUG4: DOMSubtreeModified is fired');
			if (! parent.ownerDocument) throw 'ERROR: target of DOMSubtreeModified is null';
			if (! parent.firstChild) return;
			if (parent.firstChild.getAttribute('data-item-type') !== 'user') return;
			myYield();
		}

		myFlags.handlerForSubtreeModified = parent.addEventListener('DOMSubtreeModified', handlerForSubtreeModified, false);
	})(document.getElementsByClassName('stream-items'));

} catch (e) {
	if (myFlags) myFlags.fatal = true;
	throw e;
}} whenyoufollowMain(); }).toString()+';with(f){f()}})()';document.body.appendChild(e)})(document.createElement('script'));
