// ==UserScript==
// @name          Make StackApps active tab default
// @include       http://stackapps.com/*
// @version       1.0
// @namespace     http://www.isimonbrown.co.uk/activeapps
// ==/UserScript==

if (location.href == "http://stackapps.com/") location.href = "http://stackapps.com/?tab=active";

var work = function() {
	$("#hlogo a").attr("href", "/?tab=active");
};


// Inspired by this post: http://meta.stackoverflow.com/questions/46562
var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + work + ")();";
document.body.appendChild(script);