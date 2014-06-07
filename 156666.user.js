// ==UserScript==
// @name        Twitter Join Date
// @version     1.1
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
//		url: "https://api.twitter.com/1.1/users/show.json?screen_name=" + screenname, ////
//		url: "http://api.twitter.com/1/users/show.xml?screen_name=" + screenname, ////
		headers: {
		"User-Agent": "Mozilla/5.0",
		},
		onload: function(response) {
			obj = JSON.parse(response.responseText);
			newspan.innerHTML = "<br />Follow @ivansyba Join Date: " +  obj.created_at;
		},
		onerror: function(response) {
		GM_log("Error/GM_xmlhttpRequest");
		}
	  });