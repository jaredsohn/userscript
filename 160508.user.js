// ==UserScript==
// @name        Hide Facebook Sponsored Likes
// @namespace   http://domain.com/directory
// @description Hides the Sponsored Likes box in the Facebook News Feed
// @include     https://*.facebook.com/*
// ==/UserScript==

var div = document.getElementByClass("storyInnerContent");

if (div) {
    div.style.display = "none";
	}

var div1 = document.getElementByClass("storyInnerContent");

if (div1) {
    div.style.display = "none";
	}