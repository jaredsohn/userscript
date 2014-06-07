// ==UserScript==
// @name        NoComment
// @namespace   kaffeeringe
// @description Removes annoying comments from new portals
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==
var knComments = $("div#modul_kommentare");
knComments.remove ();
var knCommentsCount = $("div.mbk-news-extras.comments_hook");
knCommentsCount.remove();
var shzComments = $("div#c3207");
shzComments.remove ();
var lnComments = $("div#disqus_thread");
lnComments.remove ();