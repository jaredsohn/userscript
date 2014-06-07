// ==UserScript==
// @name       Hide contact info column - Gmail
// @namespace  redactive
// @version    2.1
// @description  Hide contact info column - Gmail 
// @match      https://mail.google.com/*
// @require    http://code.jquery.com/jquery-1.7.2.min.js
// @copyright  Ben Cragg
// ==/UserScript==

$('*').each(function() {
    $(this).click(function() {
        $('table.Bs.nH.ao9.id.UG tr td.Bu:last').delay(200).hide();
    });
});
