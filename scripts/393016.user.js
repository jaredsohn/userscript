// ==UserScript==
// @name        hpTumblr
// @namespace   haphuong
// @description bigger msg
// @include     http://www.tumblr.com/inbox
// @include     http://www.tumblr.com/inbox#
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    extendMsgBox();
});

$(window).scroll(function() {
    extendMsgBox();
});

function extendMsgBox() {
    $("#container").css("width", "1230px");
    $(".post_full").css("width", "875px");
    $(".post.fan_mail.lined-white .message").css("background-repeat", "repeat");
}

