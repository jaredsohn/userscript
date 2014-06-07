// ==UserScript==
// @name           Shamus Young Twitter link
// @namespace      http://userscripts.org/users/didero
// @description    Turns the 'Twitter' header into a link to Shamus's Twitter account.
// @include        http://www.shamusyoung.com/twentysidedtale/
// @author         Didero
// @version        2.0
// ==/UserScript==

var twitterPage = 'http://twitter.com/shamusyoung';

var twitterWidget = document.getElementById("twitwidget-4")
if (!twitterWidget) GM_log('Twitter section not found!');
else {
	var twitterHeaderCandidates = twitterWidget.getElementsByTagName('h3');
	if (twitterHeaderCandidates.length != 1) GM_log('Unexpected amount of Twitter headers found! Expected 1, found '+twitterHeaderCandidates.length);
	else {
	  var twitterHeader = twitterHeaderCandidates[0];
		var link = document.createElement('a');
		link.href = twitterPage;
		//Copy the original look
		link.style.color = window.getComputedStyle(twitterHeader, null).getPropertyValue('color');
		link.style.textDecoration = 'underline';
		//copy the text that was there originally, then erase the original to prevent duplicates
		link.innerHTML = twitterHeader.innerHTML;
		twitterHeader.innerHTML = '';
		
		twitterHeader.appendChild(link);
	}
}