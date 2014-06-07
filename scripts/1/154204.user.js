// ==UserScript==
// @name        Twitter: User Stats Box
// @version     2.0
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// ==/UserScript==

	var screenname = document.getElementsByClassName('profile-card-inner')[0].getAttribute('data-screen-name');
 	var userid = document.getElementsByClassName('profile-card-inner')[0].getAttribute('data-user-id');
	var datap = document.getElementsByClassName('user-actions')[0].getAttribute('data-protected');
	var fullname = document.getElementsByClassName('user-actions')[0].getAttribute('data-name');
	
	GM_addStyle(".profile-header-inner-overlay {display: none !important;}");
	
	var target = document.evaluate('//div[@class="flex-module profile-banner-footer clearfix"]', document, null, 9, null).singleNodeValue;
	var newp = target.appendChild(document.createElement('div'));
	var stats_textarea = newp.appendChild(document.createElement('textarea'));
		stats_textarea.setAttribute('id', 'stats_textarea');
		stats_textarea.setAttribute('style', 'width: 367px; height: 176px;');
		stats_textarea.setAttribute('readonly', 'true');
		stats_textarea.addEventListener('click',this.selectallf,false);
		
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1; var day = currentTime.getDate(); var year = currentTime.getFullYear();
	 
	  GM_xmlhttpRequest({
		method: "GET",
		url: "https://api.twitter.com/1/users/show.json?screen_name=" + screenname, ////
		headers: {
		"User-Agent": "Mozilla/5.0",
		},
		onload: function(response) {
		// GM_log(response.responseHeaders);
		// GM_log(response.responseText);
		
 			obj = JSON.parse(response.responseText);
			
			var pdate = new Date(Date.parse(obj.created_at));
			var cdate = new Date();
			var daystc = Math.round((cdate.getTime() - pdate.getTime()) / (1000 * 60 * 60 * 24));
			
			var average = obj.statuses_count / daystc;
			var raverage = Math.round(average * 10) / 10;
			
			stats_textarea.innerHTML = "[Profile Stats as of: " +year+"/"+month+"/"+day+"]\nScreename: " + screenname + "\nFull Name: " + fullname + "\nUser ID: " + userid + "\nJoined Twitter: " +  obj.created_at + "\nJoined Since: " +  daystc + " days\nNumber of Tweets: " + obj.statuses_count + "\nTweets on average: " +  raverage + " times per day\nNumber of Following: " +  obj.friends_count + "\nNumber of Followers: " +  obj.followers_count + "\nUser is member of: " + obj.listed_count + " lists\nUser has: " +  obj.favourites_count + " favorite tweets\nURL: " + obj.url + "\nLocation: " + obj.location + "\nTimezone: " + obj.time_zone + " (UTC offset " + obj.utc_offset +  ")\nGeo Enabled: " + obj.geo_enabled + "\nVerified: " + obj.verified + "\nDescription: " + obj.description + "\nData Protected: " + datap + "\nLanguage: " + obj.lang;
		},
		onerror: function(response) {
		GM_log("Error/GM_xmlhttpRequest");
		}
	  });
	   
	  
	  function selectallf(){
		try {
			GM_setClipboard(this.value);
			GM_notification('User Twitter Stats copied to clipboard!');
		} finally {
			this.select();
		}
	}