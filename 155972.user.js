// ==UserScript==
// @name        Tumblr Scrollable Css Box
// @namespace   scroll_css
// @description Makes the CSS box in Tumblr customize have a scrollbar so you can edit.
// @include     http://www.tumblr.com/customize/*
// @include     http://www.tumblr.com/customize
// @version     1
// ==/UserScript==

setTimeout(function(){ //needs to be timeout because of some weird native script
	document.getElementById('custom_css').style.overflow="auto";
	document.getElementById('custom_css').parentNode.parentNode.style.marginLeft = "-20px";
	document.getElementById('custom_css').parentNode.parentNode.style.width = "270px";
	document.getElementById('custom_css').style.width = "260px";
	document.getElementById('custom_css').style.height = "500px";
	document.getElementById('custom_css').style.whiteSpace = "nowrap";
}, 1000);