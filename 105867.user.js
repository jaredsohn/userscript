/**
 *
 * This is a Greasemonkey script and must be run using a Greasemonkey-compatible browser.
 *
 * @author maymay <bitetheappleback@gmail.com>
 */
// ==UserScript==
// @name           Better FetLife
// @version        0.2
// @namespace      com.maybemaimed.fetlife.better
// @updateURL      https://userscripts.org/scripts/source/105867.user.js
// @description    Enhances the functionality of various features of FetLife.com. Best used in conjunction with other browser add-ons, such as those that reveal Microformats.
// @include        /^https?://fetlife\.com/(user|event)s/\d+/
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant          GM_log
// ==/UserScript==

FL_BETTER = {};
FL_BETTER.CONFIG = {
    'debug': false, // switch to true to debug.
};

// Utility debugging function.
FL_BETTER.log = function (msg) {
    if (!FL_BETTER.CONFIG.debug) { return; }
    GM_log('BETTER FETLIFE: ' + msg);
};

// Initializations.
var uw = (unsafeWindow) ? unsafeWindow : window ; // Help with Chrome compatibility?
FL_BETTER.init = function () {
    FL_BETTER.main();
};
window.addEventListener('DOMContentLoaded', FL_BETTER.init);

// This is the main() function, executed on page load.
// TODO: Mark up events on user pages and users on event pages.
FL_BETTER.main = function () {
    // Determine what type of page and what its ID number is.
    var m = window.location.pathname.match(/^\/(user|event)s\/(\d+)$/);
    FL_BETTER.log('Loaded page for ' + m[1] + ' number ' + m[2] + '.');
    switch (m[1]) {
        // If on a user profile page,
        case 'user':
            // Add hCard classes for markup that's done right.
            $('#profile').addClass('vcard');
            $('#profile .pan').addClass('photo');
            $('h2.bottom + p').addClass('adr');
            $($('h2.bottom + p a[href^="/cities"]')).addClass('locality');
            $($('h2.bottom + p a[href^="/administrative_areas"]')).addClass('region');
            $($('h2.bottom + p a[href^="/countries"]')).addClass('country-name');

            // Isolate name and add microformat markup.
            $($('h2.bottom').contents()[0]).wrap('<span class="fn" />');

            // Isolate "About me" content and add microformat markup.
            $($('h3.bottom::first-child').nextUntil('h3.bottom')).wrapAll('<div class="note" />')

            // Write out URL.
            $('#profile').append('<a style="display: none;" class="url" href="' + window.location.href + '">Make FetLife Better.</a>');
        break;

        // If on an event page,
        case 'event':
            $('body').addClass('vevent');
            $('h1[itemprop=name]').addClass('summary');
            $('[itemprop=description]').addClass('description');

            // TODO: Parse venues out of location data and mark them up using hCards
            //       See: http://microformats.org/wiki/hcalendar-brainstorming#hCard_locations
            $($('[itemprop=location]').parents().children('span')[1]).addClass('location');

            var start = $('[itemprop=startDate]').attr('content');
            var end = $('[itemprop=endDate]').attr('content');
            $($('[itemprop=startDate]').parents('.db')).addClass('dtstart');
            $($('[itemprop=startDate]').parents('.db')).attr('title', start.substr(0, start.length - 1)); // remove "Z" timezone.
            $($('[itemprop=endDate]').parent()).addClass('dtend');
            $($('[itemprop=endDate]').parent()).attr('title', end.substr(0, end.length - 1));

            // Write out URL.
            $('.vevent .description').append('<a style="display: none;" class="url" href="' + window.location.href + '">Make FetLife Better.</a>');
        break;
    }
};

/**
 * Takes in the human time string and a Date object and returns the
 * modified Date object.
 */
function setHumanTime (str, obj_date) {
    // str will be something like "07:00 PM"
    var t = str.match(/[0-9]{2}:[0-9]{2}/).toString();
    var hrs = parseInt(t.split(':')[0], 10); // include decimal radix purposefully
    var min = parseInt(t.split(':')[1], 10);
    // If PM is present, add 12.
    if (str.match(/ PM$/)) {
        hrs += 12;
    }

    obj_date.setHours(hrs);
    obj_date.setMinutes(min);

    return obj_date;
}

// Copied directly from
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date#Example.3a_ISO_8601_formatted_dates
function ISODateString(d){
 function pad(n){return n<10 ? '0'+n : n}
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'
}
