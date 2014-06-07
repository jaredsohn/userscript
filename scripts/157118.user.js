// ==UserScript==
// @name        MyFitnessPal Favourite Items Filter
// @author	Jack Webster
// @namespace   http://www.fiendishsoftware.co.uk/
// @description search stuff
// @include     http://www.myfitnesspal.com/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.js
// ==/UserScript==


$('#search').keyup(function(e) {
    var searchval = $('#search').val();

    if (searchval == '')
    {
        $('.table0 tr').css('display','table-row');
    } else {
        $('.table0 tr').css('display','none');
        $('.table0 tr:contains(' + searchval + ')').css('display','table-row');
    }
});