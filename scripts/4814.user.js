// ==UserScript==
// @name          Homepage Auto-updater
// @namespace     Copyright Cody R. Persinger 2006
// @description   Ajax module for pulling up and implimenting homepage content automatically
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @exclude       http://*myspace.com/*comment*
// ==/UserScript==

function getupdate() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://home.myspace.com/index.cfm?fuseaction=user',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'text/xml',
		},
		onload: function(responseDetails) {

			// Update Message/Friend Request/etc indicators
			var html = responseDetails.responseText.replace(/\r/g,'');
			RegExp.lastIndex=0;
			var r=/id="(\w+)" class="show/g;
			while((a=r.exec(html))!=null) {
				for(var i=1;i<a.length;i++){
					document.getElementById(a[i]).style.display = "block";
				}
			}
			RegExp.lastIndex=0;
			var r=/id="(\w+)" class="hide/g;
			while((a=r.exec(html))!=null) {
				for(var i=1;i<a.length;i++){
					document.getElementById(a[i]).style.display = "none";
				}
			}
		}
	});
	setTimeout(getupdate, 15000);
}

getupdate();