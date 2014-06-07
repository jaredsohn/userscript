// ==UserScript==
// @name        Twitter: Show user's average number of tweets/day
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
			
			var pdate = new Date(Date.parse(obj.created_at));
			var cdate = new Date();
			var daystc = Math.round((cdate.getTime() - pdate.getTime()) / (1000 * 60 * 60 * 24));			
			var average = obj.statuses_count / daystc;
			var raverage = Math.round(average * 10) / 10;			
 
			newspan.innerHTML = '<br />' + screenname + ' tweets on average ' + raverage + ' times per day';

		},
		onerror: function(response) {
		GM_log("Error/GM_xmlhttpRequest");
		}
	  });