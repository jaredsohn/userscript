// ==UserScript==
// @name        truckingsim
// @namespace   http://*truckingsim.com
// @description Truckingsim
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant		none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var valor;

valor = $('input:text[name="speed"]').val();
valor = parseInt(valor)+5;
$('input:text[name="speed"]').val(valor);