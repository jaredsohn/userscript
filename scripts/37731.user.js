// ==UserScript==
// @name           Hidden Price Revealer
// @namespace      cavingdeep
// @description    Reveals some hidden prices on Newegg.com
// @include        http://www.newegg.com/*
// ==/UserScript==

function GM_LoadjQuery() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://code.jquery.com/jquery-latest.pack.js";
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    waitForScriptLoading();
}

function waitForScriptLoading() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(waitForScriptLoading, 100);
    } else {
        unsafeWindow.jQuery.noConflict();
        $ = unsafeWindow.jQuery;
        letsjQuery();
    }
}

function letsjQuery() {
    $('.lowestPrice a').each(revealPrice);
    $('.dealBlk .map a').each(revealPrice);
}

function revealPrice() {
    var a = $(this);
    var priceUrl = a.attr("onclick").toString().match(/http:[^'"]+/)[0];

    $.get(
        priceUrl,
        function(data) {
            var finalPrice = $('.final', $(data)).text();
            a.replaceWith(finalPrice);
        });
}

GM_LoadjQuery();
