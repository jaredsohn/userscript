// ==UserScript==
// @name          Hide all removed comments
// @description   Removes all spammed comments in brigaded threads so you can view it normally.
// @include       *reddit.com/r/atheism/comments/*
// ==/UserScript==
"use strict";


document.hide_removed_comments = function(){ $('.spam.comment').hide(); $('#toggle_removed_comments_off').html('<span class="error">Removed comments are now hidden</span>');}

$('.set_subreddit_sticky-button').parent().append("&nbsp;&nbsp;&nbsp;&nbsp;<span id='toggle_removed_comments_off' class='option main active toggle'><a href='javascript:void(0);' onclick='hide_removed_comments();'>Hide Removed Comments</a>");
