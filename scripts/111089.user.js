// ==UserScript==
// @name           navigaba
// @namespace      http://wakachan.org/unyl/
// @description    switch wakaba pages using ctrl-left, ctrl-right
// @include        http://wakachan.org/*
// @include        http://*.wakachan.org/*
// @include        http://iichan.ru/*
// @include        http://*.iichan.ru/*
// @include        http://iichan.net/*
// @include        http://*.iichan.net/*
// @include        http://fgs221.appspot.com/*
// @include        http://fgs223.appspot.com/*
// @author         unylnonymous
// ==/UserScript==

function navigate(event, page) {
	var url = window.location.pathname.match(/(.*\/)/)[1]

	window.location = url + (page > 0 && (page + '.html') || '');

	event.preventDefault();
	event.stopPropagation();
}

(function() {
	var in_thread = window.location.pathname.match(/\/res\/\d+.html$/i);
	
	if (in_thread) {
		return;
	}

	document.addEventListener('keydown', function (event) {
		if (!event.ctrlKey) {
			return;
		}
		
		var page_match = window.location.pathname.match(/(\d+).html$/i);
		var page = parseInt(page_match && page_match[1] || '0');

//		console.log(event.keyCode);

		switch (event.keyCode) {
		case 39: // right
			navigate(event, page + 1);
			break;

		case 37: // left
			if (page > 0) {
				navigate(event, page - 1);
			}
			break;

		case 48: // 0
		case 49: // 1
		case 50: // 2
		case 51: // 3
		case 52: // 4
		case 53: // 5
		case 54: // 6
		case 55: // 7
		case 56: // 8
		case 57: // 9
			navigate(event, event.keyCode - 48);
			break;

		case 192: // ~
			navigate(event, 0);
			break;
		}
	}, false);
})();
