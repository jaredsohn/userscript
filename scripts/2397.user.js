// ==UserScript==
// @name           HuSi Improved Personal Message Interface
// @namespace      http://tps12.50webs.com
// @description    More convenient access to HuSi's PM features.
// @include        *hulver.com/scoop/*
// ==/UserScript==

(function() {

	if (/^http:\/\/[^.]*\.hulver\.com\/scoop\//.exec(location.href)) {

		var online; // used to save "Who's Online?" link

		// add PM hyperlinks after each uid link
		var as = document.getElementsByTagName('a');
		for(var i = 0; i < as.length; i++)
			if(as[i].getAttribute('href') == '/scoop/whos_online') {
				// redirect link to inbox
				online = as[i];
				online.setAttribute('href', '/scoop/pm_inbox/');
				online.firstChild.data = 'Messages';
			}
			else if(/^\/scoop\/user\/uid\:[0-9]+$/.exec(as[i].getAttribute('href'))) {
				var newa = as[i].cloneNode(true);
				newa.setAttribute('href', newa.getAttribute('href').replace('user/uid:', 'pm_send?to_uid='));
				newa.firstChild.data = 'PM';
				var parent = as[i].parentNode;
				var rspace = document.createTextNode(') ');
				parent.insertBefore(rspace, as[i].nextSibling);
				parent.insertBefore(newa, rspace);
				var lspace = document.createTextNode(' (');
				parent.insertBefore(lspace, newa);
				i++;
			}

		// peek at inbox and count new messages
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.hulver.com/scoop/pm_inbox/',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html'
			},
			onload: function(responseDetails) {
				// count unread messages
				var matches = /<tr id='msg_unread'>/.exec(responseDetails.responseText);
				var count = matches ? ' (' + matches.length + ')' : '';

				// append new message count
				online.firstChild.data = online.text + count;
			}
		});

	}

})();