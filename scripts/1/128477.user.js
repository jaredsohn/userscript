// ==UserScript==
// @name           Easy Subscription Link On MSPA Forum
// @author         Didero
// @namespace      http://userscripts.org/users/didero
// @description    This script adds an easily accessible link to the 'Subscriptions' page (where the topics you're subscribed to are listed) to the top navigation bar and at the bottom of threads on the MSPA forums.
// @include        http://www.mspaforums.com/*
// @include        http://mspaforums.com/*
// @version        2.0
// @downloadURL    https://userscripts.org/scripts/source/128477.user.js
// @updateURL      https://userscripts.org/scripts/source/128477.meta.js
// @grant          none
// ==/UserScript==

var subscriptionLink = document.createElement('a');
subscriptionLink.innerHTML = 'Subscriptions';
subscriptionLink.href = 'http://www.mspaforums.com/subscription.php';

var linksInTopBar = document.getElementsByClassName('isuser');
if (linksInTopBar.length == 1) {
	var topSubLink = subscriptionLink.cloneNode(true);
	topSubLink.style.fontWeight = 'normal';
	
	var listElement = document.createElement('li');
	listElement.appendChild(topSubLink);
	
	//Insert the new item at the start of the list, because for some reason elements are displayed in reverse order
	linksInTopBar[0].insertBefore(listElement, linksInTopBar[0].firstChild);
}
//Also add the same link at the bottom, since moving your mouse all the way to the top of the page to click the top bar is far too much work
var bottomButtons = document.getElementById('below_postlist');
if (bottomButtons) {
	var bottomSubLink = subscriptionLink.cloneNode(true);
	
	var newReplyButton = document.getElementById('newreplylink_bottom');
	//Make sure it's styled the same way as the 'New Reply' button it's placed next to
	bottomSubLink.className = newReplyButton.className;
	//And make sure it's next to it, and not on top
	bottomSubLink.style.left = (newReplyButton.offsetWidth + 20)+'px';
	//Weird workaround, but this empty span makes sure the Subscription button is the exact same height as the 'New Reply' button. The two-pixel difference otherwise is very annoying and ugly
	bottomSubLink.appendChild(document.createElement('span'));
	bottomButtons.appendChild(bottomSubLink);
}