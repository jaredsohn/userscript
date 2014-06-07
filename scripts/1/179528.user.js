// ==UserScript==
// @name       Hockey Streams - Disable IP Check
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  disable ip check
// @match      http://www5.hockeystreams.com/*
// @copyright  2013
// ==/UserScript==

$(function() {
    $el = $(".check_ip");
    
    if($el.val() == 1) {
        $el.val(0);
        
        console.log("Disabled IP Checking for Hockey Streams");
    }
});