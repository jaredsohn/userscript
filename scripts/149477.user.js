// ==UserScript==
// @name       Reddit sidebar and ad remover
// @version    0.1
// @match      http://www.reddit.com/*
// @copyright  2012+, Cosmin Parvulescu
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    $('.side').remove();
    $('#siteTable_organic').remove();
});