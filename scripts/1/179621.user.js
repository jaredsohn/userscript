// ==UserScript==
// @name       Haaretz block removal
// @version    1.0
// @description  Removes premium UI blocker
// @match      http://www.haaretz.co.il/*
// @copyright  2013+, Iddo
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    var retrycount = 30; // Try at most 30 times
    var unblock = function() {
        var blocker = $('.blockUI');
        if (blocker.length > 0) {
            blocker.remove();
//            console.log("removing");
        } else {
            if (retrycount > 0) {
//                console.log("still not done " + retrycount--);
                window.setTimeout(unblock, 1000);
            }
        }
    }
    unblock();
    // GM_addStyle ('.blockUI{display:none}');
});