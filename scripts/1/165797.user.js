// ==UserScript==
// @name       Bitfinex-Lendr
// @namespace  http://api.mccoyspace.com/
// @version    0.0.1
// @description  Lending Enhancements for Bitfinex
// @updateURL  https://userscripts.org/scripts/source/165797.meta.js
// @installURL https://userscripts.org/scripts/source/165797.user.js
// @match      https://www.bitfinex.com/*
// @match      https://bitfinex.com/*
// @copyright  2013, mccoyspace <info@mccoyspace.com>, AGPLv3
// @grant      none
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;

window.update_credits = function update_credits() {
    $(".ajax-loader#credits").show();
    $.get("/credit/_credits", function (e) {
        $("div#credits").html(e);
        var credit_total_usd_volume = 0;
        var credit_total_btc_volume = 0;
        var credit_total_usd_rate = 0;
        var credit_total_btc_rate = 0;
        //new2
        var credit_total_usd_offered = 0;
        var credit_total_usd_demand = 0;
        var credit_total_btc_offered = 0;
        
        var usd_variable_interest_rate = 0;
        
        //end new2
        
        
        //new - isolate VIR data from table
        var rate_text = $("div#usdoffers > table > tbody > tr:eq(0) > td:eq(3)").text();
        usd_variable_interest_rate = rate_text.slice(66, 72);
        
       
        $("div#credits > table > thead > tr:eq(1) > th:eq(2)").html("Rate (% per 365 days) (Net Interest (per day)) *");        
        $("div#credits > table > tbody > tr").each(function(index) {
            var tds = $(this).children();
            if (tds.eq(0).prop("colspan") == "6") {
                return;
            }
		// new if/then to handle the V.I.R. loans
            if (tds.eq(2).text() !=="Variable Interest Rate") {
            var rate = (tds.eq(1).text() * tds.eq(2).text().match(/(\d+\.\d+)%/)[1] / 100) * .9;
            if (tds.eq(0).text() == "USD") {
                credit_total_usd_volume += (tds.eq(1).text() * 1);
                tds.eq(2).html(tds.eq(2).html() + " ($" + (rate / 365).toFixed(4) + ")");
                credit_total_usd_rate += (rate * 1);
            } else if (tds.eq(0).text() == "BTC") {
                credit_total_btc_volume += (tds.eq(1).text() * 1);
                tds.eq(2).html(tds.eq(2).html() + " (" + (rate / 365).toFixed(4) + ")");
                credit_total_btc_rate += (rate * 1);
                } 
            // V.I.R. processor
            } else {
            var rate = (tds.eq(1).text() * usd_variable_interest_rate / 100) * .9;
            if (tds.eq(0).text() == "USD") {
                credit_total_usd_volume += (tds.eq(1).text() * 1);
                tds.eq(2).html(tds.eq(2).html() + " ($" + (rate / 365).toFixed(4) + ")");
                credit_total_usd_rate += (rate * 1);
            } else if (tds.eq(0).text() == "BTC") {
                credit_total_btc_volume += (tds.eq(1).text() * 1);
                tds.eq(2).html(tds.eq(2).html() + " (" + (rate / 365).toFixed(4) + ")");
                credit_total_btc_rate += (rate * 1);
                }
            }; // end of new if/then
        });
        
        //new2 -- add up all the USD on offer
        $("div#usdoffers > table > tbody > tr").each(function(index) {
            var tdx = $(this).children();
            if (tdx.eq(0).prop("colspan") == "4") {
                return;
            }
            
            var offer = Math.round(tdx.eq(4).text() * 1);
            credit_total_usd_offered += offer;
        });
        
        
        
        //add up all the USD demanded
        $("div#usdloans > table > tbody > tr").each(function(index) {
            var tda = $(this).children();
            if (tda.eq(0).prop("colspan") == "4") {
                return;
            }
            
            var demand = Math.round(tda.eq(2).text() * 1);
            credit_total_usd_demand += demand;
        });
        
        //add up all the BTC on offer
        $("div#btcoffers > table > tbody > tr").each(function(index) {
            var tdb = $(this).children();
            if (tdb.eq(0).prop("colspan") == "4") {
                return;
            }
            
            var offer2 = Math.round(tdb.eq(4).text() * 1);
            credit_total_btc_offered += offer2;
        });
             
        
        //end new2
        
        $("div#account_overview td#deposit_rates_usd_apr").html(credit_total_usd_volume ? (100 * credit_total_usd_rate / credit_total_usd_volume).toFixed(1) + "%" : "");
        $("div#account_overview td#deposit_rates_btc_apr").html(credit_total_btc_volume ? (100 * credit_total_btc_rate / credit_total_btc_volume).toFixed(1) + "%" : "");
        $("div#account_overview td#deposit_rates_usd_interest").html((credit_total_usd_rate / 365).toFixed(4));
        $("div#account_overview td#deposit_rates_btc_interest").html((credit_total_btc_rate / 365).toFixed(4));
         //new2
        $("div#account_overview td#credit_total_usd_offered").html(credit_total_usd_offered);
        $("div#account_overview td#credit_total_usd_demand").html(credit_total_usd_demand);
        $("div#account_overview td#credit_total_btc_offered").html(credit_total_btc_offered);
        
        $("div#account_overview td#usd_variable_interest_rate").html(usd_variable_interest_rate);
        //end new2
        $(".ajax-loader#credits").hide();
    });
}

var cloudflared = false;

function cloudflareflare_poller() {
    if (!window.cloudflared && $("iframe#cloudflareflare").contents().find("form#ChallengeForm").length > 0) {
        window.cloudflared = true;
        $("a.btn.btn-order").css("display: none");
        $("a.btn.btn-order.btn-cloudflared").css("display: block");
    } else if (window.cloudflared && $("iframe#cloudflareflare").contents().find("div.brand").length > 0) {
        window.cloudflared = false;
        $("a.btn.btn-order > p").css("display", "block");
        $("a.btn.btn-order > img.loading").css("display", "none");
        $("a.btn.btn-order").css("display: block");
        $("a.btn.btn-order.btn-cloudflared").css("display: none");
    } else if (!window.cloudflared && $("iframe#cloudflareflare").contents().find("div.brand").length > 0) {
        $("a.btn.btn-order > p").css("display", "block");
        $("a.btn.btn-order > img.loading").css("display", "none");
        $("#cloudflareflare").attr("src", "about:blank");
    } else if (!window.cloudflared && $("iframe#cloudflareflare").contents().find("body > div.dialog > h1").length > 0) {
        $("a.btn.btn-order > p").css("display", "block");
        $("a.btn.btn-order > img.loading").css("display", "none");
        $("#cloudflareflare").attr("src", "about:blank");
    }
}




if (window.location.href.match(/^https:\/\/(?:www\.)?bitfinex.com\/credit/)) {

    $("div.brand h1").text("Bitfinex - Lendr+");

    window.showHideBorrowRate();
    window.showHideLendRate();

    $("div#account_overview")
        .append('<div class="wallets"><table class="data"><tbody>' +
        '<tr><td>USD Rate (%/year):</td><td id="deposit_rates_usd_apr"></td></tr>' +
        '<tr><td>USD Interest (/day):</td><td id="deposit_rates_usd_interest"></td></tr>' +
        '<tr><td>BTC Rate (%/year):</td><td id="deposit_rates_btc_apr"></td></tr>' +
        '<tr><td>BTC Interest (/day):</td><td id="deposit_rates_btc_interest"></td></tr>' +
        //new2
        '<tr><td>total USD on offer</td><td id="credit_total_usd_offered"></td></tr>' +
        '<tr><td>total USD demand</td><td id="credit_total_usd_demand"></td></tr>' +
        '<tr><td>total BTC on offer</td><td id="credit_total_btc_offered"></td></tr>' +
        
        '<tr><td>USD VIR = </td><td id="usd_variable_interest_rate"></td></tr>' +
        
        //end new2
        '</tbody></table></div>');

    $("table.lending.trade").wrap('<div style="height: 480px; overflow: auto" />');
    $("table.lending.trade > tbody > tr > td").css("vertical-align", "top");

    window.update_wallets();
    window.update_offers();
    window.update_credits();
    window.update_loans();
    window.update_positionloans();
    window.update_usdoffers();
    window.update_btcoffers();
    window.update_usdloans();
    window.update_btcloans();

    setInterval(window.update_wallets, 4000);
    setInterval(window.update_offers, 4000);
    setInterval(window.update_credits, 4000);
    setInterval(window.update_loans, 4000);
    setInterval(window.update_positionloans, 4000);
    setInterval(window.update_usdoffers, 8000);
    setInterval(window.update_btcoffers, 8000);
    setInterval(window.update_usdloans, 8000);
    setInterval(window.update_btcloans, 8000)

}

