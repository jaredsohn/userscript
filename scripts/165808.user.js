// ==UserScript==
// @name        FeedlyDisableMarkAllAsReadOnSidebar
// @namespace   net.mmarinero.feedly
// @description Disables the mark all as read category buttons on the sidebar so they can't be clicked by mistake. It does it every second to avoid feedly adding them again.
// @grant 		none
// @include     http://www.feedly.com/*
// @include     https://www.feedly.com/*
// @include     http://feedly.com/*
// @include     https://feedly.com/*
// @version     1
// ==/UserScript==

setInterval(main, 1000);
function main(){
	var markAsReadButtons = document.querySelectorAll('.simpleUnreadCount');
	for (var i = 0; i < markAsReadButtons.length; i++) {
		markAsReadButtons[i].removeAttribute('data-app-action');
	}
}