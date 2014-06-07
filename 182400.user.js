// ==UserScript==
// @name         Good Gateway
// @namespace    http://userscripts.org/users/92143
// @version      0.2
// @description  Reloads upon 502 Bad Gateway for userscripts.org and the like.
// @include      /^https?\:\/\/([^\.]+\.)?userscripts.org/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// @run-at       document-end
// ==/UserScript==

//do not run in frames or iframes
if (window.top == window.self && '502 Bad Gateway' == document.title) {
		setTimeout(function() {
			location.reload(true)
		}, 1000 + 1000 * Math.random())
}
