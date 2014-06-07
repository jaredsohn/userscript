// ==UserScript==
// @name		Wikipedia-Redirect-Arabic
// @namespace	http://ar.wikipedia.org
// @version		0.2
// @description	تحويل الوصلات إلى ويكبيديا العربية
// @include		http://*.wikipedia.org/*
// @exclude		http://ar.wikipedia.org/*
// ==/UserScript==

;(function () {

	var getArabicTitle = function (str) {
		var matches = str.match(/"interwiki-ar"><a href="\/\/ar\.wikipedia\.org\/wiki\/(\S*)"/i);
		if (matches && matches.length == 2) {
			return RegExp.$1;
		}
		return null;
	}

	var mouseOverHandler = function (event) {
		var target = event.target;
		var reqObj = new Object();
		reqObj.method = 'GET';
		reqObj.url = target.href;
		reqObj.onload = function (responseDetails) {
			var title = getArabicTitle(responseDetails.responseText);
			if (!title) {
				return;
			} 
			target.href = 'http://ar.wikipedia.org/wiki/' + title;
			target.style.backgroundColor = '#DDD';
		}
		GM_xmlhttpRequest(reqObj);
	}

	var addListeners = function () {
		if (window.parent != window) {
			return;
		}
		var bodyContent = document.getElementById('bodyContent');
		var links = bodyContent.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			links[i].addEventListener('mouseover', mouseOverHandler, false);
		}
	}

	setTimeout(function () {
		addListeners();
	}, 60);

})();