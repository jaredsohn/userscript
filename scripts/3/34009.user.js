// ==UserScript==
// @name           Twitter Auto Refresh
// @namespace      http://www.sukechan.net/
// @description    Twitter Page is updated automatically.
// @include        http://twitter.com/*
// @version        1.0.4
// ==/UserScript==

(function() {
	var INTERVAL_SECONDS = 60;
	
	function hasClass(elm, name) {
		return ((' ' + elm.className + ' ').indexOf(' ' + name + ' ') != -1);
	}
	
	function refresh() {
		var tab = null;
		var home = document.getElementById('home_tab');
		var replies = document.getElementById('replies_tab');
		var direct_messages = document.getElementById('direct_messages_tab');
		if(home && hasClass(home, 'active')) {
			tab = home.firstChild;
		} else if(replies && hasClass(replies, 'active')) {
			tab = replies.firstChild;
		} else if(direct_messages && hasClass(direct_messages, 'active')) {
			tab = direct_messages.firstChild;
		}
		
		if(tab) {
			var event = document.createEvent('MouseEvents');
			event.initEvent('click', true, true);
			tab.dispatchEvent(event);
		}
	}
	
	setInterval(refresh, INTERVAL_SECONDS * 1000);
	
	var frm = document.getElementById('status_update_form');
	if(frm) {
		frm.addEventListener('submit', function() { setTimeout(refresh, 3000); }, false);
	}
})();