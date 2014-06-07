    Signup
    Login

Userscripts.org

    Scripts
    Tags
    Forums
    People
    Blog

IRCTC Auto-refresh @ 07:59:50
By hari ram choudhary
    About
    Source Code
    Reviews 0
    Discussions 0
    Fans 2
    Issues
    Share

// ==UserScript==
// @name           hari Auto-refresh @ 07:59:50
// @namespace      http://userscripts.org/users/23652
// @description    Refreshes the page at a specified time
// @include        http://*.irctc.co.in/*
// @include        https://*.irctc.co.in/*
// ==/UserScript==

var Time_To_Refresh_At = "07:59:50"; // The time to refresh the page at (Format xx:xx:xx)





// DON'T EDIT BELOW HERE
function check() {
Time_To_Refresh_At = Time_To_Refresh_At.replace(/[^0-9:]/g,'');
var date, hours, minutes, seconds, time, waittime;
waittime = GM_getValue('waittime', 0);

date = new Date();
hours = date.getHours().toString();
minutes = date.getMinutes().toString();
seconds = date.getSeconds().toString();
if(hours.length==1) {hours="0"+hours;} // Correct the 1 digit glitch
if(minutes.length==1) {minutes="0"+minutes;} // Correct the 1 digit glitch
if(seconds.length==1) {seconds="0"+seconds;} // Correct the 1 digit glitch
time = hours+":"+minutes+":"+seconds;
if(time==Time_To_Refresh_At) {
location.replace(location.href);
}
}

var invt = setInterval(check, 1000);

Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
