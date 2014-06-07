// ==UserScript==
// @name           Mediapart - new comments highlighter
// @description    Highlights new comments to find them more easily.
// @namespace      http://david.didier.name/gmscripts/
// @include        http://www.mediapart.fr/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Versions:
// 1. initial script
// 2. added CSS class instead of inline CSS
// 3. added author highlighting

GM_addStyle("\
    .comment-inner.highlighted { background-color: #FFFFD4; } \
    .comment-by-author .comment-inner .content { border: 3px solid #FF6600; } \
");

var newCommentTags = jQuery(".comment-inner .new");
var newComments = newCommentTags.parent();

newComments.addClass("highlighted");
newCommentTags.remove();
