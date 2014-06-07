// ==UserScript==
// @name       Plonk-skripto por Lernu!
// @namespace  http://meeuw.org/lernu/plonki
// @version    0.1
// @match      http://eo.lernu.net/komunikado/forumo/*
// @copyright  2013, mihxil
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

// Jen listo de la uloj kies reagojn vi ne plu povas vid. Ŝanĝu laŭ gusto.
var plonkuloj = ['Francisko1', 'Lakiro'];

$(document).ready(function() {
    $('span.uzantonomo a').each(function () {
        var nomo = this.textContent;
        if ($.inArray(nomo, plonkuloj) >= 0) {
            var tr =  $(this).closest("tr");
            tr.next().remove();
            tr.next().remove();
            tr.next().remove();
            tr.remove();
        }
    });
});
