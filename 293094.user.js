// ==UserScript==
// @name            Hack Forums Image resize on page
// @namespace       Snorlax
// @description     If an image has an large width it will resize it smaller
// @require         http://code.jquery.com/jquery-2.0.3.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

var run = function() {
    $("img").each(function() {
        if($(this).width() >= 1000) {
            $(this).width("700");
        }
    });
}
run();

$(".spoiler_header").on("click", function() {
    run();
});