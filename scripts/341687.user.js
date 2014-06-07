// ==UserScript==
// @name            Hack Forums - Quick mark PMs as read
// @namespace       Snorlax
// @description     Mark a PM as read with just one click
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

$("#pm_notice").find("div:last").prepend(" - ").prepend('<a href="javascript:void(0)" class="markRead">Mark as Read');

$(".markRead").on("click", function() {
    $.get("http://www.hackforums.net/private.php?action=read&pmid=" + $(this).next().next().next().attr("href").replace(/[^0-9]/g, ''), function() {
        $("#pm_notice").next().remove();
        $("#pm_notice").hide();
    });
});