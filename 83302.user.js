// ==UserScript==
// @name Show Only Reddit NSFW
// @description Show only NSFW entries on reddit
// @namespace http://userscripts.org/users/180803
// @include http://www.reddit.com/*
// @include http://reddit.com/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");
var nsfwRegEx = /.*over18.*/i;
var thingtest = /.*thing.*/i;
for(i = 0; i < divs.length; i++)
{
	div = divs[i];
	if(!nsfwRegEx.test(div.className))
	{
		if(thingtest.test(div.className))
		{
	
            div.style.display="none";
		}
}
}