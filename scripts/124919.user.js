// ==UserScript==
// @name           Stack Exchange Clock
// @namespace      http://stackexchange.com/
// @description    Display UTC clock on Stack Exchange sites.
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://stackapps.com/*
// @include        http://askubuntu.com/*
// @include        http://answers.onstartups.com/*
// @include        http://*.stackexchange.com/*
// @include        http://*.stackoverflow.com/*
// @include        http://*.serverfault.com/*
// @include        http://*.superuser.com/*
// @include        http://*.askubuntu.com/*
// @include        http://*.answers.onstartups.com/*
// ==/UserScript==

/* Generate the current time string in UTC. */
function get_time() {
    var today = new Date();
    var h = today.getUTCHours();
    var m = zero_pad(today.getUTCMinutes());
    var s = zero_pad(today.getUTCSeconds());

    return h + ":" + m + ":" + s + " UTC";
}

/* Add a leading zero if required. */
function zero_pad(number) {
    if (number >= 0 && number < 10) {
        return "0" + number;
    }
    return number;
}

/* Update the time display. */
function update_time() {
    var stamp = document.getElementById('utc-clock');
    stamp.innerHTML = get_time();
}

/* Generate the HTML element for the stamp and insert,
   wrap time in a link to fit in with the footer menu. */
var time_url = "http://www.wolframalpha.com/input/?i=current%20time";
var time_block = document.createElement("span");
var inner_s = "<span class='lsep'>|</span> ";
inner_s += "<a id='utc-clock' title='Current Time' href='";
inner_s += time_url + "'>" + get_time() + "</a>";
time_block.innerHTML = inner_s;

var target = document.getElementById('hlinks-custom');
if (target) {
    target.parentNode.insertBefore(time_block, target.firstSibling);
}

var f = function() { update_time(); }
window.setInterval(f, 1000);
