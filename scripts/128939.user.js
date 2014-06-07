// ==UserScript==
// @name          Facebook Automatic Birthday Wisher
// @namespace     http://h4ckcod3r.in/userscripts
// @description	  writes happy birthday beforehand
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==


	var n1=document.getElementsByName('message_text');
	for(x in n1)
	{
		n1[x].innerHTML="Happy Birthday!! :)";
	}
	var n2=document.getElementsByName('message');
	for(x in n2)
	{
		n2[x].innerHTML="Happy Birthday!! :)";
	}
	void 0;

//setTimeout('gopi()',10000);
