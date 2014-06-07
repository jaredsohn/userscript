// ==UserScript==
// @name        Travian hero auction guard
// @version     1.0.2
// @author      mikrop
// @namespace   T4
// @description
// @include 	http://*.travian*.*/hero_auction.php?action=bids&page=*&a=*&z=*
// @include 	http://*.travian*.*/hero_auction.php?page=*&filter=&a=*&z=*
// @require     http://code.jquery.com/jquery-1.7.1.min.js
// @exclude 	http://*.travian*.*/
// ==/UserScript==

D = {
	en: {
		win : "win"
	},
	cs: {
		win : "vyhrát"
    }
}

function dtext(key) {
    var language = window.navigator.language,
    entxt = typeof D["en"][key] == "undefined" ? "Error" : D["en"][key];
    if (typeof D[language] == "undefined") return entxt;
    if (typeof D[language][key] != "undefined") entxt = D[language][key];
    return entxt;
}

function hero_auction_guard(form) {

    var spieler = $("div.sideInfoPlayer span:first"),
    offer = $(form).find("span:first").html(), // nejvyssi nabidka
    highest = $(form).find("span:first ~ span"),
    maxBid = $(form).find('input[name="maxBid"]');
    maxBid.val(parseInt(offer, 10) + 1);

    if (highest.html() != spieler.html()) { // pokud nemam nejvyssi nabidku

        var splittime = form.parent().parent().prev()
                .find(".time span").eq(0).html().split(":");

        if(splittime[0] > 0 || splittime[1] > 0 || splittime[2] > 0) { // pokud nevyprsel cas

            window.setTimeout(function() {

                var page = $(form).find('input[name="page"]').val(),
                filter = $(form).find('input[name="filter"]').val(),
                a = $(form).find('input[name="a"]').val(),
                z = $(form).find('input[name="z"]').val(),
                url = "http://" + location.host + "/hero_auction.php?page=" + page + "&filter=" + filter + "&a=" + a + "&z=" + z;

//                console.log("--- " + url + " ---");

//                console.log((highest.is(":empty")) ? "Nejnižší nabídka " + offer + ", na kterou nikdo dosud nepřihodil" :
//                "Nejvyžší nabídku " + offer + " dal " + highest.html());

                $.ajax({
                    type: "POST",
                    url: url,
                    data: "maxBid=" + maxBid.val(),
                    success: function (data) {

                        form = $(data).find("form.auctionDetails");

//--- rekurze ----------------------------------------------------------------------------------------------------------

                        hero_auction_guard(form);

                    }
                });

            }, 1000);

        }

    } else {
//        console.log("Moje nejvyžší nabídka " + maxBid.val());
    }

}

function GM_ready() {

    $(document).ready(function() {

        var form = $("form.auctionDetails");
        var submitBid = $(".submitBid").clone();
        $(submitBid).find(".button-contents").html(dtext("win"));
        var winBid = $(submitBid).find(":button");
            winBid.attr("value", dtext("win"));
            winBid.click(function() { return false; }); // zakazeme odeslani
            winBid.bind("click", function() {

                var splittime = form.parent().parent().prev()
                        .find(".time span").eq(0).html().split(":");
                if(splittime[0] > 0 || splittime[1] > 0 || splittime[2] > 0) { // pokud nevyprsel cas
                    hero_auction_guard(form);
                }

            });
        $(winBid.parent()).insertAfter(".submitBid");

    });

}

function GM_wait() {
    if (typeof unsafeWindow.jQuery == "undefined") {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        GM_ready();
    }
}

function GM_include(src){
    var GM_Head = document.getElementsByTagName("head")[0] || document.documentElement,
        GM_JQ = document.createElement("script");

    GM_JQ.src = src;
    GM_JQ.type = "text/javascript";
    GM_JQ.async = true;

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
}

(function() {
    if (typeof unsafeWindow.jQuery == "undefined") {
        GM_include("http://code.jquery.com/jquery-1.7.1.min.js");
    }
    GM_wait();
})();
