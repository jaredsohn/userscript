// ==UserScript==
// @name            stagram.com
// @namespace       Snorlax
// @description     stagram.com
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *stagram.com*
// @version         1.0
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/kik :/g,"").replace(/kik/g,"");

$("a:contains('@')").text(function(index, text) {
    return text.replace(/@/g, "");
});