// ==UserScript==
// @name        Fitocracy Unspecified Motion Value Calculator
// @namespace   http://www.nathanbaulch.com
// @include     http://www.fitocracy.com/*
// @include     https://www.fitocracy.com/*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function() {
    CalculateUnspecifiedMotionValues();
});

$(document).ajaxSuccess(function(event, request, options) {
    if (options.url && options.url.startsWith("/activity_stream/")) {
        CalculateUnspecifiedMotionValues();
    }
});

function CalculateUnspecifiedMotionValues() {
    $(".set_span").each(function() {
        var parts = this.innerHTML.split(" || ");
        var speed = 0;
        var distance = 0;
        var time = 0;
        var isDistanceMetric = false;
        var isSpeedMetric = false;
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part.endsWith(" m")) {
                distance = parseFloat(part.substring(0, part.length - 2)) / 1000;
                isDistanceMetric = true;
            }
            else if (part.endsWith(" km")) {
                distance = parseFloat(part.substring(0, part.length - 3));
                isDistanceMetric = true;
            }
            else if (part.endsWith(" ft")) {
                distance = parseFloat(part.substring(0, part.length - 3)) / 5280;
                isDistanceMetric = false;
            }
            else if (part.endsWith(" mi")) {
                distance = parseFloat(part.substring(0, part.length - 3));
                isDistanceMetric = false;
            }
            else if (part.endsWith(" yd")) {
                distance = parseFloat(part.substring(0, part.length - 3)) / 1760;
                isDistanceMetric = false;
            }
            else if (part.endsWith(" km/hr")) {
                speed = parseFloat(part.substring(0, part.length - 6));
                isSpeedMetric = true;
            }
            else if (part.endsWith(" mph")) {
                speed = parseFloat(part.substring(0, part.length - 4));
                isSpeedMetric = false;
            }
            else if (part.endsWith(" min/km")) {
                speed = 60 / parseFloat(part.substring(0, part.length - 7));
                isSpeedMetric = true;
            }
            else if (part.endsWith(" min/mi")) {
                speed = 60 / parseFloat(part.substring(0, part.length - 7));
                isSpeedMetric = false;
            }
            else {
                var dte = new Date("01 Jan 1970 " + part);
                if (!isNaN(dte)) {
                    time = (dte.getTime() - 60000*dte.getTimezoneOffset())/3600000;
                }
            }
        }
        var text = null;
        if (speed <= 0 && distance > 0 & time > 0) {
            speed = distance / time;
            text = speed.toFixed(2) + " " + (isDistanceMetric ? "km/hr" : "mph");
        }
        if (distance <= 0 && speed > 0 && time > 0) {
            distance = speed * time;
            text = distance.toFixed(2) + " " + (isSpeedMetric ? "km" : "mi");
        }
        if (time <= 0 && distance > 0 && speed > 0) {
            if (isDistanceMetric && !isSpeedMetric) {
                speed *= 1.609344;
            }
            else if (!isDistanceMetric && isSpeedMetric) {
                speed /= 1.609344;
            }
            time = distance / speed;
            var dte = new Date("01 Jan 1970");
            dte.setSeconds(3600*time);
            text = dte.getHours() + ":" +
                ("0" + dte.getMinutes()).slice(-2) + ":" +
                ("0" + dte.getSeconds()).slice(-2);
        }
        if (text != null) {
            this.innerHTML += " || <em>" + text + "</em>";
        }
    });
}