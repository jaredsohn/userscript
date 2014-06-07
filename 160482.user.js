// ==UserScript==
// @name           AutoBuy
// @namespace      Hunt
// @include        https://order.ibood.com/nl/nl/order_request/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $("input[pmmethod=ideal]").click();
    $("#issuerID-id-"+$("input[pmmethod=ideal]").val()+" option:contains(Rabobank)").attr('selected', 'selected');
$(".submit-button").click();

});