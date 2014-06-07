// ==UserScript==
// @name           Workopolis Document Title & Candidate Name Merger
// @namespace      ssodhi
// @description    Prepends candidate name to Workopolis title
// @include        http://www.workopolis.com/*View=Content/Recruiter/ViewResumeView*
// ==/UserScript==

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)
    var days = Math.round(difference_ms/ONE_DAY)
    // Convert back to days and return
    return days == 1 ? days : days - 1;

}

var today = new Date();
var lastMod = new Date(document.getElementById("ctl14_lblResumeLastModified").getElementsByTagName("b")[0].innerHTML);
var dormant = days_between(today, lastMod);

document.title = document.getElementById("ctl14_lblJobSeekerName").innerHTML + ' | '  + dormant + ' day(s) dormant | ' + document.title;