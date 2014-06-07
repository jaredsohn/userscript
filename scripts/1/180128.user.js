// ==UserScript==
// @name        Highlight my Trac changes
// @namespace   nl.patrickkik
// @include     http://*/trac/wp6.0/ticket/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// ==/UserScript==

$(document).ready(highlightChanges);

function highlightChanges() {
    $("h3:contains('ago by "+ getUsername() + "')").each(highlightChange);
}

function highlightChange() {
    $(this).parent().css("background-color", "#CCFFCC");
}

function getUsername() {
    var loginText = $("li:contains('logged in as')").text();
    return loginText.substring(loginText.lastIndexOf(" ") + 1);
}
