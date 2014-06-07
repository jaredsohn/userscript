// ==UserScript==
// @name          Quake Live Online Notification
// @namespace     http://www.simplesolutionweb.com/ql
// @description   Used in conjuction with the Quake Live Online Notification Facebook App
// @include       http://www.quakelive.com*
// ==/UserScript==

// Quake Live Online Notification
// version 0.1
// 2009-11-23
// Copyright (c) 2010, Josh Merritt
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html


window.setTimeout(function() {

var match_id = 0;
function JoinServer(e) {
	match_id = e.public_id;
	oldJoinServer(e);
}


function sendMatchId() {
	if (match_id) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://www.simplesolutionweb.com/ql/?match=" + match_id,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: function(responseDetails) {
		
				if (responseDetails.status == 200) {

				} else { //Didn't load properly

				}
			}
		});
		match_id = 0;
	}
}

window.setInterval(sendMatchId, 1000);

var oldJoinServer = unsafeWindow.quakelive.matchtip.JoinServer;
unsafeWindow.quakelive.matchtip.JoinServer = JoinServer;

}, 50);
