// ==UserScript==
// @name        Twitter: Show user's registration date
// @version     1.0
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// ==/UserScript==

	var screenname = document.getElementsByClassName('profile-card-inner')[0].getAttribute('data-screen-name');
	var target = document.evaluate('//h2[@class="username"]', document, null, 9, null).singleNodeValue;
	var newspan = target.appendChild(document.createElement('span'));
		
		newspan.setAttribute('id', 'newspan');
		newspan.setAttribute('style', 'font-size: 12px !important;');
		
	  GM_xmlhttpRequest({
		method: "GET",
		url: "https://api.twitter.com/1/users/show.json?screen_name=" + screenname, ////
		headers: {
		"User-Agent": "Mozilla/5.0",
		},
		onload: function(response) {
		  //GM_log(response.responseHeaders);
		  //GM_log(response.responseText);
			obj = JSON.parse(response.responseText);
			newspan.innerHTML = "<br />Joined Twitter: " +  obj.created_at;
		},
		onerror: function(response) {
		GM_log("Error/GM_xmlhttpRequest");
		}
	  });