// ==UserScript==
// @name          Confirm Logout
// @namespace     http://www.thezikes.com
// @description	  Confirms the user's intent to log out
// @include       http://*deviantart.com/*
// ==/UserScript==

var links=document.getElementsByTagName('a');

for(var x=0;x<links.length;x++){
	if(links[x].getAttribute('href')=='http://www.deviantart.com/users/logout'){
		links[x].setAttribute('onclick','return confirm(\'Are you sure you want to log out?\')')
	}
}