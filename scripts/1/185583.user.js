// ==UserScript==
// @name        elkjop categorizer
// @namespace   elkjop
// @description AJAX framework to update category field in DB
// @include     http://kisimo.dyndns.org/elkjop/shipment.php*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==



$(document).ready(function() {
    $("select").bind('change', function() {
        i = $(this).parent().prev().html();
        c = $(this).prop('selectedIndex');
        $.post("http://kisimo.dyndns.org/elkjop/update_db.php", {item: i, cat: c});
    });
});