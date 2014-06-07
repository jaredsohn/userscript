// ==UserScript==
// @name           Au
// @namespace      sadas
// @description    sadsads
// @include        *giftonline.pl*

// ==/UserScript==

var Boutique = 'Orange';
if (document.getElementById('gift_form_first'))
window.location = $('.gift_form_firstTitle:contains("'+Boutique+'")').parent('a').attr('href');