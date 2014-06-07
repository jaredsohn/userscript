// ==UserScript==
// @name           Second Life Forums: Remove Popular Tags
// @namespace      https://blogs.secondlife.com/
// @include        https://blogs.secondlife.com/*
// ==/UserScript==

var uPopularTags = document.getElementsByClassName("jive-sidebar-populartags");
var uPopularTagBox = uPopularTags[0].parentNode;
console.log(uPopularTagBox);
if (uPopularTagBox) {
	uPopularTagBox.parentNode.removeChild(uPopularTagBox);
}
