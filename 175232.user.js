// ==UserScript==
// @name            Hack Forums Show post activity on thread
// @namespace       Snorlax
// @description		Press the "Show Activity" link next to the thread title
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/showthread.php*
// @version         1.0
// ==/UserScript==

tid = $("input[name='tid']").val();
$(".active").after(" - <a href='javascript:MyBB.whoPosted("+tid+")'>Show Activity</a>");