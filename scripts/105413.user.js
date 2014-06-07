// ==UserScript==
// @version 1.0
// @name clock
// @description j
// @include http://torrentsmd.com*
// @include http://www.torrentsmd.com*
// ==/UserScript==


document.write("<body onload='startTime()'>");

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("posttext").innerHTML = h + ":" + m + ":" + s;
    t = setTimeout('startTime()', 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}