// ==UserScript==
// @name			imgur limit bytes
// @description		Change link to smaller image if image size is too large
// @version			1.0
// @include			http://*.reddit.com/*
// ==/UserScript==

var maxBytes = 375000;
var newSuffix = "h";

var linkList = document.getElementsByTagName('a');
for (var i = 0; i < linkList.length; i++) {
	var link = linkList[i];
	if (link.host.indexOf("imgur.com")!=-1) {
		//unsafeWindow.console.log(link);
		var hash = link.href.match(/com\/([A-Za-z0-9]{4,6})/)[1];
		if(hash.substr(-1) != /[h|l|m|t|b|s]/) {
			img_cr(hash,link);
		}
	}
}

function img_cr(imghash,imglink) { //image check and replace
	GM_xmlhttpRequest({
		method: 'GET',
		'url': 'http://imgur.com/api/stats/'+hash+'.json',
		'headers': {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/json,text/json'
		},
		onload: function(response_details) {
			var data = JSON.parse(response_details.responseText);
			if (data['stats']) {
				var bytes = data['stats']['size'];
				if (bytes > maxBytes) {
					unsafeWindow.console.log(imglink);
					imglink.href = imglink.href.replace(imghash,imghash+newSuffix);
					unsafeWindow.console.log(imglink);
				}
			}
		}
	});
}