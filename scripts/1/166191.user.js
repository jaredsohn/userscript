// ==UserScript==
// @name       Beautify www.meteoam.it forecasts
// @namespace  net.nanomad
// @version    0.3
// @description  Repeats the header and adds spacing between days on www.meteoam.it
// @match      http://www.meteoam.it/?q=ta/previsione/*
// @copyright  2012+, Nanomad <condellog at gmail dot com>
// @require //ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==

function addSpacingToMeteoAM() {
    var $ = unsafeWindow.jQuery;
    var prev = "";
    var prevElem = null;
    $(document).ready(function() {
        var head = $("table#previsioniOverlTable > tbody > tr:first");
        head.remove();
        
        $("table#previsioniOverlTable > tbody > tr").each(function(idx, elem) {
            var cur = $("td:first", elem).html();
            if(cur !== prev) {
                if(prevElem !== null) {
                    $("td", prevElem).css({"border-bottom":"1px solid black"});
                }
                prev = cur;
                $(elem).before("<tr height='15px'/>");
                $(elem).before("<tr>"+head.html()+"</tr>");
                $("td", elem).each(function(idx2, elem2) {
                    $(elem2).css({"border-top": "1px solid black"});
                });
            } else {
                prevElem = $(elem);
            }
        });
        $("table#previsioniOverlTable > tbody > tr:last > td").css({"border-bottom":"1px solid black"});
    });
}

addSpacingToMeteoAM();