// ==UserScript==
// @name            Hide Facebook Sidebar
// @namespace       http://userscripts.org/users/83497
// @description     Hides the sidebar including Highlights, People you may know, etc.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include         http://*.facebook.com/*
// ==/UserScript==

$(".UIHotStream").hide();
$(".pymk").hide();
$(".UIHomeBox_MoreLink").hide();
$(".invite_friends").hide();
$(".friend_finder").hide();