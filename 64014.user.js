// ==UserScript==
// @name Hide Reddit NSFW
// @description Hides NSFW entries on reddit
// @namespace http://userscripts.org/users/121730
// @include http://www.reddit.com/*
// @include http://reddit.com/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");
var nsfwRegEx = /.*over18.*/i;
for(i = 0; i < divs.length; i++)
{
	div = divs[i];
	if(nsfwRegEx.test(div.className))
	{
            div.style.display="none";
	}
}
