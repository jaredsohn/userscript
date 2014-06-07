// ==UserScript==
// @name           ReadablePeopleFirst
// @namespace      JasonMelancon
// @description    Makes Florida HR website color scheme more readable
// @include        http*://jobs.myflorida.com/*
// ==/UserScript==

if (/joblist.html?/.test(document.URL))
{	subHeadings = document.getElementsByTagName("span");
	for (i=0; i<subHeadings.length; i++)
	{	if (subHeadings[i].getAttribute("class") == "listsubheading")
		{	subHeadings[i].firstChild.style.color = "#D9E1E8";
		}
	}
}
