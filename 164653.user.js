// ==UserScript==
// @name       Bitfinex+
// @namespace  http://userscripts.milliways.fr/
// @version    0.2.9.1
// @description  Extra bits for Bitfinex
// @updateURL  https://userscripts.org/scripts/source/164653.meta.js
// @installURL https://userscripts.org/scripts/source/164653.user.js
// @match      https://classic.bitfinex.com/*
// @copyright  2013+, Obey Arthur Liu <arthur@milliways.fr>, AGPLv3
// @grant      none
// @require    https://userscripts.org/scripts/source/145813.user.js
// ==/UserScript==

var $ = window.jQuery;

$("div.brand h1").text("Bitfinex+");

GM_addStyle(
  ".bfxp-highlight {" +
  "  background-color: yellow;" +
  "}");

function update_buy_value() {
    var pair = document.getElementsByName('pair')[0].value.toLowerCase();
    if (!$('option#buy_market')[0].selected) {
        $('#buy_value').val($('#amount').val() * $('#buy_price').val());
    } else {
        $('#buy_value').val($('#amount').val() * $('#bid-' + pair).text());
    }
}

function update_buy_amount() {
    var pair = document.getElementsByName('pair')[0].value.toLowerCase();
    if (!$('option#buy_market')[0].selected) {
        $('#amount').val($('#buy_value').val() / $('#buy_price').val());
    } else {
        $('#amount').val($('#buy_value').val() / $('#bid-' + pair).text());
    }
}

function update_sell_value() {
    var pair = document.getElementsByName('pair')[1].value.toLowerCase();
    if (!$('option#sell_market')[0].selected) {
        $('#sell_value').val($('#amount').val() * $('#sell_price').val());
    } else {
        $('#sell_value').val($('#amount').val() * $('#ask-' + pair).text());
    }
}
        
function update_sell_amount() {
    var pair = document.getElementsByName('pair')[1].value.toLowerCase();
    if (!$('option#sell_market')[0].selected) {
        $('#amount').val($('#sell_value').val() / $('#sell_price').val());
    } else {
        $('#amount').val($('#sell_value').val() / $('#ask-' + pair).text());
    }
}

var platform_routing_map = {};
platform_routing_map[""] = "";
platform_routing_map["MTGOX"] = "";
platform_routing_map["BFX"] = "BFX";
platform_routing_map["BSTP"] = "BSTP";

var platform_fee_map = {};
platform_fee_map["BFX"] = 0.12;
platform_fee_map["BSTP"] = 0.35;

add_fill_platform = function(source, platform) {
  source.on("click", function(td) {
    $("#routingSet").prop("checked", true);
    window.toggleObjectDisplay('routingSet','RoutingToHide','routing');
    $("#routing").val(platform_routing_map[platform]);
  });
}

add_buy_sell = function(source, price) {
  source.on("click", function(td) {
    $("option#buy_limit").prop("selected", true);
    window.showHideSellPrice();
    $("#buy_price").val(price);
    update_buy_value();
  });
}

add_fill_sell = function(source, price) {
  source.on("click", function(td) {
    $("option#sell_limit").prop("selected", true);
    window.showHideSellPrice();
    $("#sell_price").val(price);
    update_sell_value();
  });
}

add_fill_amount = function(source, amount) {
  source.on("click", function(td) {
    $("#amount").val(amount);
    update_sell_value();
  });
}

add_hover_highlight = function(source, target) {
  source.css("cursor", "pointer").hover(
    function() { target.addClass("bfxp-highlight"); }, 
    function() { target.removeClass("bfxp-highlight"); }
  );
}

parseCurFloat = function(f) {
  return parseFloat(f.replace(",", ""))
}

window.update_bids = function() {
    var pair = document.getElementsByName('pair')[0].value.toLowerCase();
    $(".ajax-loader#bids").show();
    $.get("/trading/_bids/" + pair, function (e) {
        $("div#bids").html(e);
        $("div#bids > table > thead > tr:eq(0) > th").prop("colspan", "6");
        $("div#bids > table > thead > tr:eq(1) > th:eq(2)").after("<th>With Fees</th>");
        $("div#bids > table > tbody > tr").each(function(index) {
            var tds = $(this).children();
            var platform_td = tds.eq(0);
            var count_td = tds.eq(1);
            var price_td = tds.eq(2);
            var amount_td = tds.eq(3);
            var cum_amount_td = tds.eq(4);

            var cum_amount = parseCurFloat(cum_amount_td.text());
            var amount = parseCurFloat(amount_td.text());
            var price_match = price_td.text().match(/[0-9,]+\.([0-9]+)/);
            var price = parseCurFloat(price_match[0]);
            var price_digits = price_match[1].length;
            var platform = platform_td.text();
            var slipped_price = price / (1 + platform_fee_map[platform] / 100);
            var slipped_price_cur = price_td.text().replace(/[0-9,\.]+/, slipped_price.toFixed(price_digits));
            price_td.after('<td class="green">' + slipped_price_cur + '</td>');

            add_fill_platform(platform_td, platform);
            add_hover_highlight(platform_td, $("#routingSetWrap,#routing").add(platform_td));
            add_fill_platform(cum_amount_td, "");
            add_fill_amount(cum_amount_td, cum_amount);
            add_hover_highlight(cum_amount_td, $("#routingSetWrap,#routing,#sell_price,#sell_type,#amount").add($(this)));
            add_fill_sell(price_td.add(cum_amount_td), price);
            add_hover_highlight(price_td, $("#sell_price,#sell_type").add(price_td));
            add_fill_amount(amount_td, amount);
            add_hover_highlight(amount_td, $("#amount").add(amount_td));
            });
        $(".ajax-loader#bids").hide();
    });
}

window.update_asks = function() {
    var pair = document.getElementsByName('pair')[1].value.toLowerCase();
    $(".ajax-loader#asks").show();
    $.get("/trading/_asks/" + pair, function (e) {
        $("div#asks").html(e);
        $("div#asks > table > thead > tr:eq(0) > th").prop("colspan", "6");
        $("div#asks > table > thead > tr:eq(1) > th:eq(2)").before("<th>With Fees</th>");
        $("div#asks > table > tbody > tr").each(function(index) {
            var tds = $(this).children();
            var platform_td = tds.eq(4);
            var count_td = tds.eq(3);
            var price_td = tds.eq(2);
            var amount_td = tds.eq(1);
            var cum_amount_td = tds.eq(0);
            

            var cum_amount = parseCurFloat(cum_amount_td.text());
            var amount = parseCurFloat(amount_td.text());
            var price_match = price_td.text().match(/[0-9,]+\.([0-9]+)/);
            var price = parseCurFloat(price_match[0]);
            var price_digits = price_match[1].length;
            var platform = platform_td.text();
            var slipped_price = price * (1 + platform_fee_map[platform] / 100);
            var slipped_price_cur = price_td.text().replace(/[0-9,\.]+/, slipped_price.toFixed(price_digits));
            price_td.before('<td class="red">' + slipped_price_cur + '</td>');

            add_fill_platform(platform_td, platform);
            add_hover_highlight(platform_td, $("#routingSetWrap,#routing").add(platform_td));
            add_fill_platform(cum_amount_td, "");
            add_fill_amount(cum_amount_td, cum_amount);
            add_hover_highlight(cum_amount_td, $("#routingSetWrap,#routing,#buy_price,#buy_type,#amount").add($(this)));
            add_fill_sell(price_td.add(cum_amount_td), price);
            add_hover_highlight(price_td, $("#buy_price,#buy_type").add(price_td));
            add_fill_amount(amount_td, amount);
            add_hover_highlight(amount_td, $("#amount").add(amount_td));
            });
        $(".ajax-loader#asks").hide();
    });
}

var positions_expanded = false;

window.update_positions = function() {
    $(".ajax-loader#positions").show();
    $.get("/trading/_positions", function (e) {
        $("div#positions").html(e);
        sort_positions();
        $("table#positions > tbody > tr > td:eq(4)").each(function(index) {
          var position_total = 0;
          var position_currency = "";
          var cell_contents = $(this).contents();
          for (var i = 0; i < cell_contents.length; i++) {
            var cell_match = $(cell_contents[i]).text().match(/([0-9,]+\.\d+)\s+([A-Z]{3})/);
            if (cell_match != null) {
              position_total += parseCurFloat(cell_match[1]);
              position_currency = cell_match[2];
            }
          }
          $(this).html('<div class="position_loans_summary">' + position_total.toFixed(2) + " " + position_currency + '</div>' +
                       '<div class="position_loans_details">' + $(this).html() + '</div>');
        });
        var details = $("table#positions .position_loans_details");
        details.toggle(positions_expanded);
        $("table#positions .position_loans_summary")
          .hover(
            function() { $(this).addClass("bfxp-highlight") },
            function() { $(this).removeClass("bfxp-highlight") }
          ).click(function() { positions_expanded = !positions_expanded; details.toggle('slow'); });
        $(".ajax-loader#positions").hide();
    });
}

var credit_vir_usd = 0;
var credit_vir_btc = 0;
var credit_vir_ltc = 0;

var update_virs = function() {
  $.get("/pages/stats", function(stats_html) {
    credit_vir_usd = parseCurFloat(stats_html.match(/\<td\>USD\<\/td\>\s*\<td\>([0-9,]+\.\d+)%\<\/td\>/)[1]) / 100;
    credit_vir_btc = parseCurFloat(stats_html.match(/\<td\>BTC\<\/td\>\s*\<td\>([0-9,]+\.\d+)%\<\/td\>/)[1]) / 100;
    credit_vir_ltc = parseCurFloat(stats_html.match(/\<td\>LTC\<\/td\>\s*\<td\>([0-9,]+\.\d+)%\<\/td\>/)[1]) / 100;
  });
}

window.update_credits = function update_credits() {
    $(".ajax-loader#credits").show();
    $.get("/credit/_credits", function (e) {
        $("div#credits").html(e);
        var credit_total_usd_volume = 0;
        var credit_total_btc_volume = 0;
        var credit_total_usd_interest = 0;
        var credit_total_btc_interest = 0;
        $("div#credits > table > thead > tr:eq(1) > th:eq(2)").html("Rate (% per 365 days) (Interest (per day)) *");
        $("div#credits > table > tbody > tr").each(function(index) {
            var tds = $(this).children();
            if (tds.eq(0).prop("colspan") == "6") {
              return;
            }
            var amount = parseCurFloat(tds.eq(1).text());
            var currency = tds.eq(0).text();
            if (tds.eq(2).text() == "Variable Interest Rate") {
              var rate = currency == "USD" ? credit_vir_usd : credit_vir_btc;
              tds.eq(2).text("VIR " + (rate * 100).toFixed(2) + "%");
            } else {
              var rate = parseCurFloat(tds.eq(2).text().match(/([0-9,]+\.\d+)%/)[1]) / 100;
            }
            if (currency == "USD") {
                credit_total_usd_volume += amount;
                tds.eq(2).html(tds.eq(2).html() + " ($" + (amount * rate / 365).toFixed(4) + ")");
                credit_total_usd_interest += amount * rate;
            } else if (currency == "BTC") {
                credit_total_btc_volume += amount;
                tds.eq(2).html(tds.eq(2).html() + " (" + (amount * rate / 365).toFixed(4) + ")");
                credit_total_btc_interest += amount * rate;
            };
        });
        $("div#account_overview td#deposit_rates_usd_apr").html(credit_total_usd_volume ? (100 * credit_total_usd_interest / credit_total_usd_volume).toFixed(2) + "%" : "");
        $("div#account_overview td#deposit_rates_btc_apr").html(credit_total_btc_volume ? (100 * credit_total_btc_interest / credit_total_btc_volume).toFixed(2) + "%" : "");
        $("div#account_overview td#deposit_rates_usd_interest").html((credit_total_usd_interest / 365).toFixed(2));
        $("div#account_overview td#deposit_rates_btc_interest").html((credit_total_btc_interest / 365).toFixed(2));
        $(".ajax-loader#credits").hide();
    });
}

function make_value_sticky(name, element) {
  if (element.is("select") || element.is("input:text")) {
    var elem_read = function(elem) { return elem.val() };
    var elem_write = function(elem, value) { element.val(value); elem.change(); };
  } else if (element.is("input:checkbox")) {
    var elem_read = function(elem) { return element.prop("checked") };
    var elem_write = function(elem, value) { elem.prop("checked", value); elem.change(); };
  } else {
    return;
  }
  elem_write(element, GM_getValue(name, elem_read(element)));
  element.change(function() {
    var value = elem_read($(this));
    GM_setValue(name, value);
    $.pnotify({title: "Bitfinex+", text: name + " saved: " + value, type: "info"});
  });
}

if (window.location.href.match(/^https:\/\/classic\.bitfinex\.com\/(?:exchange|trading)/)) {
    var pair = document.getElementsByName('pair')[0].value;
    
    if (pair != 'LTCBTC') {
    $('#control-buy').after('<label class="control-label" for="buy_value" id="buy_value_label">Order value</label><div class="input-append"><input type="text" class="span1" name="buy_value "id="buy_value"></div>');
    $('#buy_price').on('input', update_buy_value)
                   .hover(function() { $("#buy_value").addClass("bfxp-highlight"); },
                          function() { $("#buy_value").removeClass("bfxp-highlight"); });
    $('#buy_value').on('input', update_buy_amount)
                   .hover(function() { $("#amount").addClass("bfxp-highlight"); },
                          function() { $("#amount").removeClass("bfxp-highlight"); });
    update_buy_value();

    $('#control-sell').after('<label class="control-label" for="sell_value" id="sell_value_label">Order value</label><div class="input-append"><input type="text" class="span1" name="sell_value "id="sell_value"></div>');
    $('#sell_price').on('input', update_sell_value)
                    .hover(function() { $("#sell_value").addClass("bfxp-highlight"); },
                           function() { $("#sell_value").removeClass("bfxp-highlight"); });
    $('#sell_value').on('input', update_sell_amount)
                    .hover(function() { $("#amount").addClass("bfxp-highlight"); },
                           function() { $("#amount").removeClass("bfxp-highlight"); });
    update_sell_value();
    }
    
    window.showHideBuyPrice();
    window.showHideSellPrice();

    $('#amount').on('input', function() { update_buy_value(); update_sell_value(); })
                .hover(function() { $("#buy_value,#sell_value").addClass("bfxp-highlight"); },
                       function() { $("#buy_value,#sell_value").removeClass("bfxp-highlight"); });

    $("#routingSet").wrap('<span id="routingSetWrap" />');

    window.update_rates();
    window.update_orders();
    window.update_positions();
    window.update_wallets();
    window.update_bids();
    window.update_asks();

    setInterval(window.update_rates, 4000);
    setInterval(window.update_orders, 4000);
    setInterval(window.update_positions, 4000);
    setInterval(window.update_wallets, 8000);
    setInterval(window.update_bids, 4000);
    setInterval(window.update_asks, 4000);

}

if (window.location.href.match(/^https:\/\/classic\.bitfinex\.com\/trading/)) {

    window.update_creditbook();
    window.update_positions();
    
    make_value_sticky("settings_trading_chooseperiod", $("#chooseperiod"));
    make_value_sticky("settings_trading_chooseperiod", $("#includevir"));
    make_value_sticky("settings_trading_chooseperiod", $("#incmaxrate"));
    make_value_sticky("settings_trading_maxrate", $("#maxrate"));

    setInterval(window.update_creditbook, 20000);
}

if (window.location.href.match(/^https:\/\/classic\.bitfinex\.com\/credit/)) {

    window.showHideBorrowRate();
    window.showHideLendRate();

    $("div#account_overview")
        .append('<div class="wallets"><table class="data"><tbody>' +
        '<tr><td>USD Rate (%/year):</td><td id="deposit_rates_usd_apr"></td></tr>' +
        '<tr><td>USD Interest (/day):</td><td id="deposit_rates_usd_interest"></td></tr>' +
        '<tr><td>BTC Rate (%/year):</td><td id="deposit_rates_btc_apr"></td></tr>' +
        '<tr><td>BTC Interest (/day):</td><td id="deposit_rates_btc_interest"></td></tr>' +
        '</tbody></table></div>');

    $("table.lending.trade").wrap('<div style="height: 480px; overflow: auto" />');
    $("table.lending.trade > tbody > tr > td").css("vertical-align", "top");

    $("body").append('<iframe style="display: none" id="vir_stats_holder" name="vir_stats_holder" /></div>');
    update_virs();
    setInterval(update_virs, 15000);

    window.update_wallets();
    window.update_offers();
    window.update_credits();
    window.update_loans();
    window.update_positionloans();
    window.update_usdoffers();
    window.update_btcoffers();
    window.update_usdloans();
    window.update_btcloans();

    make_value_sticky("settings_credit_vircontrol", $("#vircontrol"));
    window.virCredit("ratecur");
    make_value_sticky("settings_credit_period", $("#period"));
    make_value_sticky("settings_credit_autorenew", $("input[name=autorenew]"));
    
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

if (window.location.href.match(/https:\/\/classic\.bitfinex\.com\/pages\/(?:order_book|ll_order_book)/)) {

    setInterval(window.update_bids, 10000);
    setInterval(window.update_asks, 10000);
}