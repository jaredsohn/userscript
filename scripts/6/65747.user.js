// ==UserScript==
// @name          Confirm Logout
// @namespace     http://www.userscripts.org
// @description	  Confirms the user's intent to log out
// @include       *what/*
// ==/UserScript==

var links=document.getElementsByTagName('a');

for(var x=0;x<links.length;x++){
	if(links[x].getAttribute('href')=='insert_personal_logout_link_here'){
		links[x].setAttribute('onclick','return confirm(\'Are you sure you want to log out?\')')
	}
}