// ==UserScript==
// @name          GCal Increment/Decrement Buttons
// @version       1.0
// @description   adds buttons for increment and descrementing dates and times in Google Calendar
// @author        Donald Rauscher
// @include       http://www.google.com/calendar/render
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
        alert("Loaded!");
        $("a[id*='.editLink']").alert("Editing an event!");
}

