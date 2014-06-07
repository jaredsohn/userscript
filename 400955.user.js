// ==UserScript==
// @name        YouTube Open Subscription Videos In New Tab
// @author      Kottontail
// @namespace   Kottontail
// @description Makes all YouTube video links on your Subscription Feed page open in a new tab/window...even those that are dynamically loaded with the "Load More" button.
// @version     1.0
// @include     *://www.youtube.com/feed/*
// @include     *://www.youtube.com/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$("h3 a").live("click",
function(event)
{
window.open($(this).attr("href"));
event.preventDefault();
}
);