// ==UserScript==
// @name        GoogleNewsAuthorPop-UpBlocker
// @namespace   https://www.google.com
// @description Blocks Annoying Author Pop-up
// @include     http://news.google.com/*
// @include     https://news.google.com/*
// @version     1.1
// ==/UserScript==


	var elem = document.getElementsByClassName("gpa gpa-double-line-height-table g-hovercard");
	
	for(var i = 0; i < elem.length; i++) {
		elem[i].removeAttribute("data-userid");
	}
	
	