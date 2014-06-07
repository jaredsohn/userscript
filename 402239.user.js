// ==UserScript==

// @name        alleturniere.de Umsortierung
// @namespace   https://github.com/mcs/*
// @description Sortiert Ergebniszeilen um
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// @include     */sport/teammatch.*
// @include     */sport/matchresult.*
// @grant       none
// @version     0.1
// ==/UserScript==

(function ($) {
    "use strict";

    var matchresultTbodySelector = 'fieldset.matchresult > table > tbody';
    var teammatchTbodySelector = 'table.matches > tbody';
    var tbody = document.querySelector(matchresultTbodySelector + ', ' + teammatchTbodySelector),
        rows = document.querySelectorAll(matchresultTbodySelector + ' > tr[id^="itemrow"], ' + teammatchTbodySelector + ' > tr');

    // Use different background for every second row even after resorting
    function highlightEvenRows(event, ui) {
        var $item = $(ui.item);
        $item.parent().find("tr").each(function (index, element) {
            var $elem = $(element);
            console.log("%o", element);
            if (index % 2 === 0) {
                $elem.removeClass('gray');
            } else {
                $elem.addClass('gray');
            }
        });
    }

    // make teammatch page sortable
    $('table.matches > tbody').sortable({
        items: "tr"
    });

    // make matchresult page sortable
    $('fieldset.matchresult > table > tbody').sortable({
        items: "tr[id^='itemrow']",
        update: highlightEvenRows
    });
})(jQuery);

