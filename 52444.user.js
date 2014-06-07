// ==UserScript==
// @name           Swiss Bank Deposit Slip
// @namespace      http://bobthecow.info
// @description    Autofill the Swiss Bank deposit slip
// @include        http://playspymaster.com/swiss_bank
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

jQuery.noConflict();
jQuery(function($){$("#transaction-amount-field").val($("#liquid-assets-balance .amount").eq(0).attr('raw').replace(/,/g, ''));});