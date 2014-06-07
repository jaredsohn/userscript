// ==UserScript==
// @name           Hide Sitepoint blog comments
// @namespace      http://www.example.com/
// @description    Removes blog comments from Sitepoint blogs
// @include        http://*.sitepoint.com/blogs/*
// ==/UserScript==

window.addEventListener("load", function(e) {
	if (!document.getElementById) return;
	var commentBlock = document.getElementById("comments");
	var respondBlock = document.getElementById("respond");
	if (commentBlock != null && typeof(commentBlock) != "undefined")
		commentBlock.parentNode.removeChild(commentBlock);
	if (respondBlock != null && typeof(respondBlock) != "undefined")
		respondBlock.parentNode.removeChild(respondBlock);
}, false);