// ==UserScript==
// @name        MTMS_BotBeGone
// @require       http://code.jquery.com/jquery-1.7.1.min.js
// @grant       none
// @include http://sb-vcsbbi03/cj_tracking/view_id1.cfm*
// ==/UserScript==


$(function() {
    $("tr:contains('Master TMS bot')").css({"background-color":"#82829B","color":"#a8a8a8","font-size":"x-small","text-decoration":"line-through"});
});
