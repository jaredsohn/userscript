// ==UserScript==
// @name           What.CD :: Redirect "Post" link to unread (grouped)

// @description    Redirects the "Post" link at the top of the page directly to your grouped unread posts
// @include        http*://*what.cd/*
// ==/UserScript==

/* Target Post Link */
var target = document.getElementById('userinfo_minor').getElementsByTagName('li')[4].getElementsByTagName('a')[0];

/* Redirect Link */
target.href += "&showunread=1&group=1";
