// ==UserScript==
// @name           4chan Usage Timer
// @namespace      b5b1e01d2b084aad9a291a2da94d53c3
// @include        http://*.4chan.org/*
// @description    Lets you know when you spend too much time on 4chan.  Configurable via "Usage timer settings..." in "User Script Commands" menu.
// ==/UserScript==

// Default settings
var DEF_ONTIME = 3600;
var DEF_OFFTIME = 32400;
var DEF_MININACTIVE = 60;
var DEF_SNOOZETIME = 3600;

// Create "GTFO" screen
var gtfoscreen = document.createElement("div");
with (gtfoscreen.style) {
    position = "fixed";
    zIndex = "1000";
    left = "0px";
    top = "0px";
    width = "100%";
    height = "100%";
    backgroundColor = "red";
    color = "black";
    textAlign = "center";
    visibility = "hidden";
}
gtfoscreen.innerHTML = '<div style="font-family: sans-serif; font-size: 100pt">GTFO</div>\
<div style="font-family: serif; font-style: italic; font-size: medium">Click for settings</div>';
document.body.appendChild(gtfoscreen);

// Create settings window
var settings = document.createElement("div");
with (settings.style) {
    position = "fixed";
    zIndex = "1001";
    top = "20px";
    right = "20px";
    backgroundColor = "#e0e0e0";
    textAlign = "center";
    border = "1px solid black";
    visibility = "hidden";
}
settings.innerHTML = '<span style="font-family: sans-serif; font-weight: bold; color: black;">Usage Timer Settings</span>\
<table style="width: 100%;">\
<tr><td style="text-align: left;">Time left <em>(hh:mm:ss)</em>: </th><td id=timeleft style="text-align: right; font-weight: bold;"></td></tr>\
<tr><td style="text-align: left;">Time on: </th><td><input id=ontime type=text style="text-align: right;" size=5></td></tr>\
<tr><td style="text-align: left;">Time off: </th><td><input id=offtime type=text style="text-align: right;" size=5></td></tr>\
<tr><td style="text-align: left;">Min. recorded time off: </th><td><input id=mininactive type=text style="text-align: right;" size=5></td></tr>\
<tr><td style="text-align: left;"><input id=snoozecheckbox type=checkbox disabled>Snooze for: </th><td><input id=snoozetime type=text style="text-align: right;" size=5></td></tr>\
</table>\
<button id=savesettings style="margin: 5px;">Save</button>\
<button id=closesettings style="margin: 5px;">Close</button>';
document.body.appendChild(settings);

// Convert number of seconds to hh:mm:ss string
function sec2time(s) {
    var neg = (s < 0);
    if (neg) {
        s = -s;
    }

    var t = (s % 60) + "";
    var m = Math.floor(s / 60);
    if (m != 0) {
        if (t.length < 2) t = "0" + t;
        t = (m % 60) + ":" + t;

        var h = Math.floor(m / 60);
        if (h != 0) {
            if (t.length < 5) t = "0" + t;
            t = h + ":" + t;
        }
    }

    if (neg) t = "-" + t;
    return t;
}

// Convert hh:mm:ss string to number of seconds
function time2sec(t) {
    var m = t.match(/^\s*(-)?(?:(?:(\d+):)?(\d+):)?(\d+)\s*$/);
    if (!m) {
        alert("Invalid time value: " + t);
        throw "Invalid time value: " + t;
    }
    var s = parseInt(m[2]||0) * 3600 + parseInt(m[3]||0) * 60 + parseInt(m[4]);
    if (m[1]) s = -s;
    return s;
}

// Update clock
function update(e) {
    var now = new Date().getTime();                        // in milliseconds
    var lastvisit = parseInt(GM_getValue("lastvisit", 0)); // in milliseconds
    var timeused = parseFloat(GM_getValue("timeused", 0)); // in milliseconds
    var ontime = parseInt(GM_getValue("ontime", DEF_ONTIME));       // in seconds
    var offtime = parseFloat(GM_getValue("offtime", DEF_OFFTIME));  // in seconds
    var mininactive = parseInt(GM_getValue("mininactive", DEF_MININACTIVE)); // in seconds
    var snoozetime = parseInt(GM_getValue("snoozetime", DEF_SNOOZETIME));    // in seconds
    var snoozemode = GM_getValue("snoozemode", false);

    if (timeused + now - lastvisit >= 1000 * (ontime + snoozetime)) {
        snoozemode = false;
        GM_setValue("snoozemode", false);
    }

    if (now - lastvisit >= 1000 * mininactive) {
        timeused -= (now - lastvisit) * ontime / offtime;
    } else if (now > lastvisit) {
        timeused += now - lastvisit;
    }
    if (timeused < 0) timeused = 0;

    GM_setValue("lastvisit", now + "");
    GM_setValue("timeused", timeused + "");

    if (timeused < 1000 * ontime) {
        gtfoscreen.style.visibility = "hidden";
        snoozemode = false;
        GM_setValue("snoozemode", false);
    } else if (timeused < 1000 * (ontime + snoozetime)) {
        if (snoozemode) {
            gtfoscreen.style.visibility = "hidden";
        } else {
            gtfoscreen.style.visibility = "visible";
        }
    } else {    
        gtfoscreen.style.visibility = "visible";
        snoozemode = false;
        GM_setValue("snoozemode", false);
    }

    if (settings.style.visibility == "visible") {
        var timeleft = Math.ceil(ontime - timeused / 1000);
        document.getElementById("timeleft").innerHTML = sec2time(timeleft);
        var snoozecheckbox = document.getElementById("snoozecheckbox");
        snoozecheckbox.checked = snoozemode;
        snoozecheckbox.disabled = (timeused < 1000 * ontime || timeused >= 1000 * (ontime + snoozetime));
    }
}

// Detect user activity
document.body.addEventListener("mousemove", update, true);
document.body.addEventListener("keydown", update, true);
document.addEventListener("scroll", update, true);

// Code for settings window
function openSettings(e) {
    document.getElementById("ontime").value = sec2time(parseInt(GM_getValue("ontime", DEF_ONTIME)));
    document.getElementById("offtime").value = sec2time(parseInt(GM_getValue("offtime", DEF_OFFTIME)));
    document.getElementById("mininactive").value = sec2time(parseInt(GM_getValue("mininactive", DEF_MININACTIVE)));
    document.getElementById("snoozetime").value = sec2time(parseInt(GM_getValue("snoozetime", DEF_SNOOZETIME)));
    settings.style.visibility = "visible";
    update();
}
gtfoscreen.addEventListener("click", openSettings, false);
GM_registerMenuCommand("Usage timer settings...", openSettings);

// Snooze checkbox
document.getElementById("snoozecheckbox").addEventListener("change", function(e) {
    GM_setValue("snoozemode", e.target.checked);
    update();
}, false);

// Save button
document.getElementById("savesettings").addEventListener("click", function(e) {
    var ontime = time2sec(document.getElementById("ontime").value);
    var offtime = time2sec(document.getElementById("offtime").value);
    var mininactive = time2sec(document.getElementById("mininactive").value);
    var snoozetime = time2sec(document.getElementById("snoozetime").value);

    GM_setValue("ontime", ontime + "");
    GM_setValue("offtime", offtime + "");
    GM_setValue("mininactive", mininactive + "");
    GM_setValue("snoozetime", snoozetime + "");
    update();
}, false);

// Close button
document.getElementById("closesettings").addEventListener("click", function(e) {
    settings.style.visibility = "hidden";
}, false);

update();