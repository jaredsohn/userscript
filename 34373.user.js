// ==UserScript==
// @name		WikipediaTrans-ko
// @namespace	http://ko.wikipedia.org
// @version		0.2
// @description	WikipediaTrans-ko
// @include		http://*.wikipedia.org/*
// @exclude		http://ko.wikipedia.org/*
// ==/UserScript==

;(function () {

	var getKoreanTitle = function (str) {
		var matches = str.match(/"interwiki-ko"><a href="\/\/ko\.wikipedia\.org\/wiki\/(\S*)"/i);
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
			var title = getKoreanTitle(responseDetails.responseText);
			if (!title) {
				return;
			} 
			target.href = 'http://ko.wikipedia.org/wiki/' + title;
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