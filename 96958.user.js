// ==UserScript==
// @name          Google Calendar Smart Weekends
// @namespace     http://plutor.org/
// @description   Marks weekends as grey in Google Calendar. Supports day, week, and month views. Detects Sat/Sun/Mon as first day of the week.
// @include       https://www.google.com/calendar/render*
// @include       http://www.google.com/calendar/render*
// ==/UserScript==

// Config
var style = 'background: #eee !important';
var head_style = 'background: #e3e3ee !important';

// ======================================================================

function check_month_view() {
    // See if Sunday is the first column
    var daynames = document.getElementsByClassName('mv-dayname');
    if (daynames && daynames.length > 0) {
        if (daynames[0].textContent.match(/Sun/)) {
            GM_log("sunday first");
            GM_addStyle(".month-row .st-bg-table .st-bg:nth-child(1) { " + style + " }");
            GM_addStyle(".month-row .st-grid .st-dtitle:nth-child(1) { " + head_style + " }");
            GM_addStyle(".month-row .st-bg-table .st-bg:nth-child(7) { " + style + " }");
            GM_addStyle(".month-row .st-grid .st-dtitle:nth-child(7) { " + head_style + " }");
        } else if (daynames[0].textContent.match(/Sat/)) {
            GM_log("saturday first");
            GM_addStyle(".month-row .st-bg-table .st-bg:nth-child(1) { " + style + " }");
            GM_addStyle(".month-row .st-grid .st-dtitle:nth-child(1) { " + head_style + " }");
            GM_addStyle(".month-row .st-bg-table .st-bg:nth-child(2) { " + style + " }");
            GM_addStyle(".month-row .st-grid .st-dtitle:nth-child(2) { " + head_style + " }");
        } else {
            GM_log("monday first");
            GM_addStyle(".month-row .st-bg-table .st-bg:nth-child(6) { " + style + " }");
            GM_addStyle(".month-row .st-grid .st-dtitle:nth-child(6) { " + head_style + " }");
            GM_addStyle(".month-row .st-bg-table .st-bg:nth-child(7) { " + style + " }");
            GM_addStyle(".month-row .st-grid .st-dtitle:nth-child(7) { " + head_style + " }");
        }
    } else {
        // We're not in month view, check again soon
        setTimeout( check_month_view, 300 );
    }
}

// In the day, week, and 'n days' views
GM_addStyle(".tg-timedevents td.tg-weekend { " + style + " }");

check_month_view();

