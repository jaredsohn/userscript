// ==UserScript==
// @name           Examiner - Keep in Same Tab
// @namespace      http://www.examiner.com
// @include        http://www.examiner.com/*
// ==/UserScript==

var a = document.getElementsByTagName("a");

for(i = 0; i < a.length; i++)
{
	if(a[i].getAttribute("target") == "_blank")  a[i].removeAttribute("target");
}
