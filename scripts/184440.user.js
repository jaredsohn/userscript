// ==UserScript==
// @name        Garlic Fix
// @namespace   Daily Garlic
// @description Removes the top bar on page
// @include     http://dailygarlic.com/*

// ==/UserScript==

var elmDeleted = document.getElementsByTagName("div")[9];
	elmDeleted.parentNode.removeChild(elmDeleted);

var elmDeleted = document.getElementsByTagName("div")[34];
	elmDeleted.parentNode.removeChild(elmDeleted);



var elmDeleted = document.getElementById("searchQ");
	elmDeleted.parentNode.removeChild(elmDeleted);

var elmDeleted = document.getElementById("joinnow");
	elmDeleted.parentNode.removeChild(elmDeleted);



$('.noAction:has(.topicsList)').hide(); 

var p = document.getElementsByClassName('feedNav');
for (var i=p.length; --i>=0;) {
    p[i].parentNode.removeChild(p[i]);
}