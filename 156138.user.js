// ==UserScript==
// @name       RYM: highlight album rows
// @version    0.1
// @description  click album row to highlight on artist page
// @match      http://rateyourmusic.com/artist/*
// @copyright  2013+, thought_house
// ==/UserScript==

var $ = unsafeWindow.jQuery; 
$('html > head').append('<style>tr.highlight_album_row_userscript { background-color: #D5FFD5 }</style>');

$('table.mbgen[id^="album_disc_"] tr > td:nth-child(2)').live('click', function(event) {
    $('tr.highlight_album_row_userscript').removeClass('highlight_album_row_userscript');
    $(this).closest('tr').addClass('highlight_album_row_userscript');
});