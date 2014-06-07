// ==UserScript==
// @name           kindleboards ad remover
// @namespace      http://www.kindleboards.com
// @description    Removes the middle ad layer on kindleboards.com
// @include        http://www.kindleboards.com/*
// ==/UserScript==

var divtags = document.body.getElementsByTagName("div");

for (i=0; i < divtags.length; i++)
{
	var classAttr = divtags[i].getAttribute("class");
	
	switch (classAttr)
	{
		case "maindiv":
		{
			divtags[i].parentNode.removeChild(divtags[i]);
		}
		case "topbar2":
		{
			divtags[i].parentNode.removeChild(divtags[i]);
		}
		default:
	}
}