// ==UserScript==
// @name           Licz te rawy
// @version        1.0
// @namespace      http://www.erepublik.com
// @require	   https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include	   http://www.erepublik.com/en/economy/*
// ==/UserScript==

jQuery(document).ready(function() {
var salt = $('img[alt="Saltpeter Mine"]').length;
var rubber = $('img[alt="Rubber Plantation"]').length;
$('div.listing_holder').prepend('<h4>SALT: ' + salt + ' | RUBBER: '+rubber+'</h4>');
});