// ==UserScript==
// @name        NoClick Voting
// @namespace   beetsscript
// @description Voting just by arrowkeys: up = google it, left = good, right = bad, down = slaughter
// @include     http://www.ludumdare.com/theme/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_addStyle
// @version     1
// ==/UserScript==


$( document ).ready(function() {
    var googleIt = $("table > tbody > tr > td > a")[0];
    var good = $("table > tbody > tr > td > a")[1];
    var bad = $("table > tbody > tr > td > a")[2];
    var kill = $("table > tbody > tr > td > a")[3];
    
    $(document).keydown(function(event) {
        if ( event.keyCode == 38 ) { // up
            googleIt.click();
        } else if ( event.keyCode == 37 ) { // left
            good.click();
        } else if ( event.keyCode == 39 ) { // right
            bad.click();
        } else if ( event.keyCode == 40 ) { // down
            kill.click();
        }
    })
    
});
