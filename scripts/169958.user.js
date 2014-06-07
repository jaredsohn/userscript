// --------------------------------------------------------------------
// ==UserScript==
// @name          myhours.com Usability Tweaks
// @namespace     http://myhours.com
// @description   Tweak various items on the myhours.com site.
// @include       http*://*myhours.com/*
// ==/UserScript==

(function() {
//==============================================================================
// Set the initial focus.
//==============================================================================
    var elementToFocus;

    // Is it the daily view page?
    if (window.location.href.indexOf('dailyView') > 0) {
        // Set focus on the project select input.
        elementToFocus = document.getElementsByName("sum1")[0];
    }

    // Is it the time edit page?
    if (window.location.href.indexOf('timeEdit') > 0) {
        // Set focus on the Finish input.
        elementToFocus = document.getElementsByName("logOut")[0];
    }

    // Is it the project add page?
    if (window.location.href.indexOf('projectAdd') > 0) {
        // Set focus on the Name input.
        elementToFocus = document.getElementsByName("name")[0];
    }

    // Is it the task add page?
    if (window.location.href.indexOf('taskAdd') > 0) {
        // Set focus on the Name input.
        elementToFocus = document.getElementsByName("name")[0];
    }

    // Does the element to focus exist?
    if (elementToFocus) {
        // Set the focus.
        elementToFocus.focus();
    }
})();