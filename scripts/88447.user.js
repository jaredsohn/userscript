// ==UserScript==
// @name           Arrow Key Guard
// @namespace      zimzat.com
// @description    Stops pages from hijacking arrow key navigation functionality of the browser.
// @include        *
// ==/UserScript==

/* Copyright (c) 2010 Zimzat
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 2.5 License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/ or send
 * a letter to Creative Commons, 543 Howard Street, 5th Floor, San Francisco, California, 94105, USA.
 */

(function() {
	function arrowKeyGuard(event) {
		if (event.altKey == true
			|| event.ctrlKey == true
			|| event.shiftKey == true
			|| event.keyCode > 40
			|| event.keyCode < 37
			|| event.target.tagName == 'TEXTAREA'
			|| event.target.tagName == 'INPUT'
			|| event.target.tagName == 'SELECT'
			|| event.target.tagName == 'OPTION'
		)
		{
			return;
		}

		event.cancelBubble = true;
		event.stopPropagation();
		// We're not doing preventDefault() because we still want the browser doing its thing.
		// That's the entire point of this script.
		
		return false;
	}

	window.addEventListener('keypress', arrowKeyGuard, true);
	window.addEventListener('keydown', arrowKeyGuard, true);
})();
