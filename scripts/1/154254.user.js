// ==UserScript==
// @name     Remove gifs for totalbiscuit
// @include  http://reddit.com/*
// @include  http://www.reddit.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant none
// ==/UserScript==

$("div.thing")  .show ()
                .has ('a[href$=".gif"]')
                .hide ();