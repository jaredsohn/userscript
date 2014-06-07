// ==UserScript==
// @name        WatchESPN Live Filter
// @namespace   http://www.quickmare.com/userscripts
// @description Adds a filter box to the "Live Now" list on the WatchESPN video page. Simply type any regular expression into the box to restrict which games are shown. Makes switching between games quicker/easier.
// @include     http://espn.go.com/watchespn/player/*
// @version     3
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

clear = $('<span>x</span>').css({
    'color': '#EEE',
    'display': 'block',
    'position': 'absolute',
    'top': '26px',
    'right': '6px',
    'cursor': 'pointer',
});

function execute_filter(filter) {
    sessionStorage.setItem('greasemonkey_filter', filter);
    if (filter == '') {
        clear.hide();
    } else {
        clear.show();
    }

    var pattern = new RegExp(filter, 'i');
    $('#liveNow .mod-content li').each(function() {
        label = $(this).find('a').html()
        if (label.search(pattern) == -1) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

var filterbox = $('<input type="text">').keyup(function() {
    execute_filter($(this).val());

}).focus(function() {
    $(this).attr('placeholder', '');
}).blur(function() {
    $(this).attr('placeholder', 'Filter...');
}).trigger('blur').css({
    'width': '292px',
    'background-color': '#2F2F2F',
    'color': '#EEE',
    'border': '1px solid gray',
    'padding': '2px 5px 2px',
});

clear.click(function() {
    filterbox.val('');
    execute_filter('');
});

var old_filter = sessionStorage.getItem('greasemonkey_filter');
if (old_filter == '' || old_filter == null) {
    clear.hide();
} else {
    filterbox.val(old_filter);
    execute_filter(old_filter);
}

$('#liveNow').css('position', 'relative');
$('#liveNow .Open').after(filterbox);
filterbox.after(clear);
