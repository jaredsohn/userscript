// ==UserScript==
// @name        Paychex Timesheet Express Autofill
// @namespace   http://edrake.net
// @description Automatically fill out 8 hours of work each weekday
// @include     https://timeandlabor.paychex.com/secure/old/TLOHome/SubmitTimesheetExpress.asp
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

$(function() {
    for (var i=0; i < weekdays.length; i++) {
        var weekdayTr = $("table.BodyTables > tbody > tr > td:contains('" + weekdays[i] + "')").parent();
        var nextTr = weekdayTr.next("tr[valign='top']");
        if (nextTr.html()) {
            nextTr.find("td > input[name='txtDuration']").val("8");
        }
    }
});
