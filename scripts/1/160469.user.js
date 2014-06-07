// ==UserScript==
// @name        750 Words Navigation
// @namespace   http://github.com/nietky
// @description Turns blank margins at 750words.com into prev/next day nav buttons
// @include     http://750words.com*
// @include     https://750words.com*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

months_dict = {1: 'January',
               2: 'February',
               3: 'March',
               4: 'April',
               5: 'May',
               6: 'June',
               7: 'July',
               8: 'August',
               9: 'September',
               10: 'October',
               11: 'November',
               12: 'December'};

$(document).ready(function () {
    var current = window.location.pathname;
    if (current.match(/archive\//) != null) {
        // Fix the broken 'Stats' link in the header:

        $('h1 a[href]').attr('href', current.replace('archive', 'statistics'));
    }
});

$(document).click(function (e) {
    var page_width = $(document).width();
    var current = window.location.pathname;
    if (current == '/') {
        day_match = new Date().toDateString();
    } else {
        day_match = current.match(/\d\d\d\d-\d\d-\d\d/);
        if (day_match != null) {
            day_match = day_match[0];
        }
    }
    month_match = current.match(/\d\d\d\d\/\d{1,2}/);
    if (month_match != null) {
        month_match = month_match[0];
        var month_prefix = current.match(/(statistics|archive)/)[0];
    }
    entries_match = current.match(/entries\/(stats|share)/);
    if (entries_match != null) {
        var entries_href = $('div.big strong a').attr('href');
        entries_match = entries_href.match(/\d\d\d\d-\d\d-\d\d/);
        if (entries_match != null) {
            entries_match = entries_match[0];
            entries_type = current.match(/(stats|share)/)[0];
        }
    }
    if (day_match != null) {
        page_date = new Date(day_match);
        var new_date = null;
        if (e.pageX < page_width / 2) {
            new_date = new Date(page_date.getTime() - (24 * 60 * 60 * 1000));
        } else if (e.pageX > page_width / 2) {
            new_date = new Date(page_date.getTime() + (24 * 60 * 60 * 1000));
        }
        var year = new_date.getFullYear();
        var month = new_date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = new_date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        window.location = '/day/' + year + '-' + month + '-' + day;
    } else if (month_match != null) {
        month_date = new Date(month_match.replace('/', '-') + '-01');
        var new_month = null;
        if (e.pageX < page_width / 2) {
            // 1st - 5 days always into the previous month.
            new_month = new Date(month_date.getTime() - (5 * 24 * 60 * 60 * 1000));
        } else if (e.pageX > page_width / 2) {
            // 1st + 40 days always into the next month.
            new_month = new Date(month_date.getTime() + (40 * 24 * 60 * 60 * 1000)); 
        }
        var year = new_month.getFullYear();
        var month = new_month.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        window.location = '/' + month_prefix + '/' + year + '/' + month;
    } else if (entries_match != null) {
        // TODO: get next/prev URIs from /entries/share/... or /entries/stats/... page.

        var prev_day_link = null;
        var next_day_link = null;

        // This is tricky, because on the first day of the month you'll have to do a background
        // request for the previous month's stats page... argghhh it's all going to get tricky
        // quickly.

        $('table#months_progress tbody tr td a img').each(function () {
            var title = $(this).attr('bt-xtitle');
            var entry_date = new Date(entries_match);
            month = entry_date.getMonth() + 1;
            month_name = months_dict[month];
            if (title.match(month_name)) {
                full_match = title.match(month_name + ' ' + entry_date.getDate());
                if (full_match != null) {
                    current_day_link = $(this).parent().attr('href');
                    console.log('Gotcha! ' + current_day_link);
                    return false;
                }
            }
        });
    }
});

$('div').click(function (e) {
    e.stopPropagation();
});