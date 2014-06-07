// ==UserScript==
// @name       r/chess pgn viewer comment res color change.
// @summary    change color of pgn viewer comment font for use with reddit night mode.
// @version    0.3
// @description  change color of pgn viewer comment font for use with reddit night mode.
// @match      http://www.reddit.com/*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function(){
    $("<style type='text/css'>.ct-board-move-comment{color:white}</style>").appendTo('head');
});

