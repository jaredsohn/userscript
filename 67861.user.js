// ==UserScript==
// @name           Workopolis Printable Resume Candidate Name and Dormancy Prioritisation and Title Merger
// @namespace      ssodhi
// @include        http://www.workopolis.com/work.aspx?action=Transfer&View=Content/Recruiter/PreviewResumeDetailPageView&lang=EN&printarguments*
// ==/UserScript==

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);
    var days = Math.round(difference_ms/ONE_DAY);
    // Convert back to days and return
    return days == 1 ? days : days - 1;

}

var name = document.getElementsByTagName("font")[0].innerHTML;
var lastMod = new Date(document.getElementsByTagName("font")[1].getElementsByTagName('b')[0].innerHTML);
var today = new Date();
var dormant = days_between(today, lastMod);
document.title = name + ' | '  + dormant + ' day(s) dormant | ' + document.title;