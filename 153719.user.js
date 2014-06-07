// ==UserScript==
// @name       Youtube Subscriptions as Default Page
// @namespace  youtube
// @version    1.1
// @description Displays videos from your subscribers on Youtube automatically when entering the site or clicking the logo
// @include      *.youtube.com/*
// @copyright  2012+, JHamberg
// ==/UserScript==

var logo = document.getElementById("logo");
var loc = window.location.href;
var subs_url = "http://www.youtube.com/feed/subscriptions/u";

//redirects the user when entering the site 
if (loc == "http://www.youtube.com/" && window == window.top) {
	window.location = subs_url;
}

//redirect from logo as well, speed optimizations
logo.onclick = function(e) {
e.preventDefault();  //to prevent another redirect by site

  //in case of ctrl key or middle mouse-button pressed
  if(!e.ctrlKey && e.which != 2) { 
  window.location.replace("http://www.youtube.com/feed/subscriptions/u"); 
  }

  else {
  window.open(subs_url, '_blank'); //when opening in new tab
  }

  

}
//displays wtw when needed
var navbuttons = document.getElementsByClassName('guide-item');
		for (var i = 0; i < navbuttons.length; i++) {
			if (navbuttons[i].getAttribute('data-channel-id') =="highlights") {
				navbuttons[i].href += "?wtw"; 
			}

			if (navbuttons[i].getAttribute('data-channel-id') =="subscriptions") {
				navbuttons[i].href += "/u"; 
			}
		}