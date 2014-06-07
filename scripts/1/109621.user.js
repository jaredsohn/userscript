// ==UserScript==
// @author         Pinchii
// @version        0.1
// @name           Windows Live Goto Live Inbox
// @namespace      http://pinchii.com/home/2011/08/go-straight-to-the-hotmail-inbox
// @description    Automatically forwards from Home / Today page to Hotmail / Live Mail Inbox
// @include        http://*.mail.live.com/*
// @include        https://*.mail.live.com/*
// @include        http://mail.live.com/*
// @include        https://mail.live.com/*
// ==/UserScript==

function gotoLiveInbox(){
	//go through the links on the page and find the link to the inbox, aparently going to InboxLight.aspx alone doesn't work
	var x;
	var pageLinks;
	
	pageLinks = '';
	
	for(x in document.links)
	{
		pageLinks = document.links[x] + '';
		
		//Give me the first link that has the word InboxLight.aspx?n, this means that the link is refering to the inbox
			if(pageLinks.indexOf('InboxLight.aspx?n=') != -1)
			{
				//alert("I found it" + ' - ' + pageLinks);
				document.location = pageLinks
			}
	}
	
}

//give me the index of where the word 'home.mvc' is found, if its -1 it means we are not at the home page
if (document.URL.indexOf('home.mvc') != -1)
{
	//we are at the home page, lets fire off the function to move to the inbox
	gotoLiveInbox();
}
