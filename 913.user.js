// ==UserScript==
// @name          Y! Mail Ad Remover
// @namespace     www.caffweb.com
// @description	  Removes ads from the free version of Yahoo! Mail
// @include       http://us.f505.mail.yahoo.com/*
// ==/UserScript==

document.getElementById('northbanner').style.display = "none";
document.getElementById('swads').style.display = "none";
document.getElementById('leftnavad').style.display = "none";

center = document.getElementsByTagName('center');
cLength = center.length;

for (i=0;i<cLength;i++)
{
	center[i].innerHTML = '';
}