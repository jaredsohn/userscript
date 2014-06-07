// ==UserScript==
// @name         Tieba Overlay Blocker
// @namespace    http://userscripts.org/users/92143
// @version      0.3
// @description  解决百度贴吧弹出窗口造成的无法翻页等问题
// @include      /^http\:\/\/tieba\.baidu\.com\/p\/.*$/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// @run-at       document-start
// ==/UserScript==

var JS_DELAY = 200
var JS_DELAY_MAX_LOOP = 5
//for opera users
var FIRST_JS_DELAY = 1000
//for users with slow cpu or connection
var LAST_JS_DELAY = 5000
var loopCount = 1

function blockOverlay() {
	$('.l_pager').replaceWith(function() {
		return $(this).clone()})
}

setTimeout(function() {
	 blockOverlay()
}, FIRST_JS_DELAY)

$(document).ready(function() {
	var loop = setInterval(function() { 
		blockOverlay()
		
		if (++loopCount > JS_DELAY_MAX_LOOP) {
			clearInterval(loop)
		}
	}, JS_DELAY)
})

setTimeout(function() {
	blockOverlay()
}, LAST_JS_DELAY)
