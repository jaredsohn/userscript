// ==UserScript==
// @name           Facebook Navbar Scroll
// @namespace      Pascal Adriaansen
// @description    Scroll to the top of the current page you're on by clicking the blue bar at the top of the screen 
// @include        https://www.facebook.com/
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

function scrollToTop(){
	window.scrollTo(0,0);
}

var bar = document.getElementById("blueBar");
bar.addEventListener('click', scrollToTop, false);