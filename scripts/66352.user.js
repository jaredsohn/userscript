// ==UserScript==
// @name           99Designs Move Comments
// @namespace      http://userscripts.org/scripts/show/66352
// @description    Moves comments to be below entries, above discussion in 99designs.
// @include        http://99designs.com/contests/*/designers/*
// ==/UserScript==
var comments = document.getElementById("comment-discussion");
comments.parentNode.removeChild(comments);
var discussion = document.getElementById('discussion');
discussion.insertBefore(comments, discussion.firstChild);