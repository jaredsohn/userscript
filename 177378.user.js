// ==UserScript==
// @name            Hack Forums Change closed accounts username color
// @namespace       Snorlax
// @description     Changes the standard #383838 closed accounts color to something easier to see
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

$("span[style*='#383838']").css("background-color","red").attr("title","CLOSED ACCOUNT");