// ==UserScript==
// @name        IB BRI autocomplete
// @namespace   Tegarmaji
// @description turn on the autocomplete of IB BRI's login form
// @include     https://ib.bri.co.id/ib-bri/Login.html
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant $
// @version     1
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

$('input[name="j_plain_username"]').attr('autocomplete', 'on');
$('input[name="j_plain_password"]').attr('autocomplete', 'on');
$('input[name="j_captcha"]').focus();