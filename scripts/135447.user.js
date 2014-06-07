// ==UserScript==
// @name			LakersNation Disable Sidebar Video
// @namespace		lakersnation@sidebarhide.com
// @description		This automatically hides the videos on the siderbar for LakersNation.com
// @include			http://www.lakersnation.com/*
// ==/UserScript==

var element = document.getElementById("text-66");
element.parentNode.removeChild(element);
