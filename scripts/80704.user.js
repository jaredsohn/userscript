// ==UserScript==
// @name           Hide Install Google Chrome
// @namespace      http://diveintogreasemonkey.org/download/
// @include        http://www.google.*/
// @include        https://www.google.*/
// @version        0.1.1
// ==/UserScript==

(function () {
	hide(document.getElementById('pmocntr'));
})();

function hide(e) {
	if (e != null) {
		if (e.style != undefined)
			e.style.display = 'none';
	}
}