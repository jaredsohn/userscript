// ==UserScript==
// @id          org.userscripts.users.kuehlschrank.4chanFileAge
// @name        4chan: File Age
// @description Converts 4chan file names like 1276731803495.jpg to corresponding dates so you can see when the image was originally posted.
// @author      kuehlschrank
// @version     2013.12.10
// @include     http*://boards.4chan.org/*
// @updateURL   https://userscripts.org/scripts/source/94520.meta.js
// @downloadURL https://userscripts.org/scripts/source/94520.user.js
// ==/UserScript==

(function() {

	function schedule() {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(convert, 250);
	}

	function convert() {
		var now  = Date.now();
		var re   = /^(1[0-3]\d{8})\d{2,3}s?\.([a-z]{3})$/;
		var fcx  = document.documentElement.classList.contains('fourchan-x') || document.body.classList.contains('fourchan_x');
		var list = root.querySelectorAll(fcx ? 'div.fileText a' : 'div.fileText > span');
		for(var i = list.length, span; i-- && (span = list[i]);) {
			if(re.exec(span.innerHTML)) {
				var date       = new Date(parseInt(RegExp.$1) * 1000);
				span.title     = date.toLocaleString();
				span.innerHTML = 'Age: ' + age(now - date.getTime());
			}
		}
	}

	function age(millis) {
		var days = Math.floor(millis / 86400000);
		if(days > 720) {
			return Math.floor(days / 365) + ' years';
		} else if(days > 60) {
			return Math.floor(days / 30) + ' months';
		} else if(days > 21) {
			return Math.floor(days / 7) + ' weeks';
		} else if(days > 1) {
			return days + ' days';
		} else  {
			var mins = Math.floor(millis/60000);
			return mins > 120 ? Math.floor(mins / 60) + ' hours' : mins + ' minutes';
		}
	}

	var root = document.body.querySelector('div.board');
	var timeoutId = 0;
	var M = window.MutationObserver || window.WebKitMutationObserver;
	new M(schedule).observe(root, {childList:true, subtree:true});
	schedule();

})();
