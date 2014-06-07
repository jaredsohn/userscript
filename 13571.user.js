// (c) Copyright 2007, 2008 Rod Knowlton. All Rights Reserved. 
// ==UserScript==
// @name           Tumblr v3 Show Follower Count
// @namespace      http://toldorknown.com/tumblr
// @description    Shows and links to Followers instead of Followed in Tumblr v3 Dashboard
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/show/*
// ==/UserScript==



var followers_regex = /(\d+)\s+people following/;
var dashboardControls = document.getElementById('dashboard_controls');

GM_xmlhttpRequest({
	method: 'GET',
	url: "http://www.tumblr.com/followers",
	onload: function(response){
		if (response.status != 200){
			return;
		}

		var match_result = response.responseText.match(followers_regex);
		if (match_result){
			var follower_count = match_result[1];
			dashboardControls.getElementsByTagName('a')[4].href = "/followers";
			dashboardControls.getElementsByTagName('a')[5].href = "/followers";
			dashboardControls.getElementsByTagName('a')[5].innerHTML = follower_count + " Followers";
		}
	}
});