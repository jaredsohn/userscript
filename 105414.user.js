// ==UserScript==
// @name clocka
// @description asd
// @include http://torrentsmd.com/forum.php*
// @include http://www.torrentsmd.com/forum.php*
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