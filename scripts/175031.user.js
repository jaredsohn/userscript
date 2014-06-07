// Booking.com comments translator
// version 0.1
// 2013-08-04
// Copyright (c) 2013, Bartosz Piec
// Released under the MPL license
// http://www.mozilla.org/MPL/
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// If you want, you can configure the Included and Excluded pages in
//  the GreaseMonkey configuration.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Booking.com comments translator", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Adds link for translating booking.com comments via Google Translate
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Booking.com comments translator
// @namespace      http://www.dabarto.pl/projects/greasemonkey/booking.com_comments_translator
// @grant          none
// @include        http://www.booking.com/*
// @include        http://booking.com/*
// @include        https://www.booking.com/*
// @include        https://booking.com/*
// ==/UserScript==

var comments = document.querySelectorAll('.cell_comments');
for (var c in comments) {
    var comment = comments[c];

    var good = comment.querySelector('.comments_good');
    var bad = comment.querySelector('.comments_bad');

    var text = good.textContent;
    if (bad) {
        text += '---------' + bad.textContent;
    }

    var a = document.createElement('a');
    a.setAttribute('href', 'http://translate.google.com/#auto/pl/' + text);
    a.setAttribute('target', '_blank');
    a.innerHTML = 'Przet&#322;umacz';

    var div = document.createElement('div');
    div.appendChild(a);
    comment.appendChild(div);
}