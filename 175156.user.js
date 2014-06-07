// ==UserScript==
// @name       Move Riot Post Indicator
// @namespace  Weefa
// @version    0.2
// @description  Moves the Riot post indicator to thread name field.
// @match      http://forums.na.leagueoflegends.com/board/forumdisplay.php*
// @copyright  2013+, Weefa
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(document).ready(function() {
    console.log("Running: Move Riot Post Indicator");
    var elements = $('tr.even, tr.odd').has('a.float-right');
    elements.each(function() {
        $(this).find('a.float-right').appendTo($(this).find(">:first-child"));
    });
});