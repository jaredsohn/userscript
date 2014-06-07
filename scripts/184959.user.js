// ==UserScript==
// @name            Hack Forums Warning if leaving page
// @namespace       Snorlax
// @description     Warns the user if the message field is not empty.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/showthread.php*
// @include         *hackforums.net/newreply.php*
// @include         *hackforums.net/private.php*
// @version         1.0
// ==/UserScript==

warn_on_unload = "";

$('textarea').one('change', function() {
    warn_on_unload = "Leaving this page will cause any unsaved data to be lost.";
    
    $('input[type="submit"]').click(function(e) { 
        warn_on_unload = "";
    }); 
});

window.onbeforeunload = function() {
    if(warn_on_unload != "") {
        return warn_on_unload;
    }   
}