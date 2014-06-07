// ==UserScript==
// @name          Inspect Javascript Timers
// @namespace     http://jazzychad.net/
// @description   Logs information about javascript setTimeout and setInterval calls. Use with caution! Disable when not in use.
// @include       *
// ==/UserScript==

var go = function(window){
        
    var oldSetInterval = window.setInterval;
    var newSetInterval = function(f,t) {
        __log("INSPECT_TIMERS: setInterval - " + t + "ms");
        __log("INSPECT_TIMERS: " + f);
        var id = oldSetInterval(f,t);
        return id;
    };
    window.setInterval = newSetInterval;
    
    var oldSetTimeout = window.setTimeout;
    var newSetTimeout = function (f,t) {
        __log("INSPECT_TIMERS: setTimeout - " + t + "ms");
        __log("INSPECT_TIMERS: " + f);
        var id = oldSetTimeout(f,t);
        return id;
    };
    window.setTimeout = newSetTimeout;
    
    function __log(msg) {
        if (window.console && window.console.log) {
            window.console.log(msg);
        }
    }
    
    
};

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.textContent = '(' + go + ')(window);';
document.body.appendChild(script); // run the script
