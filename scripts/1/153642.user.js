// ==UserScript==
// @name        Youtube Hompage Redirecter
// @namespace   DBS
// @description Forwards the homepage to your subscriptions feed
// @include     http://www.youtube.com*
// @include     https://www.youtube.com*
// @version     2
// ==/UserScript==

//Home page redirect
if (window.location.href == 'http://www.youtube.com'||window.location.href == 'http://www.youtube.com/'||window.location.href == 'https://www.youtube.com'||window.location.href == 'https://www.youtube.com/'){
	window.location.href = 'https://www.youtube.com/feed/subscriptions/u';
}

//Logo link edit
var logoLink = document.getElementById('logo-container');
if (logoLink != null){
	logoLink.href = 'https://www.youtube.com/feed/subscriptions/u';
}