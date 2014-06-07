// ==UserScript==
// @name         Export button for skema.ku.dk
// @namespace    http://mathemaniac.org
// @version      1.1.0
// @description  Adds a calendar export button to skema.ku.dk and sis.ku.dk
// @match        http://skema.ku.dk/*
// @match        https://skema.ku.dk/*
// @match        http://sis.ku.dk/kurser/viskursus.aspx*
// @copyright    2012, Sebastian Paaske Tørholm
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

// skema.ku.dk
$('.header-5-0-5').append('<a href="http://rasmuswriedtlarsen.com/ku-kalender/?url=' + encodeURIComponent(window.location) + '" class="rwl-export">Export to calendar</a>');
$('.rwl-export').css({
    "padding": "2px 0.5em",
    "border": "1px solid silver",
    "text-decoration": "none",
    "text-color": "black",
    "margin-left": "2em"
});

// sis.ku.dk
$('#ctl00_cph_main_kursusindhold_lbl_SkemaoplysningerSWS > a[href*="spreadsheet"]').each(function () {
    var url = $(this).attr('href');
    $(this).after('&nbsp;- <a href="http://rasmuswriedtlarsen.com/ku-kalender/?url=' + encodeURIComponent(url) + '">Export to calendar</a>');
});