// ==UserScript==
// @name        Imgur Auto Expand
// @namespace   *
// @description Auto Expands all comments by default
// @include     http://imgur.com/gallery*
// @version     1
// ==/UserScript==

function init() {
    if (document.getElementById('expand-comments')) {
		if (document.getElementById('expand-comments').innerHTML.match('expand')) {
			var event = new MouseEvent('click');
			document.getElementById('expand-comments').dispatchEvent(event);
		}
	}
}
window.onload = init;