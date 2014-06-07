// ==UserScript==
// @name         Loginless Youtube
// @namespace    http://userscripts.org/users/92143
// @version      0.4
// @description  Skips age verification of youtube.com without login. 
// @include      /^http\:\/\/([^\.]+\.)?youtube\.com/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

var u = location.href
if(-1 !== u.indexOf('/verify_controversy?')) {
	location.replace(u + '&action_confirm=1')
}

document.addEventListener('DOMContentLoaded', function() {
	if(document.querySelector('#watch7-player-age-gate-content, #verify-actions')) {
		GM_xmlhttpRequest({
			method: 'GET', 
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
			}, 
			url: decodeURIComponent(u).replace(/\/verify\_age\?next\_url\=\/watch\?v\=/, '/watch?v='), 
			onload: function(response) {
				var t = response.responseText
				var s = document.createElement('script')
				s.innerHTML = ";(function() {\n" + 
				"var newDocument = document.open('text/html', 'replace')\n" + 
				"newDocument.write(\'" + 
				t.replace(/\\/g, '\\\\').replace(/\'/g, "\\'").replace(/\n/g, '\\\n') + 
				"\')\n" + 
				"newDocument.close()\n" + 
				'})()'
				document.body.appendChild(s)
			}
		})
	}
}, false)
