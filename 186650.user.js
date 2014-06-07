// ==UserScript==
// @name            Hack Forums Show post if you ignore person
// @namespace       Snorlax
// @description     Shows all posts by a person eventhough you have him on ignore list
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/showthread.php*
// @version         1.0
// ==/UserScript==

if($("a[onclick*='showIgnoredPost']").length >= 1) {
    $("a[onclick*='showIgnoredPost']").each(function() {
        $(this).click();
        if(window.location.href.indexOf('#pid') > -1) {
            window.location.href = window.location.href;
        }
    });
}