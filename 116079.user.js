// ==UserScript==

// @name          Hide facebook new bar

// @namespace     http://userscripts.org/scripts/116079

// @description   hide the new annoying facebook bar

// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*

// ==/UserScript==
	var y,x=document.getElementsByClassName("tickerActivityStories")[0];
	x.style.display="none";
	document.getElementById('pagelet_ticker').style.height="0px";
setTimeout(function(){
	y=document.getElementsByClassName("fbChatSidebarBody")[0];
	y.style.height="100%";
}, 4000);
