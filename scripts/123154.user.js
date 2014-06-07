// ==UserScript==
// @name           Remove "try new channels design" bar

// @description    removes the annoying "click here to try the new channels design" bar
// @include        http://*www.youtube.com/*
// ==/UserScript==



var elmDeleted = document.getElementById("dapper-opt-in");
	elmDeleted.parentNode.removeChild(elmDeleted);