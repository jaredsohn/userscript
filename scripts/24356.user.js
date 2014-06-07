// Automagical quote button for uk-mkivs.net forum
// version 0.1 b3ta
// 25 03 2008
// Copyright (c) 2008, Jonnyfatman 
// 
// ???????????????????????????????????????????????????????????????????? 
// 
// This is a Greasemonkey user script. 
// 
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/ 
// Then restart Firefox and revisit this script. 
// Under Tools, there will be a new menu item to "Install User Script". 
// Accept the default configuration and install. 
// 
// To uninstall, go to Tools/Manage User Scripts, 
// select "uk-mkivs", and click Uninstall. 
// 
// ???????????????????????????????????????????????????????????????????? 
// 
// ==UserScript== 
// @name          uk-mkivs
// @namespace     http://uk-mkivs.net/members/jonnyfatman.aspx
// @description   Adds the missing quote button back into the forums. For those who don't like change. 
// @include       http://uk-mkivs.net/*
// @include       http://uk-mkvs.net/*
// ==/UserScript== 


var ReplyLinks, a, stringlen, editedlink, quotebutton;

//Look for Reply button links
ReplyLinks = document.evaluate("//*[@class='CommonImageTextButton CommonReplyButton']",

document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//Loop through all Reply button links
for (var i = 0; i < ReplyLinks.snapshotLength; i++) {
	a = ReplyLinks.snapshotItem(i);
	
	//If it matches the correct format, change the link to end in Quote=True and
	//add new element to contain modified link
	
	if (a.href.match(/^http:\/\/uk-mkivs\.net\/forums\//)) { 
		stringlen = a.href.length - 5
		editedlink = a.href.substring(0,stringlen)
		quotebutton = document.createElement('a');
		quotebutton.setAttribute('class', 'CommonImageTextButton CommonReplyButton');
		quotebutton.setAttribute('href', editedlink + 'True');
		quotebutton.appendChild(document.createTextNode('Quote'));
		a.parentNode.insertBefore(quotebutton, a.nextSibling);
	}
}		

