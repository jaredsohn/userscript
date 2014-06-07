// ==UserScript==
// @name        reddit upvote all
// @namespace   reddit
// @include     *reddit.com*
// @version     1
// @grant       none
// ==/UserScript==

function upvoteall(){
    $("div.up").first().click();
    setTimeout("upvoteall()", 500);
}

$(function(){
        $("ul.tabmenu").prepend("<li><a onclick='upvoteall()'>Upvote All</a></li>");
        window.upvoteall = upvoteall;
});
