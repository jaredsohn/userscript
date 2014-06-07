// ==UserScript==
// @name       Client Services Filter
// @namespace  http://bigcommerce.com/
// @version    0.1
// @description  Filter out Client Services in Campfire
// @copyright  2013, Robert Hunter
// @require http://code.jquery.com/jquery-latest.min.js
// @match https://bigcommerce.campfirenow.com/room/354991/transcript/*
// ==/UserScript==
$(document).ready(function(){
$('tr.message').hide();
$('.message .body:contains("Client")').parent().show();
});