// ==UserScript==
// @name        GHash.IO Timezone Fixer
// @description This script automatically convert the date time on ghash.io to confirm your local timezone settings.
// @namespace   vivalite@gmail.com
// @include     https://*ghash.io/*
// @include     https://*cex.io/*
// @include     http://*ghash.io/*
// @include     http://*cex.io/*
// @version     1
// @grant       none
// @run-at      document-end
// @updateURL   https://userscripts.org/scripts/source/293563.user.js
// @downloadURL https://userscripts.org/scripts/source/293563.user.js
// ==/UserScript==
// License Type: MIT

// If you like this script, please consider a donation.
// Bitcoin: 16KrrsCemaGKZEWQnjBAFE6aosKgJ5iEov




$(document).ready(function () {

    if (window.location.href.indexOf("ghash.io") > -1) {
        shiftDateProcessing();
        roundsDateProcessing();

        appendToFunction('on_shift', function () {
            shiftDateProcessing();
            //console.log('on_shift appended!') 
        });

        appendToFunction('on_round', function () {
            roundsDateProcessing();
            //console.log('on_round appended!') 
        });
    } else if (window.location.href.indexOf("cex.io") > -1) {

        //TODO


    }
});

// GHash.IO
var shiftDateProcessed = "";
var roundsDateProcessed = "";

function shiftDateProcessing() {

    var shiftTb = $("table[id^='shifts']");
    if (shiftTb.length > 0) {
        var shiftTd = $("tr[id^='shift-']", shiftTb[0]);

        $(shiftTd).each(function () {
            var completeCell = $(".completed", this);

            if (shiftDateProcessed.indexOf($.trim($(completeCell).html())) < 0) {
                var dateStr = $.trim($(completeCell).html());
                var date = parseUTCDate(dateStr);
                if (date != null) {
                    dateStr = date.getFullYear() + "-" + digiFormat(date.getMonth() + 1) + "-" + digiFormat(date.getDate()) + " " + digiFormat(date.getHours()) + ":" + digiFormat(date.getMinutes()) + ":" + digiFormat(date.getSeconds());
                    $(completeCell).html(dateStr);
                    if (shiftDateProcessed.indexOf($.trim($(completeCell).html())) < 0) {
                        shiftDateProcessed += $.trim($(completeCell).html()) + ",";
                    }
                }
            }
        });

        if (shiftDateProcessed.length > 500) {
            shiftDateProcessed = shiftDateProcessed.substr(shiftDateProcessed.length - 500);
        }

        //console.log(shiftIdProcessed)
        //console.log(shiftIdProcessed.length)
    }

}

function roundsDateProcessing() {

    var roundsTb = $("table[id^='rounds']");
    if (roundsTb.length > 0) {
        var roundsTd = $("tr[id^='round-']", roundsTb[0]);

        $(roundsTd).each(function () {
            var completeCell = $(".completed", this);

            if (roundsDateProcessed.indexOf($.trim($(completeCell).html())) < 0) {
                var dateStr = $.trim($(completeCell).html());
                var date = parseUTCDate(dateStr);
                if (date != null && !isNaN( date.getTime()) ) {
                    dateStr = date.getFullYear() + "-" + digiFormat(date.getMonth() + 1) + "-" + digiFormat(date.getDate()) + " " + digiFormat(date.getHours()) + ":" + digiFormat(date.getMinutes()) + ":" + digiFormat(date.getSeconds());
                    $(completeCell).html(dateStr);
                    if (roundsDateProcessed.indexOf($.trim($(completeCell).html())) < 0) {
                        roundsDateProcessed += $.trim($(completeCell).html()) + ",";
                    }
                }
            }
        });

        if (roundsDateProcessed.length > 10000) {
            roundsDateProcessed = roundsDateProcessed.substr(roundsDateProcessed.length - 10000);
        }

        //console.log(roundsDateProcessed)
        //console.log(roundsDateProcessed.length)
    }

}



function appendToFunction(fn, callback) {
    window[fn] = (function (fn) {
        return function () {
            fn.apply(fn, arguments);
            callback();
        }
    } (window[fn]));
}

function digiFormat(digi) {
    return ("0" + digi).slice(-2);
}

function parseUTCDate(input) {
    try {
        var parts = input.split('-');
        var tparts = parts[2].split(' ');
        var ttparts = $.trim(tparts[1]).split(':');
        // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
        var output = new Date(Date.UTC(parts[0], parts[1] - 1, tparts[0], ttparts[0], ttparts[1], ttparts[2])); // Note: months are 0-based
        return output
    } catch (e) {
        return null;
    }
}

function get_time_zone_offset() {
    var current_date = new Date();
    return -current_date.getTimezoneOffset() / 60;
}
