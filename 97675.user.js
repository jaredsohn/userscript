// ==UserScript==
// @name           CloudTweet
// @namespace      CloudTweet
// @include        http://twitter.com/*
// @exclude        about:home
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$("a.username").each( function () {
   $(this).after('<a style="background-color:black;color:cyan;" href="http://mytweetcloud.com/' + $(this).text() + '">#</a>');
});
