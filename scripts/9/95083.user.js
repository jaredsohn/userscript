// ==UserScript==
// @name          Yahoo! News Comment Hider
// @description   Hides Yahoo! News comments section on article pages
// @include       http://news.yahoo.com/*
// ==/UserScript==

var comments = document.getElementById('yom-comments');
if(comments)
	comments.style.display = 'none';