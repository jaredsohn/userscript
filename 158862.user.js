// ==UserScript==
// @name          Gawker Comment Hider
// @description   Hides Gawker comments section on applicable pages
// @include       http://*.gawker.com/*
// ==/UserScript==

var comments = document.getElementById('comments');
if(comments)
	comments.style.display = 'none';