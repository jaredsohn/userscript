// ==UserScript==
// @name        Facebook Notification Badges
// @namespace   http://fluidapp.com
// @description Display a dock badge for Facebook Notifications when using Fluid.
// @include     *facebook.com/*
// @author      Will Brown
// ==/UserScript==

updateBadges();

function updateBadges() {
	window.fluid.dockBadge = document.getElementById('presence_notifications_count').getElementsByTagName('strong')[0].innerHTML;
	setTimeout("updateBadges", 1);
}
