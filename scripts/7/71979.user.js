// ==UserScript==
// @name            AutoPagerize for Pick
// @namespace       http://pick.naver.jp/
// @description     Simple AutoPagerize for Pick.Naver
// @include         http://naver.jp/*
// @include         http://pick.naver.jp/*
// @resource script http://userscripts.org/scripts/source/71979.user.js?v0.4
// @author          YungSang
// @version         0.4
// ==/UserScript==
// 0.1 : 2010/03/20 : First release
// 0.2 : 2010/03/20 : Added checking the last page
// 0.3 : 2010/03/21 : Added a status indicator and a click event on it to toggle on/off
// 0.4 : 2010/03/22 : added target="_blank" into anchors

(function(window) {
	if ((typeof chrome != 'undefined') || (typeof unsafeWindow != 'undefined')) {
		var document = (window || unsafeWindow).document;
		if (!document.getElementById('userscript_71979')) {
			var script  = document.createElement('script');
			script.id   = 'userscript_71979';
			script.type = 'text/javascript';
			if (typeof chrome != 'undefined') {
				script.src = chrome.extension.getURL('script.js');
			}
			else {
				script.src = GM_getResourceURL('script');
			}
			document.body.appendChild(script);
			return;
		}
	}

log('start');

	var _welBtn = $Element($$.getSingle('div.moreLinkWrapper'));
	if (!_welBtn) return;

log('found');

	var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
	var BASE_REMAIN_HEIGHT = 200;

	var document = window.document;
	var docRoot = /BackCompat/.test(document.compatMode) ? document.body : document.documentElement;

	var scrollHeight = docRoot.scrollHeight;
	var bottom = Math.round(scrollHeight * 0.8);
	this.remainHeight = scrollHeight - bottom + BASE_REMAIN_HEIGHT;

	// append space to show scrollbar surely.
	var pageHeight = window.opera ? document.documentElement.clientHeight : document.body.offsetHeight;
	if (window.innerHeight >= pageHeight) {
		document.body.appendChild(document.createElementNS(HTML_NAMESPACE, 'div')).setAttribute('style','position:absolute;bottom:-1px;height:1px;width:1px;');
	}

	var a = document.createElement('a');
	a.setAttribute('id', 'autopagerize_color');
	a.setAttribute('style', 'display:block;position:fixed;top:5px;right:5px;width:1em;height:1em;background-color:#0f0;text-decoration:none;z-index:10000;');
	a.innerHTML = '&nbsp;';
	a.href = 'javascript:void(0)';

	var status = true;
	a.addEventListener('click', function() {
		if (status) {
			this.style.backgroundColor = '#ccc';
			$onScroll.detach(window, 'scroll');
		}
		else {
			this.style.backgroundColor = '#0f0';
			$onScroll.attach(window, 'scroll');
		}
		status = !status;
	}, false);

	document.body.appendChild(a)

	var $onScroll = $Fn(onScroll, window).attach(window, 'scroll');

	var wait = false;
	function onScroll(event) {
		if (!wait && !checkRemain(event)) {
			wait = true;
			var self = this;
			setTimeout(function(){
				checkRemain(event);
				wait = false;
			},500);
		}
	}

	function checkRemain(event) {
		var remain = docRoot.scrollHeight - window.innerHeight - window.pageYOffset;
		if (remain < remainHeight) {
			if (!_welBtn.visible()) {
				$onScroll.detach(window, 'scroll');
				document.body.removeChild(a);
				return false;
			}
			event.element = _welBtn.$value();
			nj.mymain.ListManager._onRequest(event);
			return true;
		}
		return false;
	}

	var org_append = nj.mymain.ListManager._append;
	nj.mymain.ListManager._append = function() {
		var el = arguments[0];
		var aAnchors = $$('a[@target!="_blank"]', el);
		for (var i = 0, len = aAnchors.length ; i < len ; i++) {
			var anchor = aAnchors[i];
			if (!/^#|^javascript:/.test(anchor.href)) {
				anchor.target = "_blank";
			}
		}
		org_append.apply(this, arguments);
	};

//--============================================================================
//-- Logger
//--============================================================================
	function log(str) {
//		if ((typeof console != 'undefined') && (typeof console.log == 'function')) console.log(str);
	}
})(window);