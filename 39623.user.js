// ==UserScript==
// @name           Twitter Show Followers
// @namespace      http://www.3greeneggs.com
// @description    Places a small icon over the pictures of people who follow you back on your Twitter home page.
// @include        http://twitter.com/home*
// ==/UserScript==

var i;
var interval;
var current_updates;

window.addEventListener("load", function(e) { // so that we don't manipulate the document before it's loaded

	current_updates = document.getElementById('timeline');
	following_regexp = new RegExp('/direct_messages/create/',"im"); // the test for whether someone follows you or not

  if (current_updates.hasChildNodes()) { // there are updates here
    for (i = 0; i < current_updates.getElementsByTagName("li").length; i+=1) {
		friend_url = current_updates.getElementsByTagName("li")[i].getElementsByTagName("a")[0];
		get_followstatus(friend_url.getAttribute('href'),friend_url);
    }
  }

}, false);

document.getElementById("more").addEventListener("click", function(e) {
	run_update();
}, false);


function run_update() {
	interval = window.setInterval(function() {
		following_regexp = new RegExp('/direct_messages/create/',"im"); // the test for whether someone follows you or not

	  if (current_updates.hasChildNodes()) { // there are updates here
	    for (var j = i; j < current_updates.getElementsByTagName("li").length; j+=1) {
			friend_url = current_updates.getElementsByTagName("li")[j].getElementsByTagName("a")[0];
			get_followstatus(friend_url.getAttribute('href'),friend_url);
	    }
		i = j;
	  }	
		document.getElementById("more").addEventListener("click", function(e) {
			run_update();
		}, false);
		window.clearInterval(interval);
	}, 1000);
}

//get_followstatus: Uses xmlHTTPRequest to load your friend's page, detemines whether they follow you, then updates your page.
function get_followstatus(friend_url,friend_node) {
	GM_xmlhttpRequest({
		headers: [{'User-Agent': '3greeneggs; http://www.3greeneggs.com'}], // Am I officially a secret agent yet?
		method:'GET',
		url:friend_url,
		onload: function(details) {
			var match = following_regexp(details.responseText);
			if (match) {
				// the icon is a public domain icon originally from http://www.famfamfam.com/
				friend_node.innerHTML = friend_node.innerHTML + "<img width='16' height='16' style='width:16px;height:16px;position:relative;top:-20px;left:1px;' src='http://www.hilarymason.com/wp-content/uploads/2009/01/action_refresh_blue.gif' />";
			} 
		}
	});
}
