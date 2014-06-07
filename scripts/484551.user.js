// ==UserScript==
// @name        AKKEN: Timecard Fix
// @namespace   https://*.akken.com
// @version     0.0.1.20140429.124000
// @description Fixes timecard submissions date range for Akkens timecard system. Here's to 45 minutes of code versus your 5 years of bad Akken code...
// @include     https://*.akken.com/BSOS/*
// @include     http://*.akken.com/BSOS/*
// @match       http://*.akken.com/BSOS/*
// @match       https://*.akken.com/BSOS/*
// @match       https://*.akken.com/*
// @copyright   2013+, H1R0Protagonist
// @run-at      document-end
// ==/UserScript==
var options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};
 if (document.getElementsByName("issues")[0].value=="") {
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    var firstday = new Date(curr.setDate(first)).toLocaleDateString("en-US");
    var lastday = new Date(curr.setDate(last)).toLocaleDateString("en-US");
    document.getElementsByName("servicedate")[0].value=firstday;
    document.getElementsByName("servicedateto")[0].value=lastday;
    document.getElementsByName("issues")[0].value="Fixed using 'AKKEN Timecard Fix' module for TamperMonkey {Chrome verified} and Greasemonkey {Firefox verified}...";
    DateCheck('servicedate','servicedateto');
 }
