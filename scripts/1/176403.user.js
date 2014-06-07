// ==UserScript==
// @name                Sofia Wright 50 Food Names
// @author              Chet Manley
// @version             0.1
// @description         Sofia Wright 50 Food Names
// @include             https://s3.amazonaws.com/*
// @require             http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// v0.1, 2013-08-23     Automatically checks all checkboxes and adds a search link for all of the text for each entry.
//                      ---------------------------------------------------------------------------


$('input[id$="_correct"]').prop('checked', true);
$('.answertext').each(function() {
    $(this).append(' - <a href="http://www.google.com/#q='+$(this).text().trim()+'" target="_blank">Search</a>');;
});