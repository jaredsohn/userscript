// ==UserScript==
// @name       Waterloo Quest Timeout Reset
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Prevents Quest from timing out by resetting the timer every 1 second.
// @match      https://quest.pecs.uwaterloo.ca/*
// @copyright  2013, Matthew Di Nardo
//
// @run-at document-end
// @grant unsafeWindow
// ==/UserScript==


setTimeout(function() {
    
    if(clearTimers) setInterval(clearTimers, 1000);
    
}, 10000);

