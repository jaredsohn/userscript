// ==UserScript==
// @name            Hack Forums Max width on images
// @namespace       Snorlax
// @description     Sets a max width on an image
// @require         http://code.jquery.com/jquery-2.0.3.js
// @include         *hackforums.net/*
// @version         1.0
// @run-at			document-end
// ==/UserScript==

function run() {
    $(".tborder img").each(function() {
        if($(this).width() >= window.innerWidth) {
            $(this).attr("width", "100%");
        }
        $(this).attr("max-width", "100%");
        console.log("lol");
    });
}
$(".spoiler_header").on("click", function() {
    run();
});
run();