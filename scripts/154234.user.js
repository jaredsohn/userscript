// ==UserScript==
// @name        ITnurk - functional fix - forever sjuut
// @namespace   v6.nosepicking
// @include     http://itnurk.com/sjuut*
// @include     http://*.itnurk.com/sjuut*
// @version     1
// @run-at      document-end
// @grant       none
// ==/UserScript==

(function () {

function restart_loop () {
	if (document.getElementById('refresh')) {
		document.location.reload();
	} else {
		window.setTimeout(restart_loop, 1000);
	}
}

restart_loop();

}());
