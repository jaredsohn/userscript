// ==UserScript==
// @name       Add Totals in PayPal
// @namespace  http://affinitysearch.com/
// @version    0.1
// @description  enter something useful
// @match      https://*.paypal.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

function roundToDec(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

$(document).ready(function(){
    $("div.datatable > div.title").append('<p id="getTotals" style="float:right; padding-right: 10px;"><a href="javascript:void(0);">Get Totals</a></p>').children("#getTotals").click(function(){
        var totals = 0;
        $("div.datatable tbody tr").each(function(){
            if ($(this).children("td.paymentTypeInfo").text() == "Payment To"){
                var amt = $(this).children("td.cur_val").first().text().substr(2);
                totals += parseFloat(amt);
            }
        });
        alert("$" + roundToDec(totals, 2) + "\r\nHit Ctrl+C to copy");
    });
});