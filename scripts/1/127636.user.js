// ==UserScript==
// @id           org.userscripts.users.kuehlschrank.GoToNextPreviousPage
// @name         Go to next/previous page
// @description  Navigate between paginated pages using mouse wheel and keyboard
// @version      2014.3.15
// @author       kuehlschrank
// @homepage     http://userscripts.org/scripts/show/127636
// @run-at       document-start
// @updateURL    https://userscripts.org/scripts/source/127636.meta.js
// @downloadURL  https://userscripts.org/scripts/source/127636.user.js
// @include      http*
// @exclude      http*://maps.google.tld/*
// ==/UserScript==

(function() {

	'use strict';

	var ticks, lastTick, d = document, wn = window;
	d.addEventListener('onwheel' in d ? 'wheel' : 'mousewheel', onMouseScroll, false);
	d.addEventListener('keydown', onKeyDown, false);

	// unsafeWindow.kuehlschrank_GoToNextPage = next;
	// unsafeWindow.kuehlschrank_GoToPrevPage = prev;

	function onKeyDown(e) {

		if(lock()) return e.preventDefault();

		if(e.altKey || /INPUT|SELECT|TEXTAREA|CANVAS/.test(e.target.tagName)) return;

		var ctrl = e.ctrlKey, key = e.keyCode, shift = e.shiftKey, y = wn.scrollY;
		var space = key == 32, home = key == 35, end = key == 36;

		if(!shift && (space || home) && (ctrl || y >= getScrollMaxY())) {
			next() && e.preventDefault();
		} else if((shift && space || !shift && end) && (ctrl || y <= 0)) {
			prev() && e.preventDefault();
		}

	}

	function onMouseScroll(e) {

		if(lock()) return e.preventDefault();

		var d = e.deltaY || -e.wheelDelta, y = wn.scrollY;

		if(e.axis != e.VERTICAL_AXIS || d < 0 && y > 0 || d > 0 && Math.max(wn.innerHeight, y) < getScrollMaxY()) return;

		var now = Date.now();
		ticks = (now - lastTick < 150) ? ticks + 1 : 1;
		lastTick = now;

		if(ticks != 2) return;
		d > 0 ? next() : prev();

	}

	function getScrollMaxY() {

		if(typeof wn.scrollMaxY == 'number') return wn.scrollMaxY;

		var node = d.compatMode == 'BackCompat' ? d.body : d.documentElement;
		return node.scrollHeight - node.clientHeight;

	}

	function next() {

		return go('next', /^\s*(\u25BA|>|»)\s*$|^\W*((next|older)( (page|posts|entries))?|more|vorwärts|weiter|nächste\s+seite|suivant|siguiente|Далее|След)\W*$/i);

	}

	function prev() {

		return go('prev', /^\s*(\u25C4|<|«)\s*$|^\W*((prev(ious)?|newer)( (page|posts|entries))?|zurück|vorherige\s+seite|précédent|anterior|Назад|Пред)\W*$/i);

	}

	function go(rel, regexp) {

		var link = d.querySelector('*[rel~="' + rel + '"]');
		if(link) {
			if(link.href)
				location.href = link.href;
			else {
				link.click();
				lock(true);
			}
			return true;
		}

		var links = d.body.querySelectorAll('a[href]');

		for(var i = links.length; i-- && (link = links[i]);) {

			if(!regexp.test(link.textContent) && !regexp.test(link.title)) continue;

			if(link.href.indexOf(location.protocol + '//' + location.hostname) != 0) continue;

			link.click();
			lock(true);
			return true;

		}

	}

	function lock(set) {

		if(set) return lock.until = Date.now() + 300;
		if(!lock.until) return;
		if(lock.until < Date.now()) lock.until = 0;
		return lock.until;

	}

})();
