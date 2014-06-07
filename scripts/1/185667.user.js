// ==UserScript==
// @name        Showpost.php hyperlink button by kLeptO
// @namespace   showpostbutton
// @description Adds button with hyperlink to showpost.php to thread posts.
// @include     *.rune-server.org/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==
$( document ).ready(function() {
    $(".ip").each(function() {
        var userId = $(this).attr("href").split("p=")[1];
        $(this).before("<a href='http://www.rune-server.org/showpost.php?p=" + userId + "'><img class='inlineimg' src='http://www.rune-server.org/images/bluefox/buttons/quickreply.gif' /></a>");
    });
});