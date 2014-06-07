// ==UserScript==
// @name           Blogger Content Warning Auto Acknowledge
// @namespace      http://blogger.com/
// @description    Auto clicks through Blogger's content warning (as of 07/25/2009). Based on Blogger Content Warning Autoskip II by groovyskies.
// @include        https://www.blogger.com/blogin.g?blogspotURL=*
// ==/UserScript==

var link = document.getElementById('continueButton');

if (link)
{ 
	var url = link.href; 
	self.location = url;
}
