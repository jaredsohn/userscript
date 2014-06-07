// ==UserScript==
// @name          Yahoo! Comment Hider
// @description   Hides Yahoo! comments section on applicable pages
// @include       http://*.yahoo.com/*
// ==/UserScript==

var comments = document.getElementById('yom-comments');
if(comments)
	comments.style.display = 'none';