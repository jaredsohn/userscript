// ==UserScript==
// @name        Dynamic Time Display
// @namespace   http://bibilotik.org
// @description Display dynamically-updated "time ago" values, updating once/minute
// @include     http://bibliotik.org/*
// @require     http://userscripts.org/scripts/source/331989.user.js
// @require     http://timeago.yarp.com/jquery.timeago.js
// @require     http://momentjs.com/downloads/moment-with-langs.min.js
// @version     5
// ==/UserScript==

if (!$.proxy) {
    // Bibliotik's jQuery doesn't define this function, but timeago needs it
    $.proxy = function (f, ctx) {
        return function() { f.apply(ctx, arguments); }
    }
}

// Format things Bibliotik style, w/two levels of detail
var units = ["years", "months", "days", "hours", "minutes"];

$.timeago.inWords = function (millis) {
    var dur = moment.duration(millis);
    var values = [];
    var t = null, u = null;
    for (i=0; i<units.length && values.length<2; i++) {
        if (t = dur[u = units[i]]())
            values.push(t+" "+ ((t==1) ? u.substring(0,u.length-1) : u));
    }
    return values.length ? values.join(', ')+' ago' : '< 1 minute ago';    
}

// Don't refresh individual items; we'll do them in bulk for the whole page, to
// conserve interval timers and reduce runtime overhead.  We could probably do
// even better by only updating when the mouse moves on the page, but that's a
// bit more complicated.

$.timeago.settings.refreshMillis = 0;
function bulkUpdate() { $('time').timeago(); }
bulkUpdate(); setInterval(bulkUpdate, 60000);
