// ==UserScript==
// @name         Youtube - Hide Subscription Recommendations
// @namespace    http://arundor/hide.youtube.subscription.recommendations
// @description  Gets rid of the Recommended Channels sidebar on your Youtube subscription page.
// @grant        none
// @include      http://*youtube.com/my_subscriptions*
// @include      https://*youtube.com/my_subscriptions*
// ==/UserScript==

var yt_admin = document.getElementById('yt-admin');

if (yt_admin) {
	yt_admin.setAttribute('class', 'ytg-fl recommendations collapsed');
}